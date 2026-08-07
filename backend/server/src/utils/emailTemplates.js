import config from '../config/index.js';

const baseLayout = (title, content) => `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; color: #1a1a1a; border: 1px solid #eee; border-radius: 8px;">
    <div style="text-align: center; padding-bottom: 16px; border-bottom: 2px solid #8B6F47;">
      <h2 style="margin: 0; color: #5a3e1b;">የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን</h2>
      <p style="margin: 4px 0 0; color: #8B6F47; font-size: 12px;">Ethiopian Orthodox Tewahedo Church</p>
    </div>
    <h3 style="color: #333; margin-top: 20px;">${title}</h3>
    <div style="color: #444; line-height: 1.7; font-size: 15px;">${content}</div>
    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
      <p style="margin: 0;">${new Date().getFullYear()} Ethiopian Orthodox Tewahedo Church. All rights reserved.</p>
    </div>
  </div>
`;

const button = (url, label) => `
  <div style="text-align: center; margin: 24px 0;">
    <a href="${url}" style="background: #8B6F47; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; display: inline-block; font-weight: bold;">${label}</a>
  </div>
  <p style="text-align: center; color: #999; font-size: 12px;">If the button does not work, copy and paste this link: <a href="${url}" style="color:#8B6F47;">${url}</a></p>
`;

export const templates = {
  verification: ({ name, token }) => {
    const url = `${config.clientUrl}/verify-email?token=${token}`;
    return baseLayout(
      'Verify your email address',
      `<p>Dear <strong>${name}</strong>,</p>
       <p>Welcome to the Ethiopian Orthodox Tewahedo Church admin portal. Please verify your email address to activate your account.</p>
       ${button(url, 'Verify Email')}
       <p>This link is valid for 24 hours.</p>`
    );
  },

  forgotPassword: ({ name, token }) => {
    const url = `${config.clientUrl}/reset-password?token=${token}`;
    return baseLayout(
      'Reset your password',
      `<p>Dear <strong>${name}</strong>,</p>
       <p>We received a request to reset your password. If you did not make this request, you can safely ignore this email.</p>
       ${button(url, 'Reset Password')}
       <p>This link is valid for 1 hour.</p>`
    );
  },

  donationReceipt: ({ name, amount, currency, reference, date }) => {
    return baseLayout(
      'Donation receipt',
      `<p>Dear <strong>${name}</strong>,</p>
       <p>Thank you for your generous donation to the Ethiopian Orthodox Tewahedo Church.</p>
       <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
         <tr><td style="padding:8px; border:1px solid #eee;">Amount</td><td style="padding:8px; border:1px solid #eee; font-weight:bold;">${currency} ${amount}</td></tr>
         <tr><td style="padding:8px; border:1px solid #eee;">Reference</td><td style="padding:8px; border:1px solid #eee;">${reference}</td></tr>
         <tr><td style="padding:8px; border:1px solid #eee;">Date</td><td style="padding:8px; border:1px solid #eee;">${date}</td></tr>
       </table>
       <p>May God bless you abundantly. እግዚአብሔር ይባርክህ።</p>`
    );
  },

  contactAutoReply: ({ name, subject }) => {
    return baseLayout(
      'We received your message',
      `<p>Dear <strong>${name}</strong>,</p>
       <p>Thank you for contacting the Ethiopian Orthodox Tewahedo Church regarding <strong>${subject}</strong>.</p>
       <p>We have received your message and our team will respond as soon as possible.</p>
       <p>May God bless you. እግዚአብሔር ይባርክህ።</p>`
    );
  },

  sacramentConfirmation: ({ name, type, date }) => {
    return baseLayout(
      'Sacrament request confirmation',
      `<p>Dear <strong>${name}</strong>,</p>
       <p>We have received your request for <strong>${type}</strong>${date ? ` scheduled for <strong>${date}</strong>` : ''}.</p>
       <p>Our office will contact you shortly to confirm the details.</p>
       <p>May God bless you. እግዚአብሔር ይባርክህ።</p>`
    );
  },

  membershipConfirmation: ({ name }) => {
    return baseLayout(
      'Membership application received',
      `<p>Dear <strong>${name}</strong>,</p>
       <p>Thank you for applying for membership in the Ethiopian Orthodox Tewahedo Church.</p>
       <p>Your application is being reviewed and we will contact you with the outcome.</p>
       <p>Welcome to the family. እንኳን ደህና መጣህ።</p>`
    );
  },

  welcome: ({ name, email }) => {
    return baseLayout(
      'Account created',
      `<p>Dear <strong>${name}</strong>,</p>
       <p>An account has been created for you on the church admin portal with email <strong>${email}</strong>.</p>
       <p>Please use the "Forgot password" option to set your password and log in.</p>`
    );
  },
};

export const buildEmail = (template, data) => templates[template]?.(data);

export default { templates, buildEmail };
