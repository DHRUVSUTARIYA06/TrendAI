import React, { useState, useRef, useEffect } from 'react';

export default function Dropdown({
  trigger,
  children,
  align = 'right',
  width = '220px',
  style = {}
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block', ...style }}>
      <div onClick={() => setIsOpen((prev) => !prev)} style={{ cursor: 'pointer' }}>
        {typeof trigger === 'function' ? trigger(isOpen) : trigger}
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            [align]: 0,
            width,
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-lg)',
            padding: '6px',
            zIndex: 1000,
            animation: 'fadeIn 0.15s ease'
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
