import { Schema, model, Document, Types } from 'mongoose';

export type UserRole = 'CUSTOMER' | 'WORKER' | 'SOCIETY_ADMIN' | 'FEDERATION_ADMIN' | 'SUPER_ADMIN';

export interface IUser extends Document {
  phone: string;
  email?: string;
  passwordHash: string;
  role: UserRole;
  name: string;
  languagePreference: 'en' | 'hi' | 'mr';
  isActive: boolean;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  phone: { type: String, required: true, unique: true, index: true, trim: true },
  email: { type: String, sparse: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ['CUSTOMER','WORKER','SOCIETY_ADMIN','FEDERATION_ADMIN','SUPER_ADMIN'], default: 'CUSTOMER' },
  name: { type: String, required: true, trim: true },
  languagePreference: { type: String, enum: ['en','hi','mr'], default: 'en' },
  isActive: { type: Boolean, default: true },
  isPhoneVerified: { type: Boolean, default: false },
  isEmailVerified: { type: Boolean, default: false },
}, { timestamps: true });

export const User = model<IUser>('User', UserSchema);
