import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import DashboardDateFilter from '../components/dashboard/DashboardDateFilter';
import DashboardOverviewCards from '../components/dashboard/DashboardOverviewCards';
import TemplateUsageChart from '../components/dashboard/TemplateUsageChart';
import UserGrowthChart from '../components/dashboard/UserGrowthChart';
import CategoryPerformanceCard from '../components/dashboard/CategoryPerformanceCard';
import TopTemplatesTable from '../components/dashboard/TopTemplatesTable';
import RecentActivityCard from '../components/dashboard/RecentActivityCard';
import QuickActionsCard from '../components/dashboard/QuickActionsCard';
import SystemStatusCard from '../components/dashboard/SystemStatusCard';
import DashboardSkeleton from '../components/dashboard/DashboardSkeleton';
import { useDashboard } from '../hooks/useDashboard';
import { DATE_RANGES } from '../types/dashboard';

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState(DATE_RANGES.LAST_30_DAYS);
  const { loading, error, data, refetch } = useDashboard(dateRange);

  if (error) {
    return (
      <div>
        <PageHeader
          title="Dashboard"
          subtitle="Welcome back, Admin. Here's what's happening with Promptoo."
        />
        <ErrorState
          title="Unable to load dashboard data"
          message={error}
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div>
      {/* Page Header with Welcome & Date Range Control */}
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, Admin. Here's what's happening with Promptoo."
        actions={
          <DashboardDateFilter
            value={dateRange}
            onChange={setDateRange}
          />
        }
      />

      {loading ? (
        <DashboardSkeleton />
      ) : !data.overview ? (
        <EmptyState
          title="No analytics data yet"
          description="Analytics will appear here once creative generation activity starts."
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* 1. Top Statistics: 4 Responsive Stat Cards */}
          <DashboardOverviewCards overview={data.overview} />

          {/* 2. Main Analytics Section: 65% / 35% Two-Column Desktop Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.85fr) minmax(0, 1fr)',
              gap: '24px',
              alignItems: 'stretch'
            }}
            className="dashboard-charts-grid"
          >
            <div>
              <TemplateUsageChart data={data.usageStats} />
            </div>
            <div>
              <UserGrowthChart data={data.userGrowth} />
            </div>
          </div>

          {/* 3. Category Performance & Top Performing Templates */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.6fr)',
              gap: '24px',
              alignItems: 'stretch'
            }}
            className="dashboard-details-grid"
          >
            <div>
              <CategoryPerformanceCard categories={data.categories} />
            </div>
            <div>
              <TopTemplatesTable templates={data.topTemplates} />
            </div>
          </div>

          {/* 4. Activity, Quick Actions & Promptoo Services */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
              gap: '24px',
              alignItems: 'stretch'
            }}
            className="dashboard-bottom-grid"
          >
            <div>
              <RecentActivityCard activities={data.recentActivity} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <QuickActionsCard />
              <SystemStatusCard services={data.systemStatus} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
