import React from 'react';
import { Globe, Mail, Clock, Languages, Layers } from 'lucide-react';
import { TIMEZONE_OPTIONS, LANGUAGE_OPTIONS } from '../../types/settings';

export default function GeneralSettingsSection({ data = {}, onChange }) {
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
          <Globe size={20} />
        </div>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            General Configuration
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
            Core application brand parameters, timezone localization, and primary support details.
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* App Name */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
            <Layers size={14} color="var(--primary-purple)" />
            <span>Application Brand Name</span>
          </label>
          <input
            type="text"
            value={data.appName || ''}
            onChange={(e) => onChange('appName', e.target.value)}
            placeholder="e.g. Promptoo"
            style={{ width: '100%' }}
          />
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
            The public brand name presented in notification emails and mobile client headers.
          </span>
        </div>

        {/* App Description */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
            Application Description / Tagline
          </label>
          <textarea
            rows={3}
            value={data.appDescription || ''}
            onChange={(e) => onChange('appDescription', e.target.value)}
            placeholder="Provide a concise description of the platform"
            style={{ width: '100%', resize: 'vertical' }}
          />
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
            Summary of the application purpose for metadata and user onboarding.
          </span>
        </div>

        {/* Support Email */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
            <Mail size={14} color="var(--info)" />
            <span>Support & Inquiries Email</span>
          </label>
          <input
            type="email"
            value={data.supportEmail || ''}
            onChange={(e) => onChange('supportEmail', e.target.value)}
            placeholder="support@promptoo.ai"
            style={{ width: '100%' }}
          />
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
            Contact email shown in help centers and outgoing transaction receipts.
          </span>
        </div>

        {/* Two Columns: Timezone & Language */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {/* Timezone */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
              <Clock size={14} color="var(--warning)" />
              <span>Default Timezone</span>
            </label>
            <select
              value={data.timezone || 'UTC'}
              onChange={(e) => onChange('timezone', e.target.value)}
            >
              {TIMEZONE_OPTIONS.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
              Used for formatting timestamps in reports and scheduled notifications.
            </span>
          </div>

          {/* Default Language */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
              <Languages size={14} color="var(--success)" />
              <span>Default System Language</span>
            </label>
            <select
              value={data.defaultLanguage || 'en-US'}
              onChange={(e) => onChange('defaultLanguage', e.target.value)}
            >
              {LANGUAGE_OPTIONS.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
              Fallback locale for administrative interface and default templates.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
