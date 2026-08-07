import { body } from 'express-validator';
import {
  optionalString,
  booleanValidator,
} from './common.validators.js';

export const updateHomeValidation = [
  optionalString('welcome.title'),
  optionalString('welcome.titleAm'),
  optionalString('welcome.content'),
  optionalString('welcome.contentAm'),
  optionalString('welcome.scripture'),
  optionalString('priestWelcome.title'),
  optionalString('priestWelcome.titleAm'),
  optionalString('priestWelcome.content'),
  optionalString('priestWelcome.contentAm'),
  optionalString('priestWelcome.priestName'),
  optionalString('priestWelcome.priestTitle'),
  optionalString('announcementSectionTitle'),
  optionalString('announcementSectionTitleAm'),
  booleanValidator('showLiveStream'),
  booleanValidator('showAnnouncements'),
  booleanValidator('showUpcomingEvents'),
  booleanValidator('showRecentSermons'),
];

export const updateHeroValidation = [
  body('index').optional().isInt({ min: 0 }).withMessage('index must be a non-negative integer'),
  optionalString('title'),
  optionalString('titleAm'),
  optionalString('subtitle'),
  optionalString('subtitleAm'),
  optionalString('ctaText'),
  optionalString('ctaLink'),
  booleanValidator('isActive'),
];

export const addQuickLinkValidation = [
  optionalString('label'),
  optionalString('labelAm'),
  optionalString('url'),
  optionalString('icon'),
  body('order').optional().isInt({ min: 0 }).withMessage('order must be a non-negative integer'),
];

export default { updateHomeValidation, updateHeroValidation, addQuickLinkValidation };
