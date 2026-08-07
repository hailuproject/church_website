import authService from '../services/auth.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import { setAuthCookies, clearAuthCookies } from '../utils/cookies.js';
import AppError from '../utils/AppError.js';

const getRequestMeta = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get('user-agent') || '',
});

const getRefreshTokenFromRequest = (req) => req.cookies?.church_refresh_token || null;

export const register = asyncHandler(async (req, res) => {
  const admin = await authService.register(req.body, req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Admin registered successfully', data: admin });
});

export const login = asyncHandler(async (req, res) => {
  const session = await authService.login(req.body, getRequestMeta(req));
  setAuthCookies(res, session.tokens);
  sendSuccess(res, { message: 'Login successful', data: { user: session.user, tokenTtl: session.tokenTtl } });
});

export const refresh = asyncHandler(async (req, res) => {
  const refreshToken = getRefreshTokenFromRequest(req);
  if (!refreshToken) throw new AppError('Refresh token missing', 401);
  const session = await authService.refresh(refreshToken, getRequestMeta(req));
  setAuthCookies(res, session.tokens);
  sendSuccess(res, { message: 'Token refreshed', data: { user: session.user, tokenTtl: session.tokenTtl } });
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = getRefreshTokenFromRequest(req);
  await authService.logout(refreshToken, getRequestMeta(req));
  clearAuthCookies(res);
  sendSuccess(res, { message: 'Logged out successfully' });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body, getRequestMeta(req));
  sendSuccess(res, {
    message: 'If an account exists for that email, a password reset link has been sent.',
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  await authService.resetPassword(req.params.token, req.body.password, getRequestMeta(req));
  sendSuccess(res, { message: 'Password reset successfully. You can now log in.' });
});

export const changePassword = asyncHandler(async (req, res) => {
  await authService.changePassword(req.admin, req.body, getRequestMeta(req));
  sendSuccess(res, { message: 'Password changed successfully' });
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const user = await authService.verifyEmail(req.params.token, getRequestMeta(req));
  sendSuccess(res, { message: 'Email verified successfully', data: user });
});

export const resendVerification = asyncHandler(async (req, res) => {
  await authService.resendVerification(req.body);
  sendSuccess(res, { message: 'Verification email sent' });
});

export const me = asyncHandler(async (req, res) => {
  sendSuccess(res, { message: 'Profile retrieved', data: req.admin.toSafeObject() });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.updateProfile(req.admin._id, req.body);
  sendSuccess(res, { message: 'Profile updated', data: user.toSafeObject() });
});

export const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError('Please upload an image file', 400);
  const user = await authService.uploadAvatar(req.admin._id, req.file);
  sendSuccess(res, { message: 'Avatar uploaded', data: user });
});

export default {
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
};
