import { Schema, model, Document, Types } from 'mongoose';

export interface IOtpToken extends Document {
  phone: string;
  otp: string; // Stored as bcrypt hash in prod
  purpose: 'LOGIN' | 'REGISTER' | 'RESET';
  expiresAt: Date;
  attempts: number;
  isUsed: boolean;
}

const OtpTokenSchema = new Schema<IOtpToken>({
  phone: { type: String, required: true, index: true },
  otp: { type: String, required: true },
  purpose: { type: String, enum: ['LOGIN','REGISTER','RESET'], required: true },
  expiresAt: { type: Date, default: () => new Date(Date.now() + 10 * 60 * 1000) }, // 10 mins
  attempts: { type: Number, default: 0 },
  isUsed: { type: Boolean, default: false },
}, { timestamps: true });

OtpTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL auto-delete

export const OtpToken = model<IOtpToken>('OtpToken', OtpTokenSchema);
