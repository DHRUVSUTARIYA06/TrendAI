import { useState, useEffect, useCallback, useRef } from 'react';
import { categoryRepository } from '../repositories/categoryRepository';

export function useCategories({ initialLimit = 10 } = {}) {
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit] = useState(initialLimit);

  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [featured, setFeatured] = useState('all');
  const [sortBy, setSortBy] = useState('sort-order');

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // States
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalCategories: 12,
    active: 10,
    inactive: 2,
    totalTemplates: 1248,
    featured: 6
  });

  // Debounce search
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
      const data = await categoryRepository.getCategoryStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load category statistics:', err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Fetch paginated categories
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await categoryRepository.getCategories({
        search: debouncedSearch,
        status,
        featured,
        sortBy,
        page,
        limit
      });
      setCategories(res.categories);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError('Unable to load categories. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, status, featured, sortBy, page, limit]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Filter setters
  const handleStatusChange = useCallback((st) => {
    setStatus(st);
    setPage(1);
  }, []);

  const handleFeaturedChange = useCallback((feat) => {
    setFeatured(feat);
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
    setFeatured('all');
    setSortBy('sort-order');
    setPage(1);
  }, []);

  // Mutations
  const toggleStatus = useCallback(async (id, currentActive) => {
    try {
      const nextActive = !currentActive;
      const res = await categoryRepository.updateCategoryStatus(id, nextActive);
      await Promise.all([fetchCategories(), fetchStats()]);
      return res;
    } catch (err) {
      console.error('Toggle category status failed:', err);
      throw err;
    }
  }, [fetchCategories, fetchStats]);

  const toggleFeatured = useCallback(async (id, currentFeatured) => {
    try {
      const nextFeatured = !currentFeatured;
      const res = await categoryRepository.updateCategoryFeatured(id, nextFeatured);
      await Promise.all([fetchCategories(), fetchStats()]);
      return res;
    } catch (err) {
      console.error('Toggle category featured failed:', err);
      throw err;
    }
  }, [fetchCategories, fetchStats]);

  const deleteCategory = useCallback(async (id) => {
    try {
      const res = await categoryRepository.deleteCategory(id);
      await Promise.all([fetchCategories(), fetchStats()]);
      return res;
    } catch (err) {
      console.error('Delete category failed:', err);
      throw err;
    }
  }, [fetchCategories, fetchStats]);

  const hasActiveFilters = Boolean(
    search.trim() !== '' ||
    status !== 'all' ||
    featured !== 'all' ||
    sortBy !== 'sort-order'
  );

  return {
    categories,
    total,
    totalPages,
    page,
    limit,
    search,
    status,
    featured,
    sortBy,
    stats,
    loading,
    statsLoading,
    error,
    hasActiveFilters,
    // Actions
    setSearch: handleSearchChange,
    setStatus: handleStatusChange,
    setFeatured: handleFeaturedChange,
    setSortBy: handleSortChange,
    setPage,
    clearFilters,
    refresh: fetchCategories,
    toggleStatus,
    toggleFeatured,
    deleteCategory
  };
}
