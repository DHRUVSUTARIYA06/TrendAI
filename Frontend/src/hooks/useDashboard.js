import { useState, useEffect, useCallback } from 'react';
import { dashboardRepository } from '../repositories/dashboardRepository';
import { DATE_RANGES } from '../types/dashboard';

export const useDashboard = (dateRange = DATE_RANGES.LAST_30_DAYS) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    overview: null,
    usageStats: [],
    userGrowth: [],
    categories: [],
    topTemplates: [],
    recentActivity: [],
    systemStatus: []
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        overview,
        usageStats,
        userGrowth,
        categories,
        topTemplates,
        recentActivity,
        systemStatus
      ] = await Promise.all([
        dashboardRepository.getOverviewStats(dateRange),
        dashboardRepository.getUsageStats(dateRange),
        dashboardRepository.getUserGrowthStats(dateRange),
        dashboardRepository.getCategoryPerformance(dateRange),
        dashboardRepository.getTopTemplates(dateRange),
        dashboardRepository.getRecentActivity(),
        dashboardRepository.getSystemStatus()
      ]);

      setData({
        overview,
        usageStats,
        userGrowth,
        categories,
        topTemplates,
        recentActivity,
        systemStatus
      });
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError(err?.message || 'Unable to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    loading,
    error,
    data,
    refetch: fetchData
  };
};
