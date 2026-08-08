import mediaService from '../services/media.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import AppError from '../utils/AppError.js';

const getRequestMeta = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get('user-agent') || '',
});

export const uploadAsset = asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError('No file uploaded', 400);
  const data = await mediaService.upload(req.file, req.body, req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'File uploaded successfully', data });
});

export const deleteAsset = asyncHandler(async (req, res) => {
  const { publicId } = req.params;
  if (!publicId) throw new AppError('publicId is required', 400);
  await mediaService.remove(publicId, req.query.resourceType, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Media deleted successfully' });
});

export default { uploadAsset, deleteAsset };
