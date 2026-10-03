import React from 'react';

export default function LoadingState({ message = 'Loading...', minHeight = '200px' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight,
        gap: '12px',
        color: 'var(--text-secondary)'
      }}
    >
      <div
        style={{
          width: '24px',
          height: '24px',
          border: '2px solid rgba(108, 77, 255, 0.2)',
          borderTopColor: 'var(--primary-purple)',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite'
        }}
      />
      <span style={{ fontSize: '13px' }}>{message}</span>
    </div>
  );
}
