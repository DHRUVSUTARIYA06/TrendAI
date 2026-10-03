/**
 * Promptoo Admin — Leaderboard Types & Enums
 */

export const LEADERBOARD_PERIODS = {
  WEEKLY: 'weekly',
  ALL_TIME: 'all_time'
};

export const LEADERBOARD_PERIOD_OPTIONS = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'all_time', label: 'All Time' }
];

export const LEADERBOARD_STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' }
];

export const LEADERBOARD_ACTIVITY_OPTIONS = [
  { value: 'all', label: 'All Activity' },
  { value: 'high', label: 'High Activity (50+ creations)' },
  { value: 'medium', label: 'Medium Activity (15-49)' },
  { value: 'low', label: 'Low Activity (<15)' }
];

export const LEADERBOARD_SORT_FIELDS = {
  RANK: 'rank',
  CREATIONS: 'creations',
  LIKES: 'likes',
  SAVED: 'saved',
  WEEKLY_CREATIONS: 'weeklyCreations',
  LAST_ACTIVE: 'lastActiveAt'
};

export const LEADERBOARD_PAGE_SIZE_OPTIONS = [10, 25, 50];
