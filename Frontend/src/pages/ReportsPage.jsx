import React, { useState } from 'react';
import { RotateCw, FileSpreadsheet } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import { useToast } from '../context/ToastContext';
import { useReports } from '../hooks/useReports';

import ReportCardsGrid from '../components/reports/ReportCardsGrid';
import ReportDetailModal from '../components/reports/ReportDetailModal';
import ReportsSkeleton from '../components/reports/ReportsSkeleton';

export default function ReportsPage() {
  const toast = useToast();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    reports,
    activeReport,
    selectedRange,
    loading,
    generating,
    error,
    viewReport,
    changeReportRange,
    closeReport,
    refresh
  } = useReports();

  const handleRefresh = async () => {
    try {
      await refresh();
      toast.success('Reports list refreshed');
    } catch {
      toast.error('Failed to refresh reports');
    }
  };

  const handleOpenReport = async (reportId) => {
    try {
      await viewReport(reportId, '30d');
      setModalOpen(true);
    } catch {
      toast.error('Failed to generate report view');
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    closeReport();
  };

  return (
    <div>
      {/* 1. Page Header */}
      <PageHeader
        title="Reports"
        subtitle="Generate structured reports from Promptoo platform activity."
        breadcrumbs={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Reports' }
        ]}
        actions={
          <button
            onClick={handleRefresh}
            disabled={loading || generating}
            className="btn btn-secondary"
          >
            <RotateCw size={14} className={loading ? 'spinning' : ''} />
            <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        }
      />

      {/* 2. Loading / Error / Content */}
      {error ? (
        <ErrorState
          title="Unable to load report data"
          message={error}
          onRetry={refresh}
        />
      ) : loading ? (
        <ReportsSkeleton />
      ) : reports.length === 0 ? (
        <EmptyState
          icon={FileSpreadsheet}
          title="No report data available"
          description="Report definitions could not be loaded at this time."
          actionLabel="Retry"
          onAction={refresh}
        />
      ) : (
        <>
          <ReportCardsGrid
            reports={reports}
            onViewReport={handleOpenReport}
            generating={generating}
          />

          {/* Interactive Report Viewer Modal */}
          <ReportDetailModal
            isOpen={modalOpen}
            onClose={handleCloseModal}
            report={activeReport}
            dateRange={selectedRange}
            onRangeChange={changeReportRange}
            generating={generating}
          />
        </>
      )}
    </div>
  );
}
