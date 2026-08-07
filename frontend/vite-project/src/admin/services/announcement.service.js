import client from '../api/client';
import { unwrapData, unwrapList } from '../utils/api';
import { createCrudService } from './crud';

export const announcementService = {
  ...createCrudService('announcements'),

  list: async (params) => {
    const response = await client.get('/announcements', { params });
    return unwrapList(response);
  },

  get: async (id) => {
    const response = await client.get(`/announcements/${id}`);
    return unwrapData(response);
  },

  create: async (payload) => {
    const response = await client.post('/announcements', payload);
    return unwrapData(response);
  },

  update: async (id, payload) => {
    const response = await client.patch(`/announcements/${id}`, payload);
    return unwrapData(response);
  },

  remove: async (id) => {
    const response = await client.delete(`/announcements/${id}`);
    return unwrapData(response);
  },

  togglePublish: async (id, isPublished) => {
    const response = await client.patch(`/announcements/${id}/publish`, { isPublished });
    return unwrapData(response);
  },

  getActive: async () => {
    const response = await client.get('/announcements/active');
    return unwrapData(response);
  },
};

export default announcementService;
