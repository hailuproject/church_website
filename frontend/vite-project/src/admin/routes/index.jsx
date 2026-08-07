import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '../components/layout/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { GuestRoute } from './GuestRoute';
import { FullPageLoader } from '../components/ui/Loader';

const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/auth/ResetPasswordPage'));
const ProfilePage = lazy(() => import('../pages/auth/ProfilePage'));
const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage'));
const AnnouncementsPage = lazy(() => import('../pages/announcements/AnnouncementsPage'));
const HomeContentPage = lazy(() => import('../pages/home/HomeContentPage'));
const AboutPage = lazy(() => import('../pages/about/AboutContentPage'));
const LeadershipPage = lazy(() => import('../pages/leadership/LeadershipPage'));
const SermonsPage = lazy(() => import('../pages/sermons/SermonsPage'));
const EventsPage = lazy(() => import('../pages/events/EventsPage'));
const SacramentsPage = lazy(() => import('../pages/sacraments/SacramentsPage'));
const GalleryPage = lazy(() => import('../pages/gallery/GalleryPage'));
const ResourcesPage = lazy(() => import('../pages/resources/ResourcesPage'));
const MembershipPage = lazy(() => import('../pages/membership/MembersPage'));
const DonationsPage = lazy(() => import('../pages/donations/DonationsPage'));
const ContactInboxPage = lazy(() => import('../pages/contact/ContactInboxPage'));
const UsersPage = lazy(() => import('../pages/users/UsersPage'));
const SettingsPage = lazy(() => import('../pages/settings/SettingsPage'));
const AuditLogsPage = lazy(() => import('../pages/audit/AuditLogsPage'));
const ErrorPages = lazy(() => import('../pages/errors/ErrorPages'));

const withSuspense = (element) => <Suspense fallback={<FullPageLoader />}>{element}</Suspense>;

export const AppRoutes = () => (
  <Routes>
    <Route element={<GuestRoute />}>
      <Route path="login" element={withSuspense(<LoginPage />)} />
      <Route path="forgot-password" element={withSuspense(<ForgotPasswordPage />)} />
      <Route path="reset-password/:token" element={withSuspense(<ResetPasswordPage />)} />
    </Route>

    <Route path="" element={<ProtectedRoute />}>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={withSuspense(<DashboardPage />)} />
        <Route path="announcements" element={withSuspense(<AnnouncementsPage />)} />
        <Route path="home-content" element={withSuspense(<HomeContentPage />)} />
        <Route path="about" element={withSuspense(<AboutPage />)} />
        <Route path="leadership" element={withSuspense(<LeadershipPage />)} />
        <Route path="sermons" element={withSuspense(<SermonsPage />)} />
        <Route path="events" element={withSuspense(<EventsPage />)} />
        <Route path="sacraments" element={withSuspense(<SacramentsPage />)} />
        <Route path="gallery" element={withSuspense(<GalleryPage />)} />
        <Route path="resources" element={withSuspense(<ResourcesPage />)} />
        <Route path="membership" element={withSuspense(<MembershipPage />)} />
        <Route path="donations" element={withSuspense(<DonationsPage />)} />
        <Route path="contact-inbox" element={withSuspense(<ContactInboxPage />)} />
        <Route path="users" element={withSuspense(<UsersPage />)} />
        <Route path="settings" element={withSuspense(<SettingsPage />)} />
        <Route path="audit-logs" element={withSuspense(<AuditLogsPage />)} />
        <Route path="profile" element={withSuspense(<ProfilePage />)} />
      </Route>
    </Route>

    <Route path="forbidden" element={withSuspense(<ErrorPages mode="forbidden" />)} />
    <Route path="404" element={withSuspense(<ErrorPages mode="404" />)} />
  </Routes>
);

export default AppRoutes;
