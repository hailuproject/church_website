import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ items = [] }) => (
  <nav className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
    <Link to="/admin/dashboard" className="flex items-center gap-1 transition-colors hover:text-primary-600 dark:hover:text-primary-400">
      <Home className="h-3.5 w-3.5" />
    </Link>
    {items.map((item, index) => (
      <span key={item.label} className="flex items-center gap-1">
        <ChevronRight className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600" />
        {item.href ? (
          <Link to={item.href} className="transition-colors hover:text-primary-600 dark:hover:text-primary-400">
            {item.label}
          </Link>
        ) : (
          <span className={index === items.length - 1 ? 'font-medium text-gray-700 dark:text-gray-200' : ''}>
            {item.label}
          </span>
        )}
      </span>
    ))}
  </nav>
);

export const PageHeader = ({ title, subtitle, breadcrumbs, actions }) => (
  <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    <div>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="mb-1.5">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
    </div>
    {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
  </div>
);

export default PageHeader;
