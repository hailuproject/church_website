import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { generateRandomToken } from './tokens.js';

export const signAccessToken = (payload) => {
  return jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpire,
  });
};

export const signRefreshToken = (payload) => {
  return jwt.sign({ ...payload, jti: generateRandomToken(16) }, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpire,
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, config.jwt.accessSecret);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, config.jwt.refreshSecret);
};

export const generateTokenPair = (admin) => {
  const payload = {
    id: admin._id.toString(),
    role: admin.role,
    email: admin.email,
  };
  return {
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload),
  };
};

export default { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken, generateTokenPair };
