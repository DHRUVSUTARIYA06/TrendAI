import React from 'react';
import { Users, UserCheck, UserPlus, Zap } from 'lucide-react';

export default function UserStatsCards({ stats = {}, loading = false }) {
  const cards = [
    {
      label: 'Total Users',
      value: stats.totalUsers?.toLocaleString() || '24,582',
      icon: Users,
      color: 'var(--primary-purple)',
      bg: 'var(--primary-dim)'
    },
    {
      label: 'Active Users',
      value: stats.activeUsers?.toLocaleString() || '18,420',
      icon: UserCheck,
      color: 'var(--success)',
      bg: 'var(--success-dim)'
    },
    {
      label: 'New Users',
      value: stats.newUsers?.toLocaleString() || '1,284',
      icon: UserPlus,
      color: 'var(--info)',
      bg: 'var(--info-dim)'
    },
    {
      label: 'Users With Activity',
      value: stats.usersWithActivity?.toLocaleString() || '16,840',
      icon: Zap,
      color: 'var(--warning)',
      bg: 'var(--warning-dim)'
    }
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}
    >
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className="admin-card"
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              minWidth: 0
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: card.bg,
                color: card.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <IconComponent size={20} />
            </div>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {card.label}
              </div>
              <div
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.5px'
                }}
              >
                {loading ? '...' : card.value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
