import { Router } from 'express';
import { sendOtpHandler, registerHandler, loginHandler, refreshTokenHandler } from '../controllers/authController';

const router = Router();

router.post('/otp/send', sendOtpHandler);
router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/refresh', refreshTokenHandler);

export default router;
