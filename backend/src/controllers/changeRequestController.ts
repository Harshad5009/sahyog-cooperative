import { Response, NextFunction } from 'express';
import { z } from 'zod';
import { ChangeRequest } from '../models/ChangeRequest';
import { Booking } from '../models/Booking';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const createCRSchema = z.object({
  reason: z.string().min(10).max(500),
  additionalAmount: z.number().min(1).max(50000),
  materialBreakdown: z.array(z.object({ item: z.string(), cost: z.number() })).optional(),
  labourReason: z.string().max(300).optional(),
});

const respondCRSchema = z.object({
  action: z.enum(['APPROVED','REJECTED']),
  responseNote: z.string().max(300).optional(),
});

/** Worker creates a change request — NO unilateral price change allowed */
export const createChangeRequest = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = createCRSchema.parse(req.body);
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) throw new AppError('Booking not found', 404);
    if (!['IN_PROGRESS','ARRIVED'].includes(booking.status)) {
      throw new AppError('Can only request changes while job is in progress', 400);
    }

    // Prevent multiple pending CRs
    const existing = await ChangeRequest.findOne({ bookingId: booking._id, status: 'PENDING_APPROVAL' });
    if (existing) throw new AppError('A change request is already pending for this booking', 409);

    const newTotal = booking.totalAmount + body.additionalAmount;
    const cr = await ChangeRequest.create({
      bookingId: booking._id,
      workerId: booking.workerId,
      customerId: booking.customerId,
      reason: body.reason,
      originalAmount: booking.totalAmount,
      additionalAmount: body.additionalAmount,
      newTotalAmount: newTotal,
      materialBreakdown: body.materialBreakdown,
      labourReason: body.labourReason,
    });

    // Update booking payment status
    await Booking.findByIdAndUpdate(booking._id, { paymentStatus: 'ADDITIONAL_REQUESTED' });

    res.status(201).json({ success: true, message: 'Change request sent to customer for approval', data: cr });
  } catch (err) { next(err); }
};

/** Customer approves or rejects a change request */
export const respondToChangeRequest = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { action, responseNote } = respondCRSchema.parse(req.body);
    const cr = await ChangeRequest.findById(req.params.crId);
    if (!cr) throw new AppError('Change request not found', 404);
    if (cr.customerId.toString() !== req.user!.id) throw new AppError('Not authorized', 403);
    if (cr.status !== 'PENDING_APPROVAL') throw new AppError('Change request already responded to', 400);
    if (cr.expiresAt < new Date()) {
      await ChangeRequest.findByIdAndUpdate(cr._id, { status: 'EXPIRED' });
      throw new AppError('Change request has expired', 410);
    }

    await ChangeRequest.findByIdAndUpdate(cr._id, {
      status: action,
      responseNote,
      respondedAt: new Date(),
    });

    if (action === 'APPROVED') {
      await Booking.findByIdAndUpdate(cr.bookingId, {
        totalAmount: cr.newTotalAmount,
        paymentStatus: 'PAYMENT_HELD',
      });
    } else {
      await Booking.findByIdAndUpdate(cr.bookingId, { paymentStatus: 'PAYMENT_HELD' });
    }

    res.json({ success: true, message: `Change request ${action.toLowerCase()}`, data: cr });
  } catch (err) { next(err); }
};

/** Get all change requests for a booking */
export const getChangeRequests = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const crs = await ChangeRequest.find({ bookingId: req.params.bookingId }).sort({ createdAt: -1 });
    res.json({ success: true, data: crs });
  } catch (err) { next(err); }
};
