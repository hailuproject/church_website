import client from '../api/client';
import { unwrapData, unwrapList } from '../utils/api';
import { toFormData } from './crud';

export const homeService = {
  getAdmin: async () => {
    const response = await client.get('/home/admin');
    return unwrapData(response);
  },

  getPublic: async () => {
    const response = await client.get('/home');
    return unwrapData(response);
  },

  updateContent: async (payload) => {
    const response = await client.patch('/home', toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return unwrapData(response);
  },

  updateHero: async (payload) => {
    const response = await client.patch('/home/hero', toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return unwrapData(response);
  },

  deleteHeroSlide: async (index) => {
    const response = await client.delete(`/home/hero/${index}`);
    return unwrapData(response);
  },

  addQuickLink: async (payload) => {
    const response = await client.post('/home/quick-links', payload);
    return unwrapData(response);
  },

  removeQuickLink: async (index) => {
    const response = await client.delete(`/home/quick-links/${index}`);
    return unwrapData(response);
  },
};

export const aboutService = {
  getAdmin: async () => {
    const response = await client.get('/about/admin');
    return unwrapData(response);
  },

  getPublic: async () => {
    const response = await client.get('/about');
    return unwrapData(response);
  },

  updateContent: async (payload) => {
    const response = await client.patch('/about', payload);
    return unwrapData(response);
  },

  updateHistory: async (payload) => {
    const hasFile = payload?.image instanceof File || payload?.image instanceof Blob;
    const response = await client.patch(
      '/about/history',
      hasFile ? toFormData(payload) : payload,
      hasFile ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
    );
    return unwrapData(response);
  },

  addTimelineEntry: async (payload) => {
    const response = await client.post('/about/timeline', payload);
    return unwrapData(response);
  },

  removeTimelineEntry: async (index) => {
    const response = await client.delete(`/about/timeline/${index}`);
    return unwrapData(response);
  },
};

export const leadershipService = {
  list: async (params) => {
    const response = await client.get('/leadership', { params });
    return unwrapList(response);
  },

  get: async (id) => {
    const response = await client.get(`/leadership/${id}`);
    return unwrapData(response);
  },

  create: async (payload) => {
    const response = await client.post('/leadership', toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return unwrapData(response);
  },

  update: async (id, payload) => {
    const response = await client.patch(`/leadership/${id}`, toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return unwrapData(response);
  },

  remove: async (id) => {
    const response = await client.delete(`/leadership/${id}`);
    return unwrapData(response);
  },

  getActive: async () => {
    const response = await client.get('/leadership/active');
    return unwrapData(response);
  },
};

export default { homeService, aboutService, leadershipService };
