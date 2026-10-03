import React from 'react';
import { UserPlus, Sparkles, Heart, Settings } from 'lucide-react';

const TYPE_ICONS = {
  user: { icon: UserPlus, color: 'var(--info)', bg: 'var(--info-dim)', border: 'var(--info-border)' },
  template: { icon: Sparkles, color: 'var(--primary-purple)', bg: 'var(--primary-dim)', border: 'var(--primary-border)' },
  like: { icon: Heart, color: 'var(--danger)', bg: 'var(--danger-dim)', border: 'var(--danger-border)' },
  system: { icon: Settings, color: 'var(--warning)', bg: 'var(--warning-dim)', border: 'var(--warning-border)' }
};

export default function RecentActivityCard({ activities = [] }) {
  return (
    <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Recent Activity
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            System events, user creations, and administrative updates
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        {activities.map((item) => {
          const cfg = TYPE_ICONS[item.type] || TYPE_ICONS.template;
          const Icon = cfg.icon;

          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '11px 13px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: cfg.bg,
                  border: `1px solid ${cfg.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: cfg.color,
                  flexShrink: 0
                }}>
                  <Icon size={16} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <h4 style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    margin: '2px 0 0 0',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {item.description}
                  </p>
                </div>
              </div>

              <span style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {item.timestamp}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
