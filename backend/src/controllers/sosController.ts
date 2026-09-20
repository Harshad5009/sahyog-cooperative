import { Response, NextFunction } from 'express';
import { SosAlert } from '../models/SosAlert';
import { Worker } from '../models/Worker';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { z } from 'zod';

const sosSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  bookingId: z.string().optional(),
  triggerType: z.enum(['MANUAL','AUTO_INACTIVITY','SHAKE_GESTURE']).default('MANUAL'),
});

export const triggerSos = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = sosSchema.parse(req.body);
    const worker = await Worker.findOne({ userId: req.user!.id });
    if (!worker) throw new AppError('Worker profile not found', 404);

    const alert = await SosAlert.create({
      workerId: worker._id,
      bookingId: body.bookingId,
      triggerType: body.triggerType,
      location: { type: 'Point', coordinates: [body.lng, body.lat] },
    });

    // TODO: Notify cooperative admin via WebSocket/FCM
    console.warn(`[SOS ALERT] Worker ${worker._id} triggered SOS at [${body.lat}, ${body.lng}]`);

    res.status(201).json({ success: true, message: 'SOS alert sent to cooperative admin', data: alert });
  } catch (err) { next(err); }
};

export const resolveAlert = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const alert = await SosAlert.findByIdAndUpdate(req.params.id, {
      isResolved: true,
      resolvedAt: new Date(),
      resolvedBy: req.user!.id,
    }, { new: true });
    if (!alert) throw new AppError('Alert not found', 404);
    res.json({ success: true, data: alert });
  } catch (err) { next(err); }
};

export const getActiveAlerts = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const alerts = await SosAlert.find({ isResolved: false }).sort({ createdAt: -1 }).populate('workerId', 'membershipNumber');
    res.json({ success: true, data: alerts });
  } catch (err) { next(err); }
};
