import React from 'react';
import { Tag, CheckCircle2, PauseCircle, Layers, Star } from 'lucide-react';

export default function CategoryStatsCards({ stats = {}, loading = false }) {
  const cards = [
    {
      label: 'Total Categories',
      value: stats.totalCategories?.toLocaleString() || '12',
      icon: Tag,
      color: 'var(--primary-purple)',
      bg: 'var(--primary-dim)'
    },
    {
      label: 'Active Categories',
      value: stats.active?.toLocaleString() || '10',
      icon: CheckCircle2,
      color: 'var(--success)',
      bg: 'var(--success-dim)'
    },
    {
      label: 'Inactive Categories',
      value: stats.inactive?.toLocaleString() || '2',
      icon: PauseCircle,
      color: 'var(--text-muted)',
      bg: 'rgba(113, 113, 122, 0.12)'
    },
    {
      label: 'Total Templates',
      value: stats.totalTemplates?.toLocaleString() || '1,248',
      icon: Layers,
      color: '#A78BFA',
      bg: 'rgba(167, 139, 250, 0.12)'
    },
    {
      label: 'Featured Categories',
      value: stats.featured?.toLocaleString() || '6',
      icon: Star,
      color: 'var(--warning)',
      bg: 'var(--warning-dim)'
    }
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
