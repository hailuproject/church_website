import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '../components/layout/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { GuestRoute } from './GuestRoute';
import { FullPageLoader } from '../components/ui/Loader';
import { useAuth } from '../context/AuthContext';
import { getHomePath } from '../utils/permissions';

const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/auth/ResetPasswordPage'));
const ProfilePage = lazy(() => import('../pages/auth/ProfilePage'));
const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage'));
const SermonsPage = lazy(() => import('../pages/sermons/SermonsPage'));
const EventsPage = lazy(() => import('../pages/events/EventsPage'));
const ResourcesPage = lazy(() => import('../pages/resources/ResourcesPage'));
const DonationsPage = lazy(() => import('../pages/donations/DonationsPage'));
const MessagesPage = lazy(() => import('../pages/contact/ContactInboxPage'));
const UsersPage = lazy(() => import('../pages/users/UsersPage'));
const SettingsPage = lazy(() => import('../pages/settings/SettingsPage'));
const AuditLogsPage = lazy(() => import('../pages/audit/AuditLogsPage'));
const ErrorPages = lazy(() => import('../pages/errors/ErrorPages'));

const withSuspense = (element) => <Suspense fallback={<FullPageLoader />}>{element}</Suspense>;

const DefaultRoute = () => {
  const { user } = useAuth();
  return <Navigate to={getHomePath(user?.role)} replace />;
};

export const AppRoutes = () => (
  <Routes>
    <Route element={<GuestRoute />}>
      <Route path="login" element={withSuspense(<LoginPage />)} />
      <Route path="forgot-password" element={withSuspense(<ForgotPasswordPage />)} />
      <Route path="reset-password/:token" element={withSuspense(<ResetPasswordPage />)} />
    </Route>

    <Route path="" element={<ProtectedRoute />}>
      <Route element={<AdminLayout />}>
        <Route index element={<DefaultRoute />} />
        <Route path="dashboard" element={withSuspense(<DashboardPage />)} />
        <Route path="sermons" element={withSuspense(<SermonsPage />)} />
        <Route path="events" element={withSuspense(<EventsPage />)} />
        <Route path="resources" element={withSuspense(<ResourcesPage />)} />
        <Route path="donations" element={withSuspense(<DonationsPage />)} />
        <Route path="messages" element={withSuspense(<MessagesPage />)} />
        <Route path="users" element={withSuspense(<UsersPage />)} />
        <Route path="settings" element={withSuspense(<SettingsPage />)} />
        <Route path="audit-logs" element={withSuspense(<AuditLogsPage />)} />
        <Route path="profile" element={withSuspense(<ProfilePage />)} />
      </Route>
    </Route>

    <Route path="forbidden" element={withSuspense(<ErrorPages mode="forbidden" />)} />
    <Route path="404" element={withSuspense(<ErrorPages mode="404" />)} />
    <Route path="*" element={<Navigate to="404" replace />} />
  </Routes>
);

export default AppRoutes;
