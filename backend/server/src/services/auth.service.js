import config from '../config/index.js';
import authRepository from '../repositories/auth.repository.js';
import AppError from '../utils/AppError.js';
import { generateTokenPair, verifyRefreshToken } from '../utils/jwt.js';
import { generateRandomToken, hashToken } from '../utils/tokens.js';
import { sendEmail } from '../utils/email.js';
import { uploadMedia, deleteMedia } from '../utils/media.js';
import { CLOUDINARY_FOLDERS } from '../constants/index.js';
import { createAuditLog } from '../helpers/auditLogger.js';

const ACCESS_TOKEN_LIFETIME = config.jwt.accessExpire;
const REFRESH_TOKEN_LIFETIME = config.jwt.refreshExpire;

const buildSession = (admin, { userAgent, ipAddress }) => {
  const tokens = generateTokenPair(admin);
  return {
    tokens,
    tokenTtl: {
      accessToken: ACCESS_TOKEN_LIFETIME,
      refreshToken: REFRESH_TOKEN_LIFETIME,
    },
    user: admin.toSafeObject(),
    requestMeta: { userAgent, ipAddress },
  };
};

const persistRefreshToken = async (admin, token, { userAgent, ipAddress }) => {
  const expiresAt = new Date();
  expiresAt.setTime(expiresAt.getTime() + config.jwt.refreshCookieMaxAgeMs);
  await authRepository.createRefreshToken({
    tokenHash: hashToken(token),
    admin: admin._id,
    userAgent,
    ipAddress,
    expiresAt,
  });
};

class AuthService {
  async register({ name, email, phone, password, role }, creator, reqMeta) {
    const existing = await authRepository.findByEmail(email);
    if (existing) throw new AppError('An account with this email already exists', 409);

    const admin = await authRepository.create({
      name,
      email,
      phone,
      password,
      role,
      createdBy: creator?._id || null,
      isVerified: true,
    });

    await createAuditLog({
      admin: creator,
      action: 'register',
      module: 'auth',
      documentId: admin._id,
      newData: { name: admin.name, email: admin.email, role: admin.role },
      ...reqMeta,
    });

    await sendEmail({
      to: admin.email,
      subject: 'Your church admin account',
      template: 'welcome',
      data: { name: admin.name, email: admin.email },
    });

    return admin.toSafeObject();
  }

  async login({ email, password }, reqMeta) {
    const admin = await authRepository.findByEmailWithPassword(email);
    if (!admin) throw new AppError('Invalid email or password', 401);
    if (!admin.isActive) throw new AppError('Your account has been deactivated', 403);
    if (!admin.isVerified) throw new AppError('Please verify your email address before logging in', 403);

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) throw new AppError('Invalid email or password', 401);

    const session = buildSession(admin, reqMeta);
    await persistRefreshToken(admin, session.tokens.refreshToken, reqMeta);
    await authRepository.updateLastLogin(admin._id);

    await createAuditLog({
      admin,
      action: 'login',
      module: 'auth',
      documentId: admin._id,
      newData: { email: admin.email },
      ...reqMeta,
    });

    return session;
  }

  async refresh(refreshToken, reqMeta) {
    if (!refreshToken) throw new AppError('No refresh token provided', 401);

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new AppError('Invalid or expired refresh token', 401);
    }

    const tokenHash = hashToken(refreshToken);
    const stored = await authRepository.findRefreshToken(tokenHash);
    if (!stored) throw new AppError('Refresh token has been revoked or is invalid', 401);

    const admin = stored.admin;
    if (!admin || !admin.isActive) throw new AppError('Account is no longer active', 401);

    await authRepository.revokeRefreshToken(tokenHash);

    const tokens = generateTokenPair(admin);
    await persistRefreshToken(admin, tokens.refreshToken, reqMeta);
    await authRepository.updateLastLogin(admin._id);

    await createAuditLog({
      admin,
      action: 'login',
      module: 'auth',
      documentId: admin._id,
      newData: { event: 'token_refresh' },
      ...reqMeta,
    });

    return {
      tokens,
      tokenTtl: {
        accessToken: ACCESS_TOKEN_LIFETIME,
        refreshToken: REFRESH_TOKEN_LIFETIME,
      },
      user: admin.toSafeObject(),
    };
  }

  async logout(refreshToken, reqMeta) {
    if (refreshToken) {
      const tokenHash = hashToken(refreshToken);
      const stored = await authRepository.findRefreshToken(tokenHash);
      await authRepository.revokeRefreshToken(tokenHash);
      if (stored?.admin) {
        await createAuditLog({
          admin: stored.admin._id,
          action: 'logout',
          module: 'auth',
          documentId: stored.admin._id,
          ...reqMeta,
        });
      }
    }
    return true;
  }

  async forgotPassword({ email }, reqMeta) {
    const admin = await authRepository.findByEmail(email);
    if (!admin) return true;

    const resetToken = generateRandomToken();
    admin.resetPasswordToken = hashToken(resetToken);
    admin.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
    await admin.save();

    await createAuditLog({
      admin,
      action: 'send',
      module: 'auth',
      documentId: admin._id,
      newData: { event: 'forgot_password' },
      ...reqMeta,
    });

    await sendEmail({
      to: admin.email,
      subject: 'Reset your password',
      template: 'forgotPassword',
      data: { name: admin.name, token: resetToken },
    });

    return true;
  }

  async resetPassword(token, newPassword, reqMeta) {
    const admin = await authRepository.findByResetToken(hashToken(token));
    if (!admin) throw new AppError('Invalid or expired reset token', 400);

    admin.password = newPassword;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;
    await admin.save();
    await authRepository.revokeAllForAdmin(admin._id);

    await createAuditLog({
      admin,
      action: 'reset-password',
      module: 'auth',
      documentId: admin._id,
      ...reqMeta,
    });

    return true;
  }

  async changePassword(admin, { currentPassword, newPassword }, reqMeta) {
    const fullAdmin = await authRepository.findByIdWithPrivateFields(admin._id);
    const isMatch = await fullAdmin.comparePassword(currentPassword);
    if (!isMatch) throw new AppError('Current password is incorrect', 400);

    fullAdmin.password = newPassword;
    await fullAdmin.save();
    await authRepository.revokeAllForAdmin(admin._id);

    await createAuditLog({
      admin,
      action: 'reset-password',
      module: 'auth',
      documentId: admin._id,
      newData: { event: 'change_password' },
      ...reqMeta,
    });

    return true;
  }

  async verifyEmail(token, reqMeta) {
    const admin = await authRepository.findByVerificationToken(hashToken(token));
    if (!admin) throw new AppError('Invalid or expired verification token', 400);

    admin.isVerified = true;
    admin.verificationToken = undefined;
    admin.verificationTokenExpires = undefined;
    await admin.save();

    await createAuditLog({
      admin,
      action: 'verify-email',
      module: 'auth',
      documentId: admin._id,
      ...reqMeta,
    });

    return admin.toSafeObject();
  }

  async resendVerification({ email }) {
    const admin = await authRepository.findByEmail(email);
    if (!admin) throw new AppError('No account found with this email', 404);
    if (admin.isVerified) throw new AppError('Email is already verified', 400);

    const verificationToken = generateRandomToken();
    admin.verificationToken = hashToken(verificationToken);
    admin.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await admin.save();

    await sendEmail({
      to: admin.email,
      subject: 'Verify your email address',
      template: 'verification',
      data: { name: admin.name, token: verificationToken },
    });

    return true;
  }

  async updateProfile(adminId, data) {
    const updatableFields = ['name', 'phone'];
    const update = {};
    for (const field of updatableFields) {
      if (data[field] !== undefined && data[field] !== null && data[field] !== '') {
        update[field] = data[field];
      }
    }
    return authRepository.findByIdAndUpdate(adminId, update);
  }

  async uploadAvatar(adminId, file) {
    const admin = await authRepository.getByIdOrThrow(adminId);
    const uploaded = await uploadMedia(file, { folder: CLOUDINARY_FOLDERS.AVATARS });

    if (admin.avatar?.publicId) {
      await deleteMedia(admin.avatar.publicId);
    }

    admin.avatar = {
      url: uploaded.url,
      publicId: uploaded.publicId,
    };
    await admin.save();
    return admin.toSafeObject();
  }
}

export default new AuthService();
