import { OtpToken } from '../models/OtpToken';
import { env } from '../config/env';

const isDev = env.NODE_ENV !== 'production';

/** Generate a 6-digit OTP and save it to DB. Returns the OTP for dev/logging. */
export const sendOtp = async (phone: string, purpose: 'LOGIN' | 'REGISTER' | 'RESET'): Promise<string> => {
  // Invalidate previous OTPs for this phone + purpose
  await OtpToken.deleteMany({ phone, purpose });

  const otp = isDev ? '123456' : Math.floor(100000 + Math.random() * 900000).toString();

  await OtpToken.create({ phone, otp, purpose });

  if (!isDev) {
    // TODO: Integrate MSG91 / Twilio SMS API here
    // await smsProvider.send(phone, `Your SAHYOG OTP is ${otp}. Valid for 10 minutes.`);
    console.log(`[OTP] SMS would be sent to ${phone} : ${otp}`);
  } else {
    console.log(`[DEV OTP] ${phone} → ${otp}`);
  }

  return otp; // Return in dev for easy testing
};

/** Verify an OTP. Throws on failure. Marks as used on success. */
export const verifyOtp = async (phone: string, otp: string, purpose: 'LOGIN' | 'REGISTER' | 'RESET'): Promise<boolean> => {
  const record = await OtpToken.findOne({
    phone,
    purpose,
    isUsed: false,
    expiresAt: { $gt: new Date() },
  });

  if (!record) throw new Error('OTP expired or not found');

  if (record.attempts >= 5) {
    await OtpToken.deleteOne({ _id: record._id });
    throw new Error('Too many failed attempts. Please request a new OTP.');
  }

  if (record.otp !== otp) {
    await OtpToken.updateOne({ _id: record._id }, { $inc: { attempts: 1 } });
    throw new Error('Invalid OTP');
  }

  await OtpToken.updateOne({ _id: record._id }, { isUsed: true });
  return true;
};
