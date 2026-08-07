import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const AuthLayout = ({ title, subtitle, children, footer }) => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-gray-50 to-primary-100 px-4 py-10 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
    <div className="w-full max-w-md">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500 text-xl font-bold text-white shadow-lg shadow-primary-500/30">
          EOTC
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-800 sm:p-8">
        {children}
      </div>
      {footer && (
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">{footer}</div>
      )}
      <p className="mt-8 text-center text-xs text-gray-400">
        <Link to="/admin/login" className="hover:text-primary-600">Church CMS Admin</Link> · Ethiopian Orthodox Tewahedo Church
      </p>
      <p className="mt-2 text-center">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
          <ArrowLeft className="h-4 w-4" />
          Back to Website
        </Link>
      </p>
    </div>
  </div>
);

export default AuthLayout;
