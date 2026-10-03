import React from 'react';
import { Smartphone } from 'lucide-react';

export default function PlatformOverview({ platforms = [] }) {
  const hasData = platforms && platforms.length > 0;

  return (
    <div className="admin-card" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Smartphone size={18} color="var(--primary-purple)" />
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Platform Overview
          </h3>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
          Client telemetry across mobile and desktop interfaces
        </p>
      </div>

      {!hasData ? (
        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
          No platform data available for the selected period.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {platforms.map((p, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {p.platform}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {p.users?.toLocaleString()} users ({p.percentage}%)
                </span>
              </div>
              <div
                style={{
                  height: '6px',
                  backgroundColor: 'var(--bg-elevated)',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: `${p.percentage}%`,
                    height: '100%',
                    backgroundColor: p.color,
                    borderRadius: '3px'
                  }}
                />
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: '8px',
              padding: '10px 12px',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              fontSize: '11px',
              color: 'var(--text-muted)',
              lineHeight: 1.4
            }}
          >
            Connected to Flutter mobile client & admin web telemetry stream.
          </div>
        </div>
      )}
    </div>
  );
}
