import client from '../api/client';
import { unwrapData, unwrapList } from '../utils/api';

export const sermonService = {
  list: async (params) => {
    const response = await client.get('/sermons', { params });
    return unwrapList(response);
  },

  listPublic: async (params) => {
    const response = await client.get('/sermons/public', { params });
    return unwrapList(response);
  },

  get: async (id) => {
    const response = await client.get(`/sermons/${id}`);
    return unwrapData(response);
  },

  create: async (payload) => {
    const hasFile = payload?.thumbnail instanceof File;
    const body = hasFile ? (() => {
      const fd = new FormData();
      Object.entries(payload).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') fd.append(k, v);
      });
      return fd;
    })() : payload;
    const response = await client.post('/sermons', body, hasFile ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined);
    return unwrapData(response);
  },

  update: async (id, payload) => {
    const hasFile = payload?.thumbnail instanceof File;
    const body = hasFile ? (() => {
      const fd = new FormData();
      Object.entries(payload).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') fd.append(k, v);
      });
      return fd;
    })() : payload;
    const response = await client.patch(`/sermons/${id}`, body, hasFile ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined);
    return unwrapData(response);
  },

  remove: async (id) => {
    const response = await client.delete(`/sermons/${id}`);
    return unwrapData(response);
  },

  uploadAudio: async (id, file) => {
    const fd = new FormData();
    fd.append('audio', file);
    const response = await client.post(`/sermons/${id}/audio`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    return unwrapData(response);
  },

  uploadVideo: async (id, file) => {
    const fd = new FormData();
    fd.append('video', file);
    const response = await client.post(`/sermons/${id}/video`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    return unwrapData(response);
  },

  uploadThumbnail: async (id, file) => {
    const fd = new FormData();
    fd.append('thumbnail', file);
    const response = await client.post(`/sermons/${id}/thumbnail`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    return unwrapData(response);
  },

  togglePublish: async (id, isPublished) => {
    const response = await client.patch(`/sermons/${id}/publish`, { isPublished });
    return unwrapData(response);
  },

  toggleFeatured: async (id, isFeatured) => {
    const response = await client.patch(`/sermons/${id}/feature`, { isFeatured });
    return unwrapData(response);
  },

  getFeatured: async () => {
    const response = await client.get('/sermons/featured');
    return unwrapData(response);
  },

  getRecent: async () => {
    const response = await client.get('/sermons/recent');
    return unwrapData(response);
  },

  getCategories: async () => {
    const response = await client.get('/sermons/categories');
    return unwrapData(response);
  },
};

export default sermonService;
