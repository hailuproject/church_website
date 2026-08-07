import client from '../api/client';
import { unwrapData, unwrapList } from '../utils/api';

export const donationService = {
  list: async (params) => {
    const response = await client.get('/donations', { params });
    return unwrapList(response);
  },

  get: async (id) => {
    const response = await client.get(`/donations/${id}`);
    return unwrapData(response);
  },

  create: async (payload) => {
    const response = await client.post('/donations', payload);
    return unwrapData(response);
  },

  update: async (id, payload) => {
    const response = await client.patch(`/donations/${id}`, payload);
    return unwrapData(response);
  },

  remove: async (id) => {
    const response = await client.delete(`/donations/${id}`);
    return unwrapData(response);
  },

  confirm: async (id) => {
    const response = await client.patch(`/donations/${id}/confirm`);
    return unwrapData(response);
  },

  changeStatus: async (id, status) => {
    const response = await client.patch(`/donations/${id}/status`, { status });
    return unwrapData(response);
  },

  getReceipt: async (id) => {
    const response = await client.get(`/donations/${id}/receipt`);
    return unwrapData(response);
  },

  resendReceipt: async (id) => {
    const response = await client.post(`/donations/${id}/receipt/resend`);
    return unwrapData(response);
  },

  getMonthly: async () => {
    const response = await client.get('/donations/monthly');
    return unwrapData(response);
  },

  exportCsv: async (params) => {
    const response = await client.get('/donations/export', { params });
    return unwrapData(response);
  },
};

export const contactService = {
  listMessages: async (params) => {
    const response = await client.get('/contact/inbox', { params });
    return unwrapList(response);
  },

  getMessage: async (id) => {
    const response = await client.get(`/contact/inbox/${id}`);
    return unwrapData(response);
  },

  markRead: async (id) => {
    const response = await client.patch(`/contact/inbox/${id}/read`);
    return unwrapData(response);
  },

  markAllRead: async () => {
    const response = await client.get('/contact/inbox/read-all');
    return unwrapData(response);
  },

  reply: async (id, reply) => {
    const response = await client.post(`/contact/inbox/${id}/reply`, { reply });
    return unwrapData(response);
  },

  deleteMessage: async (id) => {
    const response = await client.delete(`/contact/inbox/${id}`);
    return unwrapData(response);
  },

  listPrayers: async (params) => {
    const response = await client.get('/contact/prayers', { params });
    return unwrapList(response);
  },

  getPrayer: async (id) => {
    const response = await client.get(`/contact/prayers/${id}`);
    return unwrapData(response);
  },

  updatePrayer: async (id, payload) => {
    const response = await client.patch(`/contact/prayers/${id}`, payload);
    return unwrapData(response);
  },

  deletePrayer: async (id) => {
    const response = await client.delete(`/contact/prayers/${id}`);
    return unwrapData(response);
  },
};

export default { donationService, contactService };
