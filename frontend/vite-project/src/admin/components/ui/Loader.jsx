import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers';

export const Spinner = ({ className, label }) => (
  <div className="flex items-center justify-center gap-2 py-8">
    <Loader2 className={cn('h-5 w-5 animate-spin text-primary-500', className)} />
    {label && <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>}
  </div>
);

export const FullPageLoader = ({ label = 'Loading…' }) => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center">
    <div className="relative h-14 w-14">
      <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary-200 border-t-primary-500 dark:border-gray-700 dark:border-t-primary-500" />
    </div>
    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{label}</p>
  </div>
);

export const LoadingOverlay = ({ show }) =>
  show ? (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-sm dark:bg-gray-900/60">
      <Loader2 className="h-7 w-7 animate-spin text-primary-500" />
    </div>
  ) : null;

export default Spinner;
