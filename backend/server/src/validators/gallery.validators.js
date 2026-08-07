import { GALLERY_CATEGORIES } from '../constants/index.js';
import {
  requiredString,
  optionalString,
  enumValidator,
  paginationValidators,
} from './common.validators.js';

export const createAlbumValidation = [
  requiredString('albumName', 'Album name', { max: 200 }),
  optionalString('albumNameAm', { max: 200 }),
  optionalString('description'),
  optionalString('descriptionAm'),
  enumValidator('category', GALLERY_CATEGORIES),
];

export const updateAlbumValidation = [
  optionalString('albumName', { max: 200 }),
  optionalString('albumNameAm', { max: 200 }),
  optionalString('description'),
  optionalString('descriptionAm'),
  enumValidator('category', GALLERY_CATEGORIES),
];

export const listAlbumsValidation = [
  ...paginationValidators,
  enumValidator('category', GALLERY_CATEGORIES),
];

export default { createAlbumValidation, updateAlbumValidation, listAlbumsValidation };
