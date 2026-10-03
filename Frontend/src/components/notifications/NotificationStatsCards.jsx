import React from 'react';
import { Bell, FileEdit, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import StatCard from '../common/StatCard';

export default function NotificationStatsCards({ stats = {}, loading = false }) {
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
        {[1, 2, 3, 4, 5].map((i) => (
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
      label: 'Total Notifications',
      value: stats.total || 0,
      icon: Bell,
      iconColor: 'var(--primary-purple)',
      subtext: 'All system and marketing dispatches'
    },
    {
      label: 'Drafts',
      value: stats.drafts || 0,
      icon: FileEdit,
      iconColor: 'var(--text-secondary)',
      subtext: 'Awaiting scheduling or review'
    },
    {
      label: 'Scheduled',
      value: stats.scheduled || 0,
      icon: Clock,
      iconColor: 'var(--warning)',
      subtext: 'Queued for future delivery'
    },
    {
      label: 'Sent',
      value: stats.sent || 0,
      icon: CheckCircle2,
      iconColor: 'var(--success)',
      subtext: 'Delivered in demo mode'
    },
    {
      label: 'Failed',
      value: stats.failed || 0,
      icon: AlertTriangle,
      iconColor: 'var(--danger)',
      subtext: 'Transmission errors encountered'
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
