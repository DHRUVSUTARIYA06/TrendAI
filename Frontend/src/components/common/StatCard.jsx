import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({
  icon: Icon,
  label,
  value,
  change = null,
  changeType = 'positive', // 'positive' | 'negative' | 'neutral'
  subtext = null,
  iconColor = 'var(--primary-purple)',
  style = {}
}) {
  return (
    <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>
          {label}
        </span>
        {Icon && (
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: 'var(--stat-icon-bg)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: iconColor
            }}
          >
            <Icon size={20} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '8px' }}>
        <span style={{
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.5px',
          lineHeight: 1.1
        }}>
          {value}
        </span>

        {change && (
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              color:
                changeType === 'positive'
                  ? 'var(--success)'
                  : changeType === 'negative'
                  ? 'var(--danger)'
                  : 'var(--text-muted)'
            }}
          >
            {changeType === 'positive' && <TrendingUp size={13} />}
            {changeType === 'negative' && <TrendingDown size={13} />}
            {change}
          </span>
        )}
      </div>

      {subtext && (
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          {subtext}
        </span>
      )}
    </div>
  );
}
