import React from 'react';

export default function AdminSkeleton() {
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="admin-card"
            style={{ height: '110px', backgroundColor: 'var(--bg-surface)' }}
          />
        ))}
      </div>
      <div className="admin-card" style={{ height: '340px', backgroundColor: 'var(--bg-surface)' }} />
    </div>
  );
}
