/**
 * Promptoo Admin — Analytics Repository Interface & Mock Provider
 *
 * Encapsulates all aggregated metrics, trend time-series,
 * category performance distributions, ranking queries, and activity telemetry.
 *
 * Designed to be replaced with Supabase RPC queries or telemetry tables.
 */

import {
  CATEGORIES_DATA,
  TOP_TEMPLATES_SEED,
  TOP_USERS_SEED
} from '../mock/analyticsMockData.js';

function getMultiplier(dateRange) {
  switch (dateRange) {
    case 'today':
      return 0.08;
    case '7d':
      return 0.35;
    case '30d':
      return 1.0;
    case '90d':
      return 2.75;
    case '12m':
      return 8.2;
    case 'all':
      return 10.5;
    default:
      return 1.0;
  }
}

export const analyticsRepository = {
  /**
   * Retrieves high-level 6 stat cards with period changes
   */
  getOverviewStats: async ({ dateRange = '30d' } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 80));
    const m = getMultiplier(dateRange);

    return {
      totalUsers: 2847,
      newUsers: Math.round(420 * m),
      activeUsers: Math.min(2847, Math.round(1890 * (dateRange === 'today' ? 0.3 : Math.min(m, 1.2)))),
      templateUses: Math.round(68450 * m),
      totalLikes: Math.round(24820 * m),
      totalSaves: Math.round(14290 * m),
      changes: {
        totalUsers: '+8.3%',
        newUsers: '+15.2%',
        activeUsers: '+14.8%',
        templateUses: '+18.2%',
        totalLikes: '+12.4%',
        totalSaves: '+9.6%'
      },
      comparisonPeriod: 'vs previous period'
    };
  },

  /**
   * Retrieves User Growth time-series (New Users vs Total Users)
   */
  getUserGrowth: async ({ dateRange = '30d', interval = 'daily' } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 75));

    if (interval === 'monthly') {
      return [
        { date: 'May', newUsers: 180, totalUsers: 1420 },
        { date: 'Jun', newUsers: 240, totalUsers: 1660 },
        { date: 'Jul', newUsers: 310, totalUsers: 1970 },
        { date: 'Aug', newUsers: 390, totalUsers: 2360 },
        { date: 'Sep', newUsers: 450, totalUsers: 2810 },
        { date: 'Oct', newUsers: 420, totalUsers: 2847 }
      ];
    }

    if (interval === 'weekly') {
      return [
        { date: 'W1', newUsers: 65, totalUsers: 2480 },
        { date: 'W2', newUsers: 78, totalUsers: 2558 },
        { date: 'W3', newUsers: 92, totalUsers: 2650 },
        { date: 'W4', newUsers: 84, totalUsers: 2734 },
        { date: 'W5', newUsers: 110, totalUsers: 2844 }
      ];
    }

    // Default daily
    return [
      { date: 'Sep 21', newUsers: 18, totalUsers: 2680 },
      { date: 'Sep 23', newUsers: 24, totalUsers: 2704 },
      { date: 'Sep 25', newUsers: 29, totalUsers: 2733 },
      { date: 'Sep 27', newUsers: 35, totalUsers: 2768 },
      { date: 'Sep 29', newUsers: 32, totalUsers: 2800 },
      { date: 'Oct 01', newUsers: 22, totalUsers: 2822 },
      { date: 'Oct 03', newUsers: 25, totalUsers: 2847 }
    ];
  },

  /**
   * Retrieves Template Usage time-series (Template Uses & Unique Users)
   */
  getTemplateUsage: async ({ dateRange = '30d', _interval = 'daily' } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 75));

    if (dateRange === 'today') {
      return [
        { date: '00:00', templateUses: 120, uniqueUsers: 45 },
        { date: '04:00', templateUses: 65, uniqueUsers: 22 },
        { date: '08:00', templateUses: 410, uniqueUsers: 160 },
        { date: '12:00', templateUses: 780, uniqueUsers: 310 },
        { date: '16:00', templateUses: 1040, uniqueUsers: 420 },
        { date: '20:00', templateUses: 1220, uniqueUsers: 490 },
        { date: '23:59', templateUses: 890, uniqueUsers: 360 }
      ];
    }

    if (dateRange === '7d') {
      return [
        { date: 'Mon', templateUses: 1780, uniqueUsers: 640 },
        { date: 'Tue', templateUses: 2150, uniqueUsers: 780 },
        { date: 'Wed', templateUses: 2310, uniqueUsers: 840 },
        { date: 'Thu', templateUses: 2680, uniqueUsers: 960 },
        { date: 'Fri', templateUses: 3150, uniqueUsers: 1120 },
        { date: 'Sat', templateUses: 3480, uniqueUsers: 1250 },
        { date: 'Sun', templateUses: 3240, uniqueUsers: 1190 }
      ];
    }

    // Default 30d
    return [
      { date: 'Sep 05', templateUses: 2140, uniqueUsers: 780 },
      { date: 'Sep 10', templateUses: 2480, uniqueUsers: 890 },
      { date: 'Sep 15', templateUses: 2350, uniqueUsers: 860 },
      { date: 'Sep 20', templateUses: 2890, uniqueUsers: 1040 },
      { date: 'Sep 25', templateUses: 3120, uniqueUsers: 1150 },
      { date: 'Sep 30', templateUses: 3580, uniqueUsers: 1290 },
      { date: 'Oct 03', templateUses: 3820, uniqueUsers: 1380 }
    ];
  },

  /**
   * Retrieves Engagement Overview time-series (Likes, Saves, Template Uses)
   */
  getEngagementOverview: async ({ dateRange = '30d' } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 80));

    if (dateRange === 'today') {
      return [
        { date: '00:00', likes: 25, saves: 12, templateUses: 60 },
        { date: '04:00', likes: 14, saves: 8, templateUses: 32 },
        { date: '08:00', likes: 85, saves: 42, templateUses: 210 },
        { date: '12:00', likes: 140, saves: 76, templateUses: 380 },
        { date: '16:00', likes: 195, saves: 98, templateUses: 520 },
        { date: '20:00', likes: 220, saves: 115, templateUses: 610 },
        { date: '23:59', likes: 160, saves: 82, templateUses: 440 }
      ];
    }

    if (dateRange === '7d') {
      return [
        { date: 'Mon', likes: 320, saves: 190, templateUses: 890 },
        { date: 'Tue', likes: 380, saves: 215, templateUses: 1040 },
        { date: 'Wed', likes: 410, saves: 230, templateUses: 1120 },
        { date: 'Thu', likes: 490, saves: 280, templateUses: 1350 },
        { date: 'Fri', likes: 580, saves: 340, templateUses: 1620 },
        { date: 'Sat', likes: 640, saves: 390, templateUses: 1780 },
        { date: 'Sun', likes: 590, saves: 360, templateUses: 1650 }
      ];
    }

    return [
      { date: 'Sep 05', likes: 520, saves: 310, templateUses: 1420 },
      { date: 'Sep 09', likes: 610, saves: 350, templateUses: 1680 },
      { date: 'Sep 13', likes: 580, saves: 340, templateUses: 1590 },
      { date: 'Sep 17', likes: 720, saves: 420, templateUses: 1940 },
      { date: 'Sep 21', likes: 810, saves: 480, templateUses: 2210 },
      { date: 'Sep 25', likes: 790, saves: 460, templateUses: 2150 },
      { date: 'Sep 29', likes: 890, saves: 540, templateUses: 2480 },
      { date: 'Oct 03', likes: 960, saves: 590, templateUses: 2690 }
    ];
  },

  /**
   * Retrieves category performance table data with sorting & engagement score
   */
  getCategoryPerformance: async ({
    dateRange = '30d',
    categoryId = 'all',
    sortBy = 'uses',
    sortDirection = 'desc'
  } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 70));
    const m = getMultiplier(dateRange);

    let list = CATEGORIES_DATA.map((cat) => {
      const uses = Math.round(cat.uses * m);
      const likes = Math.round(cat.likes * m);
      const saves = Math.round(cat.saves * m);
      const engagement = uses + likes + saves;
      return {
        ...cat,
        uses,
        likes,
        saves,
        engagement
      };
    });

    if (categoryId && categoryId !== 'all') {
      list = list.filter((c) => c.slug === categoryId);
    }

    list.sort((a, b) => {
      const fieldA = a[sortBy] || 0;
      const fieldB = b[sortBy] || 0;
      return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
    });

    return list;
  },

  /**
   * Retrieves Top Performing Templates (Top 10)
   */
  getTopTemplates: async ({ dateRange = '30d', limit = 10 } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 80));
    const m = getMultiplier(dateRange);

    const templates = TOP_TEMPLATES_SEED.map((t) => {
      const uses = Math.round(t.uses * m);
      const likes = Math.round(t.likes * m);
      const saves = Math.round(t.saves * m);
      return {
        ...t,
        uses,
        likes,
        saves,
        engagement: uses + likes + saves
      };
    });

    return templates.slice(0, limit);
  },

  /**
   * Retrieves Most Active Users (Top 10)
   */
  getMostActiveUsers: async ({ dateRange = '30d', limit = 10 } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 75));
    const m = getMultiplier(dateRange);

    const users = TOP_USERS_SEED.map((u) => {
      const templateUses = Math.round(u.templateUses * m);
      const likes = Math.round(u.likes * m);
      const saves = Math.round(u.saves * m);
      return {
        ...u,
        templateUses,
        likes,
        saves
      };
    });

    return users.slice(0, limit);
  },

  /**
   * Retrieves User Activity Summary (Active Today, Week, Month, Inactive)
   */
  getUserActivitySummary: async ({ _dateRange = '30d' } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 60));

    return {
      activeToday: 423,
      activeThisWeek: 1480,
      activeThisMonth: 2210,
      inactiveUsers: 637,
      totalUsers: 2847,
      activeTodayPercent: 15,
      activeWeekPercent: 52,
      activeMonthPercent: 78,
      inactivePercent: 22
    };
  },

  /**
   * Retrieves platform / device distribution telemetry
   */
  getPlatformOverview: async ({ _dateRange = '30d' } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 60));

    return [
      { platform: 'iOS', users: 1540, percentage: 54, color: 'var(--primary-purple)' },
      { platform: 'Android', users: 1020, percentage: 36, color: '#3B82F6' },
      { platform: 'Web', users: 287, percentage: 10, color: 'var(--soft-purple)' }
    ];
  },

  /**
   * Refreshes mock analytics
   */
  refreshAnalytics: async () => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return true;
  }
};
