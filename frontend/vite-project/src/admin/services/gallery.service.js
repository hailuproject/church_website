import client from '../api/client';
import { unwrapData, unwrapList } from '../utils/api';

export const GALLERY_CATEGORIES = [
  'Liturgy',
  'Festival',
  'Ordination',
  'Baptism',
  'Community',
  'Conference',
  'Other',
];

const toFormData = (payload) => {
  const fd = new FormData();
  Object.entries(payload || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (value instanceof File) fd.append(key, value);
    else if (Array.isArray(value)) value.forEach((item) => fd.append(key, item));
    else fd.append(key, value);
  });
  return fd;
};

const multipartConfig = { headers: { 'Content-Type': 'multipart/form-data' } };

export const galleryService = {
  list: async (params) => {
    const response = await client.get('/gallery', { params });
    return unwrapList(response);
  },

  get: async (id) => {
    const response = await client.get(`/gallery/${id}`);
    return unwrapData(response);
  },

  create: async (payload) => {
    const response = await client.post('/gallery', toFormData(payload), multipartConfig);
    return unwrapData(response);
  },

  update: async (id, payload) => {
    const response = await client.patch(`/gallery/${id}`, toFormData(payload), multipartConfig);
    return unwrapData(response);
  },

  addImages: async (id, files) => {
    const response = await client.post(`/gallery/${id}/images`, toFormData({ images: files }), multipartConfig);
    return unwrapData(response);
  },

  addVideos: async (id, files) => {
    const response = await client.post(`/gallery/${id}/videos`, toFormData({ videos: files }), multipartConfig);
    return unwrapData(response);
  },

  removeMedia: async (id, mediaId) => {
    const response = await client.delete(`/gallery/${id}/media/${mediaId}`);
    return unwrapData(response);
  },

  remove: async (id) => {
    const response = await client.delete(`/gallery/${id}`);
    return unwrapData(response);
  },
};

export default galleryService;