import React from 'react';

const pulseStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.04)',
  borderRadius: '8px',
  animation: 'skeletonPulse 1.5s ease-in-out infinite'
};

export default function DashboardSkeleton() {
  return (
    <div>
      <style>{`
        @keyframes skeletonPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>

      {/* Top 4 Stat Cards Skeleton */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '28px'
      }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="admin-card" style={{ height: '140px', padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ ...pulseStyle, width: '90px', height: '16px' }} />
              <div style={{ ...pulseStyle, width: '40px', height: '40px', borderRadius: '12px' }} />
            </div>
            <div style={{ ...pulseStyle, width: '130px', height: '28px', marginBottom: '10px' }} />
            <div style={{ ...pulseStyle, width: '160px', height: '14px' }} />
          </div>
        ))}
      </div>

      {/* Two Column Charts Skeleton */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px',
        marginBottom: '28px'
      }}>
        <div className="admin-card" style={{ height: '340px', padding: '24px' }}>
          <div style={{ ...pulseStyle, width: '140px', height: '20px', marginBottom: '8px' }} />
          <div style={{ ...pulseStyle, width: '220px', height: '14px', marginBottom: '24px' }} />
          <div style={{ ...pulseStyle, width: '100%', height: '220px', borderRadius: '12px' }} />
        </div>

        <div className="admin-card" style={{ height: '340px', padding: '24px' }}>
          <div style={{ ...pulseStyle, width: '120px', height: '20px', marginBottom: '8px' }} />
          <div style={{ ...pulseStyle, width: '160px', height: '14px', marginBottom: '24px' }} />
          <div style={{ ...pulseStyle, width: '100%', height: '220px', borderRadius: '12px' }} />
        </div>
      </div>

      {/* Bottom Grid Skeleton */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px'
      }}>
        <div className="admin-card" style={{ height: '320px', padding: '24px' }}>
          <div style={{ ...pulseStyle, width: '180px', height: '20px', marginBottom: '20px' }} />
          {[1, 2, 3, 4].map((j) => (
            <div key={j} style={{ ...pulseStyle, width: '100%', height: '44px', marginBottom: '12px' }} />
          ))}
        </div>

        <div className="admin-card" style={{ height: '320px', padding: '24px' }}>
          <div style={{ ...pulseStyle, width: '180px', height: '20px', marginBottom: '20px' }} />
          {[1, 2, 3, 4].map((k) => (
            <div key={k} style={{ ...pulseStyle, width: '100%', height: '44px', marginBottom: '12px' }} />
          ))}
        </div>
      </div>
    </div>
  );
}
