import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../utils/helpers';

const TONES = {
  primary: 'bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-300',
  success: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
  info: 'bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400',
  warning: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
  danger: 'bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400',
  violet: 'bg-violet-500/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400',
};

export const StatCard = ({ title, value, icon: Icon, tone = 'primary', trend, hint }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
    <div className="flex items-start justify-between">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">{value}</p>
      </div>
      {Icon && (
        <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', TONES[tone])}>
          <Icon className="h-5 w-5" />
        </div>
      )}
    </div>
    <div className="mt-3 flex items-center gap-2">
      {trend && (
        <span
          className={cn(
            'inline-flex items-center gap-0.5 text-xs font-medium',
            trend.direction === 'up'
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-red-600 dark:text-red-400'
          )}
        >
          {trend.direction === 'up' ? (
            <TrendingUp className="h-3.5 w-3.5" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5" />
          )}
          {trend.value}
        </span>
      )}
      {hint && <span className="text-xs text-gray-400 dark:text-gray-500">{hint}</span>}
    </div>
  </div>
);

export default StatCard;
