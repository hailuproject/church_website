import { cn } from '../../utils/helpers';

export const Card = ({ className, children, ...props }) => (
  <div
    className={cn(
      'rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ title, subtitle, action, className }) => (
  <div className={cn('flex items-start justify-between gap-3 px-5 pt-5 pb-3', className)}>
    <div>
      {title && <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h3>}
      {subtitle && <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export const CardContent = ({ className, children }) => (
  <div className={cn('px-5 pb-5', className)}>{children}</div>
);

export default Card;
