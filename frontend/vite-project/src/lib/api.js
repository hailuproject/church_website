import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const client = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

let refreshPromise = null;
let onUnauthorized = null;

const pendingRequests = new Map();
let activeRequests = 0;
let globalLoadingCallback = null;

export const setGlobalLoadingCallback = (cb) => {
  globalLoadingCallback = cb;
};

const emitLoading = (delta) => {
  activeRequests = Math.max(0, activeRequests + delta);
  if (globalLoadingCallback) globalLoadingCallback(activeRequests > 0);
};

const trackRequest = (config) => {
  const key = `${config.method}:${config.url}`;
  if (pendingRequests.has(key)) {
    pendingRequests.set(key, pendingRequests.get(key) + 1);
  } else {
    pendingRequests.set(key, 1);
  }
};

const untrackRequest = (config) => {
  const key = `${config.method}:${config.url}`;
  const count = pendingRequests.get(key) || 0;
  if (count <= 1) pendingRequests.delete(key);
  else pendingRequests.set(key, count - 1);
};

export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};

const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${API_URL}/auth/refresh`, null, { withCredentials: true })
      .then(() => true)
      .catch(() => false)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

client.interceptors.request.use((config) => {
  emitLoading(1);
  trackRequest(config);
  return config;
});

client.interceptors.response.use(
  (response) => {
    emitLoading(-1);
    untrackRequest(response.config);
    return response;
  },
  async (error) => {
    const { config, response } = error;

    if (config) {
      emitLoading(-1);
      untrackRequest(config);
    }

    if (!response) {
      if (config && !config._retry && (config.method === 'get' || config.method === 'GET')) {
        config._retry = true;
        await new Promise((resolve) => setTimeout(resolve, 800));
        return client(config);
      }
      return Promise.reject(
        new Error('Network error. Please check your connection and try again.')
      );
    }

    const originalRequest = config;
    const isRefreshEndpoint = originalRequest?.url?.includes('/auth/refresh');
    const isLoginEndpoint = originalRequest?.url?.includes('/auth/login');

    if (
      response.status === 401 &&
      !originalRequest._retry &&
      !isRefreshEndpoint &&
      !isLoginEndpoint &&
      !window.location.pathname.startsWith('/admin/login')
    ) {
      originalRequest._retry = true;
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return client(originalRequest);
      }
      if (onUnauthorized) onUnauthorized();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export const getPendingRequests = () => pendingRequests.size;

export default client;
