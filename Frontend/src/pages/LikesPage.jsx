import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import ActivityStatsCards from '../components/activity/ActivityStatsCards';
import EngagementOverviewChart from '../components/activity/EngagementOverviewChart';
import TopEngagedTemplates from '../components/activity/TopEngagedTemplates';
import MostActiveUsers from '../components/activity/MostActiveUsers';
import ActivityDistribution from '../components/activity/ActivityDistribution';
import ActivityToolbar from '../components/activity/ActivityToolbar';
import ActivityTable from '../components/activity/ActivityTable';
import ActivityPagination from '../components/activity/ActivityPagination';
import ActivitySkeleton from '../components/activity/ActivitySkeleton';
import { useActivity } from '../hooks/useActivity';
import { useToast } from '../context/ToastContext';
import { DATE_RANGE_OPTIONS } from '../types/activity';

export default function LikesPage() {
  const toast = useToast();

  const {
    dateRange,
    activityType,
    status,
    search,
    page,
    pageSize,
    activities,
    total,
    totalPages,
    stats,
    chartData,
    topTemplates,
    activeUsers,
    distribution,
    loading,
    refreshing,
    error,
    hasActiveFilters,
    setDateRange,
    setActivityType,
    setStatus,
    setSearch,
    setPage,
    setPageSize,
    clearFilters,
    refresh,
    tryAgain
  } = useActivity({ initialPageSize: 10, initialDateRange: '30d' });

  const handleManualRefresh = async () => {
    await refresh();
    toast.success('Activity stream and engagement statistics refreshed.');
  };

  return (
    <div>
      {/* 1. Page Header */}
      <PageHeader
        title="Likes & Activity"
        subtitle="Monitor template engagement and user activity across Promptoo."
        breadcrumbs={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Likes & Activity' }
        ]}
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Date Range Selector Pills */}
            <div
              style={{
                display: 'inline-flex',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '2px',
                gap: '2px'
              }}
            >
              {DATE_RANGE_OPTIONS.map((opt) => {
                const isSelected = dateRange === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setDateRange(opt.value)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: 'none',
                      backgroundColor: isSelected ? 'var(--primary-purple)' : 'transparent',
                      color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* Refresh button */}
            <button
              onClick={handleManualRefresh}
              disabled={refreshing || loading}
              className="btn btn-secondary btn-sm"
              style={{ gap: '6px' }}
              title="Refresh activity data"
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
              <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>
        }
      />

      {/* Error state */}
      {error && !loading ? (
        <div
          className="admin-card"
          style={{
            padding: '36px 20px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px'
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              backgroundColor: 'var(--danger-dim)',
              color: 'var(--danger)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <AlertTriangle size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
              Unable to load activity data
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, maxWidth: '420px' }}>
              {error}
            </p>
          </div>
          <button onClick={tryAgain} className="btn btn-primary btn-sm" style={{ marginTop: '8px' }}>
            Try Again
          </button>
        </div>
      ) : null}

      {/* Initial loading skeleton */}
      {loading && activities.length === 0 ? (
        <ActivitySkeleton rows={pageSize} />
      ) : (
        <>
          {/* 2. Summary Stats Row */}
          <ActivityStatsCards stats={stats} loading={loading} />

          {/* 3. Engagement Overview Chart */}
          <EngagementOverviewChart data={chartData} loading={loading} />

          {/* 4. Split Analytics: Top Engaged Templates, Most Active Users, Activity Distribution */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '16px',
              marginBottom: '28px',
              alignItems: 'stretch'
            }}
          >
            {/* Top Engaged Templates */}
            <TopEngagedTemplates templates={topTemplates} />

            {/* Most Active Users */}
            <MostActiveUsers users={activeUsers} />

            {/* Activity Distribution */}
            <ActivityDistribution distribution={distribution} />
          </div>

          {/* 5. Detailed Activity Feed Header & Toolbar */}
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
              Recent Activity Log
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
              Chronological stream of user likes, template transformations, and bookmark saves
            </p>
          </div>

          <ActivityToolbar
            search={search}
            onSearchChange={setSearch}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            activityType={activityType}
            onActivityTypeChange={setActivityType}
            status={status}
            onStatusChange={setStatus}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
          />

          {/* 6. Activity Table */}
          <ActivityTable activities={activities} onClearFilters={clearFilters} />

          {/* 7. Pagination */}
          <ActivityPagination
            page={page}
            totalPages={totalPages}
            total={total}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </>
      )}
    </div>
  );
}
