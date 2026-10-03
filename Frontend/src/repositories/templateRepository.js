/**
 * Promptoo Admin — Template Repository Interface & Mock Provider
 *
 * Encapsulates all data access for Templates.
 * Designed to be seamlessly replaced with Supabase Client (`supabase.from('templates')`)
 * without requiring any refactoring of UI components or custom hooks.
 */

import { INITIAL_TEMPLATES } from '../mock/templateMockData.js';

// In-memory mutable array for mock sessions
let mockTemplates = [...INITIAL_TEMPLATES];

export const templateRepository = {
  /**
   * Retrieves templates with full search, category/status filtering, sorting & pagination.
   */
  getTemplates: async ({
    search = '',
    category = 'all',
    status = 'all',
    sortBy = 'newest',
    page = 1,
    limit = 10
  } = {}) => {
    // Artificial small delay to simulate network latency realistically
    await new Promise((resolve) => setTimeout(resolve, 150));

    let filtered = [...mockTemplates];

    // Search filter: title, category, ID, prompt
    if (search && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter((t) => {
        const matchesTitle = t.title?.toLowerCase().includes(q);
        const matchesCategory = t.category?.toLowerCase().includes(q) || t.categoryName?.toLowerCase().includes(q);
        const matchesId = t.id?.toLowerCase().includes(q);
        const matchesPrompt = t.prompt?.toLowerCase().includes(q);
        const matchesTags = Array.isArray(t.tags) && t.tags.some(tag => tag.toLowerCase().includes(q));
        return matchesTitle || matchesCategory || matchesId || matchesPrompt || matchesTags;
      });
    }

    // Category filter
    if (category && category !== 'all') {
      filtered = filtered.filter((t) => t.category?.toLowerCase() === category.toLowerCase());
    }

    // Status filter
    if (status && status !== 'all') {
      const isActiveFilter = status === 'active';
      filtered = filtered.filter((t) => Boolean(t.active) === isActiveFilter);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'most-used':
          return (b.usageCount || 0) - (a.usageCount || 0);
        case 'most-liked':
          return (b.likeCount || 0) - (a.likeCount || 0);
        case 'title-asc':
          return (a.title || '').localeCompare(b.title || '');
        case 'title-desc':
          return (b.title || '').localeCompare(a.title || '');
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const startIndex = (currentPage - 1) * limit;
    const paginatedTemplates = filtered.slice(startIndex, startIndex + limit);

    return {
      templates: paginatedTemplates,
      total,
      page: currentPage,
      limit,
      totalPages
    };
  },

  /**
   * Legacy getAll compatibility
   */
  getAll: async () => {
    return [...mockTemplates];
  },

  /**
   * Retrieves summary statistics.
   * Matches prompt requested overview stats:
   * Total Templates (1,248), Active (1,180), Inactive (68), Total Uses (186,420), Total Likes (92,840)
   */
  getTemplateStats: async () => {
    await new Promise((resolve) => setTimeout(resolve, 80));

    // Dynamic calculation combined with platform-wide scale
    const activeCount = mockTemplates.filter((t) => t.active).length;
    const inactiveCount = mockTemplates.filter((t) => !t.active).length;
    const localUses = mockTemplates.reduce((acc, t) => acc + (t.usageCount || 0), 0);
    const localLikes = mockTemplates.reduce((acc, t) => acc + (t.likeCount || 0), 0);

    return {
      totalTemplates: 1248 + (mockTemplates.length - INITIAL_TEMPLATES.length),
      active: 1180 + activeCount - 12,
      inactive: 68 + inactiveCount - 3,
      totalUses: 186420 + localUses - 149000,
      totalLikes: 92840 + localLikes - 50000
    };
  },

  /**
   * Retrieves single template by ID
   */
  getTemplateById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return mockTemplates.find((t) => t.id === id || t._id === id) || null;
  },

  getById: async (id) => {
    return mockTemplates.find((t) => t.id === id || t._id === id) || null;
  },

  /**
   * Creates a new template.
   * Server-controlled fields (id, usageCount, likeCount, createdAt) are strictly managed here.
   */
  createTemplate: async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const nextIdNum = mockTemplates.length + 1;
    const newId = `TMP-${String(nextIdNum).padStart(3, '0')}`;
    const now = new Date().toISOString();

    const newTemplate = {
      id: newId,
      _id: newId,
      title: formData.title?.trim() || 'Untitled Template',
      category: formData.category || 'other',
      categoryName: formData.categoryName || formData.category || 'Other',
      description: formData.description?.trim() || '',
      prompt: formData.prompt?.trim() || '',
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      thumbnailUrl: formData.thumbnailUrl || formData.imageUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80',
      tags: Array.isArray(formData.tags) ? formData.tags : [],
      version: formData.version || '1.0',
      sortOrder: Number(formData.sortOrder) || 0,
      featured: Boolean(formData.featured),
      trending: Boolean(formData.trending),
      active: formData.active !== undefined ? Boolean(formData.active) : true,
      // Protected server-controlled fields:
      usageCount: 0,
      likeCount: 0,
      createdAt: now,
      updatedAt: now
    };

    mockTemplates.unshift(newTemplate);
    return newTemplate;
  },

  create: async (data) => {
    return templateRepository.createTemplate(data);
  },

  /**
   * Updates an existing template.
   * Server-controlled metrics (usageCount, likeCount, createdAt) are protected from alteration.
   */
  updateTemplate: async (id, formData) => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const index = mockTemplates.findIndex((t) => t.id === id || t._id === id);
    if (index === -1) {
      throw new Error(`Template with ID ${id} not found.`);
    }

    const existing = mockTemplates[index];
    const now = new Date().toISOString();

    const updated = {
      ...existing,
      title: formData.title !== undefined ? formData.title.trim() : existing.title,
      category: formData.category !== undefined ? formData.category : existing.category,
      categoryName: formData.categoryName !== undefined ? formData.categoryName : existing.categoryName,
      description: formData.description !== undefined ? formData.description.trim() : existing.description,
      prompt: formData.prompt !== undefined ? formData.prompt.trim() : existing.prompt,
      imageUrl: formData.imageUrl !== undefined ? formData.imageUrl : existing.imageUrl,
      thumbnailUrl: formData.thumbnailUrl !== undefined ? formData.thumbnailUrl : (formData.imageUrl || existing.thumbnailUrl),
      tags: Array.isArray(formData.tags) ? formData.tags : existing.tags,
      version: formData.version !== undefined ? formData.version : existing.version,
      sortOrder: formData.sortOrder !== undefined ? Number(formData.sortOrder) : existing.sortOrder,
      featured: formData.featured !== undefined ? Boolean(formData.featured) : existing.featured,
      trending: formData.trending !== undefined ? Boolean(formData.trending) : existing.trending,
      active: formData.active !== undefined ? Boolean(formData.active) : existing.active,
      // Protected fields:
      usageCount: existing.usageCount,
      likeCount: existing.likeCount,
      createdAt: existing.createdAt,
      updatedAt: now
    };

    mockTemplates[index] = updated;
    return updated;
  },

  /**
   * Duplicates an existing template as an inactive draft with reset stats and unique ID.
   */
  duplicateTemplate: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const existing = mockTemplates.find((t) => t.id === id || t._id === id);
    if (!existing) {
      throw new Error(`Template with ID ${id} not found.`);
    }

    const nextIdNum = mockTemplates.length + 1;
    const newId = `TMP-${String(nextIdNum).padStart(3, '0')}`;
    const now = new Date().toISOString();

    const copy = {
      ...existing,
      id: newId,
      _id: newId,
      title: `${existing.title} Copy`,
      active: false, // Duplicated starts as inactive / draft
      featured: false,
      trending: false,
      usageCount: 0,
      likeCount: 0,
      createdAt: now,
      updatedAt: now
    };

    mockTemplates.unshift(copy);
    return copy;
  },

  /**
   * Updates active/inactive status
   */
  updateTemplateStatus: async (id, statusOrBool) => {
    await new Promise((resolve) => setTimeout(resolve, 150));

    const index = mockTemplates.findIndex((t) => t.id === id || t._id === id);
    if (index === -1) {
      throw new Error(`Template with ID ${id} not found.`);
    }

    const newActiveState = typeof statusOrBool === 'boolean' ? statusOrBool : statusOrBool === 'active';
    mockTemplates[index] = {
      ...mockTemplates[index],
      active: newActiveState,
      updatedAt: new Date().toISOString()
    };

    return mockTemplates[index];
  },

  /**
   * Updates featured flag
   */
  updateFeatured: async (id, value) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const index = mockTemplates.findIndex((t) => t.id === id || t._id === id);
    if (index !== -1) {
      mockTemplates[index] = {
        ...mockTemplates[index],
        featured: Boolean(value),
        updatedAt: new Date().toISOString()
      };
      return mockTemplates[index];
    }
    return null;
  },

  /**
   * Updates trending flag
   */
  updateTrending: async (id, value) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const index = mockTemplates.findIndex((t) => t.id === id || t._id === id);
    if (index !== -1) {
      mockTemplates[index] = {
        ...mockTemplates[index],
        trending: Boolean(value),
        updatedAt: new Date().toISOString()
      };
      return mockTemplates[index];
    }
    return null;
  },

  /**
   * Deletes a template
   */
  deleteTemplate: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 180));
    const index = mockTemplates.findIndex((t) => t.id === id || t._id === id);
    if (index !== -1) {
      mockTemplates.splice(index, 1);
      return true;
    }
    return false;
  },

  delete: async (id) => {
    return templateRepository.deleteTemplate(id);
  }
};
