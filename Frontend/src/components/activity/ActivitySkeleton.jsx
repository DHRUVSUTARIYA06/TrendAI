import React from 'react';

export default function ActivitySkeleton({ rows = 6 }) {
  return (
    <div>
      {/* Stat cards skeleton */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="admin-card"
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              opacity: 0.7
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: 'var(--bg-elevated)',
                animation: 'pulse 1.5s infinite ease-in-out',
                flexShrink: 0
              }}
            />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                style={{
                  height: '11px',
                  width: '60%',
                  borderRadius: '4px',
                  backgroundColor: 'var(--bg-elevated)',
                  animation: 'pulse 1.5s infinite ease-in-out'
                }}
              />
              <div
                style={{
                  height: '20px',
                  width: '45%',
                  borderRadius: '4px',
                  backgroundColor: 'var(--bg-elevated)',
                  animation: 'pulse 1.5s infinite ease-in-out'
                }}
              />
              <div
                style={{
                  height: '10px',
                  width: '75%',
                  borderRadius: '4px',
                  backgroundColor: 'var(--bg-elevated)',
                  animation: 'pulse 1.5s infinite ease-in-out'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div
        className="admin-card"
        style={{
          height: '350px',
          marginBottom: '24px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          opacity: 0.7
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: '180px', height: '18px', borderRadius: '4px', backgroundColor: 'var(--bg-elevated)', animation: 'pulse 1.5s infinite ease-in-out' }} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: '80px', height: '28px', borderRadius: '6px', backgroundColor: 'var(--bg-elevated)', animation: 'pulse 1.5s infinite ease-in-out' }} />
            <div style={{ width: '80px', height: '28px', borderRadius: '6px', backgroundColor: 'var(--bg-elevated)', animation: 'pulse 1.5s infinite ease-in-out' }} />
          </div>
        </div>
        <div style={{ flex: 1, borderRadius: '8px', backgroundColor: 'var(--bg-elevated)', animation: 'pulse 1.5s infinite ease-in-out' }} />
      </div>

      {/* 3 Analytics Cards Skeleton */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="admin-card"
            style={{
              padding: '20px',
              height: '320px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              opacity: 0.7
            }}
          >
            <div style={{ width: '140px', height: '16px', borderRadius: '4px', backgroundColor: 'var(--bg-elevated)', animation: 'pulse 1.5s infinite ease-in-out' }} />
            {Array.from({ length: 4 }).map((__, i) => (
              <div key={i} style={{ height: '52px', borderRadius: '8px', backgroundColor: 'var(--bg-elevated)', animation: 'pulse 1.5s infinite ease-in-out' }} />
            ))}
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '150px', paddingLeft: '18px' }}>Date & Time</th>
              <th style={{ width: '220px' }}>User</th>
              <th style={{ width: '110px' }}>Activity</th>
              <th style={{ width: '230px' }}>Template</th>
              <th style={{ width: '130px' }}>Category</th>
              <th style={{ width: '100px' }}>Status</th>
              <th style={{ width: '150px', textAlign: 'right', paddingRight: '18px' }}></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, idx) => (
              <tr key={idx} style={{ opacity: 0.6 }}>
                <td style={{ paddingLeft: '18px' }}>
                  <div style={{ width: '90px', height: '14px', borderRadius: '4px', backgroundColor: 'var(--bg-elevated)', animation: 'pulse 1.5s infinite ease-in-out' }} />
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--bg-elevated)', animation: 'pulse 1.5s infinite ease-in-out', flexShrink: 0 }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                      <div style={{ width: '60%', height: '13px', borderRadius: '4px', backgroundColor: 'var(--bg-elevated)', animation: 'pulse 1.5s infinite ease-in-out' }} />
                      <div style={{ width: '40%', height: '10px', borderRadius: '4px', backgroundColor: 'var(--bg-elevated)', animation: 'pulse 1.5s infinite ease-in-out' }} />
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ width: '60px', height: '22px', borderRadius: '6px', backgroundColor: 'var(--bg-elevated)', animation: 'pulse 1.5s infinite ease-in-out' }} />
                </td>
                <td>
                  <div style={{ width: '120px', height: '14px', borderRadius: '4px', backgroundColor: 'var(--bg-elevated)', animation: 'pulse 1.5s infinite ease-in-out' }} />
                </td>
                <td>
                  <div style={{ width: '80px', height: '13px', borderRadius: '4px', backgroundColor: 'var(--bg-elevated)', animation: 'pulse 1.5s infinite ease-in-out' }} />
                </td>
                <td>
                  <div style={{ width: '55px', height: '20px', borderRadius: '10px', backgroundColor: 'var(--bg-elevated)', animation: 'pulse 1.5s infinite ease-in-out' }} />
                </td>
                <td style={{ textAlign: 'right', paddingRight: '18px' }}>
                  <div style={{ width: '80px', height: '28px', marginLeft: 'auto', borderRadius: '6px', backgroundColor: 'var(--bg-elevated)', animation: 'pulse 1.5s infinite ease-in-out' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
