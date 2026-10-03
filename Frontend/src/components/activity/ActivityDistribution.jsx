import React from 'react';

export default function ActivityDistribution({ distribution = [] }) {
  return (
    <div className="admin-card" style={{ flex: '1 1 300px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
          Activity Distribution
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
          Breakdown of user actions by interaction type
        </p>
      </div>

      {!distribution || distribution.length === 0 ? (
        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
          No distribution metrics recorded.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {distribution.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {item.type}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>{item.count?.toLocaleString()}</strong> ({item.percentage}%)
                </span>
              </div>

              {/* Progress bar */}
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: 'var(--bg-elevated)',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(Math.max(item.percentage, 1), 100)}%`,
                    backgroundColor: item.color,
                    borderRadius: '3px',
                    transition: 'width 0.4s ease'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
