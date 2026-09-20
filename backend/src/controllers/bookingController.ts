import { Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import { Booking } from '../models/Booking';
import { Worker } from '../models/Worker';
import { User } from '../models/User';
import { Customer } from '../models/Customer';
import { ChangeRequest } from '../models/ChangeRequest';
import { Review } from '../models/Review';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { computeAllocationScores, WorkerCandidate } from '../services/allocationEngine';
import { getRateCard, computePaymentSplit } from '../services/paymentService';

// --- Schemas ---
const createBookingSchema = z.object({
  serviceCategory: z.string().min(2),
  subServiceName: z.string().min(2),
  problemDescription: z.string().min(10).max(1000),
  address: z.object({
    street: z.string(),
    area: z.string(),
    city: z.string(),
    pincode: z.string().length(6),
  }),
  scheduledDate: z.string(),
  scheduledTimeSlot: z.string(),
  urgency: z.enum(['low','medium','high','emergency']).default('medium'),
  isEmergency: z.boolean().default(false),
  coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
});

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().max(500).default(''),
  timeliness: z.number().min(1).max(5).default(5),
  qualityOfWork: z.number().min(1).max(5).default(5),
  professionalism: z.number().min(1).max(5).default(5),
  cleanliness: z.number().min(1).max(5).default(5),
});

/** Generate booking number: SH-YYYYMMDD-XXXXX */
const genBookingNumber = () => {
  const d = new Date().toISOString().slice(0,10).replace(/-/g,'');
  const r = Math.floor(10000 + Math.random() * 90000);
  return `SH-${d}-${r}`;
};

// --- List customer bookings ---
export const getMyBookings = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const bookings = await Booking.find({ customerId: req.user!.id })
      .sort({ createdAt: -1 })
      .populate('workerId', 'userId membershipNumber ratingAverage skills primarySkillCategory')
      .lean();
    res.json({ success: true, data: bookings });
  } catch (err) { next(err); }
};

// --- Get single booking ---
export const getBookingById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Booking not found', 404);
    }
    const booking = await Booking.findById(id)
      .populate('workerId', 'userId membershipNumber ratingAverage skills primarySkillCategory avatarUrl')
      .lean();
    if (!booking) throw new AppError('Booking not found', 404);
    // Auth check: only participant can view
    const isOwner = booking.customerId.toString() === req.user!.id;
    const isWorker = booking.workerId && (booking.workerId as any)?.userId?.toString() === req.user!.id;
    if (!isOwner && !isWorker && !['SOCIETY_ADMIN','FEDERATION_ADMIN','SUPER_ADMIN'].includes(req.user!.role)) {
      throw new AppError('Access denied', 403);
    }
    res.json({ success: true, data: booking });
  } catch (err) { next(err); }
};

// --- Create booking + auto-allocate worker ---
export const createBooking = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = createBookingSchema.parse(req.body);
    const rateCard = getRateCard(body.serviceCategory);
    const split = computePaymentSplit(rateCard.estimatedTotal);

    const booking = await Booking.create({
      bookingNumber: genBookingNumber(),
      customerId: req.user!.id,
      serviceCategory: body.serviceCategory,
      subServiceName: body.subServiceName,
      problemDescription: body.problemDescription,
      address: body.address,
      location: body.coordinates
        ? { type: 'Point', coordinates: [body.coordinates.lng, body.coordinates.lat] }
        : undefined,
      scheduledDate: body.scheduledDate,
      scheduledTimeSlot: body.scheduledTimeSlot,
      urgency: body.urgency,
      isEmergency: body.isEmergency,
      ...rateCard,
      totalAmount: rateCard.estimatedTotal,
      ...split,
      status: 'PENDING_MATCH',
      paymentStatus: 'PAYMENT_PENDING',
    });

    // Trigger async allocation (non-blocking)
    autoAllocateWorker(booking._id.toString(), body.serviceCategory, body.isEmergency).catch(console.error);

    res.status(201).json({
      success: true,
      message: 'Booking created. Matching worker…',
      data: booking,
    });
  } catch (err) { next(err); }
};

/** Auto-allocate best worker to a booking */
const autoAllocateWorker = async (bookingId: string, category: string, isEmergency: boolean) => {
  const workers = await Worker.find({
    primarySkillCategory: category,
    isAvailable: true,
    verificationStatus: 'VERIFIED',
    kycVerified: true,
  }).populate<{ userId: { name: string } }>('userId', 'name').lean();

  const candidates: WorkerCandidate[] = workers.map(w => ({
    workerId: w._id.toString(),
    name: (w.userId as any)?.name ?? 'Worker',
    ratingAverage: w.ratingAverage,
    distanceKm: w.distanceKmCache,
    todayJobCount: w.todayJobCount,
    weeklyWorkloadHours: w.weeklyWorkloadHours,
    reliabilityScore: w.reliabilityScore,
    primarySkillCategory: w.primarySkillCategory,
    skills: w.skills.map(s => s.skillName),
    isAvailable: w.isAvailable,
    kycVerified: w.kycVerified,
    emergencyDuty: w.emergencyDuty,
  }));

  const top = computeAllocationScores(candidates, category, isEmergency)[0];
  if (!top) return; // No worker available — stay PENDING_MATCH

  await Promise.all([
    Booking.findByIdAndUpdate(bookingId, {
      workerId: top.workerId,
      status: 'ALLOCATED',
    }),
    Worker.findByIdAndUpdate(top.workerId, {
      $inc: { todayJobCount: 1 },
    }),
  ]);
};

// --- Worker: update booking status ---
export const updateBookingStatus = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status } = req.body;
    const allowed: Record<string, string[]> = {
      WORKER: ['ACCEPTED_BY_WORKER','EN_ROUTE','ARRIVED','IN_PROGRESS','COMPLETED'],
      CUSTOMER: ['CANCELLED'],
      SOCIETY_ADMIN: ['DISPUTED','CANCELLED'],
    };
    const allowedForRole = allowed[req.user!.role] ?? [];
    if (!allowedForRole.includes(status)) throw new AppError(`Role ${req.user!.role} cannot set status to ${status}`, 403);

    const booking = await Booking.findByIdAndUpdate(req.params.id, {
      status,
      ...(status === 'COMPLETED' ? { completedAt: new Date(), paymentStatus: 'PAYMENT_HELD' } : {}),
    }, { new: true });
    if (!booking) throw new AppError('Booking not found', 404);
    res.json({ success: true, data: booking });
  } catch (err) { next(err); }
};

// --- Submit review ---
export const submitReview = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = reviewSchema.parse(req.body);
    const booking = await Booking.findById(req.params.id);
    if (!booking) throw new AppError('Booking not found', 404);
    if (booking.customerId.toString() !== req.user!.id) throw new AppError('Not your booking', 403);
    if (booking.status !== 'COMPLETED') throw new AppError('Can only review completed bookings', 400);

    const review = await Review.create({
      bookingId: booking._id,
      workerId: booking.workerId,
      customerId: req.user!.id,
      ...body,
    });

    // Update worker rating average
    if (booking.workerId) {
      const allReviews = await Review.find({ workerId: booking.workerId });
      const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
      await Worker.findByIdAndUpdate(booking.workerId, {
        ratingAverage: Math.round(avg * 10) / 10,
        totalReviewsCount: allReviews.length,
      });
    }

    res.status(201).json({ success: true, data: review });
  } catch (err) { next(err); }
};
