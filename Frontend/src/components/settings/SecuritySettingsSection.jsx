import React from 'react';
import { ShieldCheck, Lock, KeyRound, ShieldAlert } from 'lucide-react';
import { SESSION_TIMEOUT_OPTIONS } from '../../types/settings';

export default function SecuritySettingsSection({ data = {}, onChange }) {
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
          <ShieldCheck size={20} />
        </div>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Security & Session Policy
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
            Administrative session expiry thresholds and multi-factor authentication policies.
          </p>
        </div>
      </div>

      {/* Session Timeout */}
      <div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
          <Lock size={14} color="var(--primary-purple)" />
          <span>Inactivity Session Timeout</span>
        </label>
        <select
          value={data.sessionTimeout || '1h'}
          onChange={(e) => onChange('sessionTimeout', e.target.value)}
          style={{ maxWidth: '320px' }}
        >
          {SESSION_TIMEOUT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
          Automatically signs out idle administrator sessions to prevent unauthorized workstation access.
        </span>
      </div>

      {/* Two-Factor Authentication Status Card */}
      <div
        style={{
          padding: '16px 20px',
          borderRadius: '10px',
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <KeyRound size={18} color="var(--warning)" />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
              Two-Factor Authentication (MFA / 2FA)
            </span>
          </div>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: '6px',
              backgroundColor: 'var(--warning-dim)',
              color: 'var(--warning)',
              border: '1px solid var(--warning-border)'
            }}
          >
            Not Configured (Demo Mode)
          </span>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Two-factor authentication will be configured when Supabase Auth TOTP/SMS multi-factor authentication is connected. In mock mode, credentials and session gates are simulated locally.
        </p>
      </div>

      {/* Role-Based Access Enforcement Banner */}
      <div
        style={{
          padding: '16px 20px',
          borderRadius: '10px',
          backgroundColor: 'rgba(108, 77, 255, 0.05)',
          border: '1px solid var(--primary-border)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}
      >
        <ShieldAlert size={18} color="var(--soft-purple)" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Role-Based Access Control (RBAC) Enforcement
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '4px 0 0 0' }}>
            Permissions are strictly enforced based on administrator roles:
            <strong style={{ color: 'var(--soft-purple)' }}> Super Admin</strong> has unrestricted access across all 11 system domains;
            <strong style={{ color: 'var(--info)' }}> Admin</strong> manages catalog, users, reports, and analytics;
            <strong style={{ color: 'var(--warning)' }}> Moderator</strong> is restricted to feed safety and content review.
          </p>
        </div>
      </div>
    </div>
  );
}
