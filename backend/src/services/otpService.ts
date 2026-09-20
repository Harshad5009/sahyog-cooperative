import { OtpToken } from '../models/OtpToken';
import { env } from '../config/env';
import { AppError } from '../middleware/errorHandler';

const isDev = env.NODE_ENV !== 'production';

/** Generate a 6-digit OTP and save it to DB. Returns the OTP for dev/logging. */
export const sendOtp = async (phone: string, purpose: 'LOGIN' | 'REGISTER' | 'RESET'): Promise<string> => {
  // Invalidate previous OTPs for this phone + purpose
  await OtpToken.deleteMany({ phone, purpose });

  const isMock = isDev || !env.TWILIO_ACCOUNT_SID || phone.startsWith('980000');
  const otp = isMock ? '123456' : Math.floor(100000 + Math.random() * 900000).toString();

  await OtpToken.create({ phone, otp, purpose });

  if (!isMock) {
    // SMS provider integration
    console.log(`[OTP] SMS would be sent to ${phone} : ${otp}`);
  } else {
    console.log(`[DEMO OTP] ${phone} → ${otp}`);
  }

  return otp;
};

/** Verify an OTP. Throws on failure. Marks as used on success. */
export const verifyOtp = async (phone: string, otp: string, purpose: 'LOGIN' | 'REGISTER' | 'RESET'): Promise<boolean> => {
  const isMock = isDev || !env.TWILIO_ACCOUNT_SID || phone.startsWith('980000');

  // Master demo bypass for evaluation accounts
  if (isMock && otp === '123456') {
    await OtpToken.updateMany({ phone, purpose, isUsed: false }, { isUsed: true });
    return true;
  }

  const record = await OtpToken.findOne({
    phone,
    purpose,
    isUsed: false,
    expiresAt: { $gt: new Date() },
  });

  if (!record) throw new AppError('OTP expired or not found. Please request a new OTP.', 400);

  if (record.attempts >= 5) {
    await OtpToken.deleteOne({ _id: record._id });
    throw new AppError('Too many failed attempts. Please request a new OTP.', 429);
  }

  if (record.otp !== otp) {
    await OtpToken.updateOne({ _id: record._id }, { $inc: { attempts: 1 } });
    throw new AppError('Invalid OTP', 400);
  }

  await OtpToken.updateOne({ _id: record._id }, { isUsed: true });
  return true;
};
