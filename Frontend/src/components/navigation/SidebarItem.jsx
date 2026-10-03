import React from 'react';
import { Link } from 'react-router-dom';

export default function SidebarItem({
  item,
  isActive,
  isCollapsed,
  icon: Icon,
  onClick
}) {
  return (
    <Link
      to={item.path}
      onClick={onClick}
      title={isCollapsed ? item.label : ''}
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '42px',
        padding: isCollapsed ? '0' : '0 14px',
        justifyContent: isCollapsed ? 'center' : 'space-between',
        borderRadius: '10px',
        margin: '2px 10px',
        textDecoration: 'none',
        backgroundColor: isActive ? 'var(--primary-dim)' : 'transparent',
        border: isActive ? '1px solid var(--primary-border)' : '1px solid transparent',
        color: isActive ? 'var(--nav-active-text)' : 'var(--text-secondary)',
        fontWeight: isActive ? 600 : 400,
        fontSize: '13px',
        transition: 'all 0.15s ease',
        cursor: 'pointer',
        userSelect: 'none'
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'var(--bg-elevated)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--text-secondary)';
        }
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {Icon && (
          <Icon
            size={18}
            color={isActive ? 'var(--nav-active-icon)' : 'currentColor'}
            style={{ flexShrink: 0 }}
          />
        )}
        {!isCollapsed && (
          <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>
        )}
      </div>

      {!isCollapsed && item.badge && (
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            padding: '2px 7px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: isActive ? 'var(--primary-purple)' : 'var(--bg-elevated)',
            color: isActive ? '#FFFFFF' : 'var(--text-muted)',
            border: `1px solid ${isActive ? 'transparent' : 'var(--border-color)'}`
          }}
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
}
