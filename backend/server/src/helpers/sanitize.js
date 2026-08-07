import { PUBLIC_KEYS } from '../constants/index.js';

export const stripPrivateFields = (doc) => {
  if (!doc) return doc;
  const obj = typeof doc.toObject === 'function' ? doc.toObject() : { ...doc };
  PUBLIC_KEYS.forEach((key) => delete obj[key]);
  return obj;
};

export const sanitizeInput = (value) => {
  if (typeof value !== 'string') return value;
  return value
    .replace(/<\s*script[\s\S]*?<\s*\/\s*script\s*>/gi, '')
    .replace(/\$where\b|\beval\s*\(/gi, '')
    .trim();
};

export const sanitizeBody = (body) => {
  const sanitized = {};
  for (const [key, value] of Object.entries(body || {})) {
    sanitized[key] = sanitizeInput(value);
  }
  return sanitized;
};

export default { stripPrivateFields, sanitizeInput, sanitizeBody };
