import galleryService from '../services/gallery.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendPagination } from '../utils/response.js';
import { getRequestMeta } from '../utils/requestMeta.js';

export const listAlbums = asyncHandler(async (req, res) => {
  const { data, pagination } = await galleryService.list(req.query);
  sendPagination(res, { message: 'Albums retrieved', data, pagination });
});

export const getAlbum = asyncHandler(async (req, res) => {
  const album = await galleryService.getById(req.params.id);
  sendSuccess(res, { message: 'Album retrieved', data: album });
});

export const createAlbum = asyncHandler(async (req, res) => {
  const album = await galleryService.create(req.body, req.file, req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Album created', data: album });
});

export const updateAlbum = asyncHandler(async (req, res) => {
  const album = await galleryService.update(
    req.params.id,
    req.body,
    req.file,
    req.body.removeCoverImage === 'true',
    req.admin,
    getRequestMeta(req)
  );
  sendSuccess(res, { message: 'Album updated', data: album });
});

export const addAlbumImages = asyncHandler(async (req, res) => {
  const album = await galleryService.addImages(req.params.id, req.files || [], req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Images added', data: album });
});

export const addAlbumVideos = asyncHandler(async (req, res) => {
  const album = await galleryService.addVideos(req.params.id, req.files || [], req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Videos added', data: album });
});

export const removeAlbumMedia = asyncHandler(async (req, res) => {
  const album = await galleryService.removeMedia(req.params.id, req.params.mediaId, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Media removed', data: album });
});

export const deleteAlbum = asyncHandler(async (req, res) => {
  const result = await galleryService.remove(req.params.id, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Album deleted', data: result });
});

export default {
  listAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  addAlbumImages,
  addAlbumVideos,
  removeAlbumMedia,
  deleteAlbum,
};