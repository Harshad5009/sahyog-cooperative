import { Router } from 'express';
import {
  getMyBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  submitReview,
} from '../controllers/bookingController';
import { authenticate, authorize } from '../middleware/auth';
import {
  createChangeRequest,
  respondToChangeRequest,
  getChangeRequests,
} from '../controllers/changeRequestController';

const router = Router();

router.use(authenticate);

// Bookings
router.get('/', getMyBookings);
router.get('/my-bookings', getMyBookings);
router.get('/:id', getBookingById);
router.post('/', authorize('CUSTOMER'), createBooking);
router.patch('/:id/status', updateBookingStatus);
router.post('/:id/review', authorize('CUSTOMER'), submitReview);

// Change Requests (no unilateral price increase)
router.post('/:bookingId/change-requests', authorize('WORKER'), createChangeRequest);
router.patch('/change-requests/:crId/respond', authorize('CUSTOMER'), respondToChangeRequest);
router.get('/:bookingId/change-requests', getChangeRequests);

export default router;
