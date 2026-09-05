import contentService from '../services/content.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import { getRequestMeta } from '../utils/requestMeta.js';

export const listContent = asyncHandler(async (req, res) => {
  const content = await contentService.list();
  sendSuccess(res, { message: 'Content retrieved', data: content });
});

export const getContentByKey = asyncHandler(async (req, res) => {
  const content = await contentService.getByKey(req.params.key);
  sendSuccess(res, { message: 'Content retrieved', data: content });
});

export const updateContent = asyncHandler(async (req, res) => {
  const content = await contentService.update(req.params.key, req.body.data, req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 200, message: 'Content updated', data: content });
});

export default { listContent, getContentByKey, updateContent };