import React from 'react';

export function NotificationTableSkeleton({ rows = 6 }) {
  return (
    <div className="admin-card" style={{ padding: '0', overflow: 'hidden', marginBottom: '20px' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '20px' }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            style={{
              height: '14px',
              width: i === 1 ? '160px' : '90px',
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: '4px'
            }}
          />
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {Array.from({ length: rows }).map((_, idx) => (
          <div
            key={idx}
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 2 }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-elevated)'
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                <div style={{ width: '180px', height: '14px', backgroundColor: 'var(--bg-elevated)', borderRadius: '4px' }} />
                <div style={{ width: '260px', height: '11px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '3px' }} />
              </div>
            </div>

            <div style={{ width: '90px', height: '16px', backgroundColor: 'var(--bg-elevated)', borderRadius: '4px' }} />
            <div style={{ width: '70px', height: '20px', backgroundColor: 'var(--bg-elevated)', borderRadius: '10px' }} />
            <div style={{ width: '100px', height: '14px', backgroundColor: 'var(--bg-elevated)', borderRadius: '4px' }} />
            <div style={{ width: '100px', height: '14px', backgroundColor: 'var(--bg-elevated)', borderRadius: '4px' }} />
            <div style={{ width: '80px', height: '28px', backgroundColor: 'var(--bg-elevated)', borderRadius: '6px' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function NotificationDetailSkeleton() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
      <div className="admin-card" style={{ height: '320px', backgroundColor: 'var(--bg-surface)' }} />
      <div className="admin-card" style={{ height: '320px', backgroundColor: 'var(--bg-surface)' }} />
    </div>
  );
}
