/**
 * Promptoo Admin — User Repository Interface & Mock Provider
 *
 * Encapsulates all data access for Users and Creator accounts.
 * Designed to cleanly map to future Supabase `profiles` / `auth.users` tables.
 */

import { templateRepository } from './templateRepository.js';

import { INITIAL_USERS } from '../mock/userMockData.js';

let mockUsers = [...INITIAL_USERS];

export const userRepository = {
  /**
   * Retrieves users with multi-field search, status/activity/registration filters, sorting & pagination.
   */
  getUsers: async ({
    search = '',
    status = 'all',
    activity = 'all',
    registration = 'all',
    sortBy = 'newest',
    page = 1,
    limit = 10
  } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 140));

    let filtered = [...mockUsers];

    // Search: displayName, email, user ID
    if (search && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter((u) => {
        const matchName = u.displayName?.toLowerCase().includes(q);
        const matchEmail = u.email?.toLowerCase().includes(q);
        const matchId = u.id?.toLowerCase().includes(q);
        return matchName || matchEmail || matchId;
      });
    }

    // Status filter
    if (status && status !== 'all') {
      filtered = filtered.filter((u) => u.status === status);
    }

    // Activity filter
    if (activity && activity !== 'all') {
      const now = Date.now();
      if (activity === 'recent') {
        // Active in last 7 days
        filtered = filtered.filter((u) => {
          if (!u.lastActiveAt) return false;
          const diffDays = (now - new Date(u.lastActiveAt).getTime()) / (1000 * 3600 * 24);
          return diffDays <= 7;
        });
      } else if (activity === 'inactive') {
        // Inactive > 14 days
        filtered = filtered.filter((u) => {
          if (!u.lastActiveAt) return true;
          const diffDays = (now - new Date(u.lastActiveAt).getTime()) / (1000 * 3600 * 24);
          return diffDays > 14;
        });
      }
    }

    // Registration filter
    if (registration && registration !== 'all') {
      const now = new Date();
      if (registration === 'today') {
        const todayStr = now.toISOString().split('T')[0];
        filtered = filtered.filter((u) => u.createdAt?.startsWith(todayStr));
      } else if (registration === 'this-week') {
        const oneWeekAgo = new Date(now.getTime() - 7 * 86400 * 1000);
        filtered = filtered.filter((u) => new Date(u.createdAt) >= oneWeekAgo);
      } else if (registration === 'this-month') {
        const oneMonthAgo = new Date(now.getTime() - 30 * 86400 * 1000);
        filtered = filtered.filter((u) => new Date(u.createdAt) >= oneMonthAgo);
      }
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'most-active':
          return new Date(b.lastActiveAt || 0) - new Date(a.lastActiveAt || 0);
        case 'most-creations':
          return (b.creationCount || 0) - (a.creationCount || 0);
        case 'most-saved':
          return (b.savedCount || 0) - (a.savedCount || 0);
        case 'name-asc':
          return (a.displayName || '').localeCompare(b.displayName || '');
        case 'name-desc':
          return (b.displayName || '').localeCompare(a.displayName || '');
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const startIndex = (currentPage - 1) * limit;
    const paginatedUsers = filtered.slice(startIndex, startIndex + limit);

    return {
      users: paginatedUsers,
      total,
      page: currentPage,
      limit,
      totalPages
    };
  },

  /**
   * Retrieves summary statistics:
   * Total Users: 24,582, Active Users: 18,420, New Users: 1,284, Users With Activity: 16,840
   */
  getUserStats: async () => {
    await new Promise((resolve) => setTimeout(resolve, 80));

    const activeCount = mockUsers.filter((u) => u.status === 'active').length;

    return {
      totalUsers: 24582 + (mockUsers.length - INITIAL_USERS.length),
      activeUsers: 18420 + activeCount - 12,
      newUsers: 1284,
      usersWithActivity: 16840
    };
  },

  getStats: async () => {
    return userRepository.getUserStats();
  },

  getAll: async () => {
    return [...mockUsers];
  },

  /**
   * Get single user by ID
   */
  getUserById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return mockUsers.find((u) => u.id === id || u._id === id) || null;
  },

  /**
   * Retrieves realistic activity timeline for the user.
   */
  getUserActivity: async (userId, { type = 'all' } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const user = mockUsers.find((u) => u.id === userId || u._id === userId);
    if (!user) return [];

    const now = Date.now();
    const activities = [
      {
        id: `ACT-${userId}-1`,
        userId,
        type: 'creation',
        title: 'Created "Cinematic Rain Portrait"',
        targetTitle: 'Cinematic Rain Portrait',
        targetId: 'TMP-001',
        createdAt: new Date(now - 2 * 3600 * 1000).toISOString()
      },
      {
        id: `ACT-${userId}-2`,
        userId,
        type: 'save',
        title: 'Saved "Studio Ghibli Forest Lake"',
        targetTitle: 'Studio Ghibli Forest Lake',
        targetId: 'TMP-002',
        createdAt: new Date(now - 5 * 3600 * 1000).toISOString()
      },
      {
        id: `ACT-${userId}-3`,
        userId,
        type: 'like',
        title: 'Liked "Golden Hour Sunset Couple"',
        targetTitle: 'Golden Hour Sunset Couple',
        targetId: 'TMP-004',
        createdAt: new Date(now - 24 * 3600 * 1000).toISOString()
      },
      {
        id: `ACT-${userId}-4`,
        userId,
        type: 'creation',
        title: 'Created "Cyberpunk Neon Alleyway"',
        targetTitle: 'Cyberpunk Neon Alleyway',
        targetId: 'TMP-003',
        createdAt: new Date(now - 2 * 86400 * 1000).toISOString()
      },
      {
        id: `ACT-${userId}-5`,
        userId,
        type: 'save',
        title: 'Saved "Renaissance Museum Oil Canvas"',
        targetTitle: 'Renaissance Museum Oil Canvas',
        targetId: 'TMP-005',
        createdAt: new Date(now - 4 * 86400 * 1000).toISOString()
      },
      {
        id: `ACT-${userId}-6`,
        userId,
        type: 'account',
        title: 'Updated profile biography',
        targetTitle: null,
        targetId: null,
        createdAt: new Date(now - 7 * 86400 * 1000).toISOString()
      },
      {
        id: `ACT-${userId}-7`,
        userId,
        type: 'like',
        title: 'Liked "Santorini Blue Dome Wanderlust"',
        targetTitle: 'Santorini Blue Dome Wanderlust',
        targetId: 'TMP-006',
        createdAt: new Date(now - 10 * 86400 * 1000).toISOString()
      },
      {
        id: `ACT-${userId}-8`,
        userId,
        type: 'account',
        title: 'Account registration completed',
        targetTitle: null,
        targetId: null,
        createdAt: user.createdAt
      }
    ];

    if (type && type !== 'all') {
      return activities.filter((a) => a.type === type);
    }

    return activities;
  },

  /**
   * Retrieves templates created by this user
   */
  getUserCreatedTemplates: async () => {
    await new Promise((resolve) => setTimeout(resolve, 80));
    const all = await templateRepository.getAll();
    // Return sample templates as creations
    return all.slice(0, 3).map((t, idx) => ({
      ...t,
      createdAt: new Date(Date.now() - (idx + 1) * 2 * 86400 * 1000).toISOString()
    }));
  },

  /**
   * Retrieves templates saved by this user
   */
  getUserSavedTemplates: async () => {
    await new Promise((resolve) => setTimeout(resolve, 80));
    const all = await templateRepository.getAll();
    return all.slice(1, 4).map((t, idx) => ({
      ...t,
      savedAt: new Date(Date.now() - (idx + 1) * 86400 * 1000).toISOString()
    }));
  },

  /**
   * Retrieves templates liked by this user
   */
  getUserLikedTemplates: async () => {
    await new Promise((resolve) => setTimeout(resolve, 80));
    const all = await templateRepository.getAll();
    return all.slice(2, 6).map((t, idx) => ({
      ...t,
      likedAt: new Date(Date.now() - (idx + 2) * 86400 * 1000).toISOString()
    }));
  },

  /**
   * Updates user profile fields.
   * STRICT SECURITY: Only admin-editable fields (displayName, bio, avatarUrl) are permitted.
   * Protected fields (id, email, creationCount, weeklyCreations, likeCount, savedCount,
   * totalUses, role, createdAt, lastActiveAt) are preserved.
   */
  updateUserProfile: async (id, data) => {
    await new Promise((resolve) => setTimeout(resolve, 180));

    const index = mockUsers.findIndex((u) => u.id === id || u._id === id);
    if (index === -1) {
      throw new Error(`User with ID ${id} not found.`);
    }

    const existing = mockUsers[index];

    const updated = {
      ...existing,
      // Only permit safe admin fields:
      displayName: data.displayName !== undefined ? data.displayName.trim() : existing.displayName,
      bio: data.bio !== undefined ? data.bio.trim() : existing.bio,
      avatarUrl: data.avatarUrl !== undefined ? data.avatarUrl : existing.avatarUrl,
      // Strictly protect server fields:
      id: existing.id,
      email: existing.email,
      creationCount: existing.creationCount,
      weeklyCreations: existing.weeklyCreations,
      savedCount: existing.savedCount,
      likeCount: existing.likeCount,
      totalUses: existing.totalUses,
      role: existing.role,
      status: existing.status,
      createdAt: existing.createdAt,
      lastActiveAt: existing.lastActiveAt,
      updatedAt: new Date().toISOString()
    };

    mockUsers[index] = updated;
    return updated;
  },

  /**
   * Updates user status (active, inactive, suspended).
   */
  updateUserStatus: async (id, status) => {
    await new Promise((resolve) => setTimeout(resolve, 140));

    const validStatuses = ['active', 'inactive', 'suspended'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status: ${status}`);
    }

    const index = mockUsers.findIndex((u) => u.id === id || u._id === id);
    if (index === -1) {
      throw new Error(`User with ID ${id} not found.`);
    }

    mockUsers[index] = {
      ...mockUsers[index],
      status,
      updatedAt: new Date().toISOString()
    };

    return mockUsers[index];
  }
};
