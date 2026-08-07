import { body } from 'express-validator';
import { ROLE_VALUES } from '../constants/index.js';
import {
  emailValidator,
  passwordValidator,
  phoneValidator,
  requiredString,
  optionalString,
  enumValidator,
} from './common.validators.js';

export const registerValidation = [
  requiredString('name', 'Name', { max: 100 }),
  emailValidator('email'),
  phoneValidator('phone'),
  passwordValidator('password', 8),
  enumValidator('role', ROLE_VALUES),
];

export const loginValidation = [
  emailValidator('email'),
  requiredString('password', 'Password'),
];

export const forgotPasswordValidation = [emailValidator('email')];

export const resetPasswordValidation = [
  passwordValidator('password', 8),
  requiredString('confirmPassword', 'Confirm password'),
  body('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match'),
];

export const changePasswordValidation = [
  requiredString('currentPassword', 'Current password'),
  passwordValidator('newPassword', 8),
  requiredString('confirmNewPassword', 'Confirm new password'),
  body('confirmNewPassword').custom((value, { req }) => value === req.body.newPassword).withMessage('Passwords do not match'),
];

export const resendVerificationValidation = [emailValidator('email')];

export const updateProfileValidation = [
  requiredString('name', 'Name', { max: 100 }).optional({ nullable: true, checkFalsy: true }),
  phoneValidator('phone'),
];

export const updateAdminValidation = [
  requiredString('name', 'Name', { max: 100 }),
  optionalString('phone', { max: 20 }),
  enumValidator('role', ROLE_VALUES),
];

export const createAdminValidation = [
  requiredString('name', 'Name', { max: 100 }),
  emailValidator('email'),
  phoneValidator('phone'),
  passwordValidator('password', 8),
  enumValidator('role', ROLE_VALUES),
];

export default {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  changePasswordValidation,
  resendVerificationValidation,
  updateProfileValidation,
  updateAdminValidation,
  createAdminValidation,
};
