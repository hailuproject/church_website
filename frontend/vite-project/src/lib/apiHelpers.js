import axios from 'axios';

export const getErrorMessage = (error, fallback = 'Something went wrong. Please try again.') => {
  if (axios.isAxiosError(error)) {
    if (!error.response) return error.message || fallback;
    const { data } = error.response;
    if (data?.message) {
      if (data.errors && data.errors.length) {
        const first = data.errors[0];
        if (first?.msg) return first.msg;
      }
      return data.message;
    }
  }
  if (error?.message) return error.message;
  return fallback;
};

export const unwrapData = (response) => response?.data?.data ?? response?.data ?? null;

export const unwrapPagination = (response) => response?.data?.meta?.pagination ?? null;

export const unwrapList = (response) => {
  const data = unwrapData(response);
  return {
    items: Array.isArray(data) ? data : [],
    pagination: unwrapPagination(response),
  };
};

export const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value);
    }
  });
  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
};
