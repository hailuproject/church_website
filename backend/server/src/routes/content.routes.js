import { Router } from 'express';
import { listContent, getContentByKey, updateContent } from '../controllers/content.controller.js';
import validate from '../middlewares/validate.js';
import { authenticate, hasPermission } from '../middlewares/auth.js';
import { PERMISSIONS } from '../constants/index.js';
import { keyValidator, updateContentValidation } from '../validators/content.validators.js';

const router = Router();

router.get('/', authenticate, hasPermission(PERMISSIONS.MANAGE_CONTENT), listContent);
router.get('/:key', validate([keyValidator('key')]), getContentByKey);
router.put(
  '/:key',
  authenticate,
  hasPermission(PERMISSIONS.MANAGE_CONTENT),
  validate([keyValidator('key'), ...updateContentValidation]),
  updateContent
);

export default router;