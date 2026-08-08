import { Router } from 'express';
import { getContentByKey } from '../controllers/content.controller.js';
import validate from '../middlewares/validate.js';
import { keyValidator } from '../validators/content.validators.js';

const router = Router();

router.get('/:key', validate([keyValidator('key')]), getContentByKey);

export default router;
