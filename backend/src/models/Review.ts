import { Schema, model, Document, Types } from 'mongoose';

export interface IReview extends Document {
  bookingId: Types.ObjectId;
  workerId: Types.ObjectId;
  customerId: Types.ObjectId;
  rating: number;
  comment: string;
  timeliness: number;
  qualityOfWork: number;
  professionalism: number;
  cleanliness: number;
  responseFromWorker?: string;
}

const ReviewSchema = new Schema<IReview>({
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true, unique: true },
  workerId: { type: Schema.Types.ObjectId, ref: 'Worker', required: true, index: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: '' },
  timeliness: { type: Number, min: 1, max: 5, default: 5 },
  qualityOfWork: { type: Number, min: 1, max: 5, default: 5 },
  professionalism: { type: Number, min: 1, max: 5, default: 5 },
  cleanliness: { type: Number, min: 1, max: 5, default: 5 },
  responseFromWorker: String,
}, { timestamps: true });

export const Review = model<IReview>('Review', ReviewSchema);
