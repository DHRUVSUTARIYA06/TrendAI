import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import TopHeader from '../components/navigation/TopHeader';
import { useSidebar } from '../hooks/useSidebar';

export default function AdminLayout({ onLogout }) {
  const { collapsed, mobileOpen, toggleSidebar, toggleMobileOpen, closeMobile } = useSidebar();
  const location = useLocation();

  const currentWidth = collapsed ? 72 : 250;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Left Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggle={toggleSidebar}
        currentPath={location.pathname}
        mobileOpen={mobileOpen}
        onCloseMobile={closeMobile}
      />

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="admin-mobile-backdrop"
          onClick={closeMobile}
        />
      )}

      {/* Main Layout Area */}
      <div
        className="admin-main-content"
        style={{
          flex: 1,
          marginLeft: `${currentWidth}px`,
          transition: 'margin-left var(--transition-smooth)',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          minWidth: 0,
        }}
      >
        {/* Reusable Top Header */}
        <TopHeader
          onMenuToggle={toggleMobileOpen}
          onLogout={onLogout}
        />

        {/* Dynamic Page Content */}
        <main
          className="admin-main-wrapper"
          style={{
            flex: 1,
            padding: '28px 32px',
            maxWidth: '1440px',
            width: '100%',
            margin: '0 auto',
            boxSizing: 'border-box'
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
