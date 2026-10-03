import React from 'react';

const STATUS_CONFIGS = {
  active: { className: 'status-badge-success', dotColor: 'var(--success)', defaultLabel: 'Active' },
  inactive: { className: 'status-badge-muted', dotColor: 'var(--text-muted)', defaultLabel: 'Inactive' },
  pending: { className: 'status-badge-warning', dotColor: 'var(--warning)', defaultLabel: 'Pending' },
  suspended: { className: 'status-badge-danger', dotColor: 'var(--danger)', defaultLabel: 'Suspended' },
  trending: { className: 'status-badge-warning', dotColor: 'var(--warning)', defaultLabel: 'Trending' },
  draft: { className: 'status-badge-muted', dotColor: 'var(--text-muted)', defaultLabel: 'Draft' },
  processing: { className: 'status-badge-info', dotColor: 'var(--info)', defaultLabel: 'Processing' },
  ready: { className: 'status-badge-success', dotColor: 'var(--success)', defaultLabel: 'Ready' },
  scheduled: { className: 'status-badge-warning', dotColor: 'var(--warning)', defaultLabel: 'Scheduled' },
  sending: { className: 'status-badge-info', dotColor: 'var(--info)', defaultLabel: 'Sending' },
  sent: { className: 'status-badge-success', dotColor: 'var(--success)', defaultLabel: 'Sent' },
  failed: { className: 'status-badge-danger', dotColor: 'var(--danger)', defaultLabel: 'Failed' },
  cancelled: { className: 'status-badge-muted', dotColor: 'var(--text-muted)', defaultLabel: 'Cancelled' }
};

export default function StatusBadge({ status = 'active', label = null, showDot = true }) {
  const config = STATUS_CONFIGS[status] || {
    className: 'status-badge-muted',
    dotColor: 'var(--text-muted)',
    defaultLabel: status
  };

  return (
    <span className={`status-badge ${config.className}`}>
      {showDot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: config.dotColor,
            display: 'inline-block'
          }}
        />
      )}
      {label || config.defaultLabel}
    </span>
  );
}
