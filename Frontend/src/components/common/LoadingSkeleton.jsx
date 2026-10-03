import React from 'react';

/**
 * Promptoo Admin — Common Loading Skeleton Component
 *
 * @param {string|number} [width='100%'] - Width of skeleton
 * @param {string|number} [height='20px'] - Height of skeleton
 * @param {string} [borderRadius='6px'] - Border radius
 * @param {number} [count=1] - Number of repetitive skeleton bars
 * @param {object} [style] - Inline style overrides
 */
export default function LoadingSkeleton({
  width = '100%',
  height = '20px',
  borderRadius = '6px',
  count = 1,
  style = {}
}) {
  const items = Array.from({ length: count });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {items.map((_, i) => (
        <div
          key={i}
          className="skeleton-pulse"
          style={{
            width,
            height,
            borderRadius,
            backgroundColor: 'var(--bg-surface-hover, rgba(255, 255, 255, 0.08))',
            animation: 'pulse 1.5s ease-in-out infinite',
            ...style
          }}
        />
      ))}
    </div>
  );
}
