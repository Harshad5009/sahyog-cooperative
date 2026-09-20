import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { User } from '../models/User';
import { Worker } from '../models/Worker';
import { Customer } from '../models/Customer';
import { sendOtp, verifyOtp } from '../services/otpService';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../services/jwtService';
import { AppError } from '../middleware/errorHandler';

const phoneSchema = z.string().transform(raw => {
  let cleaned = raw.replace(/\D/g, '');
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.length === 11 && cleaned.startsWith('0')) {
    cleaned = cleaned.slice(1);
  }
  return cleaned;
}).refine(p => /^[6-9]\d{9}$/.test(p), { message: 'Invalid Indian mobile number (10 digits required)' });

// --- Schemas ---
const sendOtpSchema = z.object({
  phone: phoneSchema,
  purpose: z.enum(['LOGIN','REGISTER','RESET']),
});

const verifyOtpSchema = z.object({
  phone: phoneSchema,
  otp: z.string().length(6),
  purpose: z.enum(['LOGIN','REGISTER','RESET']),
});

const registerSchema = z.object({
  phone: phoneSchema,
  otp: z.string().length(6),
  name: z.string().min(2).max(60),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  role: z.enum(['CUSTOMER','WORKER']).default('CUSTOMER'),
  languagePreference: z.enum(['en','hi','mr']).default('en'),
});

const loginSchema = z.object({
  phone: phoneSchema,
  otp: z.string().length(6),
});

const refreshSchema = z.object({ refreshToken: z.string() });

// --- Helpers ---
const createTokenPair = (userId: string, role: string) => ({
  accessToken: generateAccessToken({ sub: userId, role }),
  refreshToken: generateRefreshToken({ sub: userId, role }),
});

// --- Controllers ---
export const sendOtpHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { phone, purpose } = sendOtpSchema.parse(req.body);
    const otp = await sendOtp(phone, purpose);
    const isMock = process.env.NODE_ENV !== 'production' || !process.env.TWILIO_ACCOUNT_SID || phone.startsWith('980000');
    res.json({
      success: true,
      message: 'OTP sent successfully',
      ...(isMock && { devOtp: otp }),
    });
  } catch (err) {
    next(err);
  }
};

export const registerHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = registerSchema.parse(req.body);

    // 1. Verify OTP
    await verifyOtp(body.phone, body.otp, 'REGISTER');

    // 2. Check if user already exists
    const exists = await User.findOne({ phone: body.phone });
    if (exists) throw new AppError('Phone number already registered', 409);

    // 3. Hash password (optional, OTP-primary auth)
    const passwordHash = body.password ? await bcrypt.hash(body.password, 12) : await bcrypt.hash(crypto.randomUUID(), 12);

    // 4. Create user
    const user = await User.create({
      phone: body.phone,
      name: body.name,
      email: body.email,
      passwordHash,
      role: body.role,
      languagePreference: body.languagePreference,
      isPhoneVerified: true,
    });

    // 5. Create profile
    if (body.role === 'CUSTOMER') {
      await Customer.create({ userId: user._id });
    }

    const tokens = createTokenPair(user.id, user.role);
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: { user: { id: user.id, name: user.name, phone: user.phone, role: user.role }, ...tokens },
    });
  } catch (err) {
    next(err);
  }
};

export const loginHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { phone, otp } = loginSchema.parse(req.body);

    await verifyOtp(phone, otp, 'LOGIN');

    const user = await User.findOne({ phone, isActive: true });
    if (!user) throw new AppError('Account not found. Please register.', 404);

    const tokens = createTokenPair(user.id, user.role);
    res.json({
      success: true,
      data: { user: { id: user.id, name: user.name, phone: user.phone, role: user.role }, ...tokens },
    });
  } catch (err) {
    next(err);
  }
};

export const refreshTokenHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken } = refreshSchema.parse(req.body);
    const payload = verifyRefreshToken(refreshToken);
    const user = await User.findById(payload.sub);
    if (!user || !user.isActive) throw new AppError('User not found', 404);
    const tokens = createTokenPair(user.id, user.role);
    res.json({ success: true, data: tokens });
  } catch (err) {
    next(err);
  }
};
