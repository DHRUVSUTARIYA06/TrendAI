import { useState, useEffect, useCallback, useRef } from 'react';
import { userRepository } from '../repositories/userRepository';

export function useUsers({ initialLimit = 10 } = {}) {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit] = useState(initialLimit);

  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [activity, setActivity] = useState('all');
  const [registration, setRegistration] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // States
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 24582,
    activeUsers: 18420,
    newUsers: 1284,
    usersWithActivity: 16840
  });

  // Debounce search input by 250ms
  const searchTimeoutRef = useRef(null);
  const handleSearchChange = useCallback((newSearch) => {
    setSearch(newSearch);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(newSearch);
      setPage(1);
    }, 250);
  }, []);

  // Fetch summary stats
  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const data = await userRepository.getUserStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load user statistics:', err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Fetch paginated users
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await userRepository.getUsers({
        search: debouncedSearch,
        status,
        activity,
        registration,
        sortBy,
        page,
        limit
      });
      setUsers(res.users);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError('Unable to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, status, activity, registration, sortBy, page, limit]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter setters
  const handleStatusChange = useCallback((st) => {
    setStatus(st);
    setPage(1);
  }, []);

  const handleActivityChange = useCallback((act) => {
    setActivity(act);
    setPage(1);
  }, []);

  const handleRegistrationChange = useCallback((reg) => {
    setRegistration(reg);
    setPage(1);
  }, []);

  const handleSortChange = useCallback((sort) => {
    setSortBy(sort);
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setSearch('');
    setDebouncedSearch('');
    setStatus('all');
    setActivity('all');
    setRegistration('all');
    setSortBy('newest');
    setPage(1);
  }, []);

  // Mutations
  const updateStatus = useCallback(async (id, newStatus) => {
    try {
      const updated = await userRepository.updateUserStatus(id, newStatus);
      await Promise.all([fetchUsers(), fetchStats()]);
      return updated;
    } catch (err) {
      console.error('Update user status failed:', err);
      throw err;
    }
  }, [fetchUsers, fetchStats]);

  const updateProfile = useCallback(async (id, data) => {
    try {
      const updated = await userRepository.updateUserProfile(id, data);
      await fetchUsers();
      return updated;
    } catch (err) {
      console.error('Update user profile failed:', err);
      throw err;
    }
  }, [fetchUsers]);

  const hasActiveFilters = Boolean(
    search.trim() !== '' ||
    status !== 'all' ||
    activity !== 'all' ||
    registration !== 'all' ||
    sortBy !== 'newest'
  );

  return {
    users,
    total,
    totalPages,
    page,
    limit,
    search,
    status,
    activity,
    registration,
    sortBy,
    stats,
    loading,
    statsLoading,
    error,
    hasActiveFilters,
    // Actions
    setSearch: handleSearchChange,
    setStatus: handleStatusChange,
    setActivity: handleActivityChange,
    setRegistration: handleRegistrationChange,
    setSortBy: handleSortChange,
    setPage,
    clearFilters,
    refresh: fetchUsers,
    updateStatus,
    updateProfile
  };
}
