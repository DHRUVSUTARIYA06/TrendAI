import { useState, useEffect, useCallback, useRef } from 'react';
import { leaderboardRepository } from '../repositories/leaderboardRepository';

export function useLeaderboard({ initialPageSize = 10, initialPeriod = 'weekly' } = {}) {
  // Period filter
  const [period, setPeriod] = useState(initialPeriod);

  // Search & Filters
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [activity, setActivity] = useState('all');

  // Sorting
  const [sortBy, setSortBy] = useState('rank');
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' | 'desc'

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Data states
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [topUsers, setTopUsers] = useState([]);
  const [stats, setStats] = useState({
    totalRankedUsers: 148,
    totalCreations: 2490,
    topUserCreations: 28,
    avgCreations: '16.8'
  });

  // Loading & Error states
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Search debouncing (250ms)
  const searchTimeoutRef = useRef(null);
  const handleSearchChange = useCallback((value) => {
    setSearch(value);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
    }, 250);
  }, []);

  // Fetch summary stats & podium top 3
  const fetchOverviewData = useCallback(async () => {
    try {
      const [statsData, podiumData] = await Promise.all([
        leaderboardRepository.getLeaderboardStats({ period }),
        leaderboardRepository.getTopLeaderboardUsers({ period, limit: 3 })
      ]);
      setStats(statsData);
      setTopUsers(podiumData);
    } catch (err) {
      console.error('Failed to load leaderboard overview:', err);
    }
  }, [period]);

  // Fetch paginated table data
  const fetchTableData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await leaderboardRepository.getLeaderboard({
        period,
        search: debouncedSearch,
        status,
        activity,
        sortBy,
        sortDirection,
        page,
        pageSize
      });
      setUsers(result.users);
      setTotal(result.total);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error('Failed to load leaderboard data:', err);
      setError('Unable to load leaderboard. Please verify connectivity.');
    } finally {
      setLoading(false);
    }
  }, [period, debouncedSearch, status, activity, sortBy, sortDirection, page, pageSize]);

  // Initial and reactive effects
  useEffect(() => {
    fetchOverviewData();
  }, [fetchOverviewData]);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  // Period switch handler
  const handlePeriodChange = useCallback((newPeriod) => {
    setPeriod(newPeriod);
    setPage(1);
  }, []);

  // Status filter handler
  const handleStatusChange = useCallback((newStatus) => {
    setStatus(newStatus);
    setPage(1);
  }, []);

  // Activity filter handler
  const handleActivityChange = useCallback((newActivity) => {
    setActivity(newActivity);
    setPage(1);
  }, []);

  // Page size change handler
  const handlePageSizeChange = useCallback((newPageSize) => {
    setPageSize(Number(newPageSize));
    setPage(1);
  }, []);

  // Sort click handler for column headers
  const handleSort = useCallback(
    (field) => {
      if (sortBy === field) {
        // Toggle direction
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortBy(field);
        // Default rank to asc, metrics to desc
        setSortDirection(field === 'rank' ? 'asc' : 'desc');
      }
      setPage(1);
    },
    [sortBy]
  );

  // Reset all filters
  const clearFilters = useCallback(() => {
    setSearch('');
    setDebouncedSearch('');
    setStatus('all');
    setActivity('all');
    setSortBy('rank');
    setSortDirection('asc');
    setPage(1);
  }, []);

  // Manual refresh handler
  const refresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await leaderboardRepository.refreshLeaderboard();
      await Promise.all([fetchOverviewData(), fetchTableData()]);
    } catch (err) {
      console.error('Leaderboard refresh failed:', err);
    } finally {
      setRefreshing(false);
    }
  }, [fetchOverviewData, fetchTableData]);

  const hasActiveFilters = Boolean(
    search.trim() !== '' ||
    status !== 'all' ||
    activity !== 'all' ||
    sortBy !== 'rank' ||
    sortDirection !== 'asc'
  );

  return {
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
    // Actions
    setPeriod: handlePeriodChange,
    setSearch: handleSearchChange,
    setStatus: handleStatusChange,
    setActivity: handleActivityChange,
    setPage,
    setPageSize: handlePageSizeChange,
    handleSort,
    clearFilters,
    refresh,
    tryAgain: fetchTableData
  };
}
