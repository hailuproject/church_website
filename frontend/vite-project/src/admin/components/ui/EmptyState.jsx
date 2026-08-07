import { cn } from '../../utils/helpers';

export const EmptyState = ({
  icon: Icon,
  title = 'No data available',
  description,
  action,
  className,
}) => (
  <div className={cn('flex flex-col items-center justify-center px-6 py-14 text-center', className)}>
    {Icon && (
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-700">
        <Icon className="h-7 w-7 text-gray-400 dark:text-gray-500" />
      </div>
    )}
    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
    {description && (
      <p className="mt-1 max-w-sm text-sm text-gray-500 dark:text-gray-400">{description}</p>
    )}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export default EmptyState;
