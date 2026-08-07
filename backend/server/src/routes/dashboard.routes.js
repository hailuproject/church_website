import { Router } from 'express';
import {
  getOverview,
  getRecentActivities,
  getRecentMembers,
  getRecentSermons,
  getRecentEvents,
  getCharts,
  getFullDashboard,
} from '../controllers/dashboard.controller.js';
import { authenticate, authorize, hasPermission } from '../middlewares/auth.js';
import { ROLES, PERMISSIONS } from '../constants/index.js';

const router = Router();

router.use(authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PRIEST, ROLES.SECRETARY, ROLES.DEACON));

router.get('/overview', hasPermission(PERMISSIONS.VIEW_ANALYTICS), getOverview);
router.get('/recent-activities', hasPermission(PERMISSIONS.VIEW_ANALYTICS), getRecentActivities);
router.get('/recent-members', hasPermission(PERMISSIONS.VIEW_ANALYTICS), getRecentMembers);
router.get('/recent-sermons', hasPermission(PERMISSIONS.VIEW_ANALYTICS), getRecentSermons);
router.get('/recent-events', hasPermission(PERMISSIONS.VIEW_ANALYTICS), getRecentEvents);
router.get('/charts', hasPermission(PERMISSIONS.VIEW_ANALYTICS), getCharts);
router.get('/', hasPermission(PERMISSIONS.VIEW_ANALYTICS), getFullDashboard);

export default router;
