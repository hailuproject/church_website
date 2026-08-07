const BRACKET_KEY_RE = /^([^\[]+)((\[\d+\]|\[[^\]]*\])+)$/;

const DANGEROUS_SEGMENTS = new Set(['__proto__', 'constructor', 'prototype']);

const isSafeSegment = (segment) =>
  typeof segment !== 'string' || !DANGEROUS_SEGMENTS.has(segment.toLowerCase());

const parseKey = (key) => {
  const match = BRACKET_KEY_RE.exec(key);
  if (!match) return [key];
  const segments = [match[1]];
  const parts = match[2].match(/\[([^\]]*)\]/g) || [];
  for (const part of parts) {
    const inner = part.slice(1, -1);
    segments.push(inner === '' ? '' : /^\d+$/.test(inner) ? Number(inner) : inner);
  }
  return segments;
};

const setAtPath = (target, segments, value) => {
  let cursor = target;
  for (let i = 0; i < segments.length - 1; i += 1) {
    const segment = segments[i];
    const nextSegment = segments[i + 1];
    if (!isSafeSegment(segment)) continue;
    if (typeof segment === 'number' || /^\d+$/.test(String(segment))) {
      if (!Array.isArray(cursor)) cursor = [];
    } else if (cursor === null || typeof cursor !== 'object' || Array.isArray(cursor)) {
      cursor = {};
    }
    if (cursor[segment] === undefined || cursor[segment] === null) {
      cursor[segment] = typeof nextSegment === 'number' || /^\d+$/.test(String(nextSegment)) ? [] : {};
    }
    cursor = cursor[segment];
  }
  const lastSegment = segments[segments.length - 1];
  if (!isSafeSegment(lastSegment)) return;
  if (typeof lastSegment === 'number' || /^\d+$/.test(String(lastSegment))) {
    if (!Array.isArray(cursor)) cursor = [];
  } else if (cursor === null || typeof cursor !== 'object' || Array.isArray(cursor)) {
    cursor = {};
  }
  cursor[lastSegment] = value;
};

export const parseBracketedFields = (body) => {
  if (!body || typeof body !== 'object' || Buffer.isBuffer(body)) return body;
  const result = {};
  for (const [key, value] of Object.entries(body)) {
    if (!key.includes('[')) {
      result[key] = value;
      continue;
    }
    const segments = parseKey(key);
    setAtPath(result, segments, value);
  }
  return result;
};

export const normalizeBody = (req, res, next) => {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    req.body = parseBracketedFields(req.body);
  }
  next();
};

export default normalizeBody;
