import { Router } from 'express';
import { listAlbums, getAlbum } from '../controllers/gallery.controller.js';
import validate from '../middlewares/validate.js';
import { listAlbumsValidation } from '../validators/gallery.validators.js';
import { objectIdValidator } from '../validators/common.validators.js';

const router = Router();

router.get('/', validate(listAlbumsValidation), listAlbums);
router.get('/:id', validate([objectIdValidator('id')]), getAlbum);

export default router;
