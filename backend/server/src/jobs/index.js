import authRepository from '../repositories/auth.repository.js';
import { logger } from '../utils/logger.js';

const CLEANUP_INTERVAL_MS = 24 * 60 * 60 * 1000;

const cleanupExpiredRefreshTokens = async () => {
  try {
    const removed = await authRepository.cleanupExpiredTokens();
    if (removed > 0) logger.info(`Cleaned up ${removed} expired/revoked refresh tokens`);
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
