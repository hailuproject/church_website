import galleryService from '../services/gallery.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendPagination } from '../utils/response.js';

export const listAlbums = asyncHandler(async (req, res) => {
  const { data, pagination } = await galleryService.list(req.query);
  sendPagination(res, { message: 'Albums retrieved', data, pagination });
});

export const getAlbum = asyncHandler(async (req, res) => {
  const album = await galleryService.getById(req.params.id);
  sendSuccess(res, { message: 'Album retrieved', data: album });
});

export default {
  listAlbums,
  getAlbum,
};
