/**
 * Promptoo Admin — Centralized Settings Mock Seed Data
 */

export const DEFAULT_SETTINGS = {
  general: {
    appName: 'Promptoo',
    appDescription: 'AI-powered creative template discovery and visual styling platform.',
    supportEmail: 'support@promptoo.ai',
    timezone: 'Asia/Kolkata',
    defaultLanguage: 'en-US'
  },
  appearance: {
    theme: 'system',
    compactSidebar: false,
    animations: true,
    showBreadcrumbs: true
  },
  notifications: {
    emailNotifications: true,
    systemAlerts: true,
    userActivityAlerts: false,
    templateModerationAlerts: true,
    weeklyAnalyticsSummary: true
  },
  security: {
    sessionTimeout: '1h',
    twoFactorAuth: false,
    notes: 'Authentication security will be connected when the authentication backend is implemented.'
  },
  application: {
    enableTrendingTemplates: true,
    enableFeaturedTemplates: true,
    enableLeaderboard: true,
    leaderboardDefaultPeriod: 'weekly',
    enableSaves: true,
    enableLikes: true,
    enableNotifications: true
  },
  about: {
    appName: 'Promptoo',
    title: 'Master Admin Panel',
    version: '2.4.0',
    environment: 'Development (Mock Repository Mode)',
    technology: 'React 19, Vite, Recharts, Lucide Icons',
    backendConnection: 'Not configured (Supabase ready)'
  }
};
