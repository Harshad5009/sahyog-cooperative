import { Schema, model, Document, Types } from 'mongoose';

export type BookingStatus =
  | 'PENDING_MATCH'
  | 'ALLOCATED'
  | 'ACCEPTED_BY_WORKER'
  | 'EN_ROUTE'
  | 'ARRIVED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DISPUTED'
  | 'REFUND_REQUESTED'
  | 'REFUNDED';

export type PaymentStatus =
  | 'PAYMENT_PENDING'
  | 'PAYMENT_HELD'
  | 'ADDITIONAL_REQUESTED'
  | 'PAYMENT_RELEASED'
  | 'REFUND_INITIATED'
  | 'REFUND_COMPLETED';

export interface IBooking extends Document {
  bookingNumber: string;
  customerId: Types.ObjectId;
  workerId?: Types.ObjectId;
  serviceCategory: string;
  subServiceName: string;
  problemDescription: string;
  aiAnalysis: {
    detectedCategory: string;
    urgency: string;
    requiredSkill: string;
    confidenceScore: number;
    problemSummary: string;
  };
  address: { street: string; area: string; city: string; pincode: string };
  location: { type: string; coordinates: [number, number] };
  scheduledDate: string;
  scheduledTimeSlot: string;
  urgency: string;
  isEmergency: boolean;
  // Rate card
  baseServiceCharge: number;
  labourCharge: number;
  materialCharge: number;
  travelCharge: number;
  estimatedTotal: number;
  // Payment breakdown (80/10/5/5)
  totalAmount: number;
  workerEarnings: number;
  welfareContribution: number;
  cooperativeFund: number;
  platformOperations: number;
  // Status
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  gatewayOrderId?: string;
  gatewayPaymentId?: string;
  // Customer rating
  customerRating?: number;
  customerFeedback?: string;
  completedAt?: Date;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  bookingNumber: { type: String, required: true, unique: true, index: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  workerId: { type: Schema.Types.ObjectId, ref: 'Worker', index: true },
  serviceCategory: { type: String, required: true, index: true },
  subServiceName: { type: String, required: true },
  problemDescription: { type: String, required: true },
  aiAnalysis: {
    detectedCategory: String,
    urgency: String,
    requiredSkill: String,
    confidenceScore: Number,
    problemSummary: String,
  },
  address: {
    street: String,
    area: String,
    city: String,
    pincode: String,
  },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [73.8567, 18.5204] },
  },
  scheduledDate: { type: String, required: true },
  scheduledTimeSlot: { type: String, required: true },
  urgency: { type: String, enum: ['low','medium','high','emergency'], default: 'medium' },
  isEmergency: { type: Boolean, default: false },
  // Rate card
  baseServiceCharge: { type: Number, default: 0 },
  labourCharge: { type: Number, default: 0 },
  materialCharge: { type: Number, default: 0 },
  travelCharge: { type: Number, default: 0 },
  estimatedTotal: { type: Number, default: 0 },
  // Payment split
  totalAmount: { type: Number, default: 0 },
  workerEarnings: { type: Number, default: 0 },
  welfareContribution: { type: Number, default: 0 },
  cooperativeFund: { type: Number, default: 0 },
  platformOperations: { type: Number, default: 0 },
  // Status
  status: {
    type: String,
    enum: ['PENDING_MATCH','ALLOCATED','ACCEPTED_BY_WORKER','EN_ROUTE','ARRIVED','IN_PROGRESS','COMPLETED','CANCELLED','DISPUTED','REFUND_REQUESTED','REFUNDED'],
    default: 'PENDING_MATCH',
    index: true,
  },
  paymentStatus: {
    type: String,
    enum: ['PAYMENT_PENDING','PAYMENT_HELD','ADDITIONAL_REQUESTED','PAYMENT_RELEASED','REFUND_INITIATED','REFUND_COMPLETED'],
    default: 'PAYMENT_PENDING',
  },
  paymentMethod: String,
  gatewayOrderId: String,
  gatewayPaymentId: String,
  customerRating: Number,
  customerFeedback: String,
  completedAt: Date,
}, { timestamps: true });

BookingSchema.index({ location: '2dsphere' });
BookingSchema.index({ customerId: 1, status: 1 });
BookingSchema.index({ workerId: 1, status: 1 });
BookingSchema.index({ scheduledDate: 1, status: 1 });

export const Booking = model<IBooking>('Booking', BookingSchema);
