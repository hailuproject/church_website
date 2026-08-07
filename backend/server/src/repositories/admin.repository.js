import Admin from '../models/Admin.js';
import BaseRepository from './base.repository.js';

class AdminRepository extends BaseRepository {
  constructor() {
    super(Admin, {
      searchableFields: ['name', 'email'],
      filterWhitelist: ['role', 'isActive', 'isVerified'],
      defaultSort: { createdAt: -1 },
    });
  }

  async findByEmail(email) {
    return Admin.findOne({ email: email.toLowerCase() });
  }

  async getSafeById(id) {
    return Admin.findById(id).select('-password -refreshToken -verificationToken -verificationTokenExpires -resetPasswordToken -resetPasswordExpires');
  }
}

export default new AdminRepository();
