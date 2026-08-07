import client from '../api/client';
import { unwrapData } from '../utils/api';

export const authService = {
  login: (payload) => client.post('/auth/login', payload).then((r) => r.data?.data),
  logout: () => client.post('/auth/logout'),
  refresh: () => client.post('/auth/refresh'),
  me: () => client.get('/auth/me').then((r) => unwrapData(r)),
  forgotPassword: (payload) => client.post('/auth/forgot-password', payload).then((r) => r.data),
  resetPassword: (token, payload) =>
    client.post(`/auth/reset-password/${token}`, payload).then((r) => r.data),
  changePassword: (payload) => client.post('/auth/change-password', payload).then((r) => r.data),
  updateProfile: (payload) => client.patch('/auth/profile', payload).then((r) => unwrapData(r)),
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return client
      .post('/auth/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((r) => unwrapData(r));
  },
};

export default authService;
