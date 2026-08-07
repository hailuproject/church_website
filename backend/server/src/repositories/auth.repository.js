import Admin from '../models/Admin.js';
import RefreshToken from '../models/RefreshToken.js';
import BaseRepository from './base.repository.js';
import AppError from '../utils/AppError.js';

class AuthRepository extends BaseRepository {
  constructor() {
    super(Admin, {
      searchableFields: ['name', 'email'],
      filterWhitelist: ['role', 'isActive', 'isVerified'],
      defaultSort: { createdAt: -1 },
    });
  }

  async findByEmailWithPassword(email) {
    return Admin.findOne({ email: email.toLowerCase() }).select('+password +refreshToken');
  }

  async findByIdWithPrivateFields(id) {
    return Admin.findById(id).select('+password +refreshToken');
  }

  async findByVerificationToken(token) {
    return Admin.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    });
  }

  async findByResetToken(token) {
    return Admin.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });
  }

  async updateLastLogin(id) {
    return Admin.findByIdAndUpdate(id, { lastLogin: new Date() }, { returnDocument: 'after' });
  }

  async createRefreshToken(data) {
    return RefreshToken.create(data);
  }

  async findRefreshToken(tokenHash) {
    return RefreshToken.findOne({
      tokenHash,
      revokedAt: null,
      expiresAt: { $gt: new Date() },
    }).populate('admin');
  }

  async revokeRefreshToken(tokenHash, replacedBy = null) {
    return RefreshToken.findOneAndUpdate(
      { tokenHash },
      { revokedAt: new Date(), replacedBy },
      { returnDocument: 'after' }
    );
  }

  async revokeAllForAdmin(adminId) {
    return RefreshToken.updateMany(
      { admin: adminId, revokedAt: null },
      { revokedAt: new Date() }
    );
  }

  async cleanupExpiredTokens() {
    const result = await RefreshToken.deleteMany({
      $or: [{ expiresAt: { $lt: new Date() } }, { revokedAt: { $ne: null } }],
    });
    return result.deletedCount;
  }

  async getByIdOrThrow(id) {
    const admin = await Admin.findById(id);
    if (!admin) throw new AppError('Admin not found', 404);
    return admin;
  }
}

export default new AuthRepository();
