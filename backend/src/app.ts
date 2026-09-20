import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { errorHandler, notFound } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import bookingRoutes from './routes/bookings';
import workerRoutes from './routes/workers';
import sosRoutes from './routes/sos';
import adminRoutes from './routes/admin';

// Ensure all Mongoose models are registered in runtime
import './models/User';
import './models/Customer';
import './models/Worker';
import './models/CooperativeSociety';
import './models/Federation';
import './models/Booking';
import './models/ChangeRequest';
import './models/Review';
import './models/SosAlert';
import './models/OtpToken';

const app = express();

// ── Security ──────────────────────────────────────────────
app.use(helmet());

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://sahyog-cooperative.vercel.app',
  ...(env.CORS_ORIGIN ? env.CORS_ORIGIN.split(',').map(s => s.trim()) : []),
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || allowedOrigins.includes('*') || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// ── Rate limiting ──────────────────────────────────────────
const globalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200, standardHeaders: true, legacyHeaders: false });
const authLimiter   = rateLimit({ windowMs: 15 * 60 * 1000, max: 15,  message: { success: false, message: 'Too many auth requests. Try after 15 minutes.' } });
app.use(globalLimiter);

// ── Body parsing ───────────────────────────────────────────
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Health check ───────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'SAHYOG API', version: '1.0.0', timestamp: new Date() }));

// ── Routes ─────────────────────────────────────────────────
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/admin', adminRoutes);

// ── 404 + Error handler ────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
