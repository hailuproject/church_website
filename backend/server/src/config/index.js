import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const numberOr = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const durationToMs = (value, fallback) => {
  if (typeof value !== 'string') return fallback;
  const match = value.trim().match(/^(\d+)(ms|s|m|h|d)$/i);
  if (!match) return fallback;
  const multipliers = { ms: 1, s: 1000, m: 60 * 1000, h: 60 * 60 * 1000, d: 24 * 60 * 60 * 1000 };
  return Number(match[1]) * multipliers[match[2].toLowerCase()];
};

const config = {
  env: process.env.NODE_ENV || 'development',
  port: numberOr(process.env.PORT, 5000),
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',

  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/church_cms',
  },

  jwt: {
    accessSecret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpire: process.env.ACCESS_TOKEN_EXPIRE || '15m',
    refreshExpire: process.env.REFRESH_TOKEN_EXPIRE || '7d',
    accessCookieName: process.env.ACCESS_TOKEN_COOKIE_NAME || 'church_access_token',
    refreshCookieName: process.env.REFRESH_TOKEN_COOKIE_NAME || 'church_refresh_token',
    accessCookieMaxAgeMs: durationToMs(process.env.ACCESS_TOKEN_EXPIRE || '15m', 15 * 60 * 1000),
    refreshCookieMaxAgeMs: durationToMs(process.env.REFRESH_TOKEN_EXPIRE || '7d', 7 * 24 * 60 * 60 * 1000),
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
  },

  mail: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: numberOr(process.env.EMAIL_PORT, 465),
    secure: process.env.EMAIL_SECURE === 'true',
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM || `Church CMS <${process.env.EMAIL_USER || 'noreply@church.local'}>`,
  },

  uploads: {
    imageMb: numberOr(process.env.MAX_UPLOAD_IMAGE_MB, 5),
    audioMb: numberOr(process.env.MAX_UPLOAD_AUDIO_MB, 25),
    videoMb: numberOr(process.env.MAX_UPLOAD_VIDEO_MB, 100),
    pdfMb: numberOr(process.env.MAX_UPLOAD_PDF_MB, 20),
  },

  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test',
};

export default config;
