/**
 * Promptoo Admin — Likes & Activity Repository Interface & Mock Provider
 *
 * Encapsulates all activity logs, engagement analytics, metric aggregation,
 * and time-series overview data.
 */

import { INITIAL_ACTIVITIES } from '../mock/activityMockData.js';

let mockActivities = [...INITIAL_ACTIVITIES];

/**
 * Filter activities by date range
 */
function filterByDateRange(records, dateRange) {
  if (dateRange === 'all') return records;

  const now = Date.now();
  let maxAgeMs = 30 * 86400 * 1000; // default 30d

  if (dateRange === 'today') {
    maxAgeMs = 24 * 3600 * 1000;
  } else if (dateRange === '7d') {
    maxAgeMs = 7 * 86400 * 1000;
  } else if (dateRange === '30d') {
    maxAgeMs = 30 * 86400 * 1000;
  } else if (dateRange === '90d') {
    maxAgeMs = 90 * 86400 * 1000;
  }

  return records.filter((r) => {
    const time = new Date(r.timestamp).getTime();
    return now - time <= maxAgeMs;
  });
}

export const activityRepository = {
  /**
   * Retrieves paginated, filtered, and sorted activity logs
   */
  getActivity: async ({
    dateRange = '30d',
    activityType = 'all',
    userId,
    templateId,
    status = 'all',
    search = '',
    sortBy = 'newest',
    sortDirection = 'desc',
    page = 1,
    pageSize = 10
  } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 80));

    let filtered = filterByDateRange(mockActivities, dateRange);

    // Filter by activity type
    if (activityType !== 'all') {
      filtered = filtered.filter((r) => r.type === activityType);
    }

    // Filter by specific user
    if (userId) {
      filtered = filtered.filter((r) => r.userId === userId);
    }

    // Filter by specific template
    if (templateId) {
      filtered = filtered.filter((r) => r.templateId === templateId);
    }

    // Filter by user account status
    if (status !== 'all') {
      filtered = filtered.filter((r) => r.status === status);
    }

    // Multi-field search (User Name, Email, Template Name, Category)
    if (search && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter((r) => {
        return (
          r.userName.toLowerCase().includes(q) ||
          r.userEmail.toLowerCase().includes(q) ||
          r.templateName.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
        );
      });
    }

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === 'oldest') {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      }
      // Default to newest
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    // Pagination
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const startIndex = (currentPage - 1) * pageSize;
    const paginated = filtered.slice(startIndex, startIndex + pageSize);

    return {
      activities: paginated,
      total,
      page: currentPage,
      pageSize,
      totalPages
    };
  },

  /**
   * Retrieves summary engagement metrics for the given date range:
   * 1. Total Likes
   * 2. Total Template Uses
   * 3. Total Saves
   * 4. Active Users
   */
  getActivityStats: async ({ dateRange = '30d' } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 70));

    const multiplier =
      dateRange === 'today' ? 0.08 :
      dateRange === '7d' ? 0.35 :
      dateRange === '30d' ? 1.0 :
      dateRange === '90d' ? 2.8 : 4.5;

    return {
      totalLikes: Math.round(24820 * multiplier),
      totalUses: Math.round(68450 * multiplier),
      totalSaves: Math.round(14290 * multiplier),
      activeUsers: Math.round(2847 * (dateRange === 'today' ? 0.3 : Math.min(multiplier, 1.8))),
      likesChange: '+12.4%',
      usesChange: '+18.2%',
      savesChange: '+9.6%',
      activeUsersChange: '+8.3%'
    };
  },

  /**
   * Retrieves time-series engagement trend data for charts:
   * Returns data points for Likes, Template Uses, Saves
   */
  getEngagementOverview: async ({ dateRange = '30d' } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 90));

    if (dateRange === 'today') {
      return [
        { date: '00:00', likes: 25, uses: 60, saves: 12 },
        { date: '04:00', likes: 14, uses: 32, saves: 8 },
        { date: '08:00', likes: 85, uses: 210, saves: 42 },
        { date: '12:00', likes: 140, uses: 380, saves: 76 },
        { date: '16:00', likes: 195, uses: 520, saves: 98 },
        { date: '20:00', likes: 220, uses: 610, saves: 115 },
        { date: '23:59', likes: 160, uses: 440, saves: 82 }
      ];
    }

    if (dateRange === '7d') {
      return [
        { date: 'Mon', likes: 320, uses: 890, saves: 190 },
        { date: 'Tue', likes: 380, uses: 1040, saves: 215 },
        { date: 'Wed', likes: 410, uses: 1120, saves: 230 },
        { date: 'Thu', likes: 490, uses: 1350, saves: 280 },
        { date: 'Fri', likes: 580, uses: 1620, saves: 340 },
        { date: 'Sat', likes: 640, uses: 1780, saves: 390 },
        { date: 'Sun', likes: 590, uses: 1650, saves: 360 }
      ];
    }

    // Default 30d / 90d / all
    return [
      { date: 'Sep 05', likes: 520, uses: 1420, saves: 310 },
      { date: 'Sep 09', likes: 610, uses: 1680, saves: 350 },
      { date: 'Sep 13', likes: 580, uses: 1590, saves: 340 },
      { date: 'Sep 17', likes: 720, uses: 1940, saves: 420 },
      { date: 'Sep 21', likes: 810, uses: 2210, saves: 480 },
      { date: 'Sep 25', likes: 790, uses: 2150, saves: 460 },
      { date: 'Sep 29', likes: 890, uses: 2480, saves: 540 },
      { date: 'Oct 03', likes: 960, uses: 2690, saves: 590 }
    ];
  },

  /**
   * Retrieves top engaged templates ranked by:
   * Engagement = Likes + Saves + Uses
   */
  getTopEngagedTemplates: async ({ _dateRange = '30d', limit = 5 } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 80));

    const templates = [
      {
        id: 'tpl-02',
        title: 'Ghibli Forest Lake',
        category: 'Anime 🎨',
        thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80',
        likes: 2420,
        uses: 6850,
        saves: 1140
      },
      {
        id: 'tpl-01',
        title: 'Cyberpunk Neon Street',
        category: 'Cyberpunk 🌃',
        thumbnailUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=80',
        likes: 1980,
        uses: 5420,
        saves: 950
      },
      {
        id: 'tpl-03',
        title: 'Cinematic Noir 35mm',
        category: 'Cinematic 🎬',
        thumbnailUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&auto=format&fit=crop&q=80',
        likes: 1640,
        uses: 4890,
        saves: 830
      },
      {
        id: 'tpl-04',
        title: 'Ethereal Cloud Kingdom',
        category: 'Fantasy 🐉',
        thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80',
        likes: 1410,
        uses: 3950,
        saves: 720
      },
      {
        id: 'tpl-05',
        title: 'Vaporwave Sunset Highway',
        category: 'Abstract 🔮',
        thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
        likes: 1190,
        uses: 3240,
        saves: 590
      }
    ];

    // Compute Engagement = likes + saves + uses
    const withEngagement = templates.map((t, idx) => ({
      ...t,
      rank: idx + 1,
      engagement: t.likes + t.saves + t.uses
    }));

    return withEngagement.slice(0, limit);
  },

  /**
   * Retrieves most active users by platform interaction
   */
  getMostActiveUsers: async ({ _dateRange = '30d', limit = 5 } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 75));

    return [
      {
        rank: 1,
        id: 'USR-10296',
        displayName: 'Marcus Sterling',
        email: 'marcus.sterling@visuals.io',
        avatarUrl: null,
        templateUses: 1240,
        likes: 130,
        saves: 62,
        lastActiveAt: new Date(Date.now() - 12 * 60 * 1000).toISOString()
      },
      {
        rank: 2,
        id: 'USR-10295',
        displayName: 'Elena Rostova',
        email: 'elena.r@artstudio.com',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
        templateUses: 490,
        likes: 84,
        saves: 45,
        lastActiveAt: new Date(Date.now() - 25 * 60 * 1000).toISOString()
      },
      {
        rank: 3,
        id: 'USR-10298',
        displayName: 'Lucas Dubois',
        email: 'lucas.d@parisphoto.fr',
        avatarUrl: null,
        templateUses: 360,
        likes: 47,
        saves: 29,
        lastActiveAt: new Date(Date.now() - 75 * 60 * 1000).toISOString()
      },
      {
        rank: 4,
        id: 'USR-10297',
        displayName: 'Sophia Chen',
        email: 'sophia.chen@designwave.org',
        avatarUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=200&auto=format&fit=crop&q=80',
        templateUses: 215,
        likes: 52,
        saves: 31,
        lastActiveAt: new Date(Date.now() - 48 * 60 * 1000).toISOString()
      },
      {
        rank: 5,
        id: 'USR-10294',
        displayName: 'Dhruv Sutariya',
        email: 'dhruv.sutariya@promptoo.ai',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        templateUses: 182,
        likes: 25,
        saves: 18,
        lastActiveAt: new Date(Date.now() - 3 * 60 * 1000).toISOString()
      }
    ].slice(0, limit);
  },

  /**
   * Retrieves breakdown percentage and counts across activity types
   */
  getActivityDistribution: async ({ _dateRange = '30d' } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 60));

    return [
      { type: 'Template Uses', count: 68450, percentage: 63, color: 'var(--primary-purple)' },
      { type: 'Likes', count: 24820, percentage: 23, color: '#F43F5E' },
      { type: 'Saves', count: 14290, percentage: 13, color: '#A78BFA' },
      { type: 'Unlikes', count: 720, percentage: 0.7, color: 'var(--text-muted)' },
      { type: 'Unsaves', count: 340, percentage: 0.3, color: 'var(--border-color)' }
    ];
  },

  /**
   * Retrieves chronological activities for a single user
   */
  getUserActivity: async ({ userId, limit = 10 } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 60));
    const userActs = mockActivities.filter((a) => a.userId === userId);
    return userActs.slice(0, limit);
  },

  /**
   * Retrieves metrics and recent activity for a specific template
   */
  getTemplateActivity: async ({ templateId, limit = 5 } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 70));

    const acts = mockActivities.filter((a) => a.templateId === templateId);
    const likes = acts.filter((a) => a.type === 'like').length * 120 + 450;
    const uses = acts.filter((a) => a.type === 'use').length * 280 + 1200;
    const saves = acts.filter((a) => a.type === 'save').length * 65 + 230;

    return {
      templateId,
      totalLikes: likes,
      totalUses: uses,
      totalSaves: saves,
      engagement: likes + uses + saves,
      recentActivity: acts.slice(0, limit)
    };
  },

  /**
   * Manually refreshes mock activity logs
   */
  refreshActivity: async () => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    mockActivities = [...INITIAL_ACTIVITIES];
    return true;
  }
};
