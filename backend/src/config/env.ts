import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: parseInt(process.env.PORT ?? '5000', 10),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  MONGODB_URI: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/sahyog_db',

  // JWT
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET ?? 'sahyog_access_dev_secret_sih2026',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? 'sahyog_refresh_dev_secret_sih2026',
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',

  // OTP
  OTP_PROVIDER: process.env.OTP_PROVIDER ?? 'MOCK_LOG',
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID ?? '',
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN ?? '',

  // Razorpay
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID ?? 'rzp_test_sahyogdemo2026',
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET ?? 'sahyog_rp_secret',
  RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET ?? 'sahyog_webhook_secret',

  // Seed
  SEED_ADMIN_PHONE: process.env.SEED_ADMIN_PHONE ?? '9800000000',
};
