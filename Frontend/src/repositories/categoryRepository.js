/**
 * Promptoo Admin — Category Repository Interface & Mock Provider
 *
 * Encapsulates all data access for Categories.
 * Prepares the abstraction for future Supabase table `categories`.
 */

import { templateRepository } from './templateRepository.js';

import { INITIAL_CATEGORIES } from '../mock/categoryMockData.js';

let mockCategories = [...INITIAL_CATEGORIES];

export const categoryRepository = {
  /**
   * Retrieves categories with search, status/featured filter, sorting & pagination.
   */
  getCategories: async ({
    search = '',
    status = 'all',
    featured = 'all',
    sortBy = 'sort-order',
    page = 1,
    limit = 10
  } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 120));

    let filtered = [...mockCategories];

    // Search filter: name, slug, description
    if (search && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter((c) => {
        const matchesName = c.name?.toLowerCase().includes(q);
        const matchesSlug = c.slug?.toLowerCase().includes(q);
        const matchesDesc = c.description?.toLowerCase().includes(q);
        return matchesName || matchesSlug || matchesDesc;
      });
    }

    // Status filter
    if (status && status !== 'all') {
      const isActiveFilter = status === 'active';
      filtered = filtered.filter((c) => Boolean(c.active) === isActiveFilter);
    }

    // Featured filter
    if (featured && featured !== 'all') {
      const isFeaturedFilter = featured === 'featured';
      filtered = filtered.filter((c) => Boolean(c.featured) === isFeaturedFilter);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'sort-order':
          return (a.sortOrder ?? 999) - (b.sortOrder ?? 999);
        case 'name-asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'name-desc':
          return (b.name || '').localeCompare(a.name || '');
        case 'most-templates':
          return (b.templateCount || 0) - (a.templateCount || 0);
        case 'most-used':
          return (b.usageCount || 0) - (a.usageCount || 0);
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return (a.sortOrder ?? 999) - (b.sortOrder ?? 999);
      }
    });

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const startIndex = (currentPage - 1) * limit;
    const paginatedCategories = filtered.slice(startIndex, startIndex + limit);

    return {
      categories: paginatedCategories,
      total,
      page: currentPage,
      limit,
      totalPages
    };
  },

  /**
   * Legacy compatibility: returns all categories list
   */
  getAll: async () => {
    return [...mockCategories];
  },

  /**
   * Retrieves summary statistics:
   * Total Categories (12), Active Categories (10), Inactive Categories (2),
   * Total Templates (1,248), Featured Categories (6)
   */
  getCategoryStats: async () => {
    await new Promise((resolve) => setTimeout(resolve, 80));

    const total = mockCategories.length;
    const active = mockCategories.filter((c) => c.active).length;
    const inactive = mockCategories.filter((c) => !c.active).length;
    const featured = mockCategories.filter((c) => c.featured).length;
    const totalTemplates = mockCategories.reduce((acc, c) => acc + (c.templateCount || 0), 0);

    return {
      totalCategories: total,
      active,
      inactive,
      totalTemplates,
      featured
    };
  },

  /**
   * Get single category by ID
   */
  getCategoryById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return mockCategories.find((c) => c.id === id || c._id === id) || null;
  },

  /**
   * Get single category by Slug
   */
  getCategoryBySlug: async (slug) => {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return mockCategories.find((c) => c.slug?.toLowerCase() === slug?.toLowerCase()) || null;
  },

  /**
   * Retrieves list of templates belonging to this category.
   * Cross-references with templateRepository data.
   */
  getCategoryTemplates: async (idOrSlug) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const cat = mockCategories.find((c) => c.id === idOrSlug || c._id === idOrSlug || c.slug === idOrSlug);
    if (!cat) return [];

    const allTemplates = await templateRepository.getAll();
    const matched = allTemplates.filter((t) => {
      const matchSlug = t.category?.toLowerCase() === cat.slug?.toLowerCase();
      const matchName = t.categoryName?.toLowerCase().includes(cat.name?.toLowerCase());
      return matchSlug || matchName;
    });

    return matched;
  },

  /**
   * Creates a new category.
   * Enforces name & slug validation and uniqueness.
   */
  createCategory: async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 180));

    const name = formData.name?.trim();
    if (!name) {
      throw new Error('Category name is required.');
    }

    // Auto-generate slug if not provided or clean it
    let slug = formData.slug?.trim().toLowerCase();
    if (!slug) {
      slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    } else {
      slug = slug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // Check slug uniqueness
    const slugExists = mockCategories.some((c) => c.slug === slug);
    if (slugExists) {
      throw new Error(`The slug "${slug}" is already in use by another category.`);
    }

    // Check name uniqueness
    const nameExists = mockCategories.some((c) => c.name.toLowerCase() === name.toLowerCase());
    if (nameExists) {
      throw new Error(`A category with the name "${name}" already exists.`);
    }

    const nextIdNum = mockCategories.length + 1;
    const newId = `CAT-${String(nextIdNum).padStart(3, '0')}`;
    const now = new Date().toISOString();

    const newCategory = {
      id: newId,
      _id: newId,
      name,
      slug,
      emoji: formData.emoji || '📁',
      description: formData.description?.trim() || '',
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80',
      sortOrder: Number(formData.sortOrder) >= 0 ? Number(formData.sortOrder) : mockCategories.length + 1,
      featured: Boolean(formData.featured),
      active: formData.active !== undefined ? Boolean(formData.active) : true,
      templateCount: 0,
      usageCount: 0,
      createdAt: now,
      updatedAt: now
    };

    mockCategories.push(newCategory);
    return newCategory;
  },

  create: async (data) => {
    return categoryRepository.createCategory(data);
  },

  /**
   * Updates an existing category.
   * Server-controlled metrics (templateCount, usageCount, createdAt) are protected.
   */
  updateCategory: async (id, formData) => {
    await new Promise((resolve) => setTimeout(resolve, 180));

    const index = mockCategories.findIndex((c) => c.id === id || c._id === id);
    if (index === -1) {
      throw new Error(`Category with ID ${id} not found.`);
    }

    const existing = mockCategories[index];

    // Slug check if changed
    let slug = existing.slug;
    if (formData.slug !== undefined) {
      const cleanSlug = formData.slug
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      if (cleanSlug !== existing.slug) {
        const slugExists = mockCategories.some(
          (c) => c.slug === cleanSlug && (c.id !== id && c._id !== id)
        );
        if (slugExists) {
          throw new Error(`The slug "${cleanSlug}" is already in use by another category.`);
        }
        slug = cleanSlug;
      }
    }

    // Name uniqueness check if changed
    let name = existing.name;
    if (formData.name !== undefined && formData.name.trim() !== '') {
      const cleanName = formData.name.trim();
      if (cleanName.toLowerCase() !== existing.name.toLowerCase()) {
        const nameExists = mockCategories.some(
          (c) => c.name.toLowerCase() === cleanName.toLowerCase() && (c.id !== id && c._id !== id)
        );
        if (nameExists) {
          throw new Error(`A category with the name "${cleanName}" already exists.`);
        }
        name = cleanName;
      }
    }

    const updated = {
      ...existing,
      name,
      slug,
      emoji: formData.emoji !== undefined ? formData.emoji : existing.emoji,
      description: formData.description !== undefined ? formData.description.trim() : existing.description,
      imageUrl: formData.imageUrl !== undefined ? formData.imageUrl : existing.imageUrl,
      sortOrder: formData.sortOrder !== undefined ? Number(formData.sortOrder) : existing.sortOrder,
      featured: formData.featured !== undefined ? Boolean(formData.featured) : existing.featured,
      active: formData.active !== undefined ? Boolean(formData.active) : existing.active,
      // Protected fields:
      templateCount: existing.templateCount,
      usageCount: existing.usageCount,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString()
    };

    mockCategories[index] = updated;
    return updated;
  },

  /**
   * Deletes a category.
   * STRICT DELETION PROTECTION: Prevents deletion if category contains templates.
   */
  deleteCategory: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 150));

    const index = mockCategories.findIndex((c) => c.id === id || c._id === id);
    if (index === -1) {
      throw new Error(`Category with ID ${id} not found.`);
    }

    const cat = mockCategories[index];
    if (cat.templateCount > 0) {
      const err = new Error(
        `Category contains templates. You cannot safely delete this category until its ${cat.templateCount} templates are moved to another category.`
      );
      err.code = 'CATEGORY_HAS_TEMPLATES';
      err.templateCount = cat.templateCount;
      throw err;
    }

    mockCategories.splice(index, 1);
    return true;
  },

  delete: async (id) => {
    return categoryRepository.deleteCategory(id);
  },

  /**
   * Toggles or updates active status
   */
  updateCategoryStatus: async (id, statusOrBool) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const index = mockCategories.findIndex((c) => c.id === id || c._id === id);
    if (index === -1) {
      throw new Error(`Category with ID ${id} not found.`);
    }

    const newActiveState = typeof statusOrBool === 'boolean' ? statusOrBool : statusOrBool === 'active';
    mockCategories[index] = {
      ...mockCategories[index],
      active: newActiveState,
      updatedAt: new Date().toISOString()
    };

    return mockCategories[index];
  },

  /**
   * Toggles or updates featured flag
   */
  updateCategoryFeatured: async (id, featuredBoolean) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const index = mockCategories.findIndex((c) => c.id === id || c._id === id);
    if (index === -1) {
      throw new Error(`Category with ID ${id} not found.`);
    }

    mockCategories[index] = {
      ...mockCategories[index],
      featured: Boolean(featuredBoolean),
      updatedAt: new Date().toISOString()
    };

    return mockCategories[index];
  },

  /**
   * Updates sort order
   */
  updateCategorySortOrder: async (id, sortOrder) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const index = mockCategories.findIndex((c) => c.id === id || c._id === id);
    if (index === -1) {
      throw new Error(`Category with ID ${id} not found.`);
    }

    mockCategories[index] = {
      ...mockCategories[index],
      sortOrder: Number(sortOrder) || 0,
      updatedAt: new Date().toISOString()
    };

    return mockCategories[index];
  }
};
