import client from '../api/client';
import { unwrapData, unwrapList } from '../utils/api';

export const toFormData = (payload) => {
  const formData = new FormData();
  Object.entries(payload || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'object' && item !== null) {
          Object.entries(item).forEach(([subKey, subValue]) => {
            if (subValue !== undefined && subValue !== null) {
              formData.append(`${key}[${index}][${subKey}]`, subValue);
            }
          });
        } else {
          formData.append(`${key}[${index}]`, item);
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (subValue !== undefined && subValue !== null) {
          formData.append(`${key}[${subKey}]`, subValue);
        }
      });
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};

export const createCrudService = (resource, { uploadFields = [] } = {}) => {
  const send = (payload, hasFile = false) => {
    if (hasFile) {
      return { data: toFormData(payload), headers: { 'Content-Type': 'multipart/form-data' } };
    }
    return { data: payload };
  };

  return {
    resource,

    list: async (params) => {
      const response = await client.get(`/${resource}`, { params });
      return unwrapList(response);
    },

    get: async (id) => {
      const response = await client.get(`/${resource}/${id}`);
      return unwrapData(response);
    },

    create: async (payload) => {
      const hasFile = uploadFields.some((field) => payload?.[field] instanceof File || payload?.[field] instanceof Blob);
      const response = await client.post(`/${resource}`, ...(hasFile ? [{ data: toFormData(payload), headers: { 'Content-Type': 'multipart/form-data' } }] : [payload]));
      return unwrapData(response);
    },

    update: async (id, payload) => {
      const hasFile = uploadFields.some((field) => payload?.[field] instanceof File || payload?.[field] instanceof Blob);
      const response = await client.patch(
        `/${resource}/${id}`,
        ...(hasFile ? [{ data: toFormData(payload), headers: { 'Content-Type': 'multipart/form-data' } }] : [payload])
      );
      return unwrapData(response);
    },

    remove: async (id) => {
      const response = await client.delete(`/${resource}/${id}`);
      return unwrapData(response);
    },
  };
};
