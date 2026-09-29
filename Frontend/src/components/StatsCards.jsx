import React from 'react';
import { Layers, Flame, Tag, TrendingUp } from 'lucide-react';

export default function StatsCards({ templates = [], categories = [] }) {
  const totalCreations = templates.reduce((acc, t) => acc + (t.usageCount || 0), 0);
  const trendingCount = templates.filter((t) => t.isTrending).length;

  const stats = [
    {
      label: 'Total Templates',
      value: templates.length,
      icon: Layers,
      color: '#8B5CF6',
      subtext: 'Active in mobile app',
    },
    {
      label: 'Categories',
      value: categories.length,
      icon: Tag,
      color: '#EC4899',
      subtext: 'Filter categories',
    },
    {
      label: 'Trending Styles',
      value: trendingCount,
      icon: Flame,
      color: '#F59E0B',
      subtext: 'Featured on home screen',
    },
    {
      label: 'Total Generations',
      value: totalCreations >= 1000 ? `${(totalCreations / 1000).toFixed(1)}k` : totalCreations,
      icon: TrendingUp,
      color: '#10B981',
      subtext: 'Created by users',
    },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '20px',
      marginBottom: '32px'
    }}>
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="card"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 24px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '500' }}>
                {stat.label}
              </p>
              <h3 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                {stat.value}
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                {stat.subtext}
              </p>
            </div>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '16px',
              background: `${stat.color}18`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${stat.color}35`,
            }}>
              <Icon size={24} color={stat.color} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
