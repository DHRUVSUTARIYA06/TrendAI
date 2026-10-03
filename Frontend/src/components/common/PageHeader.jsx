import React from 'react';
import Breadcrumb from './Breadcrumb';

export default function PageHeader({ title, subtitle, breadcrumbs = [], actions = null }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          <Breadcrumb items={breadcrumbs} />
        </div>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{
            fontSize: 'var(--font-page-title, 28px)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.5px',
            margin: 0,
            lineHeight: 1.2
          }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{
              fontSize: 'var(--font-secondary, 13px)',
              color: 'var(--text-secondary)',
              marginTop: '6px',
              margin: '6px 0 0 0'
            }}>
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
