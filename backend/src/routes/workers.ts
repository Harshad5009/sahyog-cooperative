import { Router } from 'express';
import {
  getWorkerProfile,
  updateWorkerAvailability,
  updateWorkerLocation,
  getNearbyWorkers,
  getRateCardHandler,
  verifyWorkerPassport,
} from '../controllers/workerController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Public verification route (accessible by scanning QR on worker badge)
router.get('/verify/:membershipId', verifyWorkerPassport);

router.use(authenticate);

router.get('/rate-card', getRateCardHandler);                           // any auth
router.get('/nearby', getNearbyWorkers);                                // any auth
router.get('/me', authorize('WORKER'), getWorkerProfile);
router.patch('/me/availability', authorize('WORKER'), updateWorkerAvailability);
router.patch('/me/location', authorize('WORKER'), updateWorkerLocation);

export default router;
