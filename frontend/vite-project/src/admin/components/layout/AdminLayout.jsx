import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, MobileDrawer } from './Sidebar';
import { Header } from './Header';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { isLoading } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={collapsed} onToggleCollapsed={() => setCollapsed((c) => !c)} />
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          onOpenMobileMenu={() => setMobileOpen(true)}
          collapsed={collapsed}
          onToggleCollapsed={() => setCollapsed((c) => !c)}
        />
        <main className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-500" />
            </div>
          ) : (
            <div className="mx-auto w-full max-w-[1400px] p-4 sm:p-6 lg:p-8">
              <Outlet />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
