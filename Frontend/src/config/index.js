/**
 * Promptoo Admin — Master Application Configuration
 *
 * Centralized environment variables, feature flags, pagination standards,
 * and Supabase connection readiness placeholders.
 */

export const APP_CONFIG = {
  name: 'Promptoo Master Admin',
  version: '2.4.0',
  environment: import.meta.env.MODE || 'development',

  // Data layer mode: currently using robust mock repositories;
  // flipping this in the future enables Supabase client integrations.
  useMockData: true,

  // Supabase readiness placeholders (to be set in .env when Supabase is connected)
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
    isConfigured: Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
  },

  // Pagination defaults
  pagination: {
    defaultPageSize: 10,
    allowedPageSizes: [10, 25, 50, 100]
  },

  // Date/Time defaults
  dateTime: {
    defaultTimezone: 'Asia/Kolkata',
    dateFormat: 'MMM D, YYYY',
    dateTimeFormat: 'MMM D, YYYY h:mm A'
  },

  // Feature flags
  features: {
    enableLeaderboard: true,
    enableNotifications: true,
    enableAnalytics: true,
    enableReports: true,
    enableAdminManagement: true,
    enableSystemTheme: true
  }
};

export default APP_CONFIG;
