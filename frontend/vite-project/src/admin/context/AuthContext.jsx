import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import client, { setUnauthorizedHandler } from '../api/client';
import { getErrorMessage } from '../utils/api';
import { hasPermission } from '../utils/permissions';

const AuthContext = createContext(null);

const STORAGE_KEY = 'church_admin_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleSessionEnd = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      handleSessionEnd();
      if (!window.location.pathname.startsWith('/admin/login')) {
        toast.error('Your session has expired. Please log in again.');
        navigate('/admin/login', { replace: true });
      }
    });
  }, [handleSessionEnd, navigate]);

  const refreshProfile = useCallback(async () => {
    try {
      const { data } = await client.get('/auth/me');
      const currentUser = data?.data;
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
        return currentUser;
      }
    } catch {
      handleSessionEnd();
    }
    return null;
  }, [handleSessionEnd]);

  useEffect(() => {
    const bootstrap = async () => {
      setIsLoading(true);
      if (user) {
        await refreshProfile().catch(() => {});
      }
      setIsLoading(false);
    };
    bootstrap();
  }, []);

  const login = useCallback(
    async (credentials) => {
      try {
        const { data } = await client.post('/auth/login', credentials);
        const loggedInUser = data?.data?.user;
        setUser(loggedInUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
        return { user: loggedInUser };
      } catch (error) {
        throw new Error(getErrorMessage(error, 'Invalid email or password'));
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await client.post('/auth/logout');
    } catch {
      // Ignore logout errors — always clear local state.
    }
    handleSessionEnd();
    navigate('/admin/login', { replace: true });
  }, [handleSessionEnd, navigate]);

  const updateUser = useCallback((updated) => {
    setUser(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
      refreshProfile,
      updateUser,
      hasPermission: (permission) => hasPermission(user?.role, permission),
    }),
    [user, isLoading, login, logout, refreshProfile, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default AuthContext;
