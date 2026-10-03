import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Edit2,
  Copy,
  Trash2,
  XCircle,
  Calendar,
  Send,
  History
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import StatusBadge from '../components/common/StatusBadge';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { useToast } from '../context/ToastContext';
import { notificationRepository } from '../repositories/notificationRepository';
import {
  NOTIFICATION_TYPE_META,
  NOTIFICATION_AUDIENCE_META
} from '../types/notification';

import NotificationPreview from '../components/notifications/NotificationPreview';
import NotificationHistoryTimeline from '../components/notifications/NotificationHistoryTimeline';
import ScheduleModal from '../components/notifications/ScheduleModal';
import { NotificationDetailSkeleton } from '../components/notifications/NotificationSkeleton';

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

export default function NotificationDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();

  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduleLoading, setScheduleLoading] = useState(false);

  const fetchNotification = useCallback(async () => {
    try {
      setLoading(true);
      const res = await notificationRepository.getNotificationById(id);
      if (!res) {
        toast.error('Notification not found');
        navigate('/admin/notifications');
        return;
      }
      setNotification(res);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load notification details');
    } finally {
      setLoading(false);
    }
  }, [id, navigate, toast]);

  useEffect(() => {
    fetchNotification();
  }, [fetchNotification]);

  const handleDuplicate = async () => {
    try {
      const dup = await notificationRepository.duplicateNotification(id);
      toast.success(`Duplicated as "${dup.title}"`);
      navigate(`/admin/notifications/${dup.id}`);
    } catch (err) {
      toast.error(err.message || 'Failed to duplicate notification');
    }
  };

  const handleDeleteDraft = async () => {
    try {
      setDeleteLoading(true);
      await notificationRepository.deleteNotification(id);
      toast.success('Draft notification deleted');
      navigate('/admin/notifications');
    } catch (err) {
      toast.error(err.message || 'Failed to delete notification');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancelSchedule = async () => {
    try {
      setCancelLoading(true);
      await notificationRepository.cancelNotification(id);
      toast.success('Scheduled delivery cancelled');
      setCancelModalOpen(false);
      await fetchNotification();
    } catch (err) {
      toast.error(err.message || 'Failed to cancel schedule');
    } finally {
      setCancelLoading(false);
    }
  };

  const handleConfirmSchedule = async (notifId, scheduledAt) => {
    try {
      setScheduleLoading(true);
      await notificationRepository.scheduleNotification(notifId, scheduledAt);
      toast.success('Notification scheduled in demo mode');
      setScheduleModalOpen(false);
      await fetchNotification();
    } catch (err) {
      toast.error(err.message || 'Failed to schedule notification');
    } finally {
      setScheduleLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <PageHeader
          title="Notification Details"
          subtitle="Loading record..."
          breadcrumbs={[
            { label: 'Dashboard', path: '/admin/dashboard' },
            { label: 'Notifications', path: '/admin/notifications' },
            { label: 'Details' }
          ]}
        />
        <NotificationDetailSkeleton />
      </div>
    );
  }

  if (!notification) return null;

  const typeMeta = NOTIFICATION_TYPE_META[notification.type] || NOTIFICATION_TYPE_META.general;
  const audienceMeta = NOTIFICATION_AUDIENCE_META[notification.audience] || NOTIFICATION_AUDIENCE_META.all;
  const audienceLabel =
    notification.audience === 'specific_users'
      ? `${notification.targetUserIds?.length || 1} Specific Users`
      : audienceMeta.label;

  const isDraft = notification.status === 'draft';
  const isScheduled = notification.status === 'scheduled';
  const isCancelled = notification.status === 'cancelled';
  const isSent = notification.status === 'sent';

  const deliveryRate =
    notification.targetedCount > 0
      ? Math.round((notification.deliveredCount / notification.targetedCount) * 100)
      : 0;

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title={notification.title}
        subtitle={`Notification ID: ${notification.id} • Created on ${formatDate(notification.createdAt)}`}
        breadcrumbs={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Notifications', path: '/admin/notifications' },
          { label: notification.id }
        ]}
        actions={
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => navigate('/admin/notifications')}
              className="btn btn-secondary btn-sm"
            >
              <ArrowLeft size={13} />
              <span>Back</span>
            </button>

            {/* Edit (Draft or Scheduled only) */}
            {(isDraft || isScheduled) && (
              <button
                onClick={() => navigate(`/admin/notifications/${notification.id}/edit`)}
                className="btn btn-secondary btn-sm"
              >
                <Edit2 size={13} />
                <span>Edit</span>
              </button>
            )}

            {/* Quick Schedule for Draft */}
            {isDraft && (
              <button
                onClick={() => setScheduleModalOpen(true)}
                className="btn btn-secondary btn-sm"
              >
                <Calendar size={13} />
                <span>Schedule</span>
              </button>
            )}

            {/* Cancel Scheduled */}
            {isScheduled && (
              <button
                onClick={() => setCancelModalOpen(true)}
                className="btn btn-secondary btn-sm"
                style={{ color: 'var(--warning)' }}
              >
                <XCircle size={13} />
                <span>Cancel Schedule</span>
              </button>
            )}

            {/* Duplicate */}
            <button
              onClick={handleDuplicate}
              className="btn btn-secondary btn-sm"
            >
              <Copy size={13} />
              <span>Duplicate</span>
            </button>

            {/* Delete Draft */}
            {(isDraft || isCancelled) && (
              <button
                onClick={() => setDeleteModalOpen(true)}
                className="btn btn-danger btn-sm"
              >
                <Trash2 size={13} />
                <span>Delete</span>
              </button>
            )}
          </div>
        }
      />

      {/* Main Grid: 2 Columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Details & Delivery Stats & Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* 1. Overview Card */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: typeMeta.color,
                    fontWeight: 600,
                    border: '1px solid var(--border-color)'
                  }}
                >
                  {typeMeta.emoji} {typeMeta.label}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Audience: <strong style={{ color: 'var(--text-primary)' }}>{audienceLabel}</strong>
                </span>
              </div>
              <StatusBadge status={notification.status} />
            </div>

            <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 10px 0' }}>
              {notification.title}
            </h3>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 20px 0' }}>
              {notification.message}
            </p>

            {/* Key Metadata Table */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '12px',
                padding: '14px',
                backgroundColor: 'var(--bg-elevated)',
                borderRadius: '8px',
                border: '1px solid var(--border-color)'
              }}
            >
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                  Created At
                </span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {formatDate(notification.createdAt)}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                  Scheduled For
                </span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: notification.scheduledAt ? 'var(--warning)' : 'var(--text-muted)' }}>
                  {formatDate(notification.scheduledAt)}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                  Sent Date
                </span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: notification.sentAt ? 'var(--success)' : 'var(--text-muted)' }}>
                  {formatDate(notification.sentAt)}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                  Created By
                </span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {notification.createdBy || 'Admin'}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Delivery Statistics (Read-Only) */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Send size={16} color="var(--primary-purple)" />
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  Delivery Statistics (Read-Only)
                </h4>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}
              >
                Auto-calculated
              </span>
            </div>

            {/* Metrics cards row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  padding: '12px',
                  backgroundColor: 'var(--bg-elevated)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Targeted
                </span>
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {notification.targetedCount.toLocaleString()}
                </span>
              </div>

              <div
                style={{
                  padding: '12px',
                  backgroundColor: 'var(--bg-elevated)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Delivered
                </span>
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--success)' }}>
                  {notification.deliveredCount.toLocaleString()}
                </span>
              </div>

              <div
                style={{
                  padding: '12px',
                  backgroundColor: 'var(--bg-elevated)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Failed
                </span>
                <span style={{ fontSize: '18px', fontWeight: 700, color: notification.failedCount > 0 ? 'var(--danger)' : 'var(--text-muted)' }}>
                  {notification.failedCount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Delivery Progress Bar */}
            {isSent && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Delivery Success Rate</span>
                  <span style={{ fontWeight: 600, color: 'var(--success)' }}>{deliveryRate}%</span>
                </div>
                <div
                  style={{
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${deliveryRate}%`,
                      backgroundColor: 'var(--success)',
                      borderRadius: '3px'
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* 3. Notification History & Transition Timeline */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
              <History size={16} color="var(--soft-purple)" />
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Notification History & Status Transitions
              </h4>
            </div>

            <NotificationHistoryTimeline history={notification.history || []} />
          </div>
        </div>

        {/* Right Column: Live Mobile Push Preview */}
        <div style={{ position: 'sticky', top: '80px' }}>
          <NotificationPreview
            title={notification.title}
            message={notification.message}
            type={notification.type}
            scheduledAt={notification.scheduledAt}
          />
        </div>
      </div>

      {/* Delete Draft Confirmation Modal */}
      <ConfirmDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteDraft}
        title="Delete Draft?"
        message={`This notification "${notification.title}" will be permanently removed from the admin panel.`}
        confirmLabel="Delete Draft"
        cancelLabel="Cancel"
        variant="danger"
        loading={deleteLoading}
      />

      {/* Cancel Schedule Confirmation Modal */}
      <ConfirmDialog
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirm={handleCancelSchedule}
        title="Cancel Scheduled Delivery?"
        message={`Are you sure you want to cancel the scheduled release of "${notification.title}"? It will not be dispatched.`}
        confirmLabel="Cancel Delivery"
        cancelLabel="Keep Scheduled"
        variant="warning"
        loading={cancelLoading}
      />

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onConfirm={handleConfirmSchedule}
        notification={notification}
        loading={scheduleLoading}
      />
    </div>
  );
}
