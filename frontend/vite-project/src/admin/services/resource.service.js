import client from '../api/client';
import { unwrapData, unwrapList } from '../utils/api';

const withFile = (payload, fileKey) => {
  if (payload?.[fileKey] instanceof File || payload?.[fileKey] instanceof Blob) {
    const fd = new FormData();
    Object.entries(payload).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') fd.append(k, v);
    });
    return { body: fd, headers: { 'Content-Type': 'multipart/form-data' } };
  }
  return { body: payload };
};

export const resourceService = {
  list: async (params) => {
    const response = await client.get('/resources', { params });
    return unwrapList(response);
  },

  get: async (id) => {
    const response = await client.get(`/resources/${id}`);
    return unwrapData(response);
  },

  getCategories: async () => {
    const response = await client.get('/resources/categories');
    return unwrapData(response);
  },

  create: async (payload) => {
    const { body, headers } = withFile(payload, 'thumbnail');
    const response = await client.post('/resources', body, headers);
    return unwrapData(response);
  },

  update: async (id, payload) => {
    const { body, headers } = withFile(payload, 'thumbnail');
    const response = await client.patch(`/resources/${id}`, body, headers);
    return unwrapData(response);
  },

  remove: async (id) => {
    const response = await client.delete(`/resources/${id}`);
    return unwrapData(response);
  },

  uploadPdf: async (id, file) => {
    const fd = new FormData();
    fd.append('pdf', file);
    const response = await client.post(`/resources/${id}/pdf`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return unwrapData(response);
  },

  uploadThumbnail: async (id, file) => {
    const fd = new FormData();
    fd.append('thumbnail', file);
    const response = await client.post(`/resources/${id}/thumbnail`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return unwrapData(response);
  },

  incrementDownload: async (id) => {
    const response = await client.post(`/resources/${id}/download`);
    return unwrapData(response);
  },
};

export default resourceService;
