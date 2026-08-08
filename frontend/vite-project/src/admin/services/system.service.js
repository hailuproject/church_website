import client from '../api/client';
import { unwrapData, unwrapList } from '../utils/api';
import { toFormData } from './crud';

export const settingService = {
  getAdmin: async () => {
    const response = await client.get('/settings/admin');
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

  updateFooter: async (payload) => {
    const response = await client.patch('/settings/footer', payload);
    return unwrapData(response);
  },

  updateLiveStream: async (payload) => {
    const response = await client.patch('/settings/live-stream', payload);
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

  clearOld: async (days = 90) => {
    const response = await client.delete('/audit-logs/clear', { params: { days } });
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
};

export default { settingService, userService, auditService, dashboardService };
