import { Schema, model, Document, Types } from 'mongoose';

export interface IFederation extends Document {
  name: string;
  state: string;
  jurisdiction: string;
  contactEmail: string;
  contactPhone: string;
  capitalReserveBalance: number;
}

const FederationSchema = new Schema<IFederation>({
  name: { type: String, required: true },
  state: { type: String, default: 'Maharashtra' },
  jurisdiction: { type: String, default: 'Pune Metropolitan Region' },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  capitalReserveBalance: { type: Number, default: 0 },
}, { timestamps: true });

export const Federation = model<IFederation>('Federation', FederationSchema);
