import React from 'react';

/**
 * Promptoo Admin — Common Card Container Component
 *
 * @param {string} [title] - Header title
 * @param {string} [subtitle] - Header subtitle
 * @param {React.ReactNode} [actions] - Action buttons in header right
 * @param {React.ReactNode} children - Card body content
 * @param {React.ReactNode} [footer] - Card footer content
 * @param {string} [className] - Additional class name
 * @param {object} [style] - Inline style overrides
 * @param {object} [bodyStyle] - Inline style overrides for card body
 */
export default function Card({
  title,
  subtitle,
  actions,
  children,
  footer,
  className = '',
  style = {},
  bodyStyle = {}
}) {
  const hasHeader = title || subtitle || actions;

  return (
    <div
      className={`admin-card ${className}`}
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg, 12px)',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        ...style
      }}
    >
      {hasHeader && (
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div>
            {title && (
              <h3
                style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p
                style={{
                  margin: '4px 0 0 0',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{actions}</div>}
        </div>
      )}

      <div style={{ padding: '20px', ...bodyStyle }}>{children}</div>

      {footer && (
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid var(--border-default)',
            backgroundColor: 'var(--bg-surface-hover, rgba(0,0,0,0.02))'
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
