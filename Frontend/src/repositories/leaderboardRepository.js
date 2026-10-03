/**
 * Promptoo Admin — Leaderboard Repository Interface & Mock Provider
 *
 * Encapsulates all data access for Leaderboard rankings, performance stats,
 * and ranking history. Designed to cleanly map to future Supabase RPC functions
 * or views (e.g., `get_weekly_leaderboard`, `get_all_time_leaderboard`).
 */

import { INITIAL_LEADERBOARD_USERS, MOCK_RANK_HISTORY } from '../mock/leaderboardMockData.js';

// In-memory dataset clone allowing safe local state and refresh
let mockLeaderboardUsers = [...INITIAL_LEADERBOARD_USERS];



/**
 * Computes ranks for the dataset based on the active period:
 * - Weekly: ranked by `weeklyCreations` DESC, then `likes` DESC
 * - All Time: ranked by `creations` DESC, then `likes` DESC
 */
function assignRankings(users, period = 'weekly') {
  // Sort for Weekly
  const weeklySorted = [...users].sort((a, b) => {
    if (b.weeklyCreations !== a.weeklyCreations) {
      return b.weeklyCreations - a.weeklyCreations;
    }
    return b.likes - a.likes;
  });

  const weeklyRankMap = new Map();
  weeklySorted.forEach((u, idx) => {
    weeklyRankMap.set(u.id, idx + 1);
  });

  // Sort for All-Time
  const allTimeSorted = [...users].sort((a, b) => {
    if (b.creations !== a.creations) {
      return b.creations - a.creations;
    }
    return b.likes - a.likes;
  });

  const allTimeRankMap = new Map();
  allTimeSorted.forEach((u, idx) => {
    allTimeRankMap.set(u.id, idx + 1);
  });

  return users.map((u) => {
    const wRank = weeklyRankMap.get(u.id) || 999;
    const aRank = allTimeRankMap.get(u.id) || 999;
    return {
      ...u,
      weeklyRank: wRank,
      allTimeRank: aRank,
      rank: period === 'weekly' ? wRank : aRank
    };
  });
}

export const leaderboardRepository = {
  /**
   * Retrieves paginated, sorted, and filtered leaderboard entries
   */
  getLeaderboard: async ({
    period = 'weekly',
    search = '',
    status = 'all',
    activity = 'all',
    sortBy = 'rank',
    sortDirection = 'asc',
    page = 1,
    pageSize = 10
  } = {}) => {
    // Simulate lightweight network latency
    await new Promise((resolve) => setTimeout(resolve, 90));

    // Calculate dynamic ranks
    const rankedUsers = assignRankings(mockLeaderboardUsers, period);

    // Apply Filters
    let filtered = rankedUsers.filter((u) => {
      // Search by displayName, username, email, or id
      if (search && search.trim() !== '') {
        const query = search.trim().toLowerCase();
        const matchesName = u.displayName.toLowerCase().includes(query);
        const matchesEmail = u.email.toLowerCase().includes(query);
        const matchesUsername = u.username ? u.username.toLowerCase().includes(query) : false;
        const matchesId = u.id.toLowerCase().includes(query);
        if (!matchesName && !matchesEmail && !matchesUsername && !matchesId) {
          return false;
        }
      }

      // Filter by status
      if (status !== 'all' && u.status !== status) {
        return false;
      }

      // Filter by activity
      if (activity !== 'all') {
        const creationMetric = period === 'weekly' ? u.weeklyCreations : u.creations;
        if (activity === 'high' && creationMetric < (period === 'weekly' ? 15 : 50)) {
          return false;
        }
        if (
          activity === 'medium' &&
          (creationMetric < (period === 'weekly' ? 8 : 15) || creationMetric >= (period === 'weekly' ? 15 : 50))
        ) {
          return false;
        }
        if (activity === 'low' && creationMetric >= (period === 'weekly' ? 8 : 15)) {
          return false;
        }
      }

      return true;
    });

    // Apply Sorting
    filtered.sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'rank') {
        comparison = a.rank - b.rank;
      } else if (sortBy === 'creations') {
        comparison = a.creations - b.creations;
      } else if (sortBy === 'likes') {
        comparison = a.likes - b.likes;
      } else if (sortBy === 'saved') {
        comparison = a.saved - b.saved;
      } else if (sortBy === 'weeklyCreations') {
        comparison = a.weeklyCreations - b.weeklyCreations;
      } else if (sortBy === 'lastActiveAt') {
        comparison = new Date(a.lastActiveAt).getTime() - new Date(b.lastActiveAt).getTime();
      } else {
        comparison = a.rank - b.rank;
      }

      return sortDirection === 'desc' ? -comparison : comparison;
    });

    // Pagination
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedUsers = filtered.slice(startIndex, startIndex + pageSize);

    return {
      users: paginatedUsers,
      total,
      page: currentPage,
      pageSize,
      totalPages,
      period
    };
  },

  /**
   * Retrieves summary performance metric cards for the specified period:
   * 1. Total Ranked Users
   * 2. Total Creations
   * 3. Top User Creations
   * 4. Average Creations
   */
  getLeaderboardStats: async ({ period = 'weekly' } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 70));

    const ranked = assignRankings(mockLeaderboardUsers, period);
    const activeUsers = ranked.filter((u) => u.status !== 'suspended');

    const totalCreations = ranked.reduce((sum, u) => {
      return sum + (period === 'weekly' ? u.weeklyCreations : u.creations);
    }, 0);

    const topUserCreations = ranked.length > 0
      ? Math.max(...ranked.map((u) => (period === 'weekly' ? u.weeklyCreations : u.creations)))
      : 0;

    const avgCreations = ranked.length > 0
      ? (totalCreations / ranked.length).toFixed(1)
      : '0';

    return {
      totalRankedUsers: period === 'weekly' ? 148 : 1240,
      totalCreations: period === 'weekly' ? 2490 : 38720,
      topUserCreations: period === 'weekly' ? topUserCreations : 215,
      avgCreations: period === 'weekly' ? '16.8' : '31.2'
    };
  },

  /**
   * Retrieves the top N podium users for the selected period
   */
  getTopLeaderboardUsers: async ({ period = 'weekly', limit = 3 } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 75));

    const ranked = assignRankings(mockLeaderboardUsers, period);
    // Sort by rank ASC
    const topRanked = [...ranked].sort((a, b) => a.rank - b.rank);
    return topRanked.slice(0, limit);
  },

  /**
   * Retrieves a single leaderboard user entry with ranks
   */
  getLeaderboardUser: async ({ userId, period = 'weekly' } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 50));

    const ranked = assignRankings(mockLeaderboardUsers, period);
    return ranked.find((u) => u.id === userId) || null;
  },

  /**
   * Retrieves historical ranking snapshots for a user
   */
  getRankHistory: async ({ userId } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 60));

    if (MOCK_RANK_HISTORY[userId]) {
      return MOCK_RANK_HISTORY[userId];
    }

    // Default graceful fallback if user exists in mockLeaderboardUsers
    const user = mockLeaderboardUsers.find((u) => u.id === userId);
    if (!user) return [];

    return [
      { id: `rh-${userId}-1`, userId, date: 'Oct 03', rank: user.weeklyCreations > 10 ? 8 : 14, creations: user.weeklyCreations },
      { id: `rh-${userId}-2`, userId, date: 'Sep 26', rank: user.weeklyCreations > 10 ? 9 : 15, creations: Math.max(1, user.weeklyCreations - 2) },
      { id: `rh-${userId}-3`, userId, date: 'Sep 19', rank: user.weeklyCreations > 10 ? 11 : 18, creations: Math.max(1, user.weeklyCreations - 4) }
    ];
  },

  /**
   * Manually refreshes mock leaderboard data
   */
  refreshLeaderboard: async () => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    mockLeaderboardUsers = [...INITIAL_LEADERBOARD_USERS];
    return true;
  }
};
