import sermonService from '../services/sermon.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendPagination } from '../utils/response.js';
import AppError from '../utils/AppError.js';

const getRequestMeta = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get('user-agent') || '',
});

export const listSermons = asyncHandler(async (req, res) => {
  const { data, pagination } = await sermonService.list(req.query);
  sendPagination(res, { message: 'Sermons retrieved', data, pagination });
});

export const listPublishedSermons = asyncHandler(async (req, res) => {
  const { data, pagination } = await sermonService.listPublished(req.query);
  sendPagination(res, { message: 'Sermons retrieved', data, pagination });
});

export const getSermon = asyncHandler(async (req, res) => {
  const sermon = await sermonService.getById(req.params.id);
  sendSuccess(res, { message: 'Sermon retrieved', data: sermon });
});

export const createSermon = asyncHandler(async (req, res) => {
  const sermon = await sermonService.create(req.body, req.files || {}, req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Sermon created', data: sermon });
});

export const updateSermon = asyncHandler(async (req, res) => {
  const sermon = await sermonService.update(req.params.id, req.body, req.files || {}, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Sermon updated', data: sermon });
});

export const deleteSermon = asyncHandler(async (req, res) => {
  await sermonService.remove(req.params.id, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Sermon deleted' });
});

export const uploadAudio = asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError('No audio file uploaded', 400);
  const sermon = await sermonService.uploadAudio(req.params.id, req.file, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Audio uploaded', data: sermon });
});

export const uploadVideo = asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError('No video file uploaded', 400);
  const sermon = await sermonService.uploadVideo(req.params.id, req.file, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Video uploaded', data: sermon });
});

export const uploadThumbnail = asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError('No thumbnail uploaded', 400);
  const sermon = await sermonService.uploadThumbnail(req.params.id, req.file, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Thumbnail uploaded', data: sermon });
});

export const toggleSermonPublish = asyncHandler(async (req, res) => {
  if (typeof req.body.isPublished !== 'boolean') throw new AppError('isPublished must be a boolean', 400);
  const sermon = await sermonService.togglePublish(req.params.id, req.body.isPublished, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Sermon publication status updated', data: sermon });
});

export const toggleSermonFeatured = asyncHandler(async (req, res) => {
  if (typeof req.body.isFeatured !== 'boolean') throw new AppError('isFeatured must be a boolean', 400);
  const sermon = await sermonService.toggleFeatured(req.params.id, req.body.isFeatured, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Sermon featured status updated', data: sermon });
});

export const incrementSermonDownload = asyncHandler(async (req, res) => {
  const sermon = await sermonService.incrementDownload(req.params.id);
  sendSuccess(res, { message: 'Download recorded', data: sermon });
});

export const getFeaturedSermons = asyncHandler(async (req, res) => {
  const data = await sermonService.getFeatured();
  sendSuccess(res, { message: 'Featured sermons retrieved', data });
});

export const getRecentSermons = asyncHandler(async (req, res) => {
  const data = await sermonService.getRecent();
  sendSuccess(res, { message: 'Recent sermons retrieved', data });
});

export const getSermonCategories = asyncHandler(async (req, res) => {
  const data = await sermonService.getCategories();
  sendSuccess(res, { message: 'Sermon categories retrieved', data });
});

export default {
  listSermons,
  listPublishedSermons,
  getSermon,
  createSermon,
  updateSermon,
  deleteSermon,
  uploadAudio,
  uploadVideo,
  uploadThumbnail,
  toggleSermonPublish,
  toggleSermonFeatured,
  incrementSermonDownload,
  getFeaturedSermons,
  getRecentSermons,
  getSermonCategories,
};
