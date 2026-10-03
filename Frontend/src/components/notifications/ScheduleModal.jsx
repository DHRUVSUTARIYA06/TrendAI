import React, { useState } from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import Modal from '../common/Modal';

export default function ScheduleModal({
  isOpen,
  onClose,
  onConfirm,
  notification,
  loading = false
}) {
  const [date, setDate] = useState(() => new Date(Date.now() + 24 * 3600 * 1000).toISOString().split('T')[0]);
  const [time, setTime] = useState('10:00');
  const [error, setError] = useState(null);

  if (!notification) return null;

  const handleSchedule = () => {
    setError(null);
    if (!date || !time) {
      setError('Both date and time are required.');
      return;
    }

    const scheduledDateTime = new Date(`${date}T${time}:00`);
    if (isNaN(scheduledDateTime.getTime())) {
      setError('Please provide a valid date and time.');
      return;
    }

    if (scheduledDateTime.getTime() <= Date.now()) {
      setError('Scheduled time must be in the future.');
      return;
    }

    onConfirm(notification.id, scheduledDateTime.toISOString());
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Notification"
      maxWidth="440px"
      footer={
        <>
          <button onClick={onClose} disabled={loading} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={handleSchedule} disabled={loading} className="btn btn-primary">
            {loading ? 'Scheduling...' : 'Confirm Schedule'}
          </button>
        </>
      }
    >
      <div>
        <div style={{ marginBottom: '16px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
            {notification.title}
          </h4>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            Select a future delivery date and time for this notification.
          </p>
        </div>

        {error && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 12px',
              backgroundColor: 'var(--danger-dim)',
              border: '1px solid var(--danger-border)',
              borderRadius: '8px',
              color: 'var(--danger)',
              fontSize: '12px',
              marginBottom: '16px'
            }}
          >
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          {/* Date Picker */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Date
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: '100%',
                  height: '38px',
                  padding: '0 10px',
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Time Picker */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Time
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{
                  width: '100%',
                  height: '38px',
                  padding: '0 10px',
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '10px 12px',
            backgroundColor: 'rgba(108, 77, 255, 0.05)',
            border: '1px solid rgba(108, 77, 255, 0.2)',
            borderRadius: '8px',
            fontSize: '11px',
            color: 'var(--soft-purple)',
            lineHeight: 1.4
          }}
        >
          ℹ️ <strong>Demo Mode:</strong> The notification status will transition to "Scheduled", but no live external push notifications will be sent to user devices.
        </div>
      </div>
    </Modal>
  );
}
