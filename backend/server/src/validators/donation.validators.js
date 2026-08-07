import { body } from 'express-validator';
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
  emailValidator,
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
  emailValidator('email'),
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

export default {
  createDonationValidation,
  updateDonationValidation,
  paymentHistoryValidation,
  changeStatusValidation,
  listDonationsValidation,
};
