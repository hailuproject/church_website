import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getHomePath } from '../utils/permissions';

export const GuestRoute = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return null;

  if (isAuthenticated) {
    return <Navigate to={getHomePath(user?.role)} replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
