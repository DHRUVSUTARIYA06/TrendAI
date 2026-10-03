import React from 'react';

/**
 * Promptoo Admin — Common Toggle Switch Component
 *
 * @param {boolean} checked - Current toggle state
 * @param {function} onChange - Callback on state change (receives new boolean value)
 * @param {string} [label] - Primary label
 * @param {string} [description] - Subtitle / description below label
 * @param {boolean} [disabled=false] - Whether the toggle is disabled
 * @param {string} [id] - Accessible identifier
 */
export default function Toggle({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  id
}) {
  const toggleId = id || (label ? `toggle-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e) => {
    if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      if (onChange) onChange(!checked);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      onClick={handleClick}
    >
      {(label || description) && (
        <div style={{ flex: 1 }}>
          {label && (
            <label
              htmlFor={toggleId}
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                cursor: disabled ? 'not-allowed' : 'pointer'
              }}
            >
              {label}
            </label>
          )}
          {description && (
            <p
              style={{
                margin: '2px 0 0 0',
                fontSize: '12px',
                color: 'var(--text-secondary)',
                lineHeight: 1.4
              }}
            >
              {description}
            </p>
          )}
        </div>
      )}

      <button
        type="button"
        id={toggleId}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        style={{
          width: '44px',
          height: '24px',
          borderRadius: '12px',
          backgroundColor: checked ? 'var(--primary)' : 'var(--bg-surface-hover, rgba(255, 255, 255, 0.15))',
          position: 'relative',
          border: '1px solid var(--border-default)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s ease, border-color 0.2s ease',
          padding: 0,
          outline: 'none',
          flexShrink: 0
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '2px',
            left: checked ? '22px' : '2px',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </button>
    </div>
  );
}
