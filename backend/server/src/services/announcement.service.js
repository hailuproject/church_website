import announcementRepository from '../repositories/announcement.repository.js';
import AppError from '../utils/AppError.js';
import { createAuditLog } from '../helpers/auditLogger.js';
import { emitToPublic } from '../sockets/index.js';

class AnnouncementService {
  async list(queryString) {
    return announcementRepository.paginate(queryString);
  }

  async getById(id) {
    return announcementRepository.findById(id);
  }

  async create(data, actor, reqMeta) {
    const announcement = await announcementRepository.create({ ...data, createdBy: actor._id });

    await createAuditLog({
      admin: actor,
      action: 'create',
      module: 'announcements',
      documentId: announcement._id,
      newData: { title: announcement.title },
      ...reqMeta,
    });

    emitToPublic('announcement:changed', { action: 'create', id: announcement._id });

    return announcement;
  }

  async update(id, data, actor, reqMeta) {
    const existing = await announcementRepository.findByIdOrNull(id);
    if (!existing) throw new AppError('Announcement not found', 404);

    const updated = await announcementRepository.findByIdAndUpdate(id, data);

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'announcements',
      documentId: id,
      oldData: { title: existing.title },
      newData: { title: updated.title },
      ...reqMeta,
    });

    emitToPublic('announcement:changed', { action: 'update', id });

    return updated;
  }

  async remove(id, actor, reqMeta) {
    const existing = await announcementRepository.findByIdOrNull(id);
    if (!existing) throw new AppError('Announcement not found', 404);

    await announcementRepository.deleteById(id);

    await createAuditLog({
      admin: actor,
      action: 'delete',
      module: 'announcements',
      documentId: id,
      oldData: { title: existing.title },
      ...reqMeta,
    });

    emitToPublic('announcement:changed', { action: 'delete', id });

    return true;
  }

  async togglePublish(id, isPublished, actor, reqMeta) {
    return this.update(id, { isPublished }, actor, reqMeta);
  }

  async getActive() {
    return announcementRepository.findActive();
  }
}

export default new AnnouncementService();
