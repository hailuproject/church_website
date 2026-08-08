import { Router } from 'express';
import config from '../config/index.js';
import authRoutes from './auth.routes.js';
import adminRoutes from './admin.routes.js';
import contentRoutes from './content.routes.js';
import sermonRoutes from './sermon.routes.js';
import eventRoutes from './event.routes.js';
import galleryRoutes from './gallery.routes.js';
import resourceRoutes from './resource.routes.js';
import donationRoutes from './donation.routes.js';
import contactRoutes from './contact.routes.js';
import settingRoutes from './setting.routes.js';
import mediaRoutes from './media.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import auditRoutes from './audit.routes.js';
import { sendSuccess } from '../utils/response.js';

const router = Router();

router.get('/health', (req, res) => {
  sendSuccess(res, {
    message: 'Church CMS API is running',
    data: {
      status: 'ok',
      environment: config.env,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
  });
});

router.use('/auth', authRoutes);
router.use('/users', adminRoutes);
router.use('/content', contentRoutes);
router.use('/sermons', sermonRoutes);
router.use('/events', eventRoutes);
router.use('/gallery', galleryRoutes);
router.use('/resources', resourceRoutes);
router.use('/donations', donationRoutes);
router.use('/contact', contactRoutes);
router.use('/settings', settingRoutes);
router.use('/media', mediaRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/audit-logs', auditRoutes);

export default router;
