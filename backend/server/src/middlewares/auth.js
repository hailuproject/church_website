import config from '../config/index.js';
import { verifyAccessToken } from '../utils/jwt.js';
import Admin from '../models/Admin.js';
import { ROLE_PERMISSIONS, ROLES } from '../constants/index.js';
import AppError from '../utils/AppError.js';

const extractToken = (req) => {
  const cookieToken = req.cookies?.[config.jwt.accessCookieName];
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) return authHeader.split(' ')[1];
  return cookieToken || null;
};

export const authenticate = async (req, res, next) => {
  try {
    const token = extractToken(req);
    if (!token) throw new AppError('Authentication required. Please log in.', 401);

    const decoded = verifyAccessToken(token);
    const admin = await Admin.findById(decoded.id);
    if (!admin) throw new AppError('Account no longer exists.', 401);
    if (!admin.isActive) throw new AppError('Your account has been deactivated. Contact an administrator.', 403);
    if (!admin.isVerified) throw new AppError('Please verify your email address before continuing.', 403);

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Session expired. Please log in again.', 401));
    }
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token. Please log in again.', 401));
    }
    next(error);
  }
};

export const optionalAuthenticate = async (req, res, next) => {
  const token = extractToken(req);
  if (!token) return next();
  try {
    const decoded = verifyAccessToken(token);
    const admin = await Admin.findById(decoded.id);
    if (admin && admin.isActive && admin.isVerified) req.admin = admin;
  } catch {
    // Ignore invalid/expired tokens for optional auth — treat request as anonymous.
  }
  next();
};

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.admin) return next(new AppError('Unauthorized.', 401));
    if (allowedRoles.includes(req.admin.role)) return next();
    return next(new AppError(`Access denied. This action requires one of: ${allowedRoles.join(', ')}.`, 403));
  };
};

export const hasPermission = (permission) => {
  return (req, res, next) => {
    if (!req.admin) return next(new AppError('Unauthorized.', 401));
    const role = req.admin.role;
    if (role === ROLES.SUPER_ADMIN) return next();
    const permissions = ROLE_PERMISSIONS[role] || [];
    if (permissions.includes(permission)) return next();
    return next(new AppError('Access denied. You do not have permission for this action.', 403));
  };
};

export default { authenticate, optionalAuthenticate, authorize, hasPermission };
