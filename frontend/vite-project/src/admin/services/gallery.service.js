import client from '../api/client';
import { unwrapData, unwrapList } from '../utils/api';
import { toFormData } from './crud';

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
    const response = await client.post(
      '/gallery',
      toFormData(payload),
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return unwrapData(response);
  },

  update: async (id, payload) => {
    const response = await client.patch(
      `/gallery/${id}`,
      toFormData(payload),
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return unwrapData(response);
  },

  remove: async (id) => {
    const response = await client.delete(`/gallery/${id}`);
    return unwrapData(response);
  },

  addImages: async (id, files) => {
    const fd = new FormData();
    files.forEach((file) => fd.append('images', file));
    const response = await client.post(`/gallery/${id}/images`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return unwrapData(response);
  },

  addImage: async (id, file) => {
    const fd = new FormData();
    fd.append('image', file);
    const response = await client.post(`/gallery/${id}/images/single`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return unwrapData(response);
  },

  addVideo: async (id, file) => {
    const fd = new FormData();
    fd.append('video', file);
    const response = await client.post(`/gallery/${id}/videos`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return unwrapData(response);
  },

  removeImage: async (id, mediaId) => {
    const response = await client.delete(`/gallery/${id}/images/${mediaId}`);
    return unwrapData(response);
  },

  removeVideo: async (id, mediaId) => {
    const response = await client.delete(`/gallery/${id}/videos/${mediaId}`);
    return unwrapData(response);
  },
};

export default galleryService;
