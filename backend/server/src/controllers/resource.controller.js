import resourceService from '../services/resource.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendPagination } from '../utils/response.js';
import AppError from '../utils/AppError.js';
import { getRequestMeta } from '../utils/requestMeta.js';


export const listResources = asyncHandler(async (req, res) => {
  const { data, pagination } = await resourceService.list(req.query);
  sendPagination(res, { message: 'Resources retrieved', data, pagination });
});

export const getResource = asyncHandler(async (req, res) => {
  const resource = await resourceService.getById(req.params.id);
  sendSuccess(res, { message: 'Resource retrieved', data: resource });
});

export const createResource = asyncHandler(async (req, res) => {
  const resource = await resourceService.create(req.body, req.file ? { thumbnail: req.file } : {}, req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Resource created', data: resource });
});

export const updateResource = asyncHandler(async (req, res) => {
  const resource = await resourceService.update(req.params.id, req.body, req.file ? { thumbnail: req.file } : {}, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Resource updated', data: resource });
});

export const deleteResource = asyncHandler(async (req, res) => {
  await resourceService.remove(req.params.id, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Resource deleted' });
});

export const incrementResourceDownload = asyncHandler(async (req, res) => {
  const resource = await resourceService.incrementDownload(req.params.id);
  sendSuccess(res, { message: 'Download recorded', data: resource });
});

export const getResourceCategories = asyncHandler(async (req, res) => {
  const data = await resourceService.getCategories();
  sendSuccess(res, { message: 'Resource categories retrieved', data });
});

export const uploadResourcePdf = asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError('No PDF uploaded', 400);
  const resource = await resourceService.uploadPdf(req.params.id, req.file, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'PDF uploaded', data: resource });
});

export const uploadResourceThumbnail = asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError('No thumbnail uploaded', 400);
  const resource = await resourceService.uploadThumbnail(req.params.id, req.file, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Thumbnail uploaded', data: resource });
});

export default {
  listResources,
  getResource,
  createResource,
  updateResource,
  deleteResource,
  incrementResourceDownload,
  getResourceCategories,
  uploadResourcePdf,
  uploadResourceThumbnail,
};
