import React from 'react';
import { Users, UserPlus, Zap, Layers, Heart, Bookmark } from 'lucide-react';
import StatCard from '../common/StatCard';

export default function AnalyticsStatsCards({ stats, loading = false }) {
  if (loading || !stats) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="admin-card"
            style={{
              height: '110px',
              backgroundColor: 'var(--bg-surface)',
              animation: 'pulse 1.5s infinite ease-in-out'
            }}
          />
        ))}
      </div>
    );
  }

  const items = [
    {
      label: 'Total Users',
      value: stats.totalUsers?.toLocaleString() || '0',
      change: stats.changes?.totalUsers,
      changeType: 'positive',
      icon: Users,
      iconColor: 'var(--primary-purple)',
      subtext: stats.comparisonPeriod
    },
    {
      label: 'New Users',
      value: stats.newUsers?.toLocaleString() || '0',
      change: stats.changes?.newUsers,
      changeType: 'positive',
      icon: UserPlus,
      iconColor: 'var(--info)',
      subtext: stats.comparisonPeriod
    },
    {
      label: 'Active Users',
      value: stats.activeUsers?.toLocaleString() || '0',
      change: stats.changes?.activeUsers,
      changeType: 'positive',
      icon: Zap,
      iconColor: 'var(--success)',
      subtext: stats.comparisonPeriod
    },
    {
      label: 'Template Uses',
      value: stats.templateUses?.toLocaleString() || '0',
      change: stats.changes?.templateUses,
      changeType: 'positive',
      icon: Layers,
      iconColor: 'var(--soft-purple)',
      subtext: stats.comparisonPeriod
    },
    {
      label: 'Total Likes',
      value: stats.totalLikes?.toLocaleString() || '0',
      change: stats.changes?.totalLikes,
      changeType: 'positive',
      icon: Heart,
      iconColor: '#F43F5E',
      subtext: stats.comparisonPeriod
    },
    {
      label: 'Total Saves',
      value: stats.totalSaves?.toLocaleString() || '0',
      change: stats.changes?.totalSaves,
      changeType: 'positive',
      icon: Bookmark,
      iconColor: '#A78BFA',
      subtext: stats.comparisonPeriod
    }
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}
    >
      {items.map((item, idx) => (
        <StatCard
          key={idx}
          icon={item.icon}
          label={item.label}
          value={item.value}
          change={item.change}
          changeType={item.changeType}
          iconColor={item.iconColor}
          subtext={item.subtext}
        />
      ))}
    </div>
  );
}
