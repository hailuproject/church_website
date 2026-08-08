import { GALLERY_CATEGORIES } from '../constants/index.js';
import { enumValidator, paginationValidators } from './common.validators.js';

export const listAlbumsValidation = [
  ...paginationValidators,
  enumValidator('category', GALLERY_CATEGORIES),
];

export default { listAlbumsValidation };
