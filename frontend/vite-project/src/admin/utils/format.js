import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

export const formatDate = (value, pattern = 'MMM d, yyyy') => {
  if (!value) return '—';
  const date = typeof value === 'string' ? parseISO(value) : value;
  if (!isValid(date)) return '—';
  return format(date, pattern);
};

export const formatDateTime = (value, pattern = 'MMM d, yyyy · h:mm a') => {
  if (!value) return '—';
  const date = typeof value === 'string' ? parseISO(value) : value;
  if (!isValid(date)) return '—';
  return format(date, pattern);
};

export const timeAgo = (value) => {
  if (!value) return '—';
  const date = typeof value === 'string' ? parseISO(value) : value;
  if (!isValid(date)) return '—';
  return formatDistanceToNow(date, { addSuffix: true });
};

export const formatCurrency = (value, currency = 'ETB') => {
  const amount = Number(value) || 0;
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString()} ${currency}`;
  }
};

export const formatNumber = (value) => {
  const num = Number(value) || 0;
  try {
    return new Intl.NumberFormat('en-US').format(num);
  } catch {
    return String(num);
  }
};

export const truncate = (text, length = 100) => {
  if (!text) return '';
  const clean = String(text).replace(/<[^>]*>/g, ' ');
  if (clean.length <= length) return clean;
  return `${clean.slice(0, length).trim()}…`;
};

export const stripHtml = (html) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(String(html), 'text/html');
  return doc.body.textContent || '';
};

export const initials = (name = '') => {
  const parts = String(name).trim().split(/\s+/);
  const first = parts[0]?.[0] || '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
};

export const formatMonthKey = (key) => {
  if (!key) return '—';
  if (/^\d{4}-\d{2}$/.test(key)) {
    const [year, month] = key.split('-');
    const date = new Date(Number(year), Number(month) - 1, 1);
    return format(date, 'MMM yy');
  }
  return String(key);
};

export const monthLabel = (monthIndex) => {
  const date = new Date(new Date().getFullYear(), Number(monthIndex) - 1, 1);
  return format(date, 'MMM');
};

export const formatDuration = (minutes) => {
  const value = Number(minutes) || 0;
  if (value <= 0) return '—';
  const hours = Math.floor(value / 60);
  const mins = value % 60;
  if (hours > 0) return mins ? `${hours}h ${mins}m` : `${hours}h`;
  return `${mins}m`;
};
