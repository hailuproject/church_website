import { optionalString, optionalEmailValidator } from './common.validators.js';

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

export const updateFooterValidation = [
  optionalString('footerText'),
  optionalString('footerTextAm'),
];

export const updateLiveStreamValidation = [
  optionalString('liveStreamURL'),
];

export default {
  updateSettingsValidation,
  updateSocialLinksValidation,
  updateFooterValidation,
  updateLiveStreamValidation,
};
