import { Router } from 'express';
import {
  getOverview,
  getRecentActivities,
  getRecentSermons,
  getRecentEvents,
  getRecentDonations,
  getRecentMessages,
  getFullDashboard,
} from '../controllers/dashboard.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { ROLES } from '../constants/index.js';

const router = Router();

router.use(authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST, ROLES.SECRETARY, ROLES.DEACON));

router.get('/overview', getOverview);
router.get('/recent-activities', getRecentActivities);
router.get('/recent-sermons', getRecentSermons);
router.get('/recent-events', getRecentEvents);
router.get('/recent-donations', getRecentDonations);
router.get('/recent-messages', getRecentMessages);
router.get('/', getFullDashboard);

export default router;
