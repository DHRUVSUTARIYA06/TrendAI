import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, RotateCw, Bell, SearchX } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import ConfirmDialog from '../components/common/ConfirmDialog';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import { useToast } from '../context/ToastContext';
import { useNotifications } from '../hooks/useNotifications';

import NotificationStatsCards from '../components/notifications/NotificationStatsCards';
import NotificationToolbar from '../components/notifications/NotificationToolbar';
import NotificationTable from '../components/notifications/NotificationTable';
import NotificationPagination from '../components/notifications/NotificationPagination';
import { NotificationTableSkeleton } from '../components/notifications/NotificationSkeleton';
import ScheduleModal from '../components/notifications/ScheduleModal';

export default function NotificationsPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    notifications,
    total,
    totalPages,
    stats,
    search,
    setSearch,
    status,
    setStatus,
    audience,
    setAudience,
    type,
    setType,
    dateRange,
    setDateRange,
    page,
    setPage,
    pageSize,
    setPageSize,
    loading,
    statsLoading,
    refreshing,
    error,
    hasActiveFilters,
    clearFilters,
    refresh,
    duplicateNotification,
    deleteNotification,
    scheduleNotification,
    cancelNotification
  } = useNotifications({ initialPageSize: 10 });

  // Dialog & Modal States
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  const [scheduleTarget, setScheduleTarget] = useState(null);
  const [scheduleLoading, setScheduleLoading] = useState(false);

  // Manual Refresh Handler
  const handleRefresh = async () => {
    try {
      await refresh();
      toast.success('Notifications refreshed');
    } catch {
      toast.error('Failed to refresh notifications');
    }
  };

  // Duplicate Handler
  const handleDuplicate = async (item) => {
    try {
      const dup = await duplicateNotification(item.id);
      toast.success(`Duplicated as "${dup.title}"`);
    } catch (err) {
      toast.error(err.message || 'Failed to duplicate notification');
    }
  };

  // Delete Draft Handler
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleteLoading(true);
      await deleteNotification(deleteTarget.id);
      toast.success('Draft notification permanently deleted');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.message || 'Failed to delete notification');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Cancel Scheduled Delivery Handler
  const handleConfirmCancel = async () => {
    if (!cancelTarget) return;
    try {
      setCancelLoading(true);
      await cancelNotification(cancelTarget.id);
      toast.success('Scheduled notification delivery cancelled');
      setCancelTarget(null);
    } catch (err) {
      toast.error(err.message || 'Failed to cancel scheduled delivery');
    } finally {
      setCancelLoading(false);
    }
  };

  // Confirm Quick Schedule Handler
  const handleConfirmSchedule = async (id, scheduledAt) => {
    try {
      setScheduleLoading(true);
      await scheduleNotification(id, scheduledAt);
      toast.success('Notification scheduled in demo mode');
      setScheduleTarget(null);
    } catch (err) {
      toast.error(err.message || 'Failed to schedule notification');
    } finally {
      setScheduleLoading(false);
    }
  };

  return (
    <div>
      {/* 1. Page Header */}
      <PageHeader
        title="Notifications"
        subtitle="Create, schedule, and monitor Promptoo notifications."
        breadcrumbs={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Notifications' }
        ]}
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="btn btn-secondary"
            >
              <RotateCw size={14} className={refreshing ? 'spinning' : ''} />
              <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
            <button
              onClick={() => navigate('/admin/notifications/new')}
              className="btn btn-primary"
            >
              <Plus size={16} />
              <span>Create Notification</span>
            </button>
          </div>
        }
      />

      {/* 2. Summary Stats Cards */}
      <NotificationStatsCards stats={stats} loading={statsLoading} />

      {/* 3. Search & Filters Toolbar */}
      <NotificationToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        audience={audience}
        onAudienceChange={setAudience}
        type={type}
        onTypeChange={setType}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* 4. Table / Loading / Error / Empty States */}
      {error ? (
        <ErrorState
          title="Unable to load notifications"
          message={error}
          onRetry={refresh}
        />
      ) : loading ? (
        <NotificationTableSkeleton rows={pageSize} />
      ) : notifications.length === 0 ? (
        hasActiveFilters ? (
          <EmptyState
            icon={SearchX}
            title="No notifications match your filters"
            description="Try adjusting your search criteria, status, audience, or date range."
            actionLabel="Clear Filters"
            onAction={clearFilters}
          />
        ) : (
          <EmptyState
            icon={Bell}
            title="No notifications yet"
            description="Create your first notification to communicate with Promptoo users."
            actionLabel="Create Notification"
            onAction={() => navigate('/admin/notifications/new')}
          />
        )
      ) : (
        <>
          <NotificationTable
            notifications={notifications}
            onDuplicate={handleDuplicate}
            onDelete={(item) => setDeleteTarget(item)}
            onCancelSchedule={(item) => setCancelTarget(item)}
            onQuickSchedule={(item) => setScheduleTarget(item)}
          />

          {/* 5. Pagination */}
          <NotificationPagination
            page={page}
            pageSize={pageSize}
            total={total}
            totalPages={totalPages}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </>
      )}

      {/* Custom Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Draft?"
        message={`This notification "${deleteTarget?.title}" will be permanently removed from the admin panel.`}
        confirmLabel="Delete Draft"
        cancelLabel="Cancel"
        variant="danger"
        loading={deleteLoading}
      />

      {/* Custom Cancel Schedule Modal */}
      <ConfirmDialog
        isOpen={Boolean(cancelTarget)}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleConfirmCancel}
        title="Cancel Scheduled Delivery?"
        message={`Are you sure you want to cancel scheduled delivery for "${cancelTarget?.title}"? It will not be sent to recipients.`}
        confirmLabel="Cancel Delivery"
        cancelLabel="Keep Scheduled"
        variant="warning"
        loading={cancelLoading}
      />

      {/* Quick Schedule Modal */}
      <ScheduleModal
        isOpen={Boolean(scheduleTarget)}
        onClose={() => setScheduleTarget(null)}
        onConfirm={handleConfirmSchedule}
        notification={scheduleTarget}
        loading={scheduleLoading}
      />
    </div>
  );
}
