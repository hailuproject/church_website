import sendMail from '../config/mail.js';
import { buildEmail } from './emailTemplates.js';
import { logger } from './logger.js';

export const sendEmail = async ({ to, subject, template, data, html, text }) => {
  if (!to) return null;
  const finalHtml = html || (template ? buildEmail(template, data) : undefined);
  if (!finalHtml && !text) {
    logger.warn(`Email skipped for ${to}: no content provided`);
    return null;
  }
  try {
    await sendMail({ to, subject, html: finalHtml, text });
    logger.info(`Email sent to ${to} (${subject})`);
    return true;
  } catch (error) {
    if (error.code === 'MAIL_NOT_CONFIGURED') {
      logger.warn('Email not sent - SMTP not configured');
      return false;
    }
    logger.error(`Email sending failed to ${to}: ${error.message}`);
    return false;
  }
};

export default sendEmail;
