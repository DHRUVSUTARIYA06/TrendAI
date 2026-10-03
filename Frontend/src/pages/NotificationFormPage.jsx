import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Send,
  Clock,
  Copy,
  AlertCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { useToast } from '../context/ToastContext';
import { notificationRepository } from '../repositories/notificationRepository';
import {
  NOTIFICATION_FORM_TYPE_OPTIONS,
  NOTIFICATION_AUDIENCE_OPTIONS
} from '../types/notification';

import NotificationPreview from '../components/notifications/NotificationPreview';
import UserSelector from '../components/notifications/UserSelector';

export default function NotificationFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();
  const isEdit = Boolean(id);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('general');
  const [audience, setAudience] = useState('all');
  const [targetUserIds, setTargetUserIds] = useState([]);

  // Delivery / Scheduling State
  const [deliveryMode, setDeliveryMode] = useState('now'); // 'now' | 'schedule'
  const [scheduleDate, setScheduleDate] = useState(() => new Date(Date.now() + 24 * 3600 * 1000).toISOString().split('T')[0]);
  const [scheduleTime, setScheduleTime] = useState('10:00');

  // Existing notification metadata (for edit mode)
  const [existingNotification, setExistingNotification] = useState(null);
  const [initialLoading, setInitialLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Character limits
  const MAX_TITLE_LEN = 80;
  const MAX_MESSAGE_LEN = 250;

  // Load existing notification if in edit mode
  useEffect(() => {
    if (!isEdit) return;

    let isMounted = true;
    async function loadItem() {
      try {
        setInitialLoading(true);
        const item = await notificationRepository.getNotificationById(id);
        if (!isMounted) return;

        if (!item) {
          toast.error('Notification not found');
          navigate('/admin/notifications');
          return;
        }

        setExistingNotification(item);
        setTitle(item.title);
        setMessage(item.message);
        setType(item.type);
        setAudience(item.audience);
        setTargetUserIds(item.targetUserIds || []);

        if (item.scheduledAt) {
          setDeliveryMode('schedule');
          const d = new Date(item.scheduledAt);
          setScheduleDate(d.toISOString().split('T')[0]);
          setScheduleTime(d.toTimeString().substring(0, 5));
        }
      } catch (err) {
        toast.error('Failed to load notification');
        console.error(err);
      } finally {
        if (isMounted) setInitialLoading(false);
      }
    }

    loadItem();
    return () => {
      isMounted = false;
    };
  }, [id, isEdit, navigate, toast]);

  // Validation function
  const validateForm = (action) => {
    const errs = {};

    if (!title.trim()) {
      errs.title = 'Title is required';
    } else if (title.trim().length > MAX_TITLE_LEN) {
      errs.title = `Title must be ${MAX_TITLE_LEN} characters or fewer`;
    }

    if (!message.trim()) {
      errs.message = 'Message is required';
    } else if (message.trim().length > MAX_MESSAGE_LEN) {
      errs.message = `Message must be ${MAX_MESSAGE_LEN} characters or fewer`;
    }

    if (!type) {
      errs.type = 'Notification type is required';
    }

    if (!audience) {
      errs.audience = 'Audience is required';
    }

    if (audience === 'specific_users' && targetUserIds.length === 0) {
      errs.targetUserIds = 'Please select at least one recipient user';
    }

    if (action === 'schedule' || (action !== 'draft' && deliveryMode === 'schedule')) {
      if (!scheduleDate || !scheduleTime) {
        errs.schedule = 'Both date and time are required for scheduling';
      } else {
        const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}:00`);
        if (isNaN(scheduledDateTime.getTime())) {
          errs.schedule = 'Invalid date or time provided';
        } else if (scheduledDateTime.getTime() <= Date.now()) {
          errs.schedule = 'Scheduled time must be in the future';
        }
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (action) => {
    // action: 'draft' | 'schedule' | 'send'
    if (!validateForm(action)) {
      toast.error('Please fix validation errors before saving');
      return;
    }

    try {
      setSubmitting(true);

      let targetStatus = 'draft';
      let scheduledAt = null;

      if (action === 'draft') {
        targetStatus = 'draft';
      } else if (action === 'schedule' || deliveryMode === 'schedule') {
        targetStatus = 'scheduled';
        scheduledAt = new Date(`${scheduleDate}T${scheduleTime}:00`).toISOString();
      } else if (action === 'send') {
        targetStatus = 'sent';
      }

      const payload = {
        title,
        message,
        type,
        audience,
        targetUserIds: audience === 'specific_users' ? targetUserIds : [],
        status: targetStatus,
        scheduledAt
      };

      if (isEdit) {
        await notificationRepository.updateNotification(id, payload);
        if (targetStatus === 'sent') {
          toast.success('Notification marked as sent in demo mode.');
        } else if (targetStatus === 'scheduled') {
          toast.success('Notification scheduled in demo mode.');
        } else {
          toast.success('Draft saved successfully.');
        }
      } else {
        await notificationRepository.createNotification(payload);
        if (targetStatus === 'sent') {
          toast.success('Notification marked as sent in demo mode.');
        } else if (targetStatus === 'scheduled') {
          toast.success('Notification scheduled in demo mode.');
        } else {
          toast.success('Draft saved successfully.');
        }
      }

      navigate('/admin/notifications');
    } catch (err) {
      toast.error(err.message || 'Operation failed');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Duplicate from Edit Page (Sent notification fallback)
  const handleDuplicate = async () => {
    try {
      setSubmitting(true);
      const dup = await notificationRepository.duplicateNotification(id);
      toast.success(`Duplicated as "${dup.title}"`);
      navigate(`/admin/notifications/${dup.id}/edit`);
    } catch (err) {
      toast.error(err.message || 'Failed to duplicate notification');
    } finally {
      setSubmitting(false);
    }
  };

  if (initialLoading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Loading notification data...
      </div>
    );
  }

  const isSent = existingNotification?.status === 'sent';

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title={isEdit ? 'Edit Notification' : 'Create Notification'}
        subtitle={
          isEdit
            ? `Editing notification ${existingNotification?.id || ''}`
            : 'Compose, configure audience, schedule, or test push notifications.'
        }
        breadcrumbs={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Notifications', path: '/admin/notifications' },
          { label: isEdit ? 'Edit' : 'New' }
        ]}
        actions={
          <button
            type="button"
            onClick={() => navigate('/admin/notifications')}
            className="btn btn-secondary"
          >
            <ArrowLeft size={14} />
            <span>Back to List</span>
          </button>
        }
      />

      {/* Warning for Already Sent Notifications */}
      {isSent && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '16px 20px',
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid var(--danger-border)',
            borderRadius: '12px',
            marginBottom: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertTriangle size={20} color="var(--danger)" />
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>
                This notification has already been sent and cannot be edited.
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
                Sent notifications are immutable to preserve historical audit integrity. You can duplicate this notification to create a new draft.
              </p>
            </div>
          </div>
          <button
            onClick={handleDuplicate}
            disabled={submitting}
            className="btn btn-primary btn-sm"
          >
            <Copy size={13} />
            <span>Duplicate Notification</span>
          </button>
        </div>
      )}

      {/* Main 2-Column Responsive Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Form Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Section A: Basic Information */}
          <div className="admin-card">
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
              Basic Information
            </h3>

            {/* Notification Title */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Notification Title <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <span
                  style={{
                    fontSize: '11px',
                    color: title.length > MAX_TITLE_LEN ? 'var(--danger)' : 'var(--text-muted)'
                  }}
                >
                  {title.length}/{MAX_TITLE_LEN}
                </span>
              </div>
              <input
                type="text"
                disabled={isSent || submitting}
                value={title}
                maxLength={MAX_TITLE_LEN}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Weekend Prompt Challenge Announcement"
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 14px',
                  backgroundColor: 'var(--bg-elevated)',
                  border: `1px solid ${errors.title ? 'var(--danger)' : 'var(--border-color)'}`,
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
              {errors.title && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', color: 'var(--danger)', fontSize: '11px' }}>
                  <AlertCircle size={12} />
                  <span>{errors.title}</span>
                </div>
              )}
            </div>

            {/* Notification Message */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Message Content <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <span
                  style={{
                    fontSize: '11px',
                    color: message.length > MAX_MESSAGE_LEN ? 'var(--danger)' : 'var(--text-muted)'
                  }}
                >
                  {message.length}/{MAX_MESSAGE_LEN}
                </span>
              </div>
              <textarea
                rows={4}
                disabled={isSent || submitting}
                value={message}
                maxLength={MAX_MESSAGE_LEN}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write concise, actionable push notification text..."
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: 'var(--bg-elevated)',
                  border: `1px solid ${errors.message ? 'var(--danger)' : 'var(--border-color)'}`,
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
              {errors.message && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', color: 'var(--danger)', fontSize: '11px' }}>
                  <AlertCircle size={12} />
                  <span>{errors.message}</span>
                </div>
              )}
            </div>

            {/* Notification Type Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Notification Type <span style={{ color: 'var(--danger)' }}>*</span>
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px' }}>
                {NOTIFICATION_FORM_TYPE_OPTIONS.map((item) => {
                  const isSelected = type === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      disabled={isSent || submitting}
                      onClick={() => setType(item.value)}
                      style={{
                        padding: '10px 8px',
                        borderRadius: '8px',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--primary-purple)' : 'var(--border-color)',
                        backgroundColor: isSelected ? 'var(--primary-dim)' : 'var(--bg-elevated)',
                        color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: isSent ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section B: Target Audience */}
          <div className="admin-card">
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
              Target Audience
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '12px' }}>
              {NOTIFICATION_AUDIENCE_OPTIONS.map((item) => {
                const isSelected = audience === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    disabled={isSent || submitting}
                    onClick={() => setAudience(item.value)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--primary-purple)' : 'var(--border-color)',
                      backgroundColor: isSelected ? 'var(--primary-dim)' : 'var(--bg-elevated)',
                      color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: isSent ? 'not-allowed' : 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Specific Users Selector */}
            {audience === 'specific_users' && (
              <UserSelector
                selectedUserIds={targetUserIds}
                onChange={setTargetUserIds}
                error={errors.targetUserIds}
              />
            )}
          </div>

          {/* Section C: Delivery & Scheduling */}
          <div className="admin-card">
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
              Delivery & Timing
            </h3>

            {/* Mode selection radio pills */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              <button
                type="button"
                disabled={isSent || submitting}
                onClick={() => setDeliveryMode('now')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: deliveryMode === 'now' ? 'var(--primary-purple)' : 'var(--border-color)',
                  backgroundColor: deliveryMode === 'now' ? 'var(--primary-dim)' : 'var(--bg-elevated)',
                  color: deliveryMode === 'now' ? '#FFFFFF' : 'var(--text-secondary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: isSent ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Send size={15} />
                <span>Send Now (Demo)</span>
              </button>

              <button
                type="button"
                disabled={isSent || submitting}
                onClick={() => setDeliveryMode('schedule')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: deliveryMode === 'schedule' ? 'var(--primary-purple)' : 'var(--border-color)',
                  backgroundColor: deliveryMode === 'schedule' ? 'var(--primary-dim)' : 'var(--bg-elevated)',
                  color: deliveryMode === 'schedule' ? '#FFFFFF' : 'var(--text-secondary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: isSent ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Clock size={15} />
                <span>Schedule for Later</span>
              </button>
            </div>

            {/* Scheduled Date/Time Inputs */}
            {deliveryMode === 'schedule' && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Delivery Date
                    </label>
                    <input
                      type="date"
                      disabled={isSent || submitting}
                      min={new Date().toISOString().split('T')[0]}
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
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

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Delivery Time
                    </label>
                    <input
                      type="time"
                      disabled={isSent || submitting}
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
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

                {errors.schedule && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', color: 'var(--danger)', fontSize: '11px' }}>
                    <AlertCircle size={12} />
                    <span>{errors.schedule}</span>
                  </div>
                )}
              </div>
            )}

            {/* Demo Mode Notice */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '12px 14px',
                backgroundColor: 'rgba(108, 77, 255, 0.05)',
                border: '1px solid rgba(108, 77, 255, 0.2)',
                borderRadius: '8px',
                fontSize: '12px',
                color: 'var(--soft-purple)',
                lineHeight: 1.45
              }}
            >
              <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Demo Mode Active:</strong> Clicking "Send" or "Schedule" will update the mock state in local memory. No push notifications or emails will actually be transmitted to physical mobile devices.
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          {!isSent && (
            <div
              className="admin-card"
              style={{
                padding: '16px 20px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <button
                type="button"
                onClick={() => navigate('/admin/notifications')}
                disabled={submitting}
                className="btn btn-secondary"
              >
                Cancel
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => handleSubmit('draft')}
                  disabled={submitting}
                  className="btn btn-secondary"
                >
                  <Save size={14} />
                  <span>Save as Draft</span>
                </button>

                {deliveryMode === 'schedule' ? (
                  <button
                    type="button"
                    onClick={() => handleSubmit('schedule')}
                    disabled={submitting}
                    className="btn btn-primary"
                  >
                    <Clock size={14} />
                    <span>{submitting ? 'Scheduling...' : 'Schedule Notification'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSubmit('send')}
                    disabled={submitting}
                    className="btn btn-primary"
                  >
                    <Send size={14} />
                    <span>{submitting ? 'Sending...' : 'Send Notification'}</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Mobile Preview */}
        <div style={{ position: 'sticky', top: '80px' }}>
          <NotificationPreview
            title={title}
            message={message}
            type={type}
            scheduledAt={
              deliveryMode === 'schedule' && scheduleDate && scheduleTime
                ? `${scheduleDate}T${scheduleTime}:00`
                : null
            }
          />
        </div>
      </div>
    </div>
  );
}
