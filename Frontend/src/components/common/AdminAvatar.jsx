import React from 'react';

export default function AdminAvatar({
  name = 'Admin',
  size = 36,
  src = null
}) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--primary-purple), var(--secondary-purple))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontWeight: 600,
        fontSize: size > 40 ? '16px' : '13px',
        flexShrink: 0,
        boxShadow: 'var(--shadow-primary)',
        overflow: 'hidden'
      }}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        initial
      )}
    </div>
  );
}
