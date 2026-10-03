import React from 'react';
import { Users, Layers, Trophy, Sparkles } from 'lucide-react';

export default function LeaderboardStatsCards({ stats = {}, period = 'weekly', loading = false }) {
  const isWeekly = period === 'weekly';

  const cards = [
    {
      label: 'Total Ranked Users',
      value: stats.totalRankedUsers?.toLocaleString() || (isWeekly ? '148' : '1,240'),
      subtext: isWeekly ? 'Active creators this week' : 'All-time ranked creators',
      icon: Users,
      color: 'var(--primary-purple)',
      bg: 'var(--primary-dim)'
    },
    {
      label: isWeekly ? 'Weekly Creations' : 'Total Creations',
      value: stats.totalCreations?.toLocaleString() || (isWeekly ? '2,490' : '38,720'),
      subtext: isWeekly ? 'Generated over last 7 days' : 'Lifetime platform creations',
      icon: Layers,
      color: 'var(--info)',
      bg: 'var(--info-dim)'
    },
    {
      label: 'Top User Creations',
      value: stats.topUserCreations?.toLocaleString() || (isWeekly ? '28' : '215'),
      subtext: isWeekly ? '#1 creator this week' : '#1 all-time record',
      icon: Trophy,
      color: 'var(--warning)',
      bg: 'var(--warning-dim)'
    },
    {
      label: 'Average Creations',
      value: stats.avgCreations || (isWeekly ? '16.8' : '31.2'),
      subtext: 'Per ranked creator',
      icon: Sparkles,
      color: 'var(--soft-purple)',
      bg: 'rgba(167, 139, 250, 0.12)'
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
                  marginBottom: '2px',
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
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  marginTop: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {card.subtext}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
