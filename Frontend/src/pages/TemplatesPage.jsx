import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import ConfirmDialog from '../components/common/ConfirmDialog';
import ErrorState from '../components/common/ErrorState';
import TemplateStatsCards from '../components/templates/TemplateStatsCards';
import TemplateToolbar from '../components/templates/TemplateToolbar';
import TemplateTable from '../components/templates/TemplateTable';
import TemplateTableSkeleton from '../components/templates/TemplateTableSkeleton';
import TemplatePagination from '../components/templates/TemplatePagination';
import TemplatePreviewModal from '../components/templates/TemplatePreviewModal';
import { useTemplates } from '../hooks/useTemplates';
import { useToast } from '../context/ToastContext';

export default function TemplatesPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    templates,
    total,
    totalPages,
    page,
    limit,
    search,
    category,
    status,
    sortBy,
    stats,
    loading,
    statsLoading,
    error,
    hasActiveFilters,
    setSearch,
    setCategory,
    setStatus,
    setSortBy,
    setPage,
    clearFilters,
    refresh,
    duplicateTemplate,
    updateStatus,
    deleteTemplate
  } = useTemplates({ initialLimit: 10 });

  // Modal dialog states
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [deletingTemplate, setDeletingTemplate] = useState(null);
  const [statusToggleTarget, setStatusToggleTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Handlers
  const handleView = (tpl) => {
    setPreviewTemplate(tpl);
  };

  const handleEdit = (tpl) => {
    navigate(`/admin/templates/${tpl.id || tpl._id}/edit`);
  };

  const handleDuplicate = async (tpl) => {
    try {
      setActionLoading(true);
      await duplicateTemplate(tpl.id || tpl._id);
      toast.success(`Created duplicate "${tpl.title} Copy" (Draft).`);
    } catch (err) {
      console.error('Failed to duplicate template:', err);
      toast.error('Failed to duplicate template.');
    } finally {
      setActionLoading(false);
    }
  };

  const handlePromptStatusToggle = (tpl) => {
    setStatusToggleTarget(tpl);
  };

  const handleConfirmStatusToggle = async () => {
    if (!statusToggleTarget) return;
    try {
      setActionLoading(true);
      const nextActiveState = !statusToggleTarget.active;
      await updateStatus(statusToggleTarget.id || statusToggleTarget._id, nextActiveState);
      toast.success(
        nextActiveState
          ? `Template "${statusToggleTarget.title}" activated.`
          : `Template "${statusToggleTarget.title}" deactivated.`
      );
      setStatusToggleTarget(null);
    } catch (err) {
      console.error('Failed to update status:', err);
      toast.error('Failed to update template status.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeletePrompt = (tpl) => {
    setDeletingTemplate(tpl);
  };

  const handleConfirmDelete = async () => {
    if (!deletingTemplate) return;
    try {
      setActionLoading(true);
      await deleteTemplate(deletingTemplate.id || deletingTemplate._id);
      toast.success(`Template "${deletingTemplate.title}" deleted successfully.`);
      setDeletingTemplate(null);
    } catch (err) {
      console.error('Failed to delete template:', err);
      toast.error('Failed to delete template.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="Templates"
        subtitle="Create, organize and manage Promptoo AI templates."
        breadcrumbs={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Templates' }
        ]}
        actions={
          <button
            onClick={() => navigate('/admin/templates/new')}
            className="btn btn-primary"
            style={{ gap: '6px' }}
          >
            <Plus size={16} />
            <span>Add Template</span>
          </button>
        }
      />

      {/* Summary Statistics */}
      <TemplateStatsCards stats={stats} loading={statsLoading} />

      {/* Search & Filter Toolbar */}
      <TemplateToolbar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        status={status}
        onStatusChange={setStatus}
        sortBy={sortBy}
        onSortChange={setSortBy}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      {/* Content State: Error / Loading / Table */}
      {error ? (
        <div className="admin-card" style={{ padding: '30px', textAlign: 'center' }}>
          <ErrorState message={error} onRetry={refresh} />
        </div>
      ) : loading ? (
        <TemplateTableSkeleton rows={limit} />
      ) : (
        <>
          <TemplateTable
            templates={templates}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onView={handleView}
            onEdit={handleEdit}
            onDuplicate={handleDuplicate}
            onToggleStatus={handlePromptStatusToggle}
            onDelete={handleDeletePrompt}
            onClearFilters={clearFilters}
          />

          {/* Pagination */}
          <TemplatePagination
            page={page}
            totalPages={totalPages}
            total={total}
            limit={limit}
            onPageChange={setPage}
          />
        </>
      )}

      {/* Preview Detail Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          isOpen={Boolean(previewTemplate)}
          onClose={() => setPreviewTemplate(null)}
          template={previewTemplate}
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          onToggleStatus={handlePromptStatusToggle}
          onDelete={handleDeletePrompt}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deletingTemplate)}
        onClose={() => setDeletingTemplate(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Template?"
        message={`Are you sure you want to delete "${deletingTemplate?.title}"? This action cannot be undone.`}
        confirmLabel="Delete Template"
        cancelLabel="Cancel"
        variant="danger"
        loading={actionLoading}
      />

      {/* Activate / Deactivate Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(statusToggleTarget)}
        onClose={() => setStatusToggleTarget(null)}
        onConfirm={handleConfirmStatusToggle}
        title={statusToggleTarget?.active ? 'Deactivate Template?' : 'Activate Template?'}
        message={
          statusToggleTarget?.active
            ? `This template will no longer appear to users in the Promptoo app.`
            : `This template will become available to users in the Promptoo app.`
        }
        confirmLabel={statusToggleTarget?.active ? 'Deactivate' : 'Activate'}
        cancelLabel="Cancel"
        variant={statusToggleTarget?.active ? 'danger' : 'primary'}
        loading={actionLoading}
      />
    </div>
  );
}
