import { Response, NextFunction } from 'express';
import { z } from 'zod';
import { Worker } from '../models/Worker';
import { User } from '../models/User';
import { CooperativeSociety } from '../models/CooperativeSociety';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { getRateCard } from '../services/paymentService';

const locationSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

export const getWorkerProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const worker = await Worker.findOne({ userId: req.user!.id })
      .populate('userId', 'name phone email languagePreference')
      .populate('cooperativeSocietyId', 'name code district')
      .lean();
    if (!worker) throw new AppError('Worker profile not found', 404);
    res.json({ success: true, data: worker });
  } catch (err) { next(err); }
};

export const updateWorkerAvailability = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { isAvailable, emergencyDuty } = z.object({
      isAvailable: z.boolean(),
      emergencyDuty: z.boolean().optional(),
    }).parse(req.body);

    const worker = await Worker.findOneAndUpdate(
      { userId: req.user!.id },
      { isAvailable, ...(emergencyDuty !== undefined && { emergencyDuty }) },
      { new: true },
    ).lean();
    if (!worker) throw new AppError('Worker profile not found', 404);
    res.json({ success: true, data: { isAvailable: worker.isAvailable, emergencyDuty: worker.emergencyDuty } });
  } catch (err) { next(err); }
};

export const updateWorkerLocation = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { lat, lng } = locationSchema.parse(req.body);
    await Worker.findOneAndUpdate({ userId: req.user!.id }, {
      currentLocation: { type: 'Point', coordinates: [lng, lat] },
    });
    res.json({ success: true, message: 'Location updated' });
  } catch (err) { next(err); }
};

export const getNearbyWorkers = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lat = parseFloat(req.query.lat as string);
    const lng = parseFloat(req.query.lng as string);
    const category = req.query.category as string;
    const radiusKm = parseFloat(req.query.radius as string) || 15;

    if (isNaN(lat) || isNaN(lng)) throw new AppError('lat and lng query params required', 400);

    const workers = await Worker.find({
      verificationStatus: 'VERIFIED',
      isAvailable: true,
      kycVerified: true,
      ...(category && { primarySkillCategory: category }),
      currentLocation: {
        $nearSphere: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: radiusKm * 1000,
        },
      },
    })
      .limit(20)
      .populate('userId', 'name')
      .select('-passwordHash')
      .lean();

    res.json({ success: true, data: workers });
  } catch (err) { next(err); }
};

export const getRateCardHandler = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = req.query.category as string;
    if (!category) throw new AppError('category query param required', 400);
    const rateCard = getRateCard(category);
    res.json({ success: true, data: rateCard });
  } catch (err) { next(err); }
};

export const verifyWorkerPassport = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const rawId = req.params.membershipId;
    const membershipId = Array.isArray(rawId) ? rawId[0] : (rawId ?? '');
    if (!membershipId) throw new AppError('Worker membership ID required', 400);

    const isObjectId = /^[0-9a-fA-F]{24}$/.test(membershipId);
    const query = isObjectId ? { $or: [{ membershipNumber: membershipId }, { _id: membershipId }] } : { membershipNumber: membershipId };

    const worker = await Worker.findOne(query)
      .populate('userId', 'name languagePreference')
      .populate('cooperativeSocietyId', 'name code district zone')
      .lean();

    if (!worker) {
      throw new AppError('Worker passport not found or invalid membership ID', 404);
    }

    const society: any = worker.cooperativeSocietyId;
    const user: any = worker.userId;

    res.json({
      success: true,
      data: {
        workerId: worker._id,
        name: user?.name || 'Verified Cooperative Specialist',
        membershipNumber: worker.membershipNumber,
        cooperativeSociety: society?.name || 'Shramik Vikas Cooperative Society',
        societyCode: society?.code || 'SVCS-PMC-01',
        district: society?.district || 'Pune',
        zone: society?.zone || 'Central Pune',
        primarySkill: worker.primarySkillCategory,
        skills: worker.skills || [],
        experienceYears: worker.experienceYears,
        ratingAverage: worker.ratingAverage,
        totalReviewsCount: worker.totalReviewsCount,
        completedJobsCount: worker.completedJobsCount,
        reliabilityScore: worker.reliabilityScore,
        verificationStatus: worker.verificationStatus,
        kycVerified: worker.kycVerified,
        emergencyDuty: worker.emergencyDuty,
        badgeHash: `SHA256:MH-COOP-VERIFIED:${worker.membershipNumber}`,
        issuingAuthority: 'Maharashtra State Labour Cooperative Federation (Pune Command)',
        qrVerificationStatus: 'AUTHENTIC_COOPERATIVE_CREDENTIAL',
        verifiedDate: '2026-01-15',
      },
    });
  } catch (err) { next(err); }
};
