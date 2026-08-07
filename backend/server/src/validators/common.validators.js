import { body, param, query } from 'express-validator';
import mongoose from 'mongoose';

export const isObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

export const objectIdValidator = (field = 'id') =>
  param(field).custom((value) => isObjectId(value)).withMessage(`Invalid ${field} format`);

export const bodyObjectIdValidator = (field) =>
  body(field).optional().custom((value) => isObjectId(value)).withMessage(`Invalid ${field} format`);

export const optionalObjectIdValidator = (field) =>
  body(field).optional({ nullable: true, checkFalsy: true }).custom((value) => isObjectId(value)).withMessage(`Invalid ${field} format`);

export const emailValidator = (field = 'email') =>
  body(field)
    .isEmail()
    .withMessage('A valid email address is required')
    .normalizeEmail({ gmail_remove_dots: false });

export const optionalEmailValidator = (field = 'email') =>
  body(field)
    .optional({ nullable: true, checkFalsy: true })
    .isEmail()
    .withMessage('A valid email address is required');

export const passwordValidator = (field = 'password', minLength = 8) =>
  body(field)
    .isLength({ min: minLength })
    .withMessage(`Password must be at least ${minLength} characters`)
    .matches(/[A-Za-z]/)
    .withMessage('Password must contain at least one letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one number');

export const phoneValidator = (field = 'phone') =>
  body(field)
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ min: 7, max: 20 })
    .withMessage('Phone number must be between 7 and 20 characters')
    .matches(/^[+\d\s()-]+$/)
    .withMessage('Phone number contains invalid characters');

export const requiredString = (field, label = null, opts = {}) =>
  body(field)
    .isString()
    .withMessage(`${label || field} must be a string`)
    .trim()
    .notEmpty()
    .withMessage(`${label || field} is required`)
    .isLength(opts.max ? { max: opts.max } : {})
    .withMessage(`${label || field} must be at most ${opts.max} characters`);

export const optionalString = (field, opts = {}) =>
  body(field)
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength(opts.max ? { max: opts.max } : {})
    .withMessage(`${field} must be at most ${opts.max} characters`);

export const optionalDateValidator = (field) =>
  body(field)
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage(`${field} must be a valid date`);

export const requiredDateValidator = (field) =>
  body(field)
    .isISO8601()
    .withMessage(`${field} must be a valid date`);

export const enumValidator = (field, values) =>
  body(field)
    .optional({ nullable: true, checkFalsy: true })
    .isIn(values)
    .withMessage(`${field} must be one of: ${values.join(', ')}`);

export const booleanValidator = (field) =>
  body(field)
    .optional({ nullable: true })
    .isBoolean()
    .withMessage(`${field} must be a boolean`);

export const numberValidator = (field, { min = 0, max = null } = {}) =>
  body(field)
    .optional({ nullable: true, checkFalsy: true })
    .isNumeric()
    .withMessage(`${field} must be a number`)
    .custom((value) => value >= min)
    .withMessage(`${field} must be at least ${min}`)
    .custom((value) => (max === null ? true : value <= max))
    .withMessage(`${field} must be at most ${max}`);

export const paginationValidators = [
  query('page').optional().isInt({ min: 1 }).withMessage('page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100'),
  query('search').optional().isString().withMessage('search must be a string'),
  query('sortBy').optional().isString().withMessage('sortBy must be a string'),
  query('order').optional().isIn(['asc', 'desc']).withMessage('order must be asc or desc'),
  query('from').optional().isISO8601().withMessage('from must be a valid date'),
  query('to').optional().isISO8601().withMessage('to must be a valid date'),
];

export default {
  isObjectId,
  objectIdValidator,
  bodyObjectIdValidator,
  optionalObjectIdValidator,
  emailValidator,
  optionalEmailValidator,
  passwordValidator,
  phoneValidator,
  requiredString,
  optionalString,
  optionalDateValidator,
  requiredDateValidator,
  enumValidator,
  booleanValidator,
  numberValidator,
  paginationValidators,
};
