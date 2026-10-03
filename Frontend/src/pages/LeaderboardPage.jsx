import React from 'react';
import { RefreshCw, Download, AlertTriangle } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import LeaderboardStatsCards from '../components/leaderboard/LeaderboardStatsCards';
import LeaderboardPodium from '../components/leaderboard/LeaderboardPodium';
import LeaderboardToolbar from '../components/leaderboard/LeaderboardToolbar';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';
import LeaderboardPagination from '../components/leaderboard/LeaderboardPagination';
import LeaderboardSkeleton from '../components/leaderboard/LeaderboardSkeleton';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { useToast } from '../context/ToastContext';

export default function LeaderboardPage() {
  const toast = useToast();

  const {
    period,
    search,
    status,
    activity,
    sortBy,
    sortDirection,
    page,
    pageSize,
    users,
    total,
    totalPages,
    topUsers,
    stats,
    loading,
    refreshing,
    error,
    hasActiveFilters,
    setPeriod,
    setSearch,
    setStatus,
    setActivity,
    setPage,
    setPageSize,
    handleSort,
    clearFilters,
    refresh,
    tryAgain
  } = useLeaderboard({ initialPageSize: 10, initialPeriod: 'weekly' });

  const handleExport = () => {
    toast.info('Export preview generated (mock). Leaderboard CSV data ready for download.');
  };

  const handleManualRefresh = async () => {
    await refresh();
    toast.success('Leaderboard rankings and statistics refreshed.');
  };

  return (
    <div>
      {/* 1. Page Header */}
      <PageHeader
        title="Leaderboard"
        subtitle="Manage rankings, user performance, and leaderboard activity."
        breadcrumbs={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Leaderboard' }
        ]}
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Period Quick Toggle */}
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
              <button
                onClick={() => setPeriod('weekly')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: period === 'weekly' ? 'var(--primary-purple)' : 'transparent',
                  color: period === 'weekly' ? '#FFFFFF' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease'
                }}
              >
                Weekly
              </button>
              <button
                onClick={() => setPeriod('all_time')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: period === 'all_time' ? 'var(--primary-purple)' : 'transparent',
                  color: period === 'all_time' ? '#FFFFFF' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease'
                }}
              >
                All Time
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleManualRefresh}
              disabled={refreshing || loading}
              className="btn btn-secondary btn-sm"
              style={{ gap: '6px' }}
              title="Refresh mock rankings data"
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
              <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>

            {/* Export UI Button */}
            <button
              onClick={handleExport}
              className="btn btn-secondary btn-sm"
              style={{ gap: '6px' }}
              title="Export leaderboard ranking data"
            >
              <Download size={14} />
              <span>Export</span>
            </button>
          </div>
        }
      />

      {/* Error State */}
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
              Unable to load leaderboard
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

      {/* Initial Loading Skeleton */}
      {loading && users.length === 0 ? (
        <LeaderboardSkeleton rows={pageSize} />
      ) : (
        <>
          {/* 2. Compact Summary Stats Row */}
          <LeaderboardStatsCards stats={stats} period={period} loading={loading} />

          {/* 3. Top 3 Podium Section */}
          <LeaderboardPodium topUsers={topUsers} period={period} />

          {/* 4. Leaderboard Search & Filters Toolbar */}
          <LeaderboardToolbar
            search={search}
            onSearchChange={setSearch}
            period={period}
            onPeriodChange={setPeriod}
            status={status}
            onStatusChange={setStatus}
            activity={activity}
            onActivityChange={setActivity}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
          />

          {/* 5. Leaderboard Table */}
          <LeaderboardTable
            users={users}
            period={period}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={handleSort}
            onClearFilters={clearFilters}
          />

          {/* 6. Pagination Controls */}
          <LeaderboardPagination
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
