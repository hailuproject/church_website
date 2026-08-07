import client from '../api/client';
import { unwrapData, unwrapList } from '../utils/api';
import { toFormData } from './crud';

export const membershipService = {
  list: async (params) => {
    const response = await client.get('/membership', { params });
    return unwrapList(response);
  },

  get: async (id) => {
    const response = await client.get(`/membership/${id}`);
    return unwrapData(response);
  },

  register: async (payload) => {
    const response = await client.post('/membership', toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return unwrapData(response);
  },

  update: async (id, payload) => {
    const response = await client.patch(`/membership/${id}`, toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return unwrapData(response);
  },

  remove: async (id) => {
    const response = await client.delete(`/membership/${id}`);
    return unwrapData(response);
  },

  approve: async (id) => {
    const response = await client.patch(`/membership/${id}/approve`);
    return unwrapData(response);
  },

  reject: async (id) => {
    const response = await client.patch(`/membership/${id}/reject`);
    return unwrapData(response);
  },

  changeStatus: async (id, status) => {
    const response = await client.patch(`/membership/${id}/status`, { status });
    return unwrapData(response);
  },
};

export const sacramentService = {
  list: async (params) => {
    const response = await client.get('/sacraments', { params });
    return unwrapList(response);
  },

  get: async (id) => {
    const response = await client.get(`/sacraments/${id}`);
    return unwrapData(response);
  },

  create: async (payload) => {
    const response = await client.post('/sacraments', payload);
    return unwrapData(response);
  },

  update: async (id, payload) => {
    const response = await client.patch(`/sacraments/${id}`, payload);
    return unwrapData(response);
  },

  remove: async (id) => {
    const response = await client.delete(`/sacraments/${id}`);
    return unwrapData(response);
  },

  changeStatus: async (id, status) => {
    const response = await client.patch(`/sacraments/${id}/status`, { status });
    return unwrapData(response);
  },

  assignPriest: async (id, priestId) => {
    const response = await client.patch(`/sacraments/${id}/assign-priest`, { assignedPriest: priestId, status: 'scheduled' });
    return unwrapData(response);
  },
};

export default { membershipService, sacramentService };
