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
  if (typeof body === 'string') return sanitizeInput(body);
  if (Buffer.isBuffer(body)) return body;
  if (!body || typeof body !== 'object') return body;
  if (Array.isArray(body)) return body.map((item) => sanitizeBody(item));
  const sanitized = {};
  for (const [key, value] of Object.entries(body)) {
    // Reject MongoDB operator keys ($inc, $set, $where…) and dotted-path
    // keys ("profile.role") that could bypass field allowlists during
    // findByIdAndUpdate-style writes.
    if (key.startsWith('$') || key.includes('.')) continue;
    sanitized[key] = sanitizeBody(value);
  }
  return sanitized;
};

export const sanitizeMutationBody = (req, res, next) => {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    req.body = sanitizeBody(req.body);
  }
  next();
};

export default { stripPrivateFields, sanitizeInput, sanitizeBody, sanitizeMutationBody };
