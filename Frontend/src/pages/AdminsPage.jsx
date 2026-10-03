import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, RefreshCw, Shield, AlertTriangle } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import ConfirmDialog from '../components/common/ConfirmDialog';
import AdminStatsCards from '../components/admins/AdminStatsCards';
import AdminToolbar from '../components/admins/AdminToolbar';
import AdminTable from '../components/admins/AdminTable';
import AdminPagination from '../components/admins/AdminPagination';
import AdminSkeleton from '../components/admins/AdminSkeleton';
import PermissionsMatrix from '../components/admins/PermissionsMatrix';
import { useAdmins } from '../hooks/useAdmins';
import { useToast } from '../context/ToastContext';

export default function AdminsPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    admins,
    total,
    totalPages,
    stats,
    search,
    setSearch,
    role,
    setRole,
    status,
    setStatus,
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
    updateAdminStatus
  } = useAdmins();

  const [selectedAdminForToggle, setSelectedAdminForToggle] = useState(null);
  const [togglingStatus, setTogglingStatus] = useState(false);
  const [showRoleMatrixOverview, setShowRoleMatrixOverview] = useState(false);
  const [matrixRole, setMatrixRole] = useState('super_admin');

  const handleOpenToggle = (admin) => {
    setSelectedAdminForToggle(admin);
  };

  const handleConfirmToggle = async () => {
    if (!selectedAdminForToggle) return;
    try {
      setTogglingStatus(true);
      const newStatus = selectedAdminForToggle.status === 'active' ? 'inactive' : 'active';
      await updateAdminStatus(selectedAdminForToggle.id, newStatus);
      toast.success(
        `Admin "${selectedAdminForToggle.displayName}" has been ${
          newStatus === 'active' ? 'activated' : 'deactivated'
        }.`
      );
      setSelectedAdminForToggle(null);
    } catch {
      toast.error('Failed to update admin status.');
    } finally {
      setTogglingStatus(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Admins"
        subtitle="Manage administrative studio accounts, roles, access levels, and security states."
        breadcrumbs={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Admins' }
        ]}
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={refresh}
              disabled={refreshing}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw size={14} className={refreshing ? 'spin' : ''} />
              <span>Refresh</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/admins/new')}
              className="btn btn-primary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <UserPlus size={14} />
              <span>+ Add Admin</span>
            </button>
          </div>
        }
      />

      {/* 4 Metric Stat Cards */}
      <AdminStatsCards stats={stats} loading={statsLoading} />

      {/* Search & Filter Toolbar */}
      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        role={role}
        onRoleChange={setRole}
        status={status}
        onStatusChange={setStatus}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Error state */}
      {error && (
        <div
          className="admin-card"
          style={{
            padding: '20px',
            marginBottom: '20px',
            backgroundColor: 'var(--danger-dim)',
            borderColor: 'var(--danger-border)',
            color: 'var(--danger)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <AlertTriangle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Main Content: Loading, Empty, or Table */}
      {loading ? (
        <AdminSkeleton />
      ) : admins.length === 0 ? (
        <div className="admin-card" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <EmptyState
            icon={Shield}
            title="No administrators found"
            description={
              hasActiveFilters
                ? 'No administrators matched your filter criteria. Try clearing filters or refining your search.'
                : 'No administrative accounts have been configured yet.'
            }
            actionLabel={hasActiveFilters ? 'Clear Filters' : '+ Add Admin'}
            onAction={hasActiveFilters ? clearFilters : () => navigate('/admin/admins/new')}
          />
        </div>
      ) : (
        <>
          <AdminTable
            admins={admins}
            onToggleStatus={handleOpenToggle}
          />

          <AdminPagination
            page={page}
            pageSize={pageSize}
            total={total}
            totalPages={totalPages}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </>
      )}

      {/* Permissions Matrix Reference Drawer/Section */}
      <div className="admin-card" style={{ marginTop: '32px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={18} color="var(--primary-purple)" />
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Role Permissions Reference Matrix
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                Inspect the system permissions allocated to each administrative tier.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => {
                setShowRoleMatrixOverview(!showRoleMatrixOverview);
              }}
              className="btn btn-secondary btn-sm"
            >
              {showRoleMatrixOverview ? 'Hide Reference' : 'View Reference'}
            </button>
          </div>
        </div>

        {showRoleMatrixOverview && (
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Role Switcher Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'super_admin', label: 'Super Admin' },
                { id: 'admin', label: 'Admin' },
                { id: 'moderator', label: 'Moderator' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMatrixRole(tab.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    backgroundColor:
                      matrixRole === tab.id ? 'var(--primary-purple)' : 'var(--bg-elevated)',
                    color: matrixRole === tab.id ? '#FFFFFF' : 'var(--text-secondary)',
                    border: '1px solid',
                    borderColor:
                      matrixRole === tab.id ? 'var(--primary-purple)' : 'var(--border-color)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <PermissionsMatrix role={matrixRole} />
          </div>
        )}
      </div>

      {/* Status Toggle Modal */}
      {selectedAdminForToggle && (
        <ConfirmDialog
          isOpen={Boolean(selectedAdminForToggle)}
          onClose={() => setSelectedAdminForToggle(null)}
          onConfirm={handleConfirmToggle}
          title={
            selectedAdminForToggle.status === 'active'
              ? `Deactivate ${selectedAdminForToggle.displayName}?`
              : `Activate ${selectedAdminForToggle.displayName}?`
          }
          message={
            selectedAdminForToggle.status === 'active'
              ? `Are you sure you want to deactivate "${selectedAdminForToggle.displayName}"? They will be immediately blocked from signing into or performing actions in the Master Admin Panel.`
              : `Are you sure you want to activate "${selectedAdminForToggle.displayName}"? Their dashboard access will be restored according to their role (${selectedAdminForToggle.role}).`
          }
          confirmLabel={
            selectedAdminForToggle.status === 'active' ? 'Deactivate Admin' : 'Activate Admin'
          }
          variant={selectedAdminForToggle.status === 'active' ? 'danger' : 'primary'}
          loading={togglingStatus}
        />
      )}
    </div>
  );
}
