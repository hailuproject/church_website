import { GALLERY_CATEGORIES } from '../constants/index.js';
import {
  objectIdValidator,
  enumValidator,
  paginationValidators,
  requiredString,
  optionalString,
} from './common.validators.js';

export const listAlbumsValidation = [
  ...paginationValidators,
  enumValidator('category', GALLERY_CATEGORIES),
];

export const createAlbumValidation = [
  requiredString('albumName', 'Album name', { max: 200 }),
  optionalString('albumNameAm', { max: 200 }),
  optionalString('albumNameTi', { max: 200 }),
  optionalString('description'),
  optionalString('descriptionAm'),
  optionalString('descriptionTi'),
  enumValidator('category', GALLERY_CATEGORIES),
];

export const updateAlbumValidation = [
  optionalString('albumName', { max: 200 }),
  optionalString('albumNameAm', { max: 200 }),
  optionalString('albumNameTi', { max: 200 }),
  optionalString('description'),
  optionalString('descriptionAm'),
  optionalString('descriptionTi'),
  enumValidator('category', GALLERY_CATEGORIES),
];

export const albumIdValidation = [objectIdValidator('id')];

export default {
  listAlbumsValidation,
  createAlbumValidation,
  updateAlbumValidation,
  albumIdValidation,
};