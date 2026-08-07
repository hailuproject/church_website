import client from '../api/client';
import { unwrapData, unwrapList } from '../utils/api';
import { toFormData } from './crud';

export const settingService = {
  getAdmin: async () => {
    const response = await client.get('/settings/admin');
    return unwrapData(response);
  },

  getPublic: async () => {
    const response = await client.get('/settings/public');
    return unwrapData(response);
  },

  update: async (payload) => {
    const response = await client.patch('/settings', toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return unwrapData(response);
  },

  updateSocial: async (payload) => {
    const response = await client.patch('/settings/social', payload);
    return unwrapData(response);
  },

  updateHomepage: async (payload) => {
    const response = await client.patch('/settings/homepage', payload);
    return unwrapData(response);
  },

  updateFooter: async (payload) => {
    const response = await client.patch('/settings/footer', payload);
    return unwrapData(response);
  },

  updateLanguage: async (payload) => {
    const response = await client.patch('/settings/language', payload);
    return unwrapData(response);
  },

  updateLiveStream: async (payload) => {
    const response = await client.patch('/settings/live-stream', payload);
    return unwrapData(response);
  },

  updateTheme: async (payload) => {
    const response = await client.patch('/settings/theme', payload);
    return unwrapData(response);
  },
};

export const languageService = {
  list: async (params) => {
    const response = await client.get('/languages', { params });
    return unwrapList(response);
  },

  get: async (id) => {
    const response = await client.get(`/languages/${id}`);
    return unwrapData(response);
  },

  getByKey: async (key) => {
    const response = await client.get(`/languages/key/${key}`);
    return unwrapData(response);
  },

  create: async (payload) => {
    const response = await client.post('/languages', payload);
    return unwrapData(response);
  },

  bulkUpsert: async (payload) => {
    const response = await client.post('/languages/bulk', payload);
    return unwrapData(response);
  },

  remove: async (id) => {
    const response = await client.delete(`/languages/${id}`);
    return unwrapData(response);
  },

  getSections: async () => {
    const response = await client.get('/languages/sections');
    return unwrapData(response);
  },

  getPublic: async () => {
    const response = await client.get('/languages/public');
    return unwrapData(response);
  },
};

export const userService = {
  list: async (params) => {
    const response = await client.get('/users', { params });
    return unwrapList(response);
  },

  get: async (id) => {
    const response = await client.get(`/users/${id}`);
    return unwrapData(response);
  },

  create: async (payload) => {
    const response = await client.post('/users', payload);
    return unwrapData(response);
  },

  update: async (id, payload) => {
    const response = await client.patch(`/users/${id}`, payload);
    return unwrapData(response);
  },

  remove: async (id) => {
    const response = await client.delete(`/users/${id}`);
    return unwrapData(response);
  },

  changeRole: async (id, role) => {
    const response = await client.patch(`/users/${id}/role`, { role });
    return unwrapData(response);
  },

  toggleStatus: async (id, isActive) => {
    const response = await client.patch(`/users/${id}/status`, { isActive });
    return unwrapData(response);
  },

  uploadAvatar: async (id, file) => {
    const fd = new FormData();
    fd.append('avatar', file);
    const response = await client.post(`/users/${id}/avatar`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return unwrapData(response);
  },
};

export const auditService = {
  list: async (params) => {
    const response = await client.get('/audit-logs', { params });
    return unwrapList(response);
  },

  get: async (id) => {
    const response = await client.get(`/audit-logs/${id}`);
    return unwrapData(response);
  },

  getRecent: async (limit = 10) => {
    const response = await client.get('/audit-logs/recent', { params: { limit } });
    return unwrapData(response);
  },

  getSummary: async () => {
    const response = await client.get('/audit-logs/summary');
    return unwrapData(response);
  },

  clearOld: async () => {
    const response = await client.delete('/audit-logs/clear');
    return unwrapData(response);
  },
};

export const dashboardService = {
  getOverview: async () => {
    const response = await client.get('/dashboard/overview');
    return unwrapData(response);
  },

  getRecentActivities: async (limit = 10) => {
    const response = await client.get('/dashboard/recent-activities', { params: { limit } });
    return unwrapData(response);
  },

  getRecentMembers: async (limit = 5) => {
    const response = await client.get('/dashboard/recent-members', { params: { limit } });
    return unwrapData(response);
  },

  getRecentSermons: async (limit = 5) => {
    const response = await client.get('/dashboard/recent-sermons', { params: { limit } });
    return unwrapData(response);
  },

  getRecentEvents: async (limit = 5) => {
    const response = await client.get('/dashboard/recent-events', { params: { limit } });
    return unwrapData(response);
  },

  getCharts: async (months = 6) => {
    const response = await client.get('/dashboard/charts', { params: { months } });
    return unwrapData(response);
  },

  getFull: async (months = 6) => {
    const response = await client.get('/dashboard', { params: { months } });
    return unwrapData(response);
  },
};

export const mediaService = {
  list: async (params) => {
    const response = await client.get('/media', { params });
    return unwrapList(response);
  },

  get: async (id) => {
    const response = await client.get(`/media/${id}`);
    return unwrapData(response);
  },

  upload: async (file, { folder, tags = [] } = {}) => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', folder || '');
    if (tags.length) fd.append('tags', JSON.stringify(tags));
    const response = await client.post('/media/upload', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return unwrapData(response);
  },

  uploadMultiple: async (files, { folder, tags = [] } = {}) => {
    const fd = new FormData();
    files.forEach((file) => fd.append('files', file));
    fd.append('folder', folder || '');
    if (tags.length) fd.append('tags', JSON.stringify(tags));
    const response = await client.post('/media/upload/multiple', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return unwrapData(response);
  },

  remove: async (id) => {
    const response = await client.delete(`/media/${id}`);
    return unwrapData(response);
  },
};

export default { settingService, languageService, userService, auditService, dashboardService, mediaService };
