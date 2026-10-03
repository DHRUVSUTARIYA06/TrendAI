import React from 'react';
import { Sparkles } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Sparkles,
  title = 'No items found',
  description = 'There are no records to display at this time.',
  actionLabel = null,
  onAction = null,
  style = {}
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '56px 24px',
        textAlign: 'center',
        ...style
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--soft-purple)',
          marginBottom: '16px'
        }}
      >
        {Icon ? <Icon size={24} /> : <Sparkles size={24} />}
      </div>

      <h3 style={{
        fontSize: '16px',
        fontWeight: 600,
        color: 'var(--text-primary)',
        margin: '0 0 6px 0'
      }}>
        {title}
      </h3>

      <p style={{
        fontSize: '13px',
        color: 'var(--text-secondary)',
        maxWidth: '380px',
        margin: '0 0 20px 0',
        lineHeight: 1.5
      }}>
        {description}
      </p>

      {actionLabel && onAction && (
        <button onClick={onAction} className="btn btn-primary btn-sm">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
