import { Schema, model, Document, Types } from 'mongoose';

export type ChangeRequestStatus = 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'EXPIRED';

export interface IChangeRequest extends Document {
  bookingId: Types.ObjectId;
  workerId: Types.ObjectId;
  customerId: Types.ObjectId;
  reason: string;
  originalAmount: number;
  additionalAmount: number;
  newTotalAmount: number;
  materialBreakdown?: { item: string; cost: number }[];
  labourReason?: string;
  status: ChangeRequestStatus;
  responseNote?: string;
  respondedAt?: Date;
  expiresAt: Date;
}

const ChangeRequestSchema = new Schema<IChangeRequest>({
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true, index: true },
  workerId: { type: Schema.Types.ObjectId, ref: 'Worker', required: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reason: { type: String, required: true },
  originalAmount: { type: Number, required: true },
  additionalAmount: { type: Number, required: true, min: 0 },
  newTotalAmount: { type: Number, required: true },
  materialBreakdown: [{ item: String, cost: Number }],
  labourReason: String,
  status: {
    type: String,
    enum: ['PENDING_APPROVAL','APPROVED','REJECTED','EXPIRED'],
    default: 'PENDING_APPROVAL',
    index: true,
  },
  responseNote: String,
  respondedAt: Date,
  expiresAt: { type: Date, default: () => new Date(Date.now() + 30 * 60 * 1000) }, // 30 mins
}, { timestamps: true });

// Enforce: only ONE pending change request per booking at a time
ChangeRequestSchema.index({ bookingId: 1, status: 1 });

export const ChangeRequest = model<IChangeRequest>('ChangeRequest', ChangeRequestSchema);
