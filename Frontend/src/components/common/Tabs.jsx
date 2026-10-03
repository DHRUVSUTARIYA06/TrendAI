import React from 'react';

/**
 * Promptoo Admin — Common Tabs Navigation Component
 *
 * @param {Array<{ id: string, label: string, icon?: React.ComponentType, count?: number|string }>} tabs
 * @param {string} activeTab - ID of currently active tab
 * @param {function} onTabChange - Callback on tab click
 * @param {'pills'|'underline'} [variant='pills'] - Tab visual style
 */
export default function Tabs({
  tabs = [],
  activeTab,
  onTabChange,
  variant = 'pills'
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: variant === 'pills' ? '6px' : '16px',
        borderBottom: variant === 'underline' ? '1px solid var(--border-default)' : 'none',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        paddingBottom: variant === 'underline' ? '0' : '0'
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        if (variant === 'underline') {
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange && onTabChange(tab.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                color: isActive ? 'var(--primary-light, var(--primary))' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
                marginBottom: '-1px'
              }}
            >
              {Icon && <Icon size={16} />}
              <span>{tab.label}</span>
              {tab.count != null && (
                <span
                  style={{
                    fontSize: '11px',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    backgroundColor: isActive ? 'var(--primary-dim)' : 'var(--bg-surface-hover)',
                    color: isActive ? 'var(--primary-light)' : 'var(--text-muted)'
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        }

        // Default 'pills' variant
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange && onTabChange(tab.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: isActive ? 'var(--primary)' : 'var(--border-default)',
              backgroundColor: isActive ? 'var(--primary-dim)' : 'var(--bg-surface)',
              color: isActive ? 'var(--primary-light)' : 'var(--text-secondary)',
              fontWeight: isActive ? 600 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap'
            }}
          >
            {Icon && <Icon size={14} />}
            <span>{tab.label}</span>
            {tab.count != null && (
              <span
                style={{
                  fontSize: '11px',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  backgroundColor: isActive ? 'var(--primary)' : 'var(--bg-surface-hover)',
                  color: isActive ? '#ffffff' : 'var(--text-muted)'
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
