import homeService from '../services/home.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import AppError from '../utils/AppError.js';

const getRequestMeta = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get('user-agent') || '',
});

export const getPublicHome = asyncHandler(async (req, res) => {
  const data = await homeService.getPublic();
  sendSuccess(res, { message: 'Home page content retrieved', data });
});

export const getAdminHome = asyncHandler(async (req, res) => {
  const data = await homeService.getAdmin();
  sendSuccess(res, { message: 'Home page settings retrieved', data });
});

export const updateHomeContent = asyncHandler(async (req, res) => {
  const data = await homeService.update(req.body, req.files || {}, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Home page content updated', data });
});

export const updateHero = asyncHandler(async (req, res) => {
  const data = await homeService.updateHero(req.body, req.files || {}, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Hero section updated', data });
});

export const deleteHeroSlide = asyncHandler(async (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (Number.isNaN(index)) throw new AppError('Invalid slide index', 400);
  const data = await homeService.deleteHeroSlide(index, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Hero slide removed', data });
});

export const addQuickLink = asyncHandler(async (req, res) => {
  const data = await homeService.addQuickLink(req.body, req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Quick link added', data });
});

export const removeQuickLink = asyncHandler(async (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (Number.isNaN(index)) throw new AppError('Invalid quick link index', 400);
  const data = await homeService.removeQuickLink(index, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Quick link removed', data });
});

export default {
  getPublicHome,
  getAdminHome,
  updateHomeContent,
  updateHero,
  deleteHeroSlide,
  addQuickLink,
  removeQuickLink,
};
