import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import ConfirmDialog from '../components/common/ConfirmDialog';
import UserStatsCards from '../components/users/UserStatsCards';
import UserToolbar from '../components/users/UserToolbar';
import UserTable from '../components/users/UserTable';
import UserTableSkeleton from '../components/users/UserTableSkeleton';
import UserPagination from '../components/users/UserPagination';
import UserEditModal from '../components/users/UserEditModal';
import { useUsers } from '../hooks/useUsers';
import { useToast } from '../context/ToastContext';

export default function UsersPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    users,
    total,
    totalPages,
    page,
    limit,
    search,
    status,
    activity,
    registration,
    sortBy,
    stats,
    loading,
    statsLoading,
    hasActiveFilters,
    setSearch,
    setStatus,
    setActivity,
    setRegistration,
    setSortBy,
    setPage,
    clearFilters,
    updateStatus,
    updateProfile
  } = useUsers({ initialLimit: 10 });

  // Modal & Dialog states
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [statusTargetUser, setStatusTargetUser] = useState(null);
  const [statusActionType, setStatusActionType] = useState(null); // 'activate' | 'deactivate' | 'suspend' | 'unsuspend'
  const [isStatusConfirmOpen, setIsStatusConfirmOpen] = useState(false);
  const [statusActionLoading, setStatusActionLoading] = useState(false);

  // Navigate to user detail
  const handleViewProfile = (user) => {
    navigate(`/admin/users/${user.id}`);
  };

  const handleViewActivity = (user) => {
    navigate(`/admin/users/${user.id}`);
  };

  // Open Edit Modal
  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  // Profile update submission
  const handleUserUpdated = async (id, payload) => {
    await updateProfile(id, payload);
    setSelectedUser(null);
  };

  // Open Status Confirmation Dialog
  const handleStatusAction = (user, action) => {
    setStatusTargetUser(user);
    setStatusActionType(action);
    setIsStatusConfirmOpen(true);
  };

  // Execute Status Action
  const handleConfirmStatusChange = async () => {
    if (!statusTargetUser || !statusActionType) return;

    let targetStatus = 'active';
    let successMsg = `User "${statusTargetUser.displayName}" activated successfully.`;

    if (statusActionType === 'deactivate') {
      targetStatus = 'inactive';
      successMsg = `User "${statusTargetUser.displayName}" deactivated.`;
    } else if (statusActionType === 'suspend') {
      targetStatus = 'suspended';
      successMsg = `User "${statusTargetUser.displayName}" has been suspended.`;
    } else if (statusActionType === 'unsuspend') {
      targetStatus = 'active';
      successMsg = `User "${statusTargetUser.displayName}" unsuspended and reinstated.`;
    }

    try {
      setStatusActionLoading(true);
      await updateStatus(statusTargetUser.id, targetStatus);
      toast.success(successMsg);
      setIsStatusConfirmOpen(false);
      setStatusTargetUser(null);
      setStatusActionType(null);
    } catch (err) {
      console.error('Failed to update status:', err);
      toast.error(err.message || 'Failed to update account status.');
    } finally {
      setStatusActionLoading(false);
    }
  };

  // Mock Export handler
  const handleExportData = () => {
    toast.info('Export data preview generated (mock). 24,582 records ready for export.');
  };

  // Status dialog copy resolution
  const getStatusDialogProps = () => {
    if (statusActionType === 'suspend') {
      return {
        title: 'Suspend User Account',
        message: `Are you sure you want to suspend "${statusTargetUser?.displayName}"? They will lose access to creation tools and public listings immediately.`,
        confirmLabel: 'Suspend Account',
        variant: 'danger'
      };
    }
    if (statusActionType === 'unsuspend') {
      return {
        title: 'Unsuspend User Account',
        message: `Re-enable account access for "${statusTargetUser?.displayName}"? The user will be restored to active status.`,
        confirmLabel: 'Unsuspend User',
        variant: 'primary'
      };
    }
    if (statusActionType === 'deactivate') {
      return {
        title: 'Deactivate User Account',
        message: `Mark "${statusTargetUser?.displayName}" as inactive? The user will remain inactive until their next login session.`,
        confirmLabel: 'Deactivate Account',
        variant: 'primary'
      };
    }
    return {
      title: 'Activate User Account',
      message: `Set "${statusTargetUser?.displayName}" to active status?`,
      confirmLabel: 'Activate Account',
      variant: 'primary'
    };
  };

  const dialogProps = getStatusDialogProps();

  return (
    <div>
      {/* Page Header with Export Action */}
      <PageHeader
        title="Users"
        subtitle="Manage Promptoo creator accounts, subscription activity, creations, and security."
        breadcrumbs={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Users' }
        ]}
        actions={
          <button
            onClick={handleExportData}
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px' }}
            title="Export user registry data (mock)"
          >
            <Download size={14} />
            <span>Export Registry</span>
          </button>
        }
      />

      {/* Top Summary Stats */}
      <UserStatsCards stats={stats} loading={statsLoading} />

      {/* Filter and Search Controls Toolbar */}
      <UserToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        activity={activity}
        onActivityChange={setActivity}
        registration={registration}
        onRegistrationChange={setRegistration}
        sortBy={sortBy}
        onSortChange={setSortBy}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      {/* User Data Table or Skeleton Loader */}
      {loading ? (
        <UserTableSkeleton rows={limit} />
      ) : (
        <UserTable
          users={users}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onViewProfile={handleViewProfile}
          onViewActivity={handleViewActivity}
          onEditProfile={handleOpenEdit}
          onStatusAction={handleStatusAction}
          onClearFilters={clearFilters}
        />
      )}

      {/* Pagination Controls */}
      <UserPagination
        page={page}
        totalPages={totalPages}
        total={total}
        limit={limit}
        onPageChange={setPage}
      />

      {/* Edit Safe Profile Modal */}
      {isEditModalOpen && (
        <UserEditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          onUserUpdated={handleUserUpdated}
        />
      )}

      {/* Account Status Confirmation Modal */}
      <ConfirmDialog
        isOpen={isStatusConfirmOpen}
        onClose={() => {
          setIsStatusConfirmOpen(false);
          setStatusTargetUser(null);
          setStatusActionType(null);
        }}
        onConfirm={handleConfirmStatusChange}
        title={dialogProps.title}
        message={dialogProps.message}
        confirmLabel={dialogProps.confirmLabel}
        variant={dialogProps.variant}
        loading={statusActionLoading}
      />
    </div>
  );
}
