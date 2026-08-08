import client from '../lib/api';
import { unwrapData, unwrapList } from '../lib/apiHelpers';

export const publicService = {
  getSettings: async () => {
    const response = await client.get('/settings/public');
    return unwrapData(response);
  },

  getContent: async (key) => {
    const response = await client.get(`/content/${key}`);
    return unwrapData(response);
  },

  listEvents: async (params) => {
    const response = await client.get('/events', { params });
    return unwrapList(response);
  },

  getFeaturedEvents: async () => {
    const response = await client.get('/events/featured');
    return unwrapList(response);
  },

  getUpcomingEvents: async (params) => {
    const response = await client.get('/events/upcoming', { params });
    return unwrapList(response);
  },

  getPastEvents: async (params) => {
    const response = await client.get('/events/past', { params });
    return unwrapList(response);
  },

  getEvent: async (id) => {
    const response = await client.get(`/events/${id}`);
    return unwrapData(response);
  },

  listPublishedSermons: async (params) => {
    const response = await client.get('/sermons/public', { params });
    return unwrapList(response);
  },

  getFeaturedSermons: async () => {
    const response = await client.get('/sermons/featured');
    return unwrapList(response);
  },

  getRecentSermons: async (params) => {
    const response = await client.get('/sermons/recent', { params });
    return unwrapList(response);
  },

  getSermonCategories: async () => {
    const response = await client.get('/sermons/categories');
    return unwrapData(response);
  },

  getSermon: async (id) => {
    const response = await client.get(`/sermons/${id}`);
    return unwrapData(response);
  },

  incrementSermonDownload: async (id) => {
    const response = await client.post(`/sermons/${id}/download`);
    return unwrapData(response);
  },

  listAlbums: async (params) => {
    const response = await client.get('/gallery', { params });
    return unwrapList(response);
  },

  getAlbum: async (id) => {
    const response = await client.get(`/gallery/${id}`);
    return unwrapData(response);
  },

  listResources: async (params) => {
    const response = await client.get('/resources', { params });
    return unwrapList(response);
  },

  getResourceCategories: async () => {
    const response = await client.get('/resources/categories');
    return unwrapData(response);
  },

  getResource: async (id) => {
    const response = await client.get(`/resources/${id}`);
    return unwrapData(response);
  },

  incrementResourceDownload: async (id) => {
    const response = await client.post(`/resources/${id}/download`);
    return unwrapData(response);
  },

  submitContact: async (payload) => {
    const response = await client.post('/contact', payload);
    return unwrapData(response);
  },

  createDonation: async (payload) => {
    const response = await client.post('/donations', payload);
    return unwrapData(response);
  },
};
