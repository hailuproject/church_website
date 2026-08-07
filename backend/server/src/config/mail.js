import nodemailer from 'nodemailer';
import config from './index.js';

let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    if (!config.mail.user || !config.mail.pass) {
      const error = new Error('SMTP credentials are not configured. Check EMAIL_USER and EMAIL_PASS.');
      error.code = 'MAIL_NOT_CONFIGURED';
      throw error;
    }
    transporter = nodemailer.createTransport({
      host: config.mail.host,
      port: config.mail.port,
      secure: config.mail.secure,
      auth: {
        user: config.mail.user,
        pass: config.mail.pass,
      },
    });
  }
  return transporter;
};

export const sendMail = async ({ to, subject, html, text }) => {
  const mailer = getTransporter();
  return mailer.sendMail({
    from: config.mail.from,
    to,
    subject,
    html,
    text,
  });
};

export default sendMail;
