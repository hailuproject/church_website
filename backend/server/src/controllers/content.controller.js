import contentService from '../services/content.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';

export const getContentByKey = asyncHandler(async (req, res) => {
  const content = await contentService.getByKey(req.params.key);
  sendSuccess(res, { message: 'Content retrieved', data: content });
});

export const getAllContent = asyncHandler(async (req, res) => {
  const data = await contentService.getAll();
  sendSuccess(res, { message: 'Content retrieved', data });
});

export const updateContent = asyncHandler(async (req, res) => {
  const content = await contentService.update(req.params.key, req.body.data, req.admin, {
    ipAddress: req.ip,
    userAgent: req.get('user-agent') || '',
  });
  sendSuccess(res, { message: 'Content updated successfully', data: content });
});

export default { getContentByKey, getAllContent, updateContent };
