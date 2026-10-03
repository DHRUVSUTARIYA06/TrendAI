/**
 * Promptoo Admin — Admin Repository Interface & Mock Provider
 *
 * Encapsulates administrative accounts, roles, access levels, and status state.
 * Designed to map to Supabase `auth.users` + `admin_profiles` table with RLS.
 */

import { getPermissionsMatrixForRole } from '../utils/adminPermissions.js';

import { INITIAL_ADMINS } from '../mock/adminMockData.js';

let mockAdmins = [...INITIAL_ADMINS];

export const adminRepository = {
  /**
   * Retrieves paginated, filtered, and searched administrators
   */
  getAdmins: async ({
    search = '',
    role = 'all',
    status = 'all',
    page = 1,
    pageSize = 10
  } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 80));

    let filtered = [...mockAdmins];

    // Filter by Role
    if (role && role !== 'all') {
      filtered = filtered.filter((a) => a.role === role);
    }

    // Filter by Status
    if (status && status !== 'all') {
      filtered = filtered.filter((a) => a.status === status);
    }

    // Search by Name or Email (case-insensitive)
    if (search && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter((a) => {
        return (
          a.displayName.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q)
        );
      });
    }

    // Pagination
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const startIndex = (currentPage - 1) * pageSize;
    const paginated = filtered.slice(startIndex, startIndex + pageSize);

    return {
      admins: paginated,
      total,
      page: currentPage,
      pageSize,
      totalPages
    };
  },

  /**
   * Retrieves a single administrator by ID
   */
  getAdminById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const item = mockAdmins.find((a) => a.id === id);
    if (!item) return null;
    return JSON.parse(JSON.stringify(item));
  },

  /**
   * Retrieves summary metric stats for the admin header
   */
  getAdminStats: async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));

    const totalAdmins = mockAdmins.length;
    const activeAdmins = mockAdmins.filter((a) => a.status === 'active').length;
    const superAdmins = mockAdmins.filter((a) => a.role === 'super_admin').length;
    const recentlyAdded = mockAdmins.filter((a) => {
      const created = new Date(a.createdAt).getTime();
      return Date.now() - created <= 14 * 86400 * 1000;
    }).length;

    return {
      totalAdmins,
      activeAdmins,
      superAdmins,
      recentlyAdded
    };
  },

  /**
   * Provisions a new mock administrator
   */
  createAdmin: async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (!data.displayName || !data.displayName.trim()) {
      throw new Error('Display Name is required.');
    }
    if (!data.email || !data.email.trim()) {
      throw new Error('Email is required.');
    }

    const emailExists = mockAdmins.some(
      (a) => a.email.toLowerCase() === data.email.trim().toLowerCase()
    );
    if (emailExists) {
      throw new Error('An administrator with this email address already exists.');
    }

    const now = new Date().toISOString();
    const newId = `ADM-${100 + mockAdmins.length + 1}`;

    const newAdmin = {
      id: newId,
      displayName: data.displayName.trim(),
      email: data.email.trim().toLowerCase(),
      avatar: null,
      role: data.role || 'moderator',
      status: data.status || 'active',
      lastActive: 'Just now',
      createdAt: now
    };

    mockAdmins.unshift(newAdmin);
    return JSON.parse(JSON.stringify(newAdmin));
  },

  /**
   * Updates an existing administrator
   * Note: Email and ID are immutable.
   */
  updateAdmin: async (id, data) => {
    await new Promise((resolve) => setTimeout(resolve, 80));

    const index = mockAdmins.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new Error(`Admin ${id} not found.`);
    }

    const existing = mockAdmins[index];

    const updated = {
      ...existing,
      displayName: data.displayName ? data.displayName.trim() : existing.displayName,
      role: data.role || existing.role,
      status: data.status || existing.status
    };

    mockAdmins[index] = updated;
    return JSON.parse(JSON.stringify(updated));
  },

  /**
   * Activates or deactivates an administrator
   */
  updateAdminStatus: async (id, status) => {
    await new Promise((resolve) => setTimeout(resolve, 75));

    const index = mockAdmins.findIndex((a) => a.id === id);
    if (index === -1) throw new Error(`Admin ${id} not found.`);

    mockAdmins[index].status = status;
    return JSON.parse(JSON.stringify(mockAdmins[index]));
  },

  /**
   * Returns permissions matrix for an administrator's role
   */
  getAdminPermissions: (role) => {
    return getPermissionsMatrixForRole(role);
  },

  /**
   * Resets mock administrator records
   */
  refreshAdmins: async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    mockAdmins = [...INITIAL_ADMINS];
    return true;
  }
};
