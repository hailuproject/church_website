import galleryService from '../services/gallery.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendPagination } from '../utils/response.js';
import AppError from '../utils/AppError.js';

const getRequestMeta = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get('user-agent') || '',
});

export const listAlbums = asyncHandler(async (req, res) => {
  const { data, pagination } = await galleryService.list(req.query);
  sendPagination(res, { message: 'Albums retrieved', data, pagination });
});

export const getAlbum = asyncHandler(async (req, res) => {
  const album = await galleryService.getById(req.params.id);
  sendSuccess(res, { message: 'Album retrieved', data: album });
});

export const createAlbum = asyncHandler(async (req, res) => {
  const album = await galleryService.create(req.body, req.files || {}, req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Album created', data: album });
});

export const updateAlbum = asyncHandler(async (req, res) => {
  const album = await galleryService.update(req.params.id, req.body, req.files || {}, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Album updated', data: album });
});

export const deleteAlbum = asyncHandler(async (req, res) => {
  await galleryService.remove(req.params.id, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Album deleted' });
});

export const addImageToAlbum = asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError('No image uploaded', 400);
  const album = await galleryService.addImage(req.params.id, req.file, req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Image added to album', data: album });
});

export const addVideoToAlbum = asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError('No video uploaded', 400);
  const album = await galleryService.addVideo(req.params.id, req.file, req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Video added to album', data: album });
});

export const addImagesToAlbum = asyncHandler(async (req, res) => {
  const album = await galleryService.addImages(req.params.id, req.files, req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Images added to album', data: album });
});

export const removeImageFromAlbum = asyncHandler(async (req, res) => {
  const album = await galleryService.removeImage(req.params.id, req.params.mediaId, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Image removed from album', data: album });
});

export const removeVideoFromAlbum = asyncHandler(async (req, res) => {
  const album = await galleryService.removeVideo(req.params.id, req.params.mediaId, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Video removed from album', data: album });
});

export default {
  listAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  addImageToAlbum,
  addVideoToAlbum,
  addImagesToAlbum,
  removeImageFromAlbum,
  removeVideoFromAlbum,
};
