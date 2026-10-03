import { useState, useEffect, useCallback, useRef } from 'react';
import { adminRepository } from '../repositories/adminRepository';

export function useAdmins({ initialPageSize = 10 } = {}) {
  // Filter states
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [role, setRole] = useState('all');
  const [status, setStatus] = useState('all');

  // Pagination states
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Data states
  const [admins, setAdmins] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    totalAdmins: 0,
    activeAdmins: 0,
    superAdmins: 0,
    recentlyAdded: 0
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

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const res = await adminRepository.getAdminStats();
      setStats(res);
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Fetch admins table
  const fetchAdmins = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminRepository.getAdmins({
        search: debouncedSearch,
        role,
        status,
        page,
        pageSize
      });
      setAdmins(res.admins);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error('Failed to load admins:', err);
      setError('Unable to load administrators. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, role, status, page, pageSize]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const clearFilters = useCallback(() => {
    setSearch('');
    setDebouncedSearch('');
    setRole('all');
    setStatus('all');
    setPage(1);
  }, []);

  const hasActiveFilters = Boolean(
    debouncedSearch || role !== 'all' || status !== 'all'
  );

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([fetchStats(), fetchAdmins()]);
    setRefreshing(false);
  }, [fetchStats, fetchAdmins]);

  const createAdmin = useCallback(async (data) => {
    const res = await adminRepository.createAdmin(data);
    await Promise.all([fetchStats(), fetchAdmins()]);
    return res;
  }, [fetchStats, fetchAdmins]);

  const updateAdmin = useCallback(async (id, data) => {
    const res = await adminRepository.updateAdmin(id, data);
    await Promise.all([fetchStats(), fetchAdmins()]);
    return res;
  }, [fetchStats, fetchAdmins]);

  const updateAdminStatus = useCallback(async (id, newStatus) => {
    const res = await adminRepository.updateAdminStatus(id, newStatus);
    await Promise.all([fetchStats(), fetchAdmins()]);
    return res;
  }, [fetchStats, fetchAdmins]);

  return {
    admins,
    total,
    totalPages,
    stats,
    search,
    setSearch: handleSearchChange,
    role,
    setRole: (val) => { setRole(val); setPage(1); },
    status,
    setStatus: (val) => { setStatus(val); setPage(1); },
    page,
    setPage,
    pageSize,
    setPageSize: (val) => { setPageSize(val); setPage(1); },
    loading,
    statsLoading,
    refreshing,
    error,
    hasActiveFilters,
    clearFilters,
    refresh,
    createAdmin,
    updateAdmin,
    updateAdminStatus
  };
}
