import React from 'react';
import { Globe, Palette, Bell, ShieldCheck, Sliders, Info } from 'lucide-react';
import { SETTINGS_TABS } from '../../types/settings';

const ICON_MAP = {
  Globe,
  Palette,
  Bell,
  ShieldCheck,
  Sliders,
  Info
};

export default function SettingsNav({ activeTab, onSelectTab }) {
  return (
    <div
      className="admin-card"
      style={{
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}
    >
      {SETTINGS_TABS.map((tab) => {
        const IconComponent = ICON_MAP[tab.icon] || Info;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 14px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: isActive ? 'var(--primary-dim)' : 'transparent',
              color: isActive ? 'var(--nav-active-text)' : 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: isActive ? 600 : 500,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s ease'
            }}
          >
            <IconComponent
              size={17}
              color={isActive ? 'var(--primary-purple)' : 'var(--text-muted)'}
            />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
