import ContactMessage from '../models/ContactMessage.js';
import AppError from '../utils/AppError.js';
import { paginateModel } from '../utils/paginateModel.js';
import { sendEmail } from '../utils/email.js';
import { createAuditLog } from '../helpers/auditLogger.js';

class ContactService {
  async listMessages(queryString) {
    return paginateModel(ContactMessage, queryString, {
      searchableFields: ['name', 'email', 'subject', 'message'],
      filterWhitelist: ['category', 'status', 'isRead'],
      defaultSort: { createdAt: -1 },
    });
  }

  async getMessage(id) {
    const message = await ContactMessage.findById(id);
    if (!message) throw new AppError('Message not found', 404);
    return message;
  }

  async submitContact(data, reqMeta) {
    const message = await ContactMessage.create(data);

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
    const message = await ContactMessage.findByIdAndUpdate(id, { isRead: true }, { returnDocument: 'after' });
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
    const result = await ContactMessage.updateMany({ isRead: false }, { isRead: true });
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
    const message = await ContactMessage.findById(id);
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

    const updated = await ContactMessage.findByIdAndUpdate(
      id,
      { reply: data.reply, replied: true, repliedAt: new Date(), status: 'replied', isRead: true, email: message.email },
      { returnDocument: 'after' }
    );

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
    const message = await ContactMessage.findById(id);
    if (!message) throw new AppError('Message not found', 404);

    await ContactMessage.findByIdAndDelete(id);

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
}

export default new ContactService();
