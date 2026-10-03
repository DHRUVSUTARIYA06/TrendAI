import React from 'react';
import { Plus, Users, Trophy, Bell, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ACTIONS = [
  {
    label: 'Add Template',
    description: 'Publish new AI style prompt',
    icon: Plus,
    path: '/admin/templates/new',
    color: 'var(--primary-purple)',
    bg: 'var(--primary-dim)',
    border: 'var(--primary-border)'
  },
  {
    label: 'Manage Users',
    description: 'Inspect creators and accounts',
    icon: Users,
    path: '/admin/users',
    color: 'var(--info)',
    bg: 'var(--info-dim)',
    border: 'var(--info-border)'
  },
  {
    label: 'View Leaderboard',
    description: 'Top ranked creator creators',
    icon: Trophy,
    path: '/admin/leaderboard',
    color: 'var(--warning)',
    bg: 'var(--warning-dim)',
    border: 'var(--warning-border)'
  },
  {
    label: 'Send Notification',
    description: 'Broadcast alerts to creators',
    icon: Bell,
    path: '/admin/notifications',
    color: 'var(--secondary-purple)',
    bg: 'rgba(139, 92, 246, 0.12)',
    border: 'rgba(139, 92, 246, 0.25)'
  }
];

export default function QuickActionsCard() {
  const navigate = useNavigate();

  return (
    <div className="admin-card">
      <div style={{ marginBottom: '18px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
          Quick Actions
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
          Shortcuts to primary administrative workflows
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '14px'
      }}>
        {ACTIONS.map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              onClick={() => navigate(action.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-elevated)';
                e.currentTarget.style.borderColor = 'var(--border-strong)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: action.bg,
                  border: `1px solid ${action.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: action.color,
                  flexShrink: 0
                }}>
                  <Icon size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                    {action.label}
                  </h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                    {action.description}
                  </p>
                </div>
              </div>

              <ArrowRight size={14} color="var(--text-muted)" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
