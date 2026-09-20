import { Schema, model, Document, Types } from 'mongoose';

export type WorkerVerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';

export interface IWorkerSkillEntry {
  skillName: string;
  category: string;
  proficiencyLevel: number;
  certified: boolean;
  certificationName?: string;
  certificationIssuer?: string;
  certificationExpiry?: Date;
}

export interface IWorker extends Document {
  userId: Types.ObjectId;
  cooperativeSocietyId: Types.ObjectId;
  membershipNumber: string;
  primarySkillCategory: string;
  skills: IWorkerSkillEntry[];
  experienceYears: number;
  avatarUrl: string;
  isAvailable: boolean;
  emergencyDuty: boolean;
  kycVerified: boolean;
  verificationStatus: WorkerVerificationStatus;
  currentLocation: { type: string; coordinates: [number, number] };
  distanceKmCache: number;
  todayJobCount: number;
  weeklyWorkloadHours: number;
  ratingAverage: number;
  totalReviewsCount: number;
  completedJobsCount: number;
  reliabilityScore: number;
}

const WorkerSchema = new Schema<IWorker>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  cooperativeSocietyId: { type: Schema.Types.ObjectId, ref: 'CooperativeSociety', required: true, index: true },
  membershipNumber: { type: String, required: true, unique: true, index: true },
  primarySkillCategory: { type: String, required: true, index: true },
  skills: [{
    skillName: String,
    category: String,
    proficiencyLevel: { type: Number, min: 1, max: 5 },
    certified: { type: Boolean, default: false },
    certificationName: String,
    certificationIssuer: String,
    certificationExpiry: Date,
  }],
  experienceYears: { type: Number, default: 0 },
  avatarUrl: { type: String, default: '' },
  isAvailable: { type: Boolean, default: false, index: true },
  emergencyDuty: { type: Boolean, default: false },
  kycVerified: { type: Boolean, default: false },
  verificationStatus: { type: String, enum: ['PENDING','VERIFIED','REJECTED'], default: 'PENDING', index: true },
  currentLocation: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [73.8567, 18.5204] }, // [lng, lat] Pune city center
  },
  distanceKmCache: { type: Number, default: 0 },
  todayJobCount: { type: Number, default: 0 },
  weeklyWorkloadHours: { type: Number, default: 0 },
  ratingAverage: { type: Number, default: 0 },
  totalReviewsCount: { type: Number, default: 0 },
  completedJobsCount: { type: Number, default: 0 },
  reliabilityScore: { type: Number, default: 100 },
}, { timestamps: true });

WorkerSchema.index({ currentLocation: '2dsphere' });
WorkerSchema.index({ primarySkillCategory: 1, isAvailable: 1, verificationStatus: 1 });

export const Worker = model<IWorker>('Worker', WorkerSchema);
