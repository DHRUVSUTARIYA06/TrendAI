import React from 'react';
import { Sliders, Flame, Sparkles, Trophy, Bookmark, Heart, Bell, Calendar } from 'lucide-react';
import { LEADERBOARD_PERIOD_OPTIONS } from '../../types/settings';

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

export default function ApplicationSettingsSection({ data = {}, onChange }) {
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
          <Sliders size={20} />
        </div>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Application Feature Flags
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
            Control user-facing feature flags, algorithms, and mobile client capabilities in real time.
          </p>
        </div>
      </div>

      {/* Feature Toggles */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <SettingToggleItem
          id="enableTrendingTemplates"
          title="Trending Templates Algorithm"
          description="Surface high-velocity AI transformation templates automatically into the trending mobile ribbon."
          icon={Flame}
          iconColor="var(--warning)"
          checked={data.enableTrendingTemplates}
          onChange={(val) => onChange('enableTrendingTemplates', val)}
        />

        <SettingToggleItem
          id="enableFeaturedTemplates"
          title="Featured Showcase Carousel"
          description="Display editorially curated hero templates at the top of the mobile home explore view."
          icon={Sparkles}
          iconColor="var(--soft-purple)"
          checked={data.enableFeaturedTemplates}
          onChange={(val) => onChange('enableFeaturedTemplates', val)}
        />

        <SettingToggleItem
          id="enableLeaderboard"
          title="Creator Leaderboard"
          description="Enable creator ranking competition showcasing top template authors and prompt engineers."
          icon={Trophy}
          iconColor="var(--warning)"
          checked={data.enableLeaderboard}
          onChange={(val) => onChange('enableLeaderboard', val)}
        />

        {/* Dependent option: default period */}
        {data.enableLeaderboard && (
          <div
            style={{
              padding: '14px 20px',
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: '8px',
              margin: '12px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={16} color="var(--primary-purple)" />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Default Leaderboard Period
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Initial timeframe shown on client load
                </div>
              </div>
            </div>

            <select
              value={data.leaderboardDefaultPeriod || 'weekly'}
              onChange={(e) => onChange('leaderboardDefaultPeriod', e.target.value)}
              style={{ width: '160px' }}
            >
              {LEADERBOARD_PERIOD_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <SettingToggleItem
          id="enableSaves"
          title="Bookmark & Save Collections"
          description="Allow mobile users to save templates to private favorites and bookmarked inspiration sets."
          icon={Bookmark}
          iconColor="var(--info)"
          checked={data.enableSaves}
          onChange={(val) => onChange('enableSaves', val)}
        />

        <SettingToggleItem
          id="enableLikes"
          title="Social Likes & Reactions"
          description="Permit users to express engagement with hearts and contribute to global template ranking metrics."
          icon={Heart}
          iconColor="var(--danger)"
          checked={data.enableLikes}
          onChange={(val) => onChange('enableLikes', val)}
        />

        <SettingToggleItem
          id="enableNotifications"
          title="Push Notification Dispatch Engine"
          description="Broadcast new template drops, leaderboard updates, and promotional campaigns to mobile clients."
          icon={Bell}
          iconColor="var(--primary-purple)"
          checked={data.enableNotifications}
          onChange={(val) => onChange('enableNotifications', val)}
        />
      </div>
    </div>
  );
}
