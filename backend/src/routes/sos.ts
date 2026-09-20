import { Router } from 'express';
import { triggerSos, resolveAlert, getActiveAlerts } from '../controllers/sosController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.post('/', authorize('WORKER'), triggerSos);
router.get('/active', authorize('SOCIETY_ADMIN','FEDERATION_ADMIN','SUPER_ADMIN'), getActiveAlerts);
router.patch('/:id/resolve', authorize('SOCIETY_ADMIN','FEDERATION_ADMIN','SUPER_ADMIN'), resolveAlert);

export default router;
