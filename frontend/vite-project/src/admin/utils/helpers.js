export const cn = (...classes) => classes.filter(Boolean).join(' ');

export const getMediaUrl = (media) => {
  if (typeof media === 'string') return media;
  return media?.url || '';
};

export const getMediaThumb = (media) => {
  if (!media?.publicId) return getMediaUrl(media);
  return `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || ''}/image/upload/w_400,q_auto/${media.publicId}`;
};

export const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const downloadTextFile = (text, filename, mime = 'text/csv') => {
  const blob = new Blob([text], { type: `${mime};charset=utf-8` });
  downloadBlob(blob, filename);
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');
