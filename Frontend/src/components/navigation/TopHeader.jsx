import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Bell, 
  ChevronDown, 
  User, 
  Settings as SettingsIcon, 
  LogOut 
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminAvatar from '../common/AdminAvatar';
import SearchBar from '../common/SearchBar';

// Helper to derive page title from current route
const ROUTE_TITLES = {
  '/admin/dashboard': 'Dashboard',
  '/admin/templates': 'Templates',
  '/admin/categories': 'Categories',
  '/admin/users': 'Users',
  '/admin/leaderboard': 'Leaderboard',
  '/admin/likes': 'Likes & Activity',
  '/admin/notifications': 'Notifications',
  '/admin/analytics': 'Analytics',
  '/admin/reports': 'Reports',
  '/admin/admins': 'Admins',
  '/admin/settings': 'Settings'
};

export default function TopHeader({
  onMenuToggle,
  onLogout,
  onSearch = null
}) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const currentTitle = ROUTE_TITLES[location.pathname] || 'Dashboard';

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSearchChange = (val) => {
    setSearchValue(val);
    if (onSearch) onSearch(val);
  };

  return (
    <header
      style={{
        height: 'var(--header-height, 64px)',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}
    >
      {/* Left side: Mobile Toggle & Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button
          onClick={onMenuToggle}
          className="mobile-menu-btn btn-icon"
          style={{ width: '36px', height: '36px' }}
          aria-label="Toggle navigation menu"
        >
          <Menu size={18} />
        </button>

        <span style={{
          fontSize: '15px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          letterSpacing: '-0.2px'
        }}>
          {currentTitle}
        </span>
      </div>

      {/* Right side: Search, Notifications, Admin Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div className="header-search">
          <SearchBar
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search templates, users, actions..."
            style={{ width: '280px' }}
          />
        </div>

        {/* Live system status pill */}
        <div
          className="header-status-badge"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            backgroundColor: 'var(--success-dim)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--success-border)',
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--success)'
          }}
        >
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--success)'
          }} />
          <span>Live</span>
        </div>

        {/* Notifications Icon Button */}
        <button
          onClick={() => navigate('/admin/notifications')}
          className="btn-icon"
          title="Notifications"
          style={{ position: 'relative' }}
        >
          <Bell size={18} />
          <span
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--danger)',
              border: '1px solid var(--bg-surface)'
            }}
          />
        </button>

        {/* Admin Profile Dropdown */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <div
            onClick={() => setProfileDropdownOpen((prev) => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              padding: '4px 6px 4px 10px',
              borderRadius: '10px',
              transition: 'background-color 0.15s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-elevated)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <AdminAvatar name="Admin" size={32} />
            <span
              className="header-admin-name"
              style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}
            >
              Admin
            </span>
            <ChevronDown
              size={14}
              color="var(--text-muted)"
              style={{
                transform: profileDropdownOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.15s ease'
              }}
            />
          </div>

          {/* Dropdown Menu */}
          {profileDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '210px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-lg)',
                padding: '6px',
                zIndex: 1000
              }}
            >
              <div style={{
                padding: '10px 12px',
                borderBottom: '1px solid var(--border-color)',
                marginBottom: '4px'
              }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Master Admin
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  admin@promptoo.ai
                </div>
              </div>

              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  navigate('/admin/admins');
                }}
                className="btn btn-ghost"
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  height: '36px',
                  padding: '0 10px',
                  borderRadius: '8px',
                  fontSize: '13px'
                }}
              >
                <User size={15} style={{ marginRight: '8px' }} />
                Admin Profile
              </button>

              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  navigate('/admin/settings');
                }}
                className="btn btn-ghost"
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  height: '36px',
                  padding: '0 10px',
                  borderRadius: '8px',
                  fontSize: '13px'
                }}
              >
                <SettingsIcon size={15} style={{ marginRight: '8px' }} />
                Settings
              </button>

              <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '4px 0' }} />

              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  if (onLogout) onLogout();
                }}
                className="btn btn-ghost"
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  height: '36px',
                  padding: '0 10px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: 'var(--danger)'
                }}
              >
                <LogOut size={15} style={{ marginRight: '8px' }} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
