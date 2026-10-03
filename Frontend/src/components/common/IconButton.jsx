import React from 'react';

export default function IconButton({
  icon: Icon,
  onClick,
  title,
  badge = null,
  active = false,
  variant = 'default', // 'default' | 'danger'
  style = {}
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="btn-icon"
      style={{
        position: 'relative',
        color: variant === 'danger' ? 'var(--danger)' : active ? 'var(--primary-purple)' : 'var(--text-secondary)',
        ...style
      }}
    >
      {Icon && <Icon size={18} />}
      {badge && (
        <span
          style={{
            position: 'absolute',
            top: '7px',
            right: '7px',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: 'var(--danger)',
            border: '2px solid var(--bg-surface)'
          }}
        />
      )}
    </button>
  );
}
