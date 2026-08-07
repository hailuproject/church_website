import aboutService from '../services/about.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import AppError from '../utils/AppError.js';

const getRequestMeta = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get('user-agent') || '',
});

export const getPublicAbout = asyncHandler(async (req, res) => {
  const data = await aboutService.getPublic();
  sendSuccess(res, { message: 'About page content retrieved', data });
});

export const getAdminAbout = asyncHandler(async (req, res) => {
  const data = await aboutService.getAdmin();
  sendSuccess(res, { message: 'About page settings retrieved', data });
});

export const updateAboutContent = asyncHandler(async (req, res) => {
  const data = await aboutService.update(req.body, req.files || {}, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'About page content updated', data });
});

export const updateHistory = asyncHandler(async (req, res) => {
  const data = await aboutService.updateHistory(req.body, req.files || {}, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Church history updated', data });
});

export const addTimelineEntry = asyncHandler(async (req, res) => {
  const data = await aboutService.addTimelineEntry(req.body, req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Timeline entry added', data });
});

export const removeTimelineEntry = asyncHandler(async (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (Number.isNaN(index)) throw new AppError('Invalid timeline index', 400);
  const data = await aboutService.removeTimelineEntry(index, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Timeline entry removed', data });
});

export default {
  getPublicAbout,
  getAdminAbout,
  updateAboutContent,
  updateHistory,
  addTimelineEntry,
  removeTimelineEntry,
};
