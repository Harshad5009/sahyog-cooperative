import { Schema, model, Document, Types } from 'mongoose';

export interface ICooperativeSociety extends Document {
  name: string;
  code: string;
  federationId: Types.ObjectId;
  registrationNumber: string;
  district: string;
  zone: string;
  operationalAreas: string[];
  adminUserId?: Types.ObjectId;
  societyReserveBalance: number;
  isActive: boolean;
}

const CooperativeSocietySchema = new Schema<ICooperativeSociety>({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true, uppercase: true },
  federationId: { type: Schema.Types.ObjectId, ref: 'Federation', required: true, index: true },
  registrationNumber: { type: String, required: true, unique: true },
  district: { type: String, required: true },
  zone: { type: String, required: true },
  operationalAreas: [String],
  adminUserId: { type: Schema.Types.ObjectId, ref: 'User' },
  societyReserveBalance: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const CooperativeSociety = model<ICooperativeSociety>('CooperativeSociety', CooperativeSocietySchema);
