import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, AlertTriangle, Layers } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import ErrorState from '../components/common/ErrorState';
import CategoryStatsCards from '../components/categories/CategoryStatsCards';
import CategoryToolbar from '../components/categories/CategoryToolbar';
import CategoryTable from '../components/categories/CategoryTable';
import CategoryTableSkeleton from '../components/categories/CategoryTableSkeleton';
import CategoryPagination from '../components/categories/CategoryPagination';
import CategoryDetailModal from '../components/categories/CategoryDetailModal';
import { useCategories } from '../hooks/useCategories';
import { useToast } from '../context/ToastContext';

export default function CategoriesPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    categories,
    total,
    totalPages,
    page,
    limit,
    search,
    status,
    featured,
    sortBy,
    stats,
    loading,
    statsLoading,
    error,
    hasActiveFilters,
    setSearch,
    setStatus,
    setFeatured,
    setSortBy,
    setPage,
    clearFilters,
    refresh,
    toggleStatus,
    toggleFeatured,
    deleteCategory
  } = useCategories({ initialLimit: 10 });

  // Dialog & Modal states
  const [detailCategory, setDetailCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [blockedDeleteCategory, setBlockedDeleteCategory] = useState(null);
  const [statusTarget, setStatusTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // View details
  const handleView = (cat) => {
    setDetailCategory(cat);
  };

  // Edit category
  const handleEdit = (cat) => {
    navigate(`/admin/categories/${cat.id || cat._id}/edit`);
  };

  // Status toggle with confirmation
  const handlePromptStatusToggle = (cat) => {
    setStatusTarget(cat);
  };

  const handleConfirmStatusToggle = async () => {
    if (!statusTarget) return;
    try {
      setActionLoading(true);
      const nextActive = !statusTarget.active;
      await toggleStatus(statusTarget.id || statusTarget._id, statusTarget.active);
      toast.success(
        nextActive
          ? `Category "${statusTarget.name}" activated.`
          : `Category "${statusTarget.name}" deactivated.`
      );
      setStatusTarget(null);
    } catch (err) {
      console.error('Failed to update category status:', err);
      toast.error('Failed to update category status.');
    } finally {
      setActionLoading(false);
    }
  };

  // Featured toggle
  const handleToggleFeatured = async (cat) => {
    try {
      const nextFeatured = !cat.featured;
      await toggleFeatured(cat.id || cat._id, cat.featured);
      toast.success(
        nextFeatured
          ? `Category "${cat.name}" marked as featured.`
          : `Category "${cat.name}" removed from featured.`
      );
    } catch (err) {
      console.error('Failed to update featured flag:', err);
      toast.error('Failed to update featured flag.');
    }
  };

  // Delete initiation with template-count protection
  const handleDeletePrompt = (cat) => {
    if (cat.templateCount && cat.templateCount > 0) {
      // Deletion is blocked! Category has active templates
      setBlockedDeleteCategory(cat);
    } else {
      // Safe to prompt confirmation
      setDeletingCategory(cat);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingCategory) return;
    try {
      setActionLoading(true);
      await deleteCategory(deletingCategory.id || deletingCategory._id);
      toast.success(`Category "${deletingCategory.name}" deleted successfully.`);
      setDeletingCategory(null);
    } catch (err) {
      console.error('Failed to delete category:', err);
      toast.error(err.message || 'Failed to delete category.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="Categories"
        subtitle="Organize and manage Promptoo template categories."
        breadcrumbs={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Categories' }
        ]}
        actions={
          <button
            onClick={() => navigate('/admin/categories/new')}
            className="btn btn-primary"
            style={{ gap: '6px' }}
          >
            <Plus size={16} />
            <span>Add Category</span>
          </button>
        }
      />

      {/* Summary Statistics */}
      <CategoryStatsCards stats={stats} loading={statsLoading} />

      {/* Search & Filter Toolbar */}
      <CategoryToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        featured={featured}
        onFeaturedChange={setFeatured}
        sortBy={sortBy}
        onSortChange={setSortBy}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      {/* Main Content Area */}
      {error ? (
        <div className="admin-card" style={{ padding: '30px', textAlign: 'center' }}>
          <ErrorState message={error} onRetry={refresh} />
        </div>
      ) : loading ? (
        <CategoryTableSkeleton rows={limit} />
      ) : (
        <>
          <CategoryTable
            categories={categories}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onView={handleView}
            onEdit={handleEdit}
            onToggleStatus={handlePromptStatusToggle}
            onToggleFeatured={handleToggleFeatured}
            onDelete={handleDeletePrompt}
            onClearFilters={clearFilters}
            onAddCategory={() => navigate('/admin/categories/new')}
          />

          {/* Pagination */}
          <CategoryPagination
            page={page}
            totalPages={totalPages}
            total={total}
            limit={limit}
            onPageChange={setPage}
          />
        </>
      )}

      {/* Detail Modal */}
      {detailCategory && (
        <CategoryDetailModal
          isOpen={Boolean(detailCategory)}
          onClose={() => setDetailCategory(null)}
          category={detailCategory}
          onEdit={handleEdit}
          onToggleStatus={handlePromptStatusToggle}
          onDelete={handleDeletePrompt}
        />
      )}

      {/* Delete Confirmation Dialog (Allowed when templateCount === 0) */}
      <ConfirmDialog
        isOpen={Boolean(deletingCategory)}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Category?"
        message={`Are you sure you want to delete category "${deletingCategory?.name}"? This action cannot be undone.`}
        confirmLabel="Delete Category"
        cancelLabel="Cancel"
        variant="danger"
        loading={actionLoading}
      />

      {/* Blocked Delete Protection Modal (When category contains templates) */}
      {blockedDeleteCategory && (
        <Modal
          isOpen={Boolean(blockedDeleteCategory)}
          onClose={() => setBlockedDeleteCategory(null)}
          title="Category Contains Templates"
          maxWidth="480px"
          footer={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', width: '100%' }}>
              <button
                onClick={() => setBlockedDeleteCategory(null)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setBlockedDeleteCategory(null);
                  navigate('/admin/templates');
                }}
                className="btn btn-primary"
                style={{ gap: '6px' }}
              >
                <Layers size={14} />
                <span>Manage Templates</span>
              </button>
            </div>
          }
        >
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                color: 'var(--danger)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <AlertTriangle size={22} />
            </div>

            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
                Cannot Delete &quot;{blockedDeleteCategory.name}&quot;
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 12px 0' }}>
                This category currently contains{' '}
                <strong style={{ color: 'var(--text-primary)' }}>
                  {blockedDeleteCategory.templateCount} templates
                </strong>
                . You cannot safely delete this category until its templates are moved to another category or deleted.
              </p>
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  backgroundColor: 'var(--bg-elevated)',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)'
                }}
              >
                Navigate to Template Management to reassign or delete assigned templates first.
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Activate / Deactivate Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(statusTarget)}
        onClose={() => setStatusTarget(null)}
        onConfirm={handleConfirmStatusToggle}
        title={statusTarget?.active ? 'Deactivate Category?' : 'Activate Category?'}
        message={
          statusTarget?.active
            ? 'Templates in this category may no longer appear under this category to users in the Promptoo mobile app.'
            : 'This category and its templates will become available to users in the Promptoo mobile app.'
        }
        confirmLabel={statusTarget?.active ? 'Deactivate' : 'Activate'}
        cancelLabel="Cancel"
        variant={statusTarget?.active ? 'danger' : 'primary'}
        loading={actionLoading}
      />
    </div>
  );
}
