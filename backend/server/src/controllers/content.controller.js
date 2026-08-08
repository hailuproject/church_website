import contentService from '../services/content.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';

export const getContentByKey = asyncHandler(async (req, res) => {
  const content = await contentService.getByKey(req.params.key);
  sendSuccess(res, { message: 'Content retrieved', data: content });
});

export default { getContentByKey };
