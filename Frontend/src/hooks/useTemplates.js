import { useState, useEffect, useCallback, useRef } from 'react';
import { templateRepository } from '../repositories/templateRepository';

export function useTemplates({ initialLimit = 10 } = {}) {
  const [templates, setTemplates] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit] = useState(initialLimit);

  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Debounced search state
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // States
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalTemplates: 1248,
    active: 1180,
    inactive: 68,
    totalUses: 186420,
    totalLikes: 92840
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
      const data = await templateRepository.getTemplateStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load template statistics:', err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Fetch paginated templates
  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await templateRepository.getTemplates({
        search: debouncedSearch,
        category,
        status,
        sortBy,
        page,
        limit
      });
      setTemplates(res.templates);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error('Failed to fetch templates:', err);
      setError('Unable to load templates. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, category, status, sortBy, page, limit]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  // Filter setters (auto-reset page to 1)
  const handleCategoryChange = useCallback((cat) => {
    setCategory(cat);
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

  const clearFilters = useCallback(() => {
    setSearch('');
    setDebouncedSearch('');
    setCategory('all');
    setStatus('all');
    setSortBy('newest');
    setPage(1);
  }, []);

  // Mutations
  const duplicateTemplate = useCallback(async (id) => {
    try {
      const copy = await templateRepository.duplicateTemplate(id);
      await Promise.all([fetchTemplates(), fetchStats()]);
      return copy;
    } catch (err) {
      console.error('Duplicate template error:', err);
      throw err;
    }
  }, [fetchTemplates, fetchStats]);

  const updateStatus = useCallback(async (id, newStatus) => {
    try {
      const updated = await templateRepository.updateTemplateStatus(id, newStatus);
      await Promise.all([fetchTemplates(), fetchStats()]);
      return updated;
    } catch (err) {
      console.error('Update status error:', err);
      throw err;
    }
  }, [fetchTemplates, fetchStats]);

  const deleteTemplate = useCallback(async (id) => {
    try {
      const success = await templateRepository.deleteTemplate(id);
      await Promise.all([fetchTemplates(), fetchStats()]);
      return success;
    } catch (err) {
      console.error('Delete template error:', err);
      throw err;
    }
  }, [fetchTemplates, fetchStats]);

  const hasActiveFilters = Boolean(
    search.trim() !== '' ||
    category !== 'all' ||
    status !== 'all' ||
    sortBy !== 'newest'
  );

  return {
    templates,
    total,
    totalPages,
    page,
    limit,
    search,
    category,
    status,
    sortBy,
    stats,
    loading,
    statsLoading,
    error,
    hasActiveFilters,
    // Actions
    setSearch: handleSearchChange,
    setCategory: handleCategoryChange,
    setStatus: handleStatusChange,
    setSortBy: handleSortChange,
    setPage,
    clearFilters,
    refresh: fetchTemplates,
    duplicateTemplate,
    updateStatus,
    deleteTemplate
  };
}
