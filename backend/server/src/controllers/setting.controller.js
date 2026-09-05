import settingService from '../services/setting.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import { getRequestMeta } from '../utils/requestMeta.js';


export const getPublicSettings = asyncHandler(async (req, res) => {
  const data = await settingService.getPublic();
  sendSuccess(res, { message: 'Church settings retrieved', data });
});

export const getAdminSettings = asyncHandler(async (req, res) => {
  const data = await settingService.getAdmin();
  sendSuccess(res, { message: 'Church settings retrieved', data });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const data = await settingService.update(req.body, req.files || {}, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Church settings updated', data });
});

export const updateSocialLinks = asyncHandler(async (req, res) => {
  const data = await settingService.updateSocialLinks(req.body, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Social links updated', data });
});

export const updateFooterSettings = asyncHandler(async (req, res) => {
  const data = await settingService.updateFooter(req.body, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Footer settings updated', data });
});

export const updateLiveStreamSettings = asyncHandler(async (req, res) => {
  const data = await settingService.updateLiveStream(req.body, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Live stream settings updated', data });
});

export default {
  getPublicSettings,
  getAdminSettings,
  updateSettings,
  updateSocialLinks,
  updateFooterSettings,
  updateLiveStreamSettings,
};
