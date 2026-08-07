import sacramentRepository from '../repositories/sacrament.repository.js';
import AppError from '../utils/AppError.js';
import { sendEmail } from '../utils/email.js';
import { createAuditLog } from '../helpers/auditLogger.js';

class SacramentService {
  async list(queryString) {
    return sacramentRepository.paginate(queryString);
  }

  async getById(id) {
    return sacramentRepository.findById(id);
  }

  async create(data, reqMeta) {
    const request = await sacramentRepository.create(data);

    await sendEmail({
      to: data.email || '',
      subject: 'Sacrament request received',
      template: 'sacramentConfirmation',
      data: {
        name: data.memberName || 'Beloved',
        type: data.type,
        date: data.preferredDate ? new Date(data.preferredDate).toDateString() : null,
      },
    });

    await createAuditLog({
      admin: null,
      action: 'create',
      module: 'sacraments',
      documentId: request._id,
      newData: { type: request.type, memberName: request.memberName, status: request.status },
      ...reqMeta,
    });

    return request;
  }

  async update(id, data, actor, reqMeta) {
    const existing = await sacramentRepository.findByIdOrNull(id);
    if (!existing) throw new AppError('Sacrament request not found', 404);

    const updated = await sacramentRepository.findByIdAndUpdate(id, data);

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'sacraments',
      documentId: id,
      oldData: { type: existing.type, status: existing.status },
      newData: { type: updated.type, status: updated.status },
      ...reqMeta,
    });

    return updated;
  }

  async changeStatus(id, status, assignedPriest, actor, reqMeta) {
    const existing = await sacramentRepository.findByIdOrNull(id);
    if (!existing) throw new AppError('Sacrament request not found', 404);

    const data = { status };
    if (assignedPriest) data.assignedPriest = assignedPriest;

    const updated = await sacramentRepository.findByIdAndUpdate(id, data);

    await createAuditLog({
      admin: actor,
      action: 'status-change',
      module: 'sacraments',
      documentId: id,
      oldData: { status: existing.status },
      newData: { status: updated.status },
      ...reqMeta,
    });

    return updated;
  }

  async assignPriest(id, priestId, actor, reqMeta) {
    return this.changeStatus(id, 'scheduled', priestId, actor, reqMeta);
  }

  async remove(id, actor, reqMeta) {
    const existing = await sacramentRepository.findByIdOrNull(id);
    if (!existing) throw new AppError('Sacrament request not found', 404);

    await sacramentRepository.deleteById(id);

    await createAuditLog({
      admin: actor,
      action: 'delete',
      module: 'sacraments',
      documentId: id,
      oldData: { type: existing.type },
      ...reqMeta,
    });

    return true;
  }
}

export default new SacramentService();
