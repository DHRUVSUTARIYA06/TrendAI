import { useState, useEffect, useCallback, useRef } from 'react';
import { notificationRepository } from '../repositories/notificationRepository';

export function useNotifications({ initialPageSize = 10 } = {}) {
  // Filter states
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [audience, setAudience] = useState('all');
  const [type, setType] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Pagination states
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Data states
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    drafts: 0,
    scheduled: 0,
    sent: 0,
    failed: 0,
    sending: 0,
    cancelled: 0
  });

  // Loading & error states
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Debounced search (250ms)
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

  // Fetch Stats
  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const res = await notificationRepository.getNotificationStats();
      setStats(res);
    } catch (err) {
      console.error('Failed to load notification stats:', err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Fetch Notifications Table Data
  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await notificationRepository.getNotifications({
        search: debouncedSearch,
        status,
        audience,
        type,
        dateRange,
        sortBy,
        page,
        pageSize
      });
      setNotifications(res.notifications);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error('Failed to load notifications:', err);
      setError('Unable to load notifications. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, status, audience, type, dateRange, sortBy, page, pageSize]);

  // Initial & reactive loads
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearch('');
    setDebouncedSearch('');
    setStatus('all');
    setAudience('all');
    setType('all');
    setDateRange('all');
    setSortBy('newest');
    setPage(1);
  }, []);

  const hasActiveFilters = Boolean(
    debouncedSearch ||
    status !== 'all' ||
    audience !== 'all' ||
    type !== 'all' ||
    dateRange !== 'all'
  );

  // Manual refresh
  const refresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([fetchStats(), fetchNotifications()]);
    setRefreshing(false);
  }, [fetchStats, fetchNotifications]);

  // Mutations
  const createNotification = useCallback(async (data) => {
    const res = await notificationRepository.createNotification(data);
    await Promise.all([fetchStats(), fetchNotifications()]);
    return res;
  }, [fetchStats, fetchNotifications]);

  const updateNotification = useCallback(async (id, data) => {
    const res = await notificationRepository.updateNotification(id, data);
    await Promise.all([fetchStats(), fetchNotifications()]);
    return res;
  }, [fetchStats, fetchNotifications]);

  const duplicateNotification = useCallback(async (id) => {
    const res = await notificationRepository.duplicateNotification(id);
    await Promise.all([fetchStats(), fetchNotifications()]);
    return res;
  }, [fetchStats, fetchNotifications]);

  const deleteNotification = useCallback(async (id) => {
    const res = await notificationRepository.deleteNotification(id);
    await Promise.all([fetchStats(), fetchNotifications()]);
    return res;
  }, [fetchStats, fetchNotifications]);

  const scheduleNotification = useCallback(async (id, scheduledAt) => {
    const res = await notificationRepository.scheduleNotification(id, scheduledAt);
    await Promise.all([fetchStats(), fetchNotifications()]);
    return res;
  }, [fetchStats, fetchNotifications]);

  const cancelNotification = useCallback(async (id) => {
    const res = await notificationRepository.cancelNotification(id);
    await Promise.all([fetchStats(), fetchNotifications()]);
    return res;
  }, [fetchStats, fetchNotifications]);

  const markAsSent = useCallback(async (id) => {
    const res = await notificationRepository.markAsSent(id);
    await Promise.all([fetchStats(), fetchNotifications()]);
    return res;
  }, [fetchStats, fetchNotifications]);

  return {
    // Data
    notifications,
    total,
    totalPages,
    stats,

    // Filter values & setters
    search,
    setSearch: handleSearchChange,
    status,
    setStatus: (val) => { setStatus(val); setPage(1); },
    audience,
    setAudience: (val) => { setAudience(val); setPage(1); },
    type,
    setType: (val) => { setType(val); setPage(1); },
    dateRange,
    setDateRange: (val) => { setDateRange(val); setPage(1); },
    sortBy,
    setSortBy: (val) => { setSortBy(val); setPage(1); },

    // Pagination
    page,
    setPage,
    pageSize,
    setPageSize: (val) => { setPageSize(val); setPage(1); },

    // States & flags
    loading,
    statsLoading,
    refreshing,
    error,
    hasActiveFilters,

    // Actions
    clearFilters,
    refresh,
    createNotification,
    updateNotification,
    duplicateNotification,
    deleteNotification,
    scheduleNotification,
    cancelNotification,
    markAsSent
  };
}
