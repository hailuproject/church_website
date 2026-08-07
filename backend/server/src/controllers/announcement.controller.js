import announcementService from '../services/announcement.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendPagination } from '../utils/response.js';
import AppError from '../utils/AppError.js';

const getRequestMeta = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get('user-agent') || '',
});

export const listAnnouncements = asyncHandler(async (req, res) => {
  const { data, pagination } = await announcementService.list(req.query);
  sendPagination(res, { message: 'Announcements retrieved', data, pagination });
});

export const getAnnouncement = asyncHandler(async (req, res) => {
  const announcement = await announcementService.getById(req.params.id);
  sendSuccess(res, { message: 'Announcement retrieved', data: announcement });
});

export const getActiveAnnouncements = asyncHandler(async (req, res) => {
  const data = await announcementService.getActive();
  sendSuccess(res, { message: 'Active announcements retrieved', data });
});

export const createAnnouncement = asyncHandler(async (req, res) => {
  const announcement = await announcementService.create(req.body, req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Announcement created', data: announcement });
});

export const updateAnnouncement = asyncHandler(async (req, res) => {
  const announcement = await announcementService.update(req.params.id, req.body, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Announcement updated', data: announcement });
});

export const deleteAnnouncement = asyncHandler(async (req, res) => {
  await announcementService.remove(req.params.id, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Announcement deleted' });
});

export const toggleAnnouncementPublish = asyncHandler(async (req, res) => {
  if (typeof req.body.isPublished !== 'boolean') throw new AppError('isPublished must be a boolean', 400);
  const announcement = await announcementService.togglePublish(req.params.id, req.body.isPublished, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: req.body.isPublished ? 'Announcement published' : 'Announcement unpublished', data: announcement });
});

export default {
  listAnnouncements,
  getAnnouncement,
  getActiveAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  toggleAnnouncementPublish,
};
