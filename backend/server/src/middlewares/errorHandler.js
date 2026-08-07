import AppError from '../utils/AppError.js';
import { logger } from '../utils/logger.js';
import config from '../config/index.js';

export const notFound = (req, res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

export const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message || 'Server error';

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    error = new AppError(`Invalid ${err.path || 'resource'} ID`, 400);
  }

  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors || {}).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    error = new AppError('Validation failed', 400, details);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    error = new AppError(`${field} already exists`, 409);
  }

  if (err.name === 'MongoServerError' && err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    error = new AppError(`${field} already exists`, 409);
  }

  if (err.type === 'entity.parse.failed') {
    error = new AppError('Invalid JSON payload', 400);
  }

  if (err.name === 'MulterError') {
    const message =
      err.code === 'LIMIT_FILE_SIZE'
        ? 'File too large. Check the allowed size limit.'
        : `Upload error: ${err.message}`;
    error = new AppError(message, 400);
  }

  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : 'Internal server error';

  if (!error.statusCode || error.statusCode >= 500) {
    logger.error(`${error.message} ${err.stack || ''}`);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errors: error.errors && error.errors.length ? error.errors : [],
    statusCode,
  });
};

export default globalErrorHandler;
