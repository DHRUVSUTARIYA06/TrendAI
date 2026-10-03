import React from 'react';
import { Info, Cpu, Database, Code2, RefreshCcw, ShieldCheck, Sparkles } from 'lucide-react';

export default function AboutSettingsSection({ data = {}, onResetDefaults }) {
  const infoItems = [
    {
      label: 'Application Platform',
      value: data.appName ? `${data.appName} ${data.title || 'Master Admin Panel'}` : 'Promptoo Master Admin Panel',
      icon: Sparkles,
      color: 'var(--primary-purple)'
    },
    {
      label: 'System Version',
      value: `v${data.version || '2.4.0'}`,
      badge: 'Production Candidate',
      icon: ShieldCheck,
      color: 'var(--success)'
    },
    {
      label: 'Operating Environment',
      value: data.environment || 'Development (Mock Repository Mode)',
      icon: Cpu,
      color: 'var(--warning)'
    },
    {
      label: 'Frontend Technology Stack',
      value: data.technology || 'React 19, Vite, Recharts, Lucide Icons',
      icon: Code2,
      color: 'var(--info)'
    },
    {
      label: 'Backend Gateway Connection',
      value: data.backendConnection || 'Not configured (Supabase ready)',
      icon: Database,
      color: 'var(--soft-purple)'
    }
  ];

  return (
    <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: 'var(--primary-dim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-purple)'
          }}
        >
          <Info size={20} />
        </div>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            System Information & Diagnostic Details
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
            Build version, component architecture, and factory configuration recovery.
          </p>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '14px'
        }}
      >
        {infoItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              style={{
                padding: '16px 18px',
                borderRadius: '10px',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.color,
                  flexShrink: 0,
                  marginTop: '2px'
                }}
              >
                <Icon size={16} />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)' }}>
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginTop: '2px',
                    wordBreak: 'break-word',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexWrap: 'wrap'
                  }}
                >
                  <span>{item.value}</span>
                  {item.badge && (
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--success-dim)',
                        color: 'var(--success)',
                        border: '1px solid var(--success-border)'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Factory Reset Section */}
      <div
        style={{
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: 'rgba(239, 68, 68, 0.04)',
          border: '1px solid var(--danger-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--danger)', margin: 0 }}>
              Factory Defaults Recovery
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              Restore all application settings, flags, and interface preferences to initial factory defaults.
            </p>
          </div>

          <button
            type="button"
            onClick={onResetDefaults}
            className="btn btn-danger btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <RefreshCcw size={14} />
            <span>Reset to Factory Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
}
