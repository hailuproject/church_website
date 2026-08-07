import { body } from 'express-validator';
import {
  optionalString,
  optionalEmailValidator,
  phoneValidator,
  enumValidator,
} from './common.validators.js';

export const updateAboutValidation = [
  optionalString('history.title'),
  optionalString('history.titleAm'),
  optionalString('history.content'),
  optionalString('history.contentAm'),
  optionalString('faith.title'),
  optionalString('faith.titleAm'),
  optionalString('faith.content'),
  optionalString('faith.contentAm'),
  body('faith.beliefs').optional().isArray().withMessage('beliefs must be an array'),
  body('faith.beliefsAm').optional().isArray().withMessage('beliefsAm must be an array'),
  optionalString('location.title'),
  optionalString('location.address'),
  optionalString('location.addressAm'),
  optionalString('location.mapEmbedUrl'),
  body('location.latitude').optional().isNumeric().withMessage('latitude must be a number'),
  body('location.longitude').optional().isNumeric().withMessage('longitude must be a number'),
];

export const updateHistoryValidation = [
  optionalString('title'),
  optionalString('titleAm'),
  optionalString('content'),
  optionalString('contentAm'),
];

export const addTimelineValidation = [
  optionalString('year'),
  optionalString('title'),
  optionalString('titleAm'),
  optionalString('description'),
  optionalString('descriptionAm'),
];

export default { updateAboutValidation, updateHistoryValidation, addTimelineValidation };
