import client from '../api/client';
import { unwrapData, unwrapList } from '../utils/api';

export const eventService = {
  list: async (params) => {
    const response = await client.get('/events', { params });
    return unwrapList(response);
  },

  get: async (id) => {
    const response = await client.get(`/events/${id}`);
    return unwrapData(response);
  },

  create: async (payload) => {
    const hasFile = payload?.coverImage instanceof File || payload?.coverImage instanceof Blob;
    const body = hasFile ? (() => {
      const fd = new FormData();
      Object.entries(payload).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') fd.append(k, v);
      });
      return fd;
    })() : payload;
    const response = await client.post('/events', body, hasFile ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined);
    return unwrapData(response);
  },

  update: async (id, payload) => {
    const hasFile = payload?.coverImage instanceof File || payload?.coverImage instanceof Blob;
    const body = hasFile ? (() => {
      const fd = new FormData();
      Object.entries(payload).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') fd.append(k, v);
      });
      return fd;
    })() : payload;
    const response = await client.patch(`/events/${id}`, body, hasFile ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined);
    return unwrapData(response);
  },

  remove: async (id) => {
    const response = await client.delete(`/events/${id}`);
    return unwrapData(response);
  },

  toggleFeatured: async (id, isFeatured) => {
    const response = await client.patch(`/events/${id}/feature`, { isFeatured });
    return unwrapData(response);
  },

  changeStatus: async (id, status) => {
    const response = await client.patch(`/events/${id}/status`, { status });
    return unwrapData(response);
  },

  getUpcoming: async (params) => {
    const response = await client.get('/events/upcoming', { params });
    return unwrapList(response);
  },

  getPast: async (params) => {
    const response = await client.get('/events/past', { params });
    return unwrapList(response);
  },

  getFeatured: async () => {
    const response = await client.get('/events/featured');
    return unwrapData(response);
  },

  getCalendar: async ({ year, month }) => {
    const response = await client.get('/events/calendar', { params: { year, month } });
    return unwrapData(response);
  },

  getRsvps: async (id, params) => {
    const response = await client.get(`/events/${id}/rsvps`, { params });
    return unwrapList(response);
  },
};

export default eventService;
