/**
 * Promptoo Admin — User Types & Filter Constants
 * 
 * Defines standard models, statuses, and query filters
 * for the User Management module.
 */

export const USER_STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' }
];

export const USER_ACTIVITY_OPTIONS = [
  { value: 'all', label: 'All Activity' },
  { value: 'recent', label: 'Active Recently' },
  { value: 'inactive', label: 'Inactive' }
];

export const USER_REGISTRATION_OPTIONS = [
  { value: 'all', label: 'All Registration' },
  { value: 'today', label: 'Registered Today' },
  { value: 'this-week', label: 'This Week' },
  { value: 'this-month', label: 'This Month' }
];

export const USER_SORT_OPTIONS = [
  { value: 'newest', label: 'Newest Joined' },
  { value: 'oldest', label: 'Oldest Joined' },
  { value: 'most-active', label: 'Recently Active' },
  { value: 'most-creations', label: 'Most Creations' },
  { value: 'most-saved', label: 'Most Saved' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' }
];

export const USER_ACTIVITY_TABS = [
  { value: 'all', label: 'All Activity' },
  { value: 'creation', label: 'Creations' },
  { value: 'save', label: 'Saves' },
  { value: 'like', label: 'Likes' },
  { value: 'account', label: 'Account Events' }
];
