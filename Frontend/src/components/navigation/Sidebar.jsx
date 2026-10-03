import React from 'react';
import { 
  Sparkles, 
  LayoutDashboard, 
  Layers, 
  Tag, 
  Users, 
  Trophy, 
  Heart, 
  Bell, 
  BarChart3, 
  FileText, 
  ShieldCheck, 
  Settings,
  ChevronsLeft,
  ChevronsRight,
  X
} from 'lucide-react';
import SidebarItem from './SidebarItem';
import { NAV_GROUPS, APP_CONFIG } from '../../lib/constants';

const ICON_MAP = {
  LayoutDashboard,
  Layers,
  Tag,
  Users,
  Trophy,
  Heart,
  Bell,
  BarChart3,
  FileText,
  ShieldCheck,
  Settings
};

export default function Sidebar({
  collapsed,
  onToggle,
  currentPath,
  mobileOpen,
  onCloseMobile
}) {
  return (
    <aside
      className={`admin-sidebar ${mobileOpen ? 'mobile-open' : ''}`}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: collapsed ? 'var(--sidebar-collapsed, 72px)' : 'var(--sidebar-width, 250px)',
        backgroundColor: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-color)',
        transition: 'var(--transition-smooth)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          height: 'var(--header-height, 64px)',
          display: 'flex',
          alignItems: 'center',
          padding: collapsed ? '0' : '0 18px',
          justifyContent: collapsed ? 'center' : 'space-between',
          borderBottom: '1px solid var(--border-color)',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--primary-purple), var(--secondary-purple))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: 'var(--shadow-primary)',
              flexShrink: 0
            }}
          >
            <Sparkles size={18} />
          </div>

          {!collapsed && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.3px',
                  lineHeight: 1.2
                }}>
                  {APP_CONFIG.name}
                </span>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'var(--soft-purple)',
                  backgroundColor: 'var(--primary-dim)',
                  border: '1px solid var(--primary-border)',
                  padding: '1px 5px',
                  borderRadius: '4px',
                  textTransform: 'uppercase'
                }}>
                  PRO
                </span>
              </div>
              <p style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                margin: 0,
                lineHeight: 1
              }}>
                {APP_CONFIG.title}
              </p>
            </div>
          )}
        </div>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="sidebar-mobile-close btn-icon"
          style={{ width: '30px', height: '30px' }}
          aria-label="Close menu"
        >
          <X size={16} />
        </button>
      </div>

      {/* Navigation Scroll Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '14px 0',
          scrollbarWidth: 'none'
        }}
      >
        {NAV_GROUPS.map((group) => (
          <div key={group.key} style={{ marginBottom: '18px' }}>
            {!collapsed && (
              <div
                style={{
                  padding: '0 20px',
                  marginBottom: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.06em'
                }}
              >
                {group.label}
              </div>
            )}

            {group.items.map((item) => {
              const isActive =
                currentPath === item.path ||
                (item.path !== '/admin/dashboard' && currentPath.startsWith(item.path + '/'));
              const IconComponent = ICON_MAP[item.iconName];

              return (
                <SidebarItem
                  key={item.path}
                  item={item}
                  isActive={isActive}
                  isCollapsed={collapsed}
                  icon={IconComponent}
                  onClick={() => {
                    if (onCloseMobile) onCloseMobile();
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Toggle Button */}
      <div
        className="sidebar-desktop-toggle"
        style={{
          padding: '12px 14px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'flex-end'
        }}
      >
        <button
          onClick={onToggle}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="btn-icon"
          style={{ width: '32px', height: '32px' }}
        >
          {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
