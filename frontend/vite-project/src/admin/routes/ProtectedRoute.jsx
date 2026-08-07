import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { canAccessRoute } from '../utils/permissions';
import { FullPageLoader } from '../components/ui/Loader';

const ADMIN_PREFIX = '/admin';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <FullPageLoader label="Checking session…" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  const page = location.pathname.startsWith(ADMIN_PREFIX)
    ? location.pathname.slice(ADMIN_PREFIX.length) || '/'
    : location.pathname;

  if (page !== '/profile' && !canAccessRoute(user?.role, page)) {
    return <Navigate to="/admin/forbidden" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
