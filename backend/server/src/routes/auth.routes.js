import { Router } from 'express';
import {
  register,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyEmail,
  resendVerification,
  me,
  updateProfile,
  uploadAvatar,
} from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { upload } from '../middlewares/upload.js';
import { MEDIA_TYPES } from '../constants/index.js';
import {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  changePasswordValidation,
  resendVerificationValidation,
  updateProfileValidation,
} from '../validators/auth.validators.js';
import { authLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.post('/register', authLimiter, authenticate, validate(registerValidation), register);
router.post('/login', authLimiter, validate(loginValidation), login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.post('/forgot-password', authLimiter, validate(forgotPasswordValidation), forgotPassword);
router.post('/reset-password/:token', authLimiter, validate(resetPasswordValidation), resetPassword);
router.post('/change-password', authenticate, validate(changePasswordValidation), changePassword);
router.post('/verify-email/:token', verifyEmail);
router.post('/resend-verification', authLimiter, validate(resendVerificationValidation), resendVerification);
router.get('/me', authenticate, me);
router.patch('/profile', authenticate, validate(updateProfileValidation), updateProfile);
router.post('/avatar', authenticate, upload([MEDIA_TYPES.IMAGE], { fieldName: 'avatar' }), uploadAvatar);

export default router;
