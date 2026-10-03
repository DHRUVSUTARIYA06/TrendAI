import React from 'react';
import { Activity } from 'lucide-react';

export default function UserActivitySummary({ summary }) {
  if (!summary) return null;

  const items = [
    {
      label: 'Active Today',
      count: summary.activeToday,
      percentage: summary.activeTodayPercent,
      color: 'var(--success)',
      subtext: 'Logged in or transformed in last 24h'
    },
    {
      label: 'Active This Week',
      count: summary.activeThisWeek,
      percentage: summary.activeWeekPercent,
      color: 'var(--primary-purple)',
      subtext: 'Interacted in last 7 days'
    },
    {
      label: 'Active This Month',
      count: summary.activeThisMonth,
      percentage: summary.activeMonthPercent,
      color: 'var(--info)',
      subtext: 'Interacted in last 30 days'
    },
    {
      label: 'Inactive Users',
      count: summary.inactiveUsers,
      percentage: summary.inactivePercent,
      color: 'var(--text-muted)',
      subtext: 'No activity in > 30 days'
    }
  ];

  return (
    <div className="admin-card" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Activity size={18} color="var(--primary-purple)" />
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            User Activity Summary
          </h3>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
          Creator engagement frequency based on active session telemetry
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {items.map((item, idx) => (
          <div key={idx}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
              <div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {item.label}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '8px' }}>
                  {item.subtext}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                  {item.count?.toLocaleString()}
                </strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '4px' }}>
                  ({item.percentage}%)
                </span>
              </div>
            </div>

            <div
              style={{
                height: '6px',
                backgroundColor: 'var(--bg-elevated)',
                borderRadius: '3px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${item.percentage}%`,
                  height: '100%',
                  backgroundColor: item.color,
                  borderRadius: '3px'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
