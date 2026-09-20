import request from 'supertest';
import app from '../app';
import { computePaymentSplit, getRateCard } from '../services/paymentService';
import { computeAllocationScores, WorkerCandidate } from '../services/allocationEngine';
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from '../services/jwtService';

describe('SAHYOG Production Core & SIH Verification Test Suite', () => {

  // ── 1. 80/10/5/5 Cooperative Revenue Split Architecture ──────
  describe('Cooperative Revenue Split Architecture (80/10/5/5)', () => {
    it('accurately distributes 80% worker earnings, 10% welfare, 5% society, 5% operations', () => {
      const totalAmount = 1000;
      const split = computePaymentSplit(totalAmount);

      expect(split.workerEarnings).toBe(800);
      expect(split.welfareContribution).toBe(100);
      expect(split.cooperativeFund).toBe(50);
      expect(split.platformOperations).toBe(50);
      expect(
        split.workerEarnings +
        split.welfareContribution +
        split.cooperativeFund +
        split.platformOperations
      ).toBe(totalAmount);
    });

    it('handles non-round amounts cleanly with integer rounding', () => {
      const split = computePaymentSplit(555);
      expect(split.workerEarnings).toBe(Math.round(555 * 0.80));
      expect(split.welfareContribution).toBe(Math.round(555 * 0.10));
      expect(split.cooperativeFund).toBe(Math.round(555 * 0.05));
      expect(split.platformOperations).toBe(Math.round(555 * 0.05));
    });
  });

  // ── 2. Standardized Transparent Rate Cards ────────────────────
  describe('Transparent Cooperative Rate Cards', () => {
    it('calculates standard rate card for Plumbing', () => {
      const rate = getRateCard('Plumbing', 150);
      expect(rate.baseServiceCharge).toBe(200);
      expect(rate.labourCharge).toBe(300);
      expect(rate.materialCharge).toBe(150);
      expect(rate.travelCharge).toBe(50);
      expect(rate.estimatedTotal).toBe(200 + 300 + 150 + 50);
    });

    it('calculates standard rate card for Electrical', () => {
      const rate = getRateCard('Electrical', 0);
      expect(rate.baseServiceCharge).toBe(250);
      expect(rate.labourCharge).toBe(350);
      expect(rate.travelCharge).toBe(50);
      expect(rate.estimatedTotal).toBe(650);
    });

    it('falls back gracefully to default rate card for unknown category', () => {
      const rate = getRateCard('CustomCraft', 100);
      expect(rate.estimatedTotal).toBe(250 + 250 + 100 + 50);
    });
  });

  // ── 3. Fair-Gig Democratic Allocation Engine ──────────────────
  describe('Fair-Gig Democratic Allocation Engine', () => {
    const sampleCandidates: WorkerCandidate[] = [
      {
        workerId: 'W1',
        name: 'Ramesh Jadhav',
        ratingAverage: 4.8,
        distanceKm: 2.1,
        todayJobCount: 1,
        weeklyWorkloadHours: 12,
        reliabilityScore: 96,
        primarySkillCategory: 'Plumbing',
        skills: ['Plumbing', 'Pipe Fitting'],
        isAvailable: true,
        kycVerified: true,
      },
      {
        workerId: 'W2',
        name: 'Suresh More',
        ratingAverage: 4.9,
        distanceKm: 18.5,
        todayJobCount: 5, // high workload penalty
        weeklyWorkloadHours: 42,
        reliabilityScore: 90,
        primarySkillCategory: 'Plumbing',
        skills: ['Plumbing'],
        isAvailable: true,
        kycVerified: true,
      },
      {
        workerId: 'W3',
        name: 'Unavailable Worker',
        ratingAverage: 5.0,
        distanceKm: 1.0,
        todayJobCount: 0,
        weeklyWorkloadHours: 0,
        reliabilityScore: 100,
        primarySkillCategory: 'Plumbing',
        skills: ['Plumbing'],
        isAvailable: false, // filtered out
        kycVerified: true,
      },
    ];

    it('prioritizes lower workload and closer proximity to prevent wage concentration', () => {
      const scores = computeAllocationScores(sampleCandidates, 'Plumbing');
      expect(scores.length).toBe(2); // W3 filtered out
      expect(scores[0].workerId).toBe('W1');
      expect(scores[0].totalScore).toBeGreaterThan(scores[1].totalScore);
      expect(scores[0].explanation).toContain('2.1 km away');
    });

    it('generates transparent breakdown for all 5 algorithmic dimensions', () => {
      const scores = computeAllocationScores(sampleCandidates, 'Plumbing');
      const breakdown = scores[0].breakdown;
      expect(breakdown).toHaveProperty('ratingScore');
      expect(breakdown).toHaveProperty('proximityScore');
      expect(breakdown).toHaveProperty('workloadScore');
      expect(breakdown).toHaveProperty('reliabilityScore');
      expect(breakdown).toHaveProperty('skillMatchScore');
    });
  });

  // ── 4. JWT Cryptographic Token Engine ────────────────────────
  describe('JWT Cryptographic Token Engine', () => {
    const mockPayload = {
      sub: '64b0f9f3e4b0a1a2b3c4d5e6',
      role: 'SUPER_ADMIN',
    };

    it('generates verifiable access tokens with role payload', () => {
      const token = generateAccessToken(mockPayload);
      expect(typeof token).toBe('string');

      const decoded = verifyAccessToken(token);
      expect(decoded.sub).toBe(mockPayload.sub);
      expect(decoded.role).toBe(mockPayload.role);
    });

    it('generates refresh tokens with valid expiration signature', () => {
      const rToken = generateRefreshToken(mockPayload);
      const decoded = verifyRefreshToken(rToken);
      expect(decoded.sub).toBe(mockPayload.sub);
      expect(decoded.role).toBe(mockPayload.role);
    });
  });

  // ── 5. Express HTTP Server Integration & Security Guard ──────
  describe('Express HTTP API Integration & Healthcheck', () => {
    it('GET /health returns healthy service status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.service).toBe('SAHYOG API');
    });

    it('GET /api/workers/rate-card blocks unauthenticated access with 401', async () => {
      const res = await request(app).get('/api/workers/rate-card?category=Plumbing');
      expect(res.status).toBe(401);
    });

    it('GET /api/admin/summary blocks unauthenticated access with 401', async () => {
      const res = await request(app).get('/api/admin/summary');
      expect(res.status).toBe(401);
    });

    it('POST /api/auth/otp/send validates missing phone number with 400', async () => {
      const res = await request(app).post('/api/auth/otp/send').send({});
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('GET /api/workers/verify/:membershipId is publicly accessible (does not 401)', async () => {
      const res = await request(app).get('/api/workers/verify/NONEXISTENT_ID');
      // Should not be 401 unauthenticated; should return 404 or 500 (if db offline)
      expect(res.status).not.toBe(401);
    });
  });

});
