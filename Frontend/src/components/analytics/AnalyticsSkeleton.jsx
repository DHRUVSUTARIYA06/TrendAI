import React from 'react';

export default function AnalyticsSkeleton() {
  return (
    <div>
      {/* Stats Cards Skeleton */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="admin-card"
            style={{
              height: '110px',
              backgroundColor: 'var(--bg-surface)'
            }}
          />
        ))}
      </div>

      {/* Charts Grid Skeleton */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          marginBottom: '24px'
        }}
      >
        <div className="admin-card" style={{ height: '340px', backgroundColor: 'var(--bg-surface)' }} />
        <div className="admin-card" style={{ height: '340px', backgroundColor: 'var(--bg-surface)' }} />
      </div>

      {/* Tables Grid Skeleton */}
      <div className="admin-card" style={{ height: '320px', backgroundColor: 'var(--bg-surface)' }} />
    </div>
  );
}
