import { useState, useEffect, useCallback, useRef } from 'react';
import { activityRepository } from '../repositories/activityRepository';

export function useActivity({ initialPageSize = 10, initialDateRange = '30d' } = {}) {
  // Filter states
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [activityType, setActivityType] = useState('all');
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Pagination states
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Data states
  const [activities, setActivities] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    totalLikes: 24820,
    totalUses: 68450,
    totalSaves: 14290,
    activeUsers: 2847,
    likesChange: '+12.4%',
    usesChange: '+18.2%',
    savesChange: '+9.6%',
    activeUsersChange: '+8.3%'
  });
  const [chartData, setChartData] = useState([]);
  const [topTemplates, setTopTemplates] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [distribution, setDistribution] = useState([]);

  // Loading & error states
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Debounce search by 250ms
  const searchTimeoutRef = useRef(null);
  const handleSearchChange = useCallback((val) => {
    setSearch(val);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(val);
      setPage(1);
    }, 250);
  }, []);

  // Fetch overview analytics (stats, charts, top templates, active users, distribution)
  const fetchOverviewAnalytics = useCallback(async () => {
    try {
      const [statsRes, chartRes, templatesRes, usersRes, distRes] = await Promise.all([
        activityRepository.getActivityStats({ dateRange }),
        activityRepository.getEngagementOverview({ dateRange }),
        activityRepository.getTopEngagedTemplates({ dateRange, limit: 5 }),
        activityRepository.getMostActiveUsers({ dateRange, limit: 5 }),
        activityRepository.getActivityDistribution({ dateRange })
      ]);
      setStats(statsRes);
      setChartData(chartRes);
      setTopTemplates(templatesRes);
      setActiveUsers(usersRes);
      setDistribution(distRes);
    } catch (err) {
      console.error('Failed to load overview analytics:', err);
    }
  }, [dateRange]);

  // Fetch paginated activity table logs
  const fetchTableData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await activityRepository.getActivity({
        dateRange,
        activityType,
        status,
        search: debouncedSearch,
        sortBy,
        page,
        pageSize
      });
      setActivities(res.activities);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error('Failed to fetch activity table data:', err);
      setError('Unable to load activity data. Please check network connectivity.');
    } finally {
      setLoading(false);
    }
  }, [dateRange, activityType, status, debouncedSearch, sortBy, page, pageSize]);

  // Reactive effects
  useEffect(() => {
    fetchOverviewAnalytics();
  }, [fetchOverviewAnalytics]);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  // Filter handlers
  const handleDateRangeChange = useCallback((range) => {
    setDateRange(range);
    setPage(1);
  }, []);

  const handleActivityTypeChange = useCallback((type) => {
    setActivityType(type);
    setPage(1);
  }, []);

  const handleStatusChange = useCallback((st) => {
    setStatus(st);
    setPage(1);
  }, []);

  const handleSortChange = useCallback((sort) => {
    setSortBy(sort);
    setPage(1);
  }, []);

  const handlePageSizeChange = useCallback((size) => {
    setPageSize(Number(size));
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setDateRange('30d');
    setActivityType('all');
    setStatus('all');
    setSearch('');
    setDebouncedSearch('');
    setSortBy('newest');
    setPage(1);
  }, []);

  const refresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await activityRepository.refreshActivity();
      await Promise.all([fetchOverviewAnalytics(), fetchTableData()]);
    } catch (err) {
      console.error('Refresh failed:', err);
    } finally {
      setRefreshing(false);
    }
  }, [fetchOverviewAnalytics, fetchTableData]);

  const hasActiveFilters = Boolean(
    dateRange !== '30d' ||
    activityType !== 'all' ||
    status !== 'all' ||
    search.trim() !== '' ||
    sortBy !== 'newest'
  );

  return {
    dateRange,
    activityType,
    status,
    search,
    sortBy,
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
    // Actions
    setDateRange: handleDateRangeChange,
    setActivityType: handleActivityTypeChange,
    setStatus: handleStatusChange,
    setSearch: handleSearchChange,
    setSortBy: handleSortChange,
    setPage,
    setPageSize: handlePageSizeChange,
    clearFilters,
    refresh,
    tryAgain: fetchTableData
  };
}
