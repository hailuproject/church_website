import membershipRepository from '../repositories/membership.repository.js';
import AppError from '../utils/AppError.js';
import { uploadMedia, deleteMedia } from '../utils/media.js';
import { CLOUDINARY_FOLDERS, MEMBERSHIP_STATUSES } from '../constants/index.js';
import { sendEmail } from '../utils/email.js';
import { createAuditLog } from '../helpers/auditLogger.js';

class MembershipService {
  async list(queryString) {
    return membershipRepository.paginate(queryString);
  }

  async getById(id) {
    return membershipRepository.findById(id);
  }

  async create(data, files = {}, reqMeta) {
    const payload = { ...data };

    if (files.documents) {
      const docs = Array.isArray(files.documents) ? files.documents : [files.documents];
      const uploadedDocs = [];
      for (const doc of docs) {
        const uploaded = await uploadMedia(doc, { folder: CLOUDINARY_FOLDERS.MEMBERSHIP_DOCUMENTS });
        uploadedDocs.push(uploaded);
      }
      payload.documents = uploadedDocs;
    }

    if (reqMeta?.actorId) payload.createdBy = reqMeta.actorId;

    const member = await membershipRepository.create(payload);

    await sendEmail({
      to: member.email || '',
      subject: 'Membership application received',
      template: 'membershipConfirmation',
      data: { name: member.fullName },
    });

    await createAuditLog({
      admin: reqMeta?.actorId || null,
      action: 'create',
      module: 'membership',
      documentId: member._id,
      newData: { fullName: member.fullName, status: member.status },
      ipAddress: reqMeta?.ipAddress,
      userAgent: reqMeta?.userAgent,
    });

    return member;
  }

  async update(id, data, files = {}, actor, reqMeta) {
    const existing = await membershipRepository.findByIdOrNull(id);
    if (!existing) throw new AppError('Member not found', 404);

    const payload = { ...data };
    if (files.documents) {
      const docs = Array.isArray(files.documents) ? files.documents : [files.documents];
      const uploadedDocs = [];
      for (const doc of docs) {
        const uploaded = await uploadMedia(doc, { folder: CLOUDINARY_FOLDERS.MEMBERSHIP_DOCUMENTS });
        uploadedDocs.push(uploaded);
      }
      payload.documents = [...(existing.documents || []), ...uploadedDocs];
    }

    const updated = await membershipRepository.findByIdAndUpdate(id, payload);

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'membership',
      documentId: id,
      oldData: { fullName: existing.fullName },
      newData: { fullName: updated.fullName },
      ...reqMeta,
    });

    return updated;
  }

  async changeStatus(id, status, actor, reqMeta) {
    const existing = await membershipRepository.findByIdOrNull(id);
    if (!existing) throw new AppError('Member not found', 404);
    if (!MEMBERSHIP_STATUSES.includes(status)) throw new AppError(`status must be one of: ${MEMBERSHIP_STATUSES.join(', ')}`, 400);

    const updated = await membershipRepository.findByIdAndUpdate(id, { status });

    await createAuditLog({
      admin: actor,
      action: status === 'approved' ? 'approve' : status === 'rejected' ? 'reject' : 'status-change',
      module: 'membership',
      documentId: id,
      oldData: { status: existing.status },
      newData: { status },
      ...reqMeta,
    });

    return updated;
  }

  async remove(id, actor, reqMeta) {
    const existing = await membershipRepository.findByIdOrNull(id);
    if (!existing) throw new AppError('Member not found', 404);

    const deletions = (existing.documents || [])
      .filter((doc) => doc.publicId)
      .map((doc) => deleteMedia(doc.publicId, 'raw'));
    await Promise.all(deletions);

    await membershipRepository.deleteById(id);

    await createAuditLog({
      admin: actor,
      action: 'delete',
      module: 'membership',
      documentId: id,
      oldData: { fullName: existing.fullName },
      ...reqMeta,
    });

    return true;
  }
}

export default new MembershipService();
