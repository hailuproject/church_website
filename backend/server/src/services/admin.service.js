import adminRepository from '../repositories/admin.repository.js';
import authRepository from '../repositories/auth.repository.js';
import AppError from '../utils/AppError.js';
import { generateRandomToken, hashToken } from '../utils/tokens.js';
import { sendEmail } from '../utils/email.js';
import { uploadMedia, deleteMedia } from '../utils/media.js';
import { CLOUDINARY_FOLDERS, ROLES } from '../constants/index.js';
import { createAuditLog } from '../helpers/auditLogger.js';

class AdminService {
  async list(queryString) {
    const result = await adminRepository.paginate(queryString);
    return {
      data: result.data.map((admin) => admin.toSafeObject()),
      pagination: result.pagination,
    };
  }

  async getById(id) {
    const admin = await adminRepository.getSafeById(id);
    if (!admin) throw new AppError('User not found', 404);
    return admin.toSafeObject();
  }

  async create(data, creator, reqMeta) {
    if (data.role === ROLES.SUPER_ADMIN && creator.role !== ROLES.SUPER_ADMIN) {
      throw new AppError('Only a Super Admin can create another Super Admin', 403);
    }

    const existing = await adminRepository.findByEmail(data.email);
    if (existing) throw new AppError('An account with this email already exists', 409);

    const admin = await adminRepository.create({
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      password: data.password,
      role: data.role || ROLES.ADMIN,
      createdBy: creator._id,
      isVerified: true,
    });

    await createAuditLog({
      admin: creator,
      action: 'create',
      module: 'users',
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

  async update(id, data, actor, reqMeta) {
    const target = await adminRepository.getSafeById(id);
    if (!target) throw new AppError('User not found', 404);

    if (target.role === ROLES.SUPER_ADMIN && actor._id.toString() !== target._id.toString() && actor.role !== ROLES.SUPER_ADMIN) {
      throw new AppError('You cannot modify a Super Admin account', 403);
    }
    if (data.role === ROLES.SUPER_ADMIN && actor.role !== ROLES.SUPER_ADMIN) {
      throw new AppError('Only a Super Admin can assign the Super Admin role', 403);
    }
    if (target.role === ROLES.SUPER_ADMIN && data.isActive === false && actor._id.toString() !== target._id.toString()) {
      const superAdmins = await adminRepository.count({ role: ROLES.SUPER_ADMIN, isActive: true });
      if (superAdmins <= 1) throw new AppError('Cannot deactivate the last active Super Admin', 400);
    }

    const update = {};
    if (data.name) update.name = data.name;
    if (data.phone !== undefined) update.phone = data.phone;
    if (data.role) update.role = data.role;
    if (typeof data.isActive === 'boolean') update.isActive = data.isActive;
    if (typeof data.isVerified === 'boolean') update.isVerified = data.isVerified;

    const updated = await adminRepository.findByIdAndUpdate(id, update);

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'users',
      documentId: id,
      oldData: target.toSafeObject(),
      newData: update,
      ...reqMeta,
    });

    if (typeof data.isActive === 'boolean' && data.isActive === false) {
      await authRepository.revokeAllForAdmin(id);
    }

    return updated.toSafeObject();
  }

  async remove(id, actor, reqMeta) {
    const target = await adminRepository.getSafeById(id);
    if (!target) throw new AppError('User not found', 404);
    if (actor._id.toString() === id) throw new AppError('You cannot delete your own account', 400);
    if (target.role === ROLES.SUPER_ADMIN) throw new AppError('Cannot delete a Super Admin account', 403);

    await authRepository.revokeAllForAdmin(id);
    const deleted = await adminRepository.deleteById(id);

    await createAuditLog({
      admin: actor,
      action: 'delete',
      module: 'users',
      documentId: id,
      oldData: target.toSafeObject(),
      ...reqMeta,
    });

    return deleted;
  }

  async changeRole(id, role, actor, reqMeta) {
    return this.update(id, { role }, actor, reqMeta);
  }

  async toggleStatus(id, isActive, actor, reqMeta) {
    return this.update(id, { isActive }, actor, reqMeta);
  }

  async uploadAvatar(id, file, actor, reqMeta) {
    const target = await adminRepository.getSafeById(id);
    if (!target) throw new AppError('User not found', 404);

    const uploaded = await uploadMedia(file, { folder: CLOUDINARY_FOLDERS.AVATARS });
    if (target.avatar?.publicId) {
      await deleteMedia(target.avatar.publicId);
    }

    target.avatar = { url: uploaded.url, publicId: uploaded.publicId };
    await target.save();

    await createAuditLog({
      admin: actor,
      action: 'upload',
      module: 'users',
      documentId: id,
      newData: { avatar: uploaded.url },
      ...reqMeta,
    });

    return target.toSafeObject();
  }
}

export default new AdminService();
