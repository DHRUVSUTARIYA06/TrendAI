import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorState({
  title = 'Failed to load content',
  message = 'An unexpected error occurred while fetching data.',
  onRetry = null,
  style = {}
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
        ...style
      }}
    >
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          backgroundColor: 'var(--danger-dim)',
          border: '1px solid var(--danger-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--danger)',
          marginBottom: '14px'
        }}
      >
        <AlertCircle size={24} />
      </div>

      <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
        {title}
      </h3>

      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '360px', margin: '0 0 16px 0' }}>
        {message}
      </p>

      {onRetry && (
        <button onClick={onRetry} className="btn btn-secondary btn-sm">
          Try Again
        </button>
      )}
    </div>
  );
}
