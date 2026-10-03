import React from 'react';
import { Palette, Moon, Sun, Monitor, Check, Sidebar, Sparkles, Navigation } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

function SettingToggleItem({ id, title, description, icon: Icon, checked, onChange }) {
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
              color: 'var(--text-secondary)',
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

export default function AppearanceSettingsSection({ data = {}, onChange }) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  // Selected theme is derived from draft data if present, otherwise provider state
  const currentTheme = data.theme || theme || 'system';

  const handleSelectTheme = (selected) => {
    setTheme(selected);
    if (onChange) {
      onChange('theme', selected);
    }
  };

  const themeOptions = [
    {
      id: 'dark',
      label: 'Dark Mode',
      icon: Moon,
      description: 'Optimized for low-light environments with deep slate backgrounds and vivid neon accents.'
    },
    {
      id: 'light',
      label: 'Light Mode',
      icon: Sun,
      description: 'Warm, high-contrast palette with soft paper tones and refined purple typography.'
    },
    {
      id: 'system',
      label: 'System Mode',
      icon: Monitor,
      description: `Automatically synchronizes with your device preference (currently ${
        resolvedTheme === 'dark' ? 'Dark' : 'Light'
      }).`
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
            color: 'var(--soft-purple)'
          }}
        >
          <Palette size={20} />
        </div>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Appearance & UI Preferences
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
            Configure theme aesthetics, navigation density, and visual interactions.
          </p>
        </div>
      </div>

      {/* Theme Selection */}
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
          Admin Studio Theme Mode
        </label>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px'
          }}
        >
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = currentTheme === opt.id;

            return (
              <div
                key={opt.id}
                role="button"
                tabIndex={0}
                onClick={() => handleSelectTheme(opt.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectTheme(opt.id);
                  }
                }}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  backgroundColor: isSelected ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                  border: isSelected
                    ? '2px solid var(--primary-purple)'
                    : '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s ease, background-color 0.15s ease',
                  outline: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon
                      size={16}
                      color={isSelected ? 'var(--primary-purple)' : 'var(--text-muted)'}
                    />
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: isSelected ? 700 : 600,
                        color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)'
                      }}
                    >
                      {opt.label}
                    </span>
                  </div>

                  {isSelected && (
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--primary-dim)',
                        color: 'var(--soft-purple)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Check size={11} /> Active
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                  {opt.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Toggles */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <SettingToggleItem
          id="compactSidebar"
          title="Compact Sidebar"
          description="Collapse sidebar navigation into compact icon-only mode by default for wider dashboard canvas."
          icon={Sidebar}
          checked={data.compactSidebar}
          onChange={(val) => onChange('compactSidebar', val)}
        />

        <SettingToggleItem
          id="animations"
          title="Interface Animations & Micro-interactions"
          description="Enable smooth hover transitions, chart loading animations, and skeleton shimmer effects."
          icon={Sparkles}
          checked={data.animations}
          onChange={(val) => onChange('animations', val)}
        />

        <SettingToggleItem
          id="showBreadcrumbs"
          title="Show Navigation Breadcrumbs"
          description="Display hierarchical path breadcrumbs at the top of sub-pages for rapid parent navigation."
          icon={Navigation}
          checked={data.showBreadcrumbs}
          onChange={(val) => onChange('showBreadcrumbs', val)}
        />
      </div>
    </div>
  );
}
