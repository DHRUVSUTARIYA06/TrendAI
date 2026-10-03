import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
      <Link to="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)', transition: 'color 0.15s' }}>
        <Home size={14} />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight size={13} color="var(--border-strong)" />
            {isLast || !item.path ? (
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{item.label}</span>
            ) : (
              <Link to={item.path} style={{ color: 'var(--text-secondary)' }}>
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
