import React from 'react';
import { RotateCw, Download } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import ErrorState from '../components/common/ErrorState';
import { useToast } from '../context/ToastContext';
import { useAnalytics } from '../hooks/useAnalytics';
import { ANALYTICS_DATE_RANGES } from '../types/analytics';

import AnalyticsStatsCards from '../components/analytics/AnalyticsStatsCards';
import AnalyticsFilterBar from '../components/analytics/AnalyticsFilterBar';
import UserGrowthChart from '../components/analytics/UserGrowthChart';
import TemplateUsageChart from '../components/analytics/TemplateUsageChart';
import EngagementOverviewChart from '../components/analytics/EngagementOverviewChart';
import CategoryPerformanceTable from '../components/analytics/CategoryPerformanceTable';
import TopTemplatesTable from '../components/analytics/TopTemplatesTable';
import MostActiveUsersTable from '../components/analytics/MostActiveUsersTable';
import UserActivitySummary from '../components/analytics/UserActivitySummary';
import PlatformOverview from '../components/analytics/PlatformOverview';
import AnalyticsSkeleton from '../components/analytics/AnalyticsSkeleton';

export default function AnalyticsPage() {
  const toast = useToast();

  const {
    stats,
    userGrowth,
    templateUsage,
    engagementOverview,
    categoryPerformance,
    topTemplates,
    mostActiveUsers,
    userActivitySummary,
    platformOverview,
    dateRange,
    setDateRange,
    growthInterval,
    setGrowthInterval,
    metricFilter,
    setMetricFilter,
    categoryFilter,
    setCategoryFilter,
    categorySortBy,
    categorySortDirection,
    setCategorySortBy,
    setCategorySortDirection,
    loading,
    refreshing,
    error,
    hasActiveFilters,
    clearFilters,
    refresh
  } = useAnalytics({ initialDateRange: '30d' });

  const handleRefresh = async () => {
    try {
      await refresh();
      toast.success('Analytics data refreshed');
    } catch {
      toast.error('Failed to refresh analytics');
    }
  };

  const handleExportNotice = () => {
    toast.info('Raw analytics export is coming in the next release. Structured reports are available on the Reports page.');
  };

  const handleCategorySort = (field, direction) => {
    setCategorySortBy(field);
    setCategorySortDirection(direction);
  };

  // Visibility based on metricFilter
  const showUsers = metricFilter === 'all' || metricFilter === 'users';
  const showUses = metricFilter === 'all' || metricFilter === 'uses';
  const showEngagement = metricFilter === 'all' || metricFilter === 'engagement' || metricFilter === 'likes' || metricFilter === 'saves';

  return (
    <div>
      {/* 1. Page Header */}
      <PageHeader
        title="Analytics"
        subtitle="Understand Promptoo growth, engagement, and template performance."
        breadcrumbs={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Analytics' }
        ]}
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Date Range Selector Pill */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{
                height: '38px',
                padding: '0 12px',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              {ANALYTICS_DATE_RANGES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>

            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="btn btn-secondary"
            >
              <RotateCw size={14} className={refreshing ? 'spinning' : ''} />
              <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>

            <button
              onClick={handleExportNotice}
              className="btn btn-secondary"
              title="Export analytics summary"
            >
              <Download size={14} />
              <span>Export</span>
            </button>
          </div>
        }
      />

      {/* 2. Overview Stats (6 cards) */}
      <AnalyticsStatsCards stats={stats} loading={loading} />

      {/* 3. Analytics Filter Bar */}
      <AnalyticsFilterBar
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        metricFilter={metricFilter}
        onMetricFilterChange={setMetricFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* 4. Loading / Error / Empty States */}
      {error ? (
        <ErrorState
          title="Unable to load analytics"
          message={error}
          onRetry={refresh}
        />
      ) : loading ? (
        <AnalyticsSkeleton />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Charts Row: User Growth & Template Usage */}
          {(showUsers || showUses) && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
                gap: '24px'
              }}
            >
              {showUsers && (
                <UserGrowthChart
                  data={userGrowth}
                  interval={growthInterval}
                  onIntervalChange={setGrowthInterval}
                />
              )}
              {showUses && <TemplateUsageChart data={templateUsage} />}
            </div>
          )}

          {/* Engagement Overview Chart */}
          {showEngagement && (
            <EngagementOverviewChart data={engagementOverview} />
          )}

          {/* Category Performance Table */}
          <CategoryPerformanceTable
            categories={categoryPerformance}
            sortBy={categorySortBy}
            sortDirection={categorySortDirection}
            onSortChange={handleCategorySort}
          />

          {/* Top Templates & Most Active Users Split Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
              gap: '24px'
            }}
          >
            <TopTemplatesTable templates={topTemplates} />
            <MostActiveUsersTable users={mostActiveUsers} />
          </div>

          {/* User Activity & Platform Telemetry Split Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '24px'
            }}
          >
            <UserActivitySummary summary={userActivitySummary} />
            <PlatformOverview platforms={platformOverview} />
          </div>
        </div>
      )}
    </div>
  );
}
