import { Router } from 'express';
import {
  listEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getUpcomingEvents,
  getPastEvents,
  getFeaturedEvents,
  getEventCalendar,
  getLiturgicalCalendar,
  toggleEventFeatured,
  changeEventStatus,
} from '../controllers/event.controller.js';
import { authenticate, authorize, hasPermission } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { upload } from '../middlewares/upload.js';
import { MEDIA_TYPES, ROLES, PERMISSIONS } from '../constants/index.js';
import {
  createEventValidation,
  updateEventValidation,
  listEventsValidation,
  changeStatusValidation,
} from '../validators/event.validators.js';
import { objectIdValidator } from '../validators/common.validators.js';

const router = Router();

router.get('/', validate(listEventsValidation), listEvents);
router.get('/upcoming', getUpcomingEvents);
router.get('/past', getPastEvents);
router.get('/featured', getFeaturedEvents);
router.get('/calendar', getEventCalendar);
router.get('/liturgical-calendar', getLiturgicalCalendar);
router.get('/:id', validate([objectIdValidator('id')]), getEvent);

router.use(authenticate);

router.post(
  '/',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST, ROLES.DEACON),
  hasPermission(PERMISSIONS.MANAGE_EVENTS),
  upload([MEDIA_TYPES.IMAGE], { fieldName: 'coverImage' }),
  validate(createEventValidation),
  createEvent
);

router.patch(
  '/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST, ROLES.DEACON),
  hasPermission(PERMISSIONS.MANAGE_EVENTS),
  upload([MEDIA_TYPES.IMAGE], { fieldName: 'coverImage' }),
  validate([objectIdValidator('id'), ...updateEventValidation]),
  updateEvent
);

router.patch(
  '/:id/status',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST, ROLES.DEACON),
  hasPermission(PERMISSIONS.MANAGE_EVENTS),
  validate([objectIdValidator('id'), ...changeStatusValidation]),
  changeEventStatus
);

router.patch(
  '/:id/feature',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST, ROLES.DEACON),
  hasPermission(PERMISSIONS.MANAGE_EVENTS),
  validate([objectIdValidator('id')]),
  toggleEventFeatured
);

router.delete(
  '/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST, ROLES.DEACON),
  hasPermission(PERMISSIONS.MANAGE_EVENTS),
  validate([objectIdValidator('id')]),
  deleteEvent
);

export default router;
