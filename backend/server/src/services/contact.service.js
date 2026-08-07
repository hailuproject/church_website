import contactRepository, { prayerRequestRepository } from '../repositories/contact.repository.js';
import AppError from '../utils/AppError.js';
import { sendEmail } from '../utils/email.js';
import { createAuditLog } from '../helpers/auditLogger.js';

class ContactService {
  async listMessages(queryString) {
    return contactRepository.paginate(queryString);
  }

  async getMessage(id) {
    return contactRepository.findById(id);
  }

  async submitContact(data, reqMeta) {
    const message = await contactRepository.create(data);

    await sendEmail({
      to: data.email,
      subject: 'We received your message',
      template: 'contactAutoReply',
      data: { name: data.name, subject: data.subject },
    });

    await createAuditLog({
      admin: null,
      action: 'create',
      module: 'contact',
      documentId: message._id,
      newData: { name: message.name, subject: message.subject, category: message.category },
      ipAddress: reqMeta?.ipAddress,
      userAgent: reqMeta?.userAgent,
    });

    return message;
  }

  async markRead(id, actor, reqMeta) {
    const message = await contactRepository.markRead(id);
    if (!message) throw new AppError('Message not found', 404);

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'contact',
      documentId: id,
      newData: { isRead: true },
      ...reqMeta,
    });

    return message;
  }

  async markAllRead(actor, reqMeta) {
    const result = await contactRepository.markAllRead();
    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'contact',
      newData: { event: 'mark_all_read' },
      ...reqMeta,
    });
    return result;
  }

  async reply(id, data, actor, reqMeta) {
    const message = await contactRepository.findByIdOrNull(id);
    if (!message) throw new AppError('Message not found', 404);
    if (!message.email) throw new AppError('This message has no reply email', 400);

    await sendEmail({
      to: message.email,
      subject: `Re: ${message.subject || 'Your message to the church'}`,
      html: `<div style="font-family:Arial, sans-serif; line-height:1.6;">
        <p>Dear <strong>${message.name}</strong>,</p>
        <div style="border-left: 4px solid #8B6F47; padding-left: 16px; margin: 16px 0; color:#555;">
          ${data.reply.replace(/\n/g, '<br/>')}
        </div>
        <p>May God bless you. እግዚአብሔር ይባርክህ።</p>
      </div>`,
    });

    const updated = await contactRepository.reply(id, data.reply, message.email);

    await createAuditLog({
      admin: actor,
      action: 'send',
      module: 'contact',
      documentId: id,
      newData: { replied: true, reply: data.reply },
      ...reqMeta,
    });

    return updated;
  }

  async remove(id, actor, reqMeta) {
    const message = await contactRepository.findByIdOrNull(id);
    if (!message) throw new AppError('Message not found', 404);

    await contactRepository.deleteById(id);

    await createAuditLog({
      admin: actor,
      action: 'delete',
      module: 'contact',
      documentId: id,
      oldData: { subject: message.subject },
      ...reqMeta,
    });

    return true;
  }

  async createPrayerRequest(data, reqMeta) {
    const prayer = await contactRepository.createPrayerRequest(data);
    await createAuditLog({
      admin: null,
      action: 'create',
      module: 'prayers',
      documentId: prayer._id,
      newData: { prayerType: prayer.prayerType },
      ipAddress: reqMeta?.ipAddress,
      userAgent: reqMeta?.userAgent,
    });
    return prayer;
  }

  async listPrayerRequests(queryString) {
    return prayerRequestRepository.paginate(queryString);
  }

  async getPrayerRequest(id) {
    return prayerRequestRepository.findById(id);
  }

  async updatePrayerRequest(id, data, actor, reqMeta) {
    const existing = await prayerRequestRepository.findByIdOrNull(id);
    if (!existing) throw new AppError('Prayer request not found', 404);

    const updated = await prayerRequestRepository.findByIdAndUpdate(id, data);

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'prayers',
      documentId: id,
      oldData: { status: existing.status },
      newData: { status: updated.status },
      ...reqMeta,
    });

    return updated;
  }

  async removePrayerRequest(id, actor, reqMeta) {
    const existing = await prayerRequestRepository.findByIdOrNull(id);
    if (!existing) throw new AppError('Prayer request not found', 404);

    await prayerRequestRepository.deleteById(id);

    await createAuditLog({
      admin: actor,
      action: 'delete',
      module: 'prayers',
      documentId: id,
      ...reqMeta,
    });

    return true;
  }
}

export default new ContactService();
