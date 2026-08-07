import { Link } from 'react-router-dom';
import { Home, Lock, FileQuestion, CloudOff } from 'lucide-react';

export const ErrorPage = ({
  code,
  title,
  description,
  icon: Icon,
  primaryLabel = 'Go to Dashboard',
  primaryHref = '/admin/dashboard',
}) => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-gray-900">
    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-lg dark:bg-gray-800">
      <Icon className="h-10 w-10 text-primary-500" />
    </div>
    <p className="text-6xl font-bold tracking-tight text-gray-300 dark:text-gray-700">{code}</p>
    <h1 className="mt-3 text-2xl font-bold text-gray-900 dark:text-gray-50">{title}</h1>
    <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">{description}</p>
    <div className="mt-8">
      <Link
        to={primaryHref}
        className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-600"
      >
        <Home className="h-4 w-4" />
        {primaryLabel}
      </Link>
    </div>
  </div>
);

const CONFIG = {
  '404': {
    code: '404',
    title: 'Page not found',
    description: "The page you are looking for doesn't exist or may have been moved.",
    icon: FileQuestion,
  },
  forbidden: {
    code: '403',
    title: 'Access forbidden',
    description:
      "You don't have permission to access this page. Contact an administrator if you believe this is a mistake.",
    icon: Lock,
    primaryHref: '/admin/dashboard',
  },
  unauthorized: {
    code: '401',
    title: 'Unauthorized',
    description: 'You need to log in to view this page.',
    icon: Lock,
    primaryLabel: 'Go to Login',
    primaryHref: '/admin/login',
  },
  server: {
    code: '500',
    title: 'Something went wrong',
    description: 'An unexpected error occurred on the server. Please try again later.',
    icon: CloudOff,
  },
};

export const ErrorPageRouter = ({ mode }) => <ErrorPage {...CONFIG[mode] || CONFIG['404']} />;

export default ErrorPageRouter;
