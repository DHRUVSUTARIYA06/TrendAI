/**
 * Promptoo Admin — Likes & Activity Types & Enums
 */

export const DATE_RANGE_OPTIONS = [
  { value: 'today', label: 'Today' },
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: '90d', label: '90 Days' },
  { value: 'all', label: 'All Time' }
];

export const ACTIVITY_TYPE_OPTIONS = [
  { value: 'all', label: 'All Activity' },
  { value: 'like', label: 'Like' },
  { value: 'unlike', label: 'Unlike' },
  { value: 'use', label: 'Template Use' },
  { value: 'save', label: 'Save' },
  { value: 'unsave', label: 'Unsave' }
];

export const ACTIVITY_STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' }
];

export const ACTIVITY_SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'most-likes', label: 'Most Likes' },
  { value: 'most-uses', label: 'Most Uses' },
  { value: 'most-saves', label: 'Most Saves' }
];

export const ACTIVITY_PAGE_SIZE_OPTIONS = [10, 25, 50];
