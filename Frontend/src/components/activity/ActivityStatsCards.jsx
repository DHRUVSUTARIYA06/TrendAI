import React from 'react';
import { Heart, Play, Bookmark, Users } from 'lucide-react';

export default function ActivityStatsCards({ stats = {}, loading = false }) {
  const cards = [
    {
      label: 'Total Likes',
      value: stats.totalLikes?.toLocaleString() || '24,820',
      change: stats.likesChange || '+12.4%',
      icon: Heart,
      color: '#F43F5E',
      bg: 'rgba(244, 63, 94, 0.1)'
    },
    {
      label: 'Total Template Uses',
      value: stats.totalUses?.toLocaleString() || '68,450',
      change: stats.usesChange || '+18.2%',
      icon: Play,
      color: 'var(--primary-purple)',
      bg: 'var(--primary-dim)'
    },
    {
      label: 'Total Saves',
      value: stats.totalSaves?.toLocaleString() || '14,290',
      change: stats.savesChange || '+9.6%',
      icon: Bookmark,
      color: '#A78BFA',
      bg: 'rgba(167, 139, 250, 0.1)'
    },
    {
      label: 'Active Users',
      value: stats.activeUsers?.toLocaleString() || '2,847',
      change: stats.activeUsersChange || '+8.3%',
      icon: Users,
      color: 'var(--info)',
      bg: 'var(--info-dim)'
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
              {card.change && (
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--success)',
                    marginTop: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>{card.change}</span>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>vs previous cycle</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
