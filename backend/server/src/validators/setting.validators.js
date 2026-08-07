import { body } from 'express-validator';
import { optionalString, optionalEmailValidator, phoneValidator } from './common.validators.js';

export const updateSettingsValidation = [
  optionalString('churchName'),
  optionalString('churchNameAm'),
  optionalString('tagline'),
  optionalString('taglineAm'),
  optionalString('address.street'),
  optionalString('address.city'),
  optionalString('address.region'),
  optionalString('address.country'),
  optionalString('address.postalCode'),
  optionalString('addressAm.street'),
  optionalString('addressAm.city'),
  optionalString('phone'),
  optionalEmailValidator('email'),
  optionalString('liveStreamURL'),
];

export const updateSocialLinksValidation = [
  optionalString('facebook'),
  optionalString('twitter'),
  optionalString('instagram'),
  optionalString('youtube'),
  optionalString('telegram'),
  optionalString('tiktok'),
];

export const updateHomepageSettingsValidation = [
  optionalString('liveStreamURL'),
  body('languageSettings').optional().isObject().withMessage('languageSettings must be an object'),
];

export const updateFooterValidation = [
  optionalString('footerText'),
  optionalString('footerTextAm'),
];

export const updateLanguageSettingsValidation = [
  body('defaultLanguage').optional().isIn(['english', 'amharic']).withMessage('defaultLanguage must be english or amharic'),
  body('supportedLanguages').optional().isArray().withMessage('supportedLanguages must be an array'),
  body('supportedLanguages.*').optional().isIn(['english', 'amharic']).withMessage('supportedLanguages must contain english or amharic'),
  body('allowLanguageSwitch').optional().isBoolean().withMessage('allowLanguageSwitch must be a boolean'),
];

export const updateLiveStreamValidation = [
  optionalString('liveStreamURL'),
];

export const updateThemeValidation = [
  optionalString('primaryColor'),
  optionalString('secondaryColor'),
  optionalString('fontFamily'),
  body('darkMode').optional().isBoolean().withMessage('darkMode must be a boolean'),
];

export default {
  updateSettingsValidation,
  updateSocialLinksValidation,
  updateHomepageSettingsValidation,
  updateFooterValidation,
  updateLanguageSettingsValidation,
  updateLiveStreamValidation,
  updateThemeValidation,
};
