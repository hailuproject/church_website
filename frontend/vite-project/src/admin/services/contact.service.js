import client from '../api/client';
import { unwrapData, unwrapList } from '../utils/api';

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
    const response = await client.patch('/contact/inbox/read-all');
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
};

export default contactService;
