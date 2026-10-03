import React from 'react';
import { Bell, Mail, AlertTriangle, Users, Layers, TrendingUp } from 'lucide-react';

function SettingToggleItem({ id, title, description, icon: Icon, checked, onChange, iconColor = 'var(--text-secondary)' }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 0',
        borderBottom: '1px solid var(--border-color)',
        gap: '16px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        {Icon && (
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-elevated)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: iconColor,
              marginTop: '2px',
              flexShrink: 0
            }}
          >
            <Icon size={16} />
          </div>
        )}
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
            {title}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.4 }}>
            {description}
          </div>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        id={id}
        aria-checked={Boolean(checked)}
        onClick={() => onChange(!checked)}
        style={{
          width: '44px',
          height: '24px',
          backgroundColor: checked ? 'var(--primary-purple)' : 'var(--bg-elevated)',
          borderRadius: '12px',
          border: `1px solid ${checked ? 'var(--primary-purple)' : 'var(--border-color)'}`,
          position: 'relative',
          cursor: 'pointer',
          padding: 0,
          flexShrink: 0,
          transition: 'background-color 0.2s, border-color 0.2s'
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '2px',
            left: checked ? '22px' : '2px',
            width: '18px',
            height: '18px',
            backgroundColor: '#FFFFFF',
            borderRadius: '50%',
            transition: 'left 0.2s ease',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.4)'
          }}
        />
      </button>
    </div>
  );
}

export default function NotificationSettingsSection({ data = {}, onChange }) {
  return (
    <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: 'var(--warning-dim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--warning)'
          }}
        >
          <Bell size={20} />
        </div>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Notification Channels & Alerts
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
            Control automated administrative alerts, weekly metric digests, and operational events.
          </p>
        </div>
      </div>

      {/* Toggles */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <SettingToggleItem
          id="emailNotifications"
          title="Email Notifications"
          description="Send security alerts, database maintenance notifications, and error warnings to the support email."
          icon={Mail}
          iconColor="var(--info)"
          checked={data.emailNotifications}
          onChange={(val) => onChange('emailNotifications', val)}
        />

        <SettingToggleItem
          id="systemAlerts"
          title="System & Infrastructure Alerts"
          description="Display priority broadcast banners at the top of the admin panel for scheduled downtime."
          icon={AlertTriangle}
          iconColor="var(--warning)"
          checked={data.systemAlerts}
          onChange={(val) => onChange('systemAlerts', val)}
        />

        <SettingToggleItem
          id="userActivityAlerts"
          title="User Anomaly & Activity Alerts"
          description="Notify administrators if an account experiences abnormal generation velocity or suspicious requests."
          icon={Users}
          iconColor="var(--soft-purple)"
          checked={data.userActivityAlerts}
          onChange={(val) => onChange('userActivityAlerts', val)}
        />

        <SettingToggleItem
          id="templateModerationAlerts"
          title="Template Moderation Alerts"
          description="Instant notifications whenever a template is flagged by users or awaits publishing approval."
          icon={Layers}
          iconColor="var(--primary-purple)"
          checked={data.templateModerationAlerts}
          onChange={(val) => onChange('templateModerationAlerts', val)}
        />

        <SettingToggleItem
          id="weeklyAnalyticsSummary"
          title="Weekly Analytics Digest"
          description="Generate and transmit aggregate performance reports every Monday morning with key trend insights."
          icon={TrendingUp}
          iconColor="var(--success)"
          checked={data.weeklyAnalyticsSummary}
          onChange={(val) => onChange('weeklyAnalyticsSummary', val)}
        />
      </div>
    </div>
  );
}
