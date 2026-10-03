import React from 'react';
import { ShieldCheck, UserCheck, Sparkles, Clock } from 'lucide-react';
import StatCard from '../common/StatCard';

export default function AdminStatsCards({ stats = {}, loading = false }) {
  if (loading) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="admin-card"
            style={{
              height: '110px',
              backgroundColor: 'var(--bg-surface)'
            }}
          />
        ))}
      </div>
    );
  }

  const items = [
    {
      label: 'Total Admins',
      value: stats.totalAdmins || 0,
      icon: ShieldCheck,
      iconColor: 'var(--primary-purple)',
      subtext: 'Provisioned admin accounts'
    },
    {
      label: 'Active Admins',
      value: stats.activeAdmins || 0,
      icon: UserCheck,
      iconColor: 'var(--success)',
      subtext: 'Permitted dashboard access'
    },
    {
      label: 'Super Admins',
      value: stats.superAdmins || 0,
      icon: Sparkles,
      iconColor: 'var(--soft-purple)',
      subtext: 'Unrestricted system operators'
    },
    {
      label: 'Recently Added',
      value: stats.recentlyAdded || 0,
      icon: Clock,
      iconColor: 'var(--info)',
      subtext: 'Provisioned within last 14 days'
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
      {items.map((item, idx) => (
        <StatCard
          key={idx}
          icon={item.icon}
          label={item.label}
          value={item.value}
          iconColor={item.iconColor}
          subtext={item.subtext}
        />
      ))}
    </div>
  );
}
