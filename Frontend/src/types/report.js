/**
 * Promptoo Admin — Report Types & Enums
 */

export const REPORT_TYPES = {
  USER_GROWTH: 'user_growth',
  TEMPLATE_PERFORMANCE: 'template_performance',
  ENGAGEMENT: 'engagement',
  CATEGORY_PERFORMANCE: 'category_performance',
  ACTIVITY: 'activity',
  LEADERBOARD: 'leaderboard'
};

export const REPORT_DATE_RANGES = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: 'all', label: 'All Time' }
];

export const REPORT_DEFINITIONS = [
  {
    id: 'user_growth',
    title: 'User Growth Report',
    description: 'Detailed analysis of creator onboarding, active retention trajectories, and new account volume.',
    iconName: 'Users',
    color: 'var(--primary-purple)',
    defaultRange: '30d'
  },
  {
    id: 'template_performance',
    title: 'Template Performance Report',
    description: 'Usage analytics, prompt trigger counts, like ratios, and save rates across all style templates.',
    iconName: 'Layers',
    color: 'var(--info)',
    defaultRange: '30d'
  },
  {
    id: 'engagement',
    title: 'Engagement Telemetry Report',
    description: 'Holistic platform interaction audit spanning likes, bookmarks, session volume, and usage trends.',
    iconName: 'TrendingUp',
    color: 'var(--soft-purple)',
    defaultRange: '30d'
  },
  {
    id: 'category_performance',
    title: 'Category Performance Report',
    description: 'Style genre distribution, template inventory share, and aggregate engagement per artistic category.',
    iconName: 'Tag',
    color: 'var(--warning)',
    defaultRange: '30d'
  },
  {
    id: 'activity',
    title: 'Activity Telemetry Report',
    description: 'Operational activity logs, chronological user interactions, and prompt dispatch volumes.',
    iconName: 'Activity',
    color: 'var(--success)',
    defaultRange: '30d'
  },
  {
    id: 'leaderboard',
    title: 'Leaderboard Audit Report',
    description: 'Creator competitive rankings, generation velocity metrics, and leaderboard score breakdowns.',
    iconName: 'Trophy',
    color: '#F59E0B',
    defaultRange: '30d'
  }
];
