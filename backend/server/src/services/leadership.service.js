import leadershipRepository from '../repositories/leadership.repository.js';
import AppError from '../utils/AppError.js';
import { uploadMedia, deleteMedia } from '../utils/media.js';
import { CLOUDINARY_FOLDERS } from '../constants/index.js';
import { createAuditLog } from '../helpers/auditLogger.js';

class LeadershipService {
  async list(queryString) {
    return leadershipRepository.paginate(queryString);
  }

  async listActive() {
    return leadershipRepository.find({ isActive: true });
  }

  async getById(id) {
    return leadershipRepository.findById(id);
  }

  async create(data, files = {}, actor, reqMeta) {
    const payload = { ...data, createdBy: actor._id };
    if (files.photo) {
      payload.photo = await uploadMedia(files.photo, { folder: CLOUDINARY_FOLDERS.ABOUT });
    }

    const leader = await leadershipRepository.create(payload);

    await createAuditLog({
      admin: actor,
      action: 'create',
      module: 'leadership',
      documentId: leader._id,
      newData: { name: leader.name, role: leader.role },
      ...reqMeta,
    });

    return leader;
  }

  async update(id, data, files = {}, actor, reqMeta) {
    const existing = await leadershipRepository.findByIdOrNull(id);
    if (!existing) throw new AppError('Leadership member not found', 404);

    const payload = { ...data };
    if (files.photo) {
      const uploaded = await uploadMedia(files.photo, { folder: CLOUDINARY_FOLDERS.ABOUT });
      if (existing.photo?.publicId) await deleteMedia(existing.photo.publicId);
      payload.photo = uploaded;
    }

    const updated = await leadershipRepository.findByIdAndUpdate(id, payload);

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'leadership',
      documentId: id,
      oldData: { name: existing.name },
      newData: { name: updated.name },
      ...reqMeta,
    });

    return updated;
  }

  async remove(id, actor, reqMeta) {
    const existing = await leadershipRepository.findByIdOrNull(id);
    if (!existing) throw new AppError('Leadership member not found', 404);

    if (existing.photo?.publicId) await deleteMedia(existing.photo.publicId);
    await leadershipRepository.deleteById(id);

    await createAuditLog({
      admin: actor,
      action: 'delete',
      module: 'leadership',
      documentId: id,
      oldData: { name: existing.name },
      ...reqMeta,
    });

    return true;
  }
}

export default new LeadershipService();
