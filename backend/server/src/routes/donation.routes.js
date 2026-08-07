import { Router } from 'express';
import {
  listDonations,
  getDonation,
  createDonation,
  updateDonation,
  confirmDonation,
  changeDonationStatus,
  getDonationReceipt,
  resendDonationReceipt,
  getPaymentHistory,
  getMonthlyDonations,
  exportDonationsCSV,
  stripeWebhook,
} from '../controllers/donation.controller.js';
import { authenticate, authorize, hasPermission } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { ROLES, PERMISSIONS } from '../constants/index.js';
import {
  createDonationValidation,
  updateDonationValidation,
  paymentHistoryValidation,
  changeStatusValidation,
  listDonationsValidation,
} from '../validators/donation.validators.js';
import { objectIdValidator } from '../validators/common.validators.js';

const router = Router();

router.post('/webhook/stripe', stripeWebhook);

router.post('/', validate(createDonationValidation), createDonation);
router.get('/history', validate(paymentHistoryValidation), getPaymentHistory);

router.use(authenticate);

router.get(
  '/',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_DONATIONS),
  validate(listDonationsValidation),
  listDonations
);

router.get(
  '/monthly',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  getMonthlyDonations
);

router.get(
  '/export',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_DONATIONS),
  validate(listDonationsValidation),
  exportDonationsCSV
);

router.get(
  '/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_DONATIONS),
  validate([objectIdValidator('id')]),
  getDonation
);

router.get(
  '/:id/receipt',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_DONATIONS),
  validate([objectIdValidator('id')]),
  getDonationReceipt
);

router.post(
  '/:id/receipt/resend',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_DONATIONS),
  validate([objectIdValidator('id')]),
  resendDonationReceipt
);

router.patch(
  '/:id',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_DONATIONS),
  validate([objectIdValidator('id'), ...updateDonationValidation]),
  updateDonation
);

router.patch(
  '/:id/confirm',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_DONATIONS),
  validate([objectIdValidator('id')]),
  confirmDonation
);

router.patch(
  '/:id/status',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECRETARY),
  hasPermission(PERMISSIONS.MANAGE_DONATIONS),
  validate([objectIdValidator('id'), ...changeStatusValidation]),
  changeDonationStatus
);

export default router;
