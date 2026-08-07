import { validationResult } from 'express-validator';
import AppError from '../utils/AppError.js';

export const validate = (validations) => {
  return async (req, res, next) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    const details = errors.array().map((error) => ({
      field: error.path || error.param,
      message: error.msg,
      value: error.value,
    }));

    return next(new AppError('Validation failed', 400, details));
  };
};

export default validate;
