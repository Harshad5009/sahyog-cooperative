import { Schema, model, Document, Types } from 'mongoose';

export interface ISosAlert extends Document {
  workerId: Types.ObjectId;
  bookingId?: Types.ObjectId;
  triggerType: 'MANUAL' | 'AUTO_INACTIVITY' | 'SHAKE_GESTURE';
  location: { type: string; coordinates: [number, number] };
  resolvedAt?: Date;
  resolvedBy?: Types.ObjectId;
  isResolved: boolean;
}

const SosAlertSchema = new Schema<ISosAlert>({
  workerId: { type: Schema.Types.ObjectId, ref: 'Worker', required: true, index: true },
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking' },
  triggerType: { type: String, enum: ['MANUAL','AUTO_INACTIVITY','SHAKE_GESTURE'], default: 'MANUAL' },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true },
  },
  resolvedAt: Date,
  resolvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  isResolved: { type: Boolean, default: false, index: true },
}, { timestamps: true });

SosAlertSchema.index({ location: '2dsphere' });

export const SosAlert = model<ISosAlert>('SosAlert', SosAlertSchema);
