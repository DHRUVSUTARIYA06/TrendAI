/**
 * Promptoo Admin — Category Types & Constants
 * 
 * Defines standard taxonomy options, filter choices, and sort options
 * for the Category Management module.
 */

export const CATEGORY_STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
];

export const CATEGORY_FEATURED_OPTIONS = [
  { value: 'all', label: 'All Categories' },
  { value: 'featured', label: 'Featured Only' },
  { value: 'not-featured', label: 'Not Featured' }
];

export const CATEGORY_SORT_OPTIONS = [
  { value: 'sort-order', label: 'Display Order' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'most-templates', label: 'Most Templates' },
  { value: 'most-used', label: 'Most Used' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' }
];
