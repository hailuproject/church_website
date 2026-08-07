import { cn } from '../../utils/helpers';
import { STATUS_STYLES } from '../../constants/options';

const STYLE_MAP = {
  success: 'bg-emerald-100 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30',
  info: 'bg-sky-100 text-sky-700 ring-sky-600/20 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-sky-500/30',
  warning: 'bg-amber-100 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/30',
  danger: 'bg-red-100 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/30',
  neutral: 'bg-gray-100 text-gray-600 ring-gray-500/20 dark:bg-gray-500/10 dark:text-gray-400 dark:ring-gray-500/30',
  primary: 'bg-primary-100 text-primary-700 ring-primary-600/20 dark:bg-primary-500/10 dark:text-primary-300 dark:ring-primary-500/30',
};

export const Badge = ({ children, tone = 'neutral', className }) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
      STYLE_MAP[tone],
      className
    )}
  >
    {children}
  </span>
);

export const StatusBadge = ({ status, className }) => {
  const normalized = String(status ?? 'unknown').toLowerCase().replace(/\s+/g, '');
  const tone = STATUS_STYLES[normalized] || 'neutral';
  return <Badge tone={tone} className={className}>{status || '—'}</Badge>;
};

export const PriorityBadge = ({ priority }) => {
  const tones = {
    Critical: 'danger',
    High: 'warning',
    Normal: 'info',
    Low: 'neutral',
  };
  return <Badge tone={tones[priority] || 'neutral'}>{priority || 'Normal'}</Badge>;
};

export default Badge;
