import React from 'react';
import { Tag } from 'lucide-react';

export default function CategoryPerformanceCard({ categories = [] }) {
  return (
    <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Category Performance
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            Most popular style categories by user creations
          </p>
        </div>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--soft-purple)'
        }}>
          <Tag size={16} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
        {categories.map((cat, idx) => (
          <div key={cat.name || idx}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {cat.name}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {cat.countLabel || `${cat.uses.toLocaleString()} uses`}
                </span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', minWidth: '32px', textAlign: 'right' }}>
                  {cat.percentage}%
                </span>
              </div>
            </div>

            {/* Clean Progress Bar with Purple Accent */}
            <div style={{
              height: '7px',
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: '4px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div
                style={{
                  width: `${cat.percentage}%`,
                  height: '100%',
                  backgroundColor: 'var(--primary-purple)',
                  borderRadius: '4px',
                  transition: 'width 0.4s ease'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
