import { Router } from 'express';
import {
  getContentByKey,
  getAllContent,
  updateContent,
} from '../controllers/content.controller.js';
import { authenticate, hasPermission } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { PERMISSIONS } from '../constants/index.js';
import { updateContentValidation, keyValidator } from '../validators/content.validators.js';

const router = Router();

router.get('/:key', validate([keyValidator('key')]), getContentByKey);

router.use(authenticate);

router.get('/', hasPermission(PERMISSIONS.MANAGE_CONTENT), getAllContent);

router.put(
  '/:key',
  hasPermission(PERMISSIONS.MANAGE_CONTENT),
  validate([keyValidator('key'), ...updateContentValidation]),
  updateContent
);

export default router;
