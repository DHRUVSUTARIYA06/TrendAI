import React from 'react';
import { Sparkles, Wifi, Battery, Bell } from 'lucide-react';
import { NOTIFICATION_TYPE_META } from '../../types/notification';

export default function NotificationPreview({
  title = '',
  message = '',
  type = 'general',
  scheduledAt = null
}) {
  const typeMeta = NOTIFICATION_TYPE_META[type] || NOTIFICATION_TYPE_META.general;

  const displayTitle = title.trim() || 'New Notification Title';
  const displayMessage = message.trim() || 'Check out the latest trending AI styles and templates in Promptoo Creator Studio.';

  const formattedTime = scheduledAt
    ? new Date(scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'now';

  return (
    <div className="admin-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={16} color="var(--primary-purple)" />
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Live Push Preview
          </h3>
        </div>
        <span
          style={{
            fontSize: '11px',
            color: 'var(--soft-purple)',
            backgroundColor: 'var(--primary-dim)',
            padding: '2px 8px',
            borderRadius: '4px',
            fontWeight: 600
          }}
        >
          Mobile Lockscreen
        </span>
      </div>

      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
        Preview how recipients will see this push notification on their mobile device.
      </p>

      {/* Simulated Phone Lockscreen Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '360px',
          margin: '0 auto',
          background: 'linear-gradient(180deg, #12131D 0%, #090A10 100%)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(108, 77, 255, 0.15)',
          overflow: 'hidden',
          padding: '16px'
        }}
      >
        {/* Device Status Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 8px 16px 8px',
            fontSize: '11px',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.7)'
          }}
        >
          <span>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Wifi size={12} />
            <Battery size={13} />
          </div>
        </div>

        {/* Lockscreen Time Display */}
        <div style={{ textAlign: 'center', padding: '10px 0 20px' }}>
          <div style={{ fontSize: '38px', fontWeight: 300, color: '#FFFFFF', letterSpacing: '-1px', lineHeight: 1 }}>
            09:41
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px', fontWeight: 500 }}>
            Thursday, October 3
          </div>
        </div>

        {/* Push Notification Card */}
        <div
          style={{
            background: 'rgba(28, 30, 42, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '14px 14px 14px 14px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
            transition: 'all 0.2s ease'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, var(--primary-purple), var(--secondary-purple))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}
              >
                <Sparkles size={11} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.04em' }}>
                PROMPTOO
              </span>
              <span
                style={{
                  fontSize: '9px',
                  padding: '1px 5px',
                  borderRadius: '3px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  color: typeMeta.color,
                  fontWeight: 600
                }}
              >
                {typeMeta.emoji} {typeMeta.label}
              </span>
            </div>
            <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.45)', fontWeight: 500 }}>
              {formattedTime}
            </span>
          </div>

          {/* Body Content */}
          <div style={{ paddingLeft: '2px' }}>
            <h4
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#FFFFFF',
                margin: '0 0 4px 0',
                lineHeight: 1.3,
                wordBreak: 'break-word'
              }}
            >
              {displayTitle}
            </h4>
            <p
              style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.75)',
                margin: 0,
                lineHeight: 1.45,
                wordBreak: 'break-word'
              }}
            >
              {displayMessage}
            </p>
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div style={{ textAlign: 'center', marginTop: '24px', paddingBottom: '4px' }}>
          <div
            style={{
              width: '80px',
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              borderRadius: '2px',
              margin: '0 auto'
            }}
          />
        </div>
      </div>
    </div>
  );
}
