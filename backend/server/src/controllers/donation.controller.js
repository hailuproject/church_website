import donationService from '../services/donation.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendPagination } from '../utils/response.js';
import AppError from '../utils/AppError.js';

const getRequestMeta = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get('user-agent') || '',
  actorId: req.admin?._id || null,
});

export const listDonations = asyncHandler(async (req, res) => {
  const { data, pagination } = await donationService.list(req.query);
  sendPagination(res, { message: 'Donations retrieved', data, pagination });
});

export const getDonation = asyncHandler(async (req, res) => {
  const donation = await donationService.getById(req.params.id);
  sendSuccess(res, { message: 'Donation retrieved', data: donation });
});

export const createDonation = asyncHandler(async (req, res) => {
  const result = await donationService.create(req.body, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Donation processed', data: result });
});

export const updateDonation = asyncHandler(async (req, res) => {
  const donation = await donationService.update(req.params.id, req.body, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Donation updated', data: donation });
});

export const confirmDonation = asyncHandler(async (req, res) => {
  const donation = await donationService.confirmPayment(req.params.id, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Donation confirmed', data: donation });
});

export const changeDonationStatus = asyncHandler(async (req, res) => {
  if (!req.body.status) throw new AppError('status is required', 400);
  const donation = await donationService.changeStatus(req.params.id, req.body.status, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Donation status updated', data: donation });
});

export const getDonationReceipt = asyncHandler(async (req, res) => {
  const receipt = await donationService.getReceipt(req.params.id);
  sendSuccess(res, { message: 'Receipt generated', data: receipt });
});

export const resendDonationReceipt = asyncHandler(async (req, res) => {
  const donation = await donationService.getById(req.params.id);
  await donationService.sendReceipt(donation);
  sendSuccess(res, { message: 'Receipt sent to donor email' });
});

export const getPaymentHistory = asyncHandler(async (req, res) => {
  const email = req.query.email || req.body.email;
  if (!email) throw new AppError('email is required to view payment history', 400);
  const { data, pagination } = await donationService.paymentHistory(email, req.query);
  sendPagination(res, { message: 'Payment history retrieved', data, pagination });
});

export const getMonthlyDonations = asyncHandler(async (req, res) => {
  const year = parseInt(req.query.year, 10) || new Date().getFullYear();
  const data = await donationService.monthlyDonations(year);
  sendSuccess(res, { message: 'Monthly donations retrieved', data });
});

export const exportDonationsCSV = asyncHandler(async (req, res) => {
  const csv = await donationService.exportCSV(req.query);
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="donations.csv"');
  res.send(csv);
});

export const stripeWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers['stripe-signature'];
  if (!signature) throw new AppError('Missing Stripe signature', 400);
  const eventType = await donationService.handleStripeWebhook(req.body, signature);
  sendSuccess(res, { message: `Webhook received: ${eventType}` });
});

export default {
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
};
