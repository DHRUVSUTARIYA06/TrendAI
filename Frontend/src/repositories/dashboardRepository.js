/**
 * Promptoo Master Admin — Dashboard Repository
 * 
 * Isolated data layer providing dashboard metrics, charts data, and activity.
 * When Supabase is integrated, these methods will execute queries against
 * the Supabase client without modifying the Dashboard UI components.
 */

import { DATE_RANGES } from '../types/dashboard';

import {
  OVERVIEW_DATA,
  TEMPLATE_USAGE_CHART_DATA,
  USER_GROWTH_CHART_DATA,
  CATEGORY_PERFORMANCE_DATA,
  TOP_TEMPLATES_DATA,
  RECENT_ACTIVITY_DATA,
  SYSTEM_STATUS_DATA
} from '../mock/dashboardMockData.js';

export const dashboardRepository = {
  /**
   * Fetch overview statistics for a given date range.
   */
  getOverviewStats: async (range = DATE_RANGES.LAST_30_DAYS) => {
    await new Promise((r) => setTimeout(r, 80));
    return OVERVIEW_DATA[range] || OVERVIEW_DATA[DATE_RANGES.LAST_30_DAYS];
  },

  /**
   * Fetch template usage chart points for a given date range.
   */
  getUsageStats: async (range = DATE_RANGES.LAST_30_DAYS) => {
    await new Promise((r) => setTimeout(r, 80));
    return TEMPLATE_USAGE_CHART_DATA[range] || TEMPLATE_USAGE_CHART_DATA[DATE_RANGES.LAST_30_DAYS];
  },

  /**
   * Fetch user growth chart points for a given date range.
   */
  getUserGrowthStats: async (range = DATE_RANGES.LAST_30_DAYS) => {
    await new Promise((r) => setTimeout(r, 80));
    return USER_GROWTH_CHART_DATA[range] || USER_GROWTH_CHART_DATA[DATE_RANGES.LAST_30_DAYS];
  },

  /**
   * Fetch category performance metrics.
   */
  getCategoryPerformance: async () => {
    await new Promise((r) => setTimeout(r, 60));
    return [...CATEGORY_PERFORMANCE_DATA];
  },

  /**
   * Fetch top performing templates.
   */
  getTopTemplates: async () => {
    await new Promise((r) => setTimeout(r, 60));
    return [...TOP_TEMPLATES_DATA];
  },

  /**
   * Fetch recent administrative and user activities.
   */
  getRecentActivity: async () => {
    await new Promise((r) => setTimeout(r, 60));
    return [...RECENT_ACTIVITY_DATA];
  },

  /**
   * Fetch infrastructure health statuses.
   */
  getSystemStatus: async () => {
    await new Promise((r) => setTimeout(r, 40));
    return [...SYSTEM_STATUS_DATA];
  }
};
