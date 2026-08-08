import RefreshToken from '../models/RefreshToken.js';
import { logger } from '../utils/logger.js';

const CLEANUP_INTERVAL_MS = 24 * 60 * 60 * 1000;

const cleanupExpiredRefreshTokens = async () => {
  try {
    const result = await RefreshToken.deleteMany({
      $or: [{ expiresAt: { $lt: new Date() } }, { revokedAt: { $ne: null } }],
    });
    if (result.deletedCount > 0) logger.info(`Cleaned up ${result.deletedCount} expired/revoked refresh tokens`);
  } catch (error) {
    logger.error(`Refresh token cleanup failed: ${error.message}`);
  }
};

let intervals = [];

export const startScheduledJobs = () => {
  intervals.push(setInterval(cleanupExpiredRefreshTokens, CLEANUP_INTERVAL_MS));
  cleanupExpiredRefreshTokens();
  logger.info('Scheduled jobs started');
};

export const stopScheduledJobs = () => {
  intervals.forEach((interval) => clearInterval(interval));
  intervals = [];
  logger.info('Scheduled jobs stopped');
};

export default { startScheduledJobs, stopScheduledJobs };
