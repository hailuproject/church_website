import client from '../api/client';
import { unwrapData, unwrapList } from '../utils/api';

export const CONTENT_KEYS = ['home', 'about', 'contact', 'donate', 'footer'];

export const contentService = {
  list: async () => {
    const response = await client.get('/content');
    return unwrapList(response);
  },

  get: async (key) => {
    const response = await client.get(`/content/${key}`);
    return unwrapData(response);
  },

  update: async (key, data) => {
    const response = await client.put(`/content/${key}`, { data });
    return unwrapData(response);
  },
};

export default contentService;