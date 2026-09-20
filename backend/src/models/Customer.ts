import { Schema, model, Document, Types } from 'mongoose';

export interface ISavedAddress {
  label: string;
  street: string;
  area: string;
  city: string;
  pincode: string;
  coordinates?: { lat: number; lng: number };
}

export type CustomerType = 'HOUSEHOLD' | 'INSTITUTION';

export interface ICustomer extends Document {
  userId: Types.ObjectId;
  profileType: CustomerType;
  institutionName?: string;
  gstNumber?: string;
  savedAddresses: ISavedAddress[];
  emergencyContact?: { name: string; phone: string };
}

const CustomerSchema = new Schema<ICustomer>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  profileType: { type: String, enum: ['HOUSEHOLD','INSTITUTION'], default: 'HOUSEHOLD' },
  institutionName: String,
  gstNumber: String,
  savedAddresses: [{
    label: String,
    street: String,
    area: String,
    city: String,
    pincode: String,
    coordinates: { lat: Number, lng: Number },
  }],
  emergencyContact: { name: String, phone: String },
}, { timestamps: true });

export const Customer = model<ICustomer>('Customer', CustomerSchema);
