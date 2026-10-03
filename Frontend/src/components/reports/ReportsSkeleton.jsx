import React from 'react';

export default function ReportsSkeleton() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}
    >
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="admin-card"
          style={{
            height: '220px',
            backgroundColor: 'var(--bg-surface)'
          }}
        />
      ))}
    </div>
  );
}
