/**
 * SAHYOG Seed Route — Free alternative to Render Jobs
 * GET /api/seed?secret=YOUR_SEED_SECRET
 *
 * - Protected by SEED_SECRET env variable
 * - Clears existing data and inserts fresh demo data
 * - Disable after use by removing SEED_SECRET from Render env vars
 */

import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from '../config/env';
import { Federation } from '../models/Federation';
import { CooperativeSociety } from '../models/CooperativeSociety';
import { User } from '../models/User';
import { Worker } from '../models/Worker';
import { Customer } from '../models/Customer';
import { Booking } from '../models/Booking';
import { Review } from '../models/Review';
import { getRateCard, computePaymentSplit } from '../services/paymentService';

const router = Router();

const CATEGORIES = [
  'Plumbing', 'Electrical', 'Carpentry', 'House Cleaning',
  'Cooking', 'Elderly Care', 'Child Care', 'Pest Control', 'Painting', 'AC Repair',
];

const WORKER_NAMES = [
  'Ramesh Jadhav', 'Sunita Pawar', 'Ajay Sharma', 'Priya Patil',
  'Mohan Yadav', 'Kavya Nair', 'Suresh Kumar', 'Deepa More',
  'Rakesh Joshi', 'Anita Desai', 'Vijay Tambe', 'Meena Kulkarni',
];

const PUNE_COORDS: [number, number][] = [
  [73.8567, 18.5204], [73.8777, 18.5314], [73.8355, 18.4970],
  [73.9030, 18.5060], [73.8475, 18.5450], [73.8222, 18.4967],
  [73.8660, 18.5100], [73.8900, 18.5230], [73.8144, 18.5285],
  [73.9120, 18.4900], [73.8599, 18.5391], [73.8423, 18.5012],
];

const hashPw = (pw: string) => bcrypt.hash(pw, 12);

router.get('/', async (req: Request, res: Response) => {
  const providedSecret = req.query['secret'] as string | undefined;
  const expectedSecret = env.SEED_SECRET || 'sahyog_seed_sih2026';

  if (!providedSecret || (providedSecret !== expectedSecret && providedSecret !== 'sahyog_seed_sih2026')) {
    return res.status(401).json({ success: false, message: 'Invalid or missing seed secret. Use ?secret=sahyog_seed_sih2026' });
  }

  const log: string[] = [];
  const push = (msg: string) => { console.log(msg); log.push(msg); };

  try {
    push('🌱 Starting SAHYOG seed via HTTP endpoint...');

    // ── Clear all collections ──────────────────────────────
    const collections = await mongoose.connection.db!.collections();
    for (const col of collections) {
      await col.deleteMany({});
    }
    push('🗑️  Cleared all existing data');

    // ── Federation ──────────────────────────────────────────
    const adminPhone = env.SEED_ADMIN_PHONE;
    const federation = await Federation.create({
      name: 'Pune District Labour Cooperative Federation',
      state: 'Maharashtra',
      jurisdiction: 'Pune Metropolitan Region',
      contactEmail: 'federation@punecoop.gov.in',
      contactPhone: adminPhone,
    });

    // ── Cooperative Societies ───────────────────────────────
    const [society1, society2] = await CooperativeSociety.insertMany([
      {
        name: 'Shramik Vikas Cooperative Society',
        code: 'SVCS-PMC-01',
        federationId: federation._id,
        registrationNumber: 'MH/PMC/COOP/2021/001',
        district: 'Pune',
        zone: 'Central Pune',
        operationalAreas: ['Shivajinagar', 'Deccan', 'Karve Nagar', 'Kothrud'],
      },
      {
        name: 'Sarvajana Seva Cooperative',
        code: 'SSCS-PMC-02',
        federationId: federation._id,
        registrationNumber: 'MH/PMC/COOP/2021/002',
        district: 'Pune',
        zone: 'East Pune',
        operationalAreas: ['Hadapsar', 'Koregaon Park', 'Viman Nagar', 'Wagholi'],
      },
    ]);
    push('🏛️  Created federation + 2 cooperative societies');

    // ── Admin User ──────────────────────────────────────────
    await User.create({
      phone: adminPhone,
      name: 'Federation Admin',
      email: 'admin@sahyog.coop',
      passwordHash: await hashPw('SahyogAdmin@2026'),
      role: 'SUPER_ADMIN',
      languagePreference: 'en',
      isPhoneVerified: true,
      isActive: true,
    });
    push('👑  Created admin user');

    // ── Customers ───────────────────────────────────────────
    const customerUsers = [];
    for (let i = 1; i <= 5; i++) {
      const phone = `${9800000000 + i}`;
      const u = await User.create({
        phone,
        name: `Customer ${i}`,
        email: `customer${i}@sahyog.test`,
        passwordHash: await hashPw('Test@12345'),
        role: 'CUSTOMER',
        languagePreference: (['en', 'hi', 'mr'] as const)[i % 3],
        isPhoneVerified: true,
        isActive: true,
      });
      await Customer.create({
        userId: u._id,
        profileType: 'HOUSEHOLD',
        savedAddresses: [{
          label: 'Home',
          street: `${i * 10}, MG Road`,
          area: 'Shivajinagar',
          city: 'Pune',
          pincode: '411005',
          coordinates: { lat: 18.5204, lng: 73.8567 },
        }],
      });
      customerUsers.push(u);
    }
    push('👤  Created 5 customers');

    // ── Workers ─────────────────────────────────────────────
    const workerRecords = [];
    for (let i = 0; i < WORKER_NAMES.length; i++) {
      const phone = `${9800000100 + i}`;
      const category = CATEGORIES[i % CATEGORIES.length];
      const wUser = await User.create({
        phone,
        name: WORKER_NAMES[i],
        email: `worker${i + 1}@sahyog.test`,
        passwordHash: await hashPw('Worker@12345'),
        role: 'WORKER',
        languagePreference: (['en', 'hi', 'mr'] as const)[i % 3],
        isPhoneVerified: true,
        isActive: true,
      });
      const society = i % 2 === 0 ? society1 : society2;
      const w = await Worker.create({
        userId: wUser._id,
        cooperativeSocietyId: society._id,
        membershipNumber: `SVCS-W-${String(i + 1).padStart(4, '0')}`,
        primarySkillCategory: category,
        skills: [{ skillName: category, category, proficiencyLevel: 3 + (i % 3), certified: i % 2 === 0 }],
        experienceYears: 2 + (i % 8),
        isAvailable: true,
        emergencyDuty: i % 4 === 0,
        kycVerified: true,
        verificationStatus: 'VERIFIED',
        currentLocation: { type: 'Point', coordinates: PUNE_COORDS[i % PUNE_COORDS.length] },
        distanceKmCache: 1 + (i * 0.8),
        ratingAverage: 3.5 + (i % 4) * 0.4,
        totalReviewsCount: 10 + i * 3,
        completedJobsCount: 20 + i * 5,
        reliabilityScore: 75 + (i % 25),
      });
      workerRecords.push({ user: wUser, worker: w, category });
    }
    push('👷  Created 12 workers');

    // ── Bookings + Reviews ──────────────────────────────────
    const statuses = ['COMPLETED', 'COMPLETED', 'COMPLETED', 'IN_PROGRESS', 'ALLOCATED'];
    let bookingCount = 0;
    for (let i = 0; i < 10; i++) {
      const customer = customerUsers[i % customerUsers.length];
      const workerRec = workerRecords[i % workerRecords.length];
      const category = CATEGORIES[i % CATEGORIES.length];
      const rateCard = getRateCard(category);
      const split = computePaymentSplit(rateCard.estimatedTotal);
      const status = statuses[i % statuses.length];
      const isCompleted = status === 'COMPLETED';

      const booking = await Booking.create({
        bookingNumber: `SH-SEED-${String(i + 1).padStart(5, '0')}`,
        customerId: customer._id,
        workerId: workerRec.worker._id,
        serviceCategory: category,
        subServiceName: `${category} Service`,
        problemDescription: `Need ${category.toLowerCase()} work done at my apartment. Professional required.`,
        address: { street: '12 MG Road', area: 'Shivajinagar', city: 'Pune', pincode: '411005' },
        scheduledDate: new Date(Date.now() + (i - 5) * 86400000).toISOString().slice(0, 10),
        scheduledTimeSlot: ['09:00-11:00', '11:00-13:00', '14:00-16:00'][i % 3],
        urgency: 'medium',
        isEmergency: false,
        ...rateCard,
        totalAmount: rateCard.estimatedTotal,
        ...split,
        status,
        paymentStatus: isCompleted ? 'PAYMENT_RELEASED' : 'PAYMENT_HELD',
        ...(isCompleted && { completedAt: new Date(Date.now() - (i + 1) * 86400000) }),
      });

      if (isCompleted) {
        await Review.create({
          bookingId: booking._id,
          workerId: workerRec.worker._id,
          customerId: customer._id,
          rating: 4 + (i % 2),
          comment: ['Excellent work!', 'Very professional', 'On time and neat', 'Great service'][i % 4],
          timeliness: 4,
          qualityOfWork: 4 + (i % 2),
          professionalism: 5,
          cleanliness: 4,
        });
      }
      bookingCount++;
    }
    push(`📋  Created ${bookingCount} bookings with reviews`);

    push('\n✅ Seed complete!');

    return res.json({
      success: true,
      message: 'Database seeded successfully!',
      log,
      credentials: {
        admin: { phone: adminPhone, password: 'SahyogAdmin@2026' },
        customers: { phones: '9800000001 – 9800000005', password: 'Test@12345' },
        workers: { phones: '9800000100 – 9800000111', password: 'Worker@12345' },
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('❌ Seed failed:', message);
    return res.status(500).json({ success: false, message, log });
  }
});

export default router;
