import React from 'react';
import { CheckCircle2, Clock, FileEdit, AlertTriangle, XCircle, Send, ShieldAlert } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

function getStatusIcon(status) {
  switch (status) {
    case 'draft':
      return <FileEdit size={13} color="var(--text-muted)" />;
    case 'scheduled':
      return <Clock size={13} color="var(--warning)" />;
    case 'sending':
      return <Send size={13} color="var(--info)" />;
    case 'sent':
      return <CheckCircle2 size={13} color="var(--success)" />;
    case 'failed':
      return <AlertTriangle size={13} color="var(--danger)" />;
    case 'cancelled':
      return <XCircle size={13} color="var(--text-muted)" />;
    default:
      return <ShieldAlert size={13} color="var(--text-muted)" />;
  }
}

function formatDate(isoStr) {
  if (!isoStr) return '—';
  try {
    const d = new Date(isoStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return '—';
  }
}

export default function NotificationHistoryTimeline({ history = [] }) {
  if (!history || history.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
        No status transition history recorded yet.
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', paddingLeft: '8px' }}>
      {history.map((event, index) => {
        const isLast = index === history.length - 1;

        return (
          <div
            key={event.id || index}
            style={{
              position: 'relative',
              paddingLeft: '28px',
              paddingBottom: isLast ? '0' : '22px'
            }}
          >
            {/* Connecting Vertical Line */}
            {!isLast && (
              <div
                style={{
                  position: 'absolute',
                  left: '11px',
                  top: '20px',
                  bottom: '0',
                  width: '2px',
                  backgroundColor: 'var(--border-color)'
                }}
              />
            )}

            {/* Step Icon Node */}
            <div
              style={{
                position: 'absolute',
                left: '0',
                top: '0',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1
              }}
            >
              {getStatusIcon(event.status)}
            </div>

            {/* Event Details */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <StatusBadge status={event.status} />
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {formatDate(event.timestamp)}
                </span>
                {event.actor && (
                  <span
                    style={{
                      fontSize: '11px',
                      color: 'var(--text-secondary)',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      padding: '1px 6px',
                      borderRadius: '4px',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    by {event.actor}
                  </span>
                )}
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }}>
                {event.message}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
