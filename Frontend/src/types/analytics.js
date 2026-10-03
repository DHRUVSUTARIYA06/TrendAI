/**
 * Promptoo Admin — Analytics Types & Enums
 */

export const ANALYTICS_DATE_RANGES = [
  { value: 'today', label: 'Today' },
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: '90d', label: '90 Days' },
  { value: '12m', label: '12 Months' },
  { value: 'all', label: 'All Time' }
];

export const ANALYTICS_METRIC_OPTIONS = [
  { value: 'all', label: 'All Metrics' },
  { value: 'users', label: 'Users' },
  { value: 'uses', label: 'Template Uses' },
  { value: 'likes', label: 'Likes' },
  { value: 'saves', label: 'Saves' },
  { value: 'engagement', label: 'Engagement' }
];

export const USER_GROWTH_INTERVALS = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' }
];
