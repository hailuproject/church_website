import { body, query } from 'express-validator';
import { DONATION_STATUSES, DONATION_PAYMENT_METHODS } from '../constants/index.js';
import {
  requiredString,
  optionalString,
  enumValidator,
  optionalEmailValidator,
  phoneValidator,
  numberValidator,
  booleanValidator,
  paginationValidators,
} from './common.validators.js';

export const createDonationValidation = [
  requiredString('donorName', 'Donor name', { max: 150 }).optional({ nullable: true, checkFalsy: true }),
  optionalEmailValidator('email'),
  phoneValidator('phone'),
  body('amount').isNumeric().withMessage('amount must be a number').custom((value) => value > 0).withMessage('amount must be greater than 0'),
  optionalString('currency', { max: 10 }),
  optionalString('campaign', { max: 150 }),
  enumValidator('paymentMethod', DONATION_PAYMENT_METHODS),
  booleanValidator('isAnonymous'),
];

export const updateDonationValidation = [
  optionalString('donorName', { max: 150 }),
  optionalEmailValidator('email'),
  phoneValidator('phone'),
  numberValidator('amount', { min: 1 }),
  optionalString('currency', { max: 10 }),
  optionalString('campaign', { max: 150 }),
  enumValidator('paymentMethod', DONATION_PAYMENT_METHODS),
  enumValidator('status', DONATION_STATUSES),
];

export const paymentHistoryValidation = [
  query('email').isEmail().withMessage('email must be a valid email').normalizeEmail(),
  ...paginationValidators,
];

export const changeStatusValidation = [
  body('status').isIn(DONATION_STATUSES).withMessage(`status must be one of: ${DONATION_STATUSES.join(', ')}`),
];

export const listDonationsValidation = [
  ...paginationValidators,
  enumValidator('status', DONATION_STATUSES),
  enumValidator('paymentMethod', DONATION_PAYMENT_METHODS),
];

export const exportDonationsValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 10000 }).withMessage('limit must be between 1 and 10000'),
  query('search').optional().isString().withMessage('search must be a string'),
  query('sortBy').optional().isString().withMessage('sortBy must be a string'),
  query('order').optional().isIn(['asc', 'desc']).withMessage('order must be asc or desc'),
  query('from').optional().isISO8601().withMessage('from must be a valid date'),
  query('to').optional().isISO8601().withMessage('to must be a valid date'),
  enumValidator('status', DONATION_STATUSES),
  enumValidator('paymentMethod', DONATION_PAYMENT_METHODS),
];

export default {
  createDonationValidation,
  updateDonationValidation,
  paymentHistoryValidation,
  changeStatusValidation,
  listDonationsValidation,
  exportDonationsValidation,
};
