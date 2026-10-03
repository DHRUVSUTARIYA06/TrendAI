import { useState, useEffect, useCallback } from 'react';
import { analyticsRepository } from '../repositories/analyticsRepository';

export function useAnalytics({ initialDateRange = '30d' } = {}) {
  // Filter states
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [growthInterval, setGrowthInterval] = useState('daily');
  const [metricFilter, setMetricFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categorySortBy, setCategorySortBy] = useState('uses');
  const [categorySortDirection, setCategorySortDirection] = useState('desc');

  // Data states
  const [stats, setStats] = useState(null);
  const [userGrowth, setUserGrowth] = useState([]);
  const [templateUsage, setTemplateUsage] = useState([]);
  const [engagementOverview, setEngagementOverview] = useState([]);
  const [categoryPerformance, setCategoryPerformance] = useState([]);
  const [topTemplates, setTopTemplates] = useState([]);
  const [mostActiveUsers, setMostActiveUsers] = useState([]);
  const [userActivitySummary, setUserActivitySummary] = useState(null);
  const [platformOverview, setPlatformOverview] = useState([]);

  // Loading & error states
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all analytics data
  const fetchAllAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        statsRes,
        growthRes,
        usageRes,
        engagementRes,
        catRes,
        templatesRes,
        usersRes,
        activityRes,
        platformRes
      ] = await Promise.all([
        analyticsRepository.getOverviewStats({ dateRange }),
        analyticsRepository.getUserGrowth({ dateRange, interval: growthInterval }),
        analyticsRepository.getTemplateUsage({ dateRange, interval: 'daily' }),
        analyticsRepository.getEngagementOverview({ dateRange }),
        analyticsRepository.getCategoryPerformance({
          dateRange,
          categoryId: categoryFilter,
          sortBy: categorySortBy,
          sortDirection: categorySortDirection
        }),
        analyticsRepository.getTopTemplates({ dateRange, limit: 10 }),
        analyticsRepository.getMostActiveUsers({ dateRange, limit: 10 }),
        analyticsRepository.getUserActivitySummary({ dateRange }),
        analyticsRepository.getPlatformOverview({ dateRange })
      ]);

      setStats(statsRes);
      setUserGrowth(growthRes);
      setTemplateUsage(usageRes);
      setEngagementOverview(engagementRes);
      setCategoryPerformance(catRes);
      setTopTemplates(templatesRes);
      setMostActiveUsers(usersRes);
      setUserActivitySummary(activityRes);
      setPlatformOverview(platformRes);
    } catch (err) {
      console.error('Failed to load analytics data:', err);
      setError('Unable to load analytics. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [dateRange, growthInterval, categoryFilter, categorySortBy, categorySortDirection]);

  useEffect(() => {
    fetchAllAnalytics();
  }, [fetchAllAnalytics]);

  // Clear filters
  const clearFilters = useCallback(() => {
    setDateRange('30d');
    setGrowthInterval('daily');
    setMetricFilter('all');
    setCategoryFilter('all');
    setCategorySortBy('uses');
    setCategorySortDirection('desc');
  }, []);

  const hasActiveFilters = Boolean(
    dateRange !== '30d' ||
    metricFilter !== 'all' ||
    categoryFilter !== 'all' ||
    growthInterval !== 'daily'
  );

  // Manual refresh
  const refresh = useCallback(async () => {
    setRefreshing(true);
    await analyticsRepository.refreshAnalytics();
    await fetchAllAnalytics();
    setRefreshing(false);
  }, [fetchAllAnalytics]);

  return {
    // Data
    stats,
    userGrowth,
    templateUsage,
    engagementOverview,
    categoryPerformance,
    topTemplates,
    mostActiveUsers,
    userActivitySummary,
    platformOverview,

    // Filter states & setters
    dateRange,
    setDateRange,
    growthInterval,
    setGrowthInterval,
    metricFilter,
    setMetricFilter,
    categoryFilter,
    setCategoryFilter,
    categorySortBy,
    setCategorySortBy,
    categorySortDirection,
    setCategorySortDirection,

    // Flags & handlers
    loading,
    refreshing,
    error,
    hasActiveFilters,
    clearFilters,
    refresh
  };
}
