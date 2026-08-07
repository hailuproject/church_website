import mediaService from '../services/media.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendPagination } from '../utils/response.js';
import AppError from '../utils/AppError.js';

const getRequestMeta = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get('user-agent') || '',
});

export const listMedia = asyncHandler(async (req, res) => {
  const { data, pagination } = await mediaService.list(req.query);
  sendPagination(res, { message: 'Media retrieved', data, pagination });
});

export const getMedia = asyncHandler(async (req, res) => {
  const media = await mediaService.getById(req.params.id);
  sendSuccess(res, { message: 'Media retrieved', data: media });
});

export const uploadSingle = asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError('No file uploaded', 400);
  const media = await mediaService.upload(req.file, req.body, req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'File uploaded successfully', data: media });
});

export const uploadBulk = asyncHandler(async (req, res) => {
  const media = await mediaService.uploadMultiple(req.files, req.body, req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Files uploaded successfully', data: media });
});

export const deleteMedia = asyncHandler(async (req, res) => {
  await mediaService.remove(req.params.id, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Media deleted successfully' });
});

export const updateMediaMetadata = asyncHandler(async (req, res) => {
  const media = await mediaService.updateMetadata(req.params.id, req.body, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Media metadata updated', data: media });
});

export default { listMedia, getMedia, uploadSingle, uploadBulk, deleteMedia, updateMediaMetadata };
