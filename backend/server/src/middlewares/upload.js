import multer from 'multer';
import config from '../config/index.js';
import AppError from '../utils/AppError.js';
import { FILE_MIME_TYPES, MEDIA_TYPES } from '../constants/index.js';
import { parseBracketedFields } from './parseBody.js';

const memoryStorage = multer.memoryStorage();

const getMaxSize = (mediaTypes) => {
  const limits = config.uploads;
  return Math.max(
    ...mediaTypes.map((mediaType) => {
      switch (mediaType) {
        case MEDIA_TYPES.IMAGE:
          return limits.imageMb * 1024 * 1024;
        case MEDIA_TYPES.AUDIO:
          return limits.audioMb * 1024 * 1024;
        case MEDIA_TYPES.VIDEO:
          return limits.videoMb * 1024 * 1024;
        case MEDIA_TYPES.PDF:
          return limits.pdfMb * 1024 * 1024;
        default:
          return limits.imageMb * 1024 * 1024;
      }
    })
  );
};

const buildFileFilter = (allowedMediaTypes) => {
  const allowedMimes = allowedMediaTypes.flatMap((type) => FILE_MIME_TYPES[type] || []);
  return (req, file, cb) => {
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new AppError(
          `Invalid file type "${file.mimetype}". Allowed: ${allowedMediaTypes.join(', ')}.`,
          400
        ),
        false
      );
    }
  };
};

const runMulter = (req, res, next, middleware) => {
  middleware(req, res, (err) => {
    if (err) return next(err);
    req.body = parseBracketedFields(req.body);
    next();
  });
};

export const upload = (allowedMediaTypes, { fieldName = 'file', maxCount = 10 } = {}) => {
  const middleware = multer({
    storage: memoryStorage,
    limits: { fileSize: getMaxSize(allowedMediaTypes) },
    fileFilter: buildFileFilter(allowedMediaTypes),
  }).single(fieldName);
  return (req, res, next) => runMulter(req, res, next, middleware);
};

export const uploadMixed = (fields, allowedMediaTypes) => {
  const allowedMimes = allowedMediaTypes.flatMap((type) => FILE_MIME_TYPES[type] || []);
  const middleware = multer({
    storage: memoryStorage,
    limits: { fileSize: getMaxSize(allowedMediaTypes) },
    fileFilter: (req, file, cb) => {
      if (allowedMimes.includes(file.mimetype)) cb(null, true);
      else cb(new AppError(`Invalid file type "${file.mimetype}".`, 400), false);
    },
  }).fields(fields.map((field) => ({ name: field, maxCount: 1 })));
  return (req, res, next) => runMulter(req, res, next, middleware);
};

export default { upload, uploadMixed };
