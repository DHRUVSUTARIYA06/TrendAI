/**
 * Promptoo Admin — Centralized Role Permissions Configuration
 *
 * Encapsulates role-based feature matrices and capability checks.
 * In a future Supabase implementation, these map directly to RLS policies
 * and backend authorization roles (service_role, admin, moderator).
 */

export const ADMIN_MODULES = [
  { id: 'dashboard', label: 'Dashboard Overview', description: 'View system KPIs and telemetry summaries' },
  { id: 'templates', label: 'Templates Management', description: 'Create, edit, and organize AI style presets' },
  { id: 'categories', label: 'Categories Taxonomy', description: 'Manage style genres and taxonomy hierarchy' },
  { id: 'users', label: 'User Accounts', description: 'Inspect creator profiles and moderation states' },
  { id: 'leaderboard', label: 'Creator Leaderboard', description: 'Track competitive rankings and points' },
  { id: 'likes', label: 'Likes & Activity', description: 'Read-only engagement telemetry feed' },
  { id: 'notifications', label: 'Notifications Dispatch', description: 'Draft, schedule, and preview push broadcasts' },
  { id: 'analytics', label: 'Platform Analytics', description: 'Inspect user growth and conversion metrics' },
  { id: 'reports', label: 'Reports Generation', description: 'Generate structured telemetry reports and CSVs' },
  { id: 'admins', label: 'Admins Management', description: 'Provision administrative accounts and roles' },
  { id: 'settings', label: 'System Settings', description: 'Configure application preferences and timeouts' }
];

export const ROLE_PERMISSIONS_MATRIX = {
  super_admin: {
    dashboard: 'Full Access',
    templates: 'Full Access',
    categories: 'Full Access',
    users: 'Full Access',
    leaderboard: 'Full Access',
    likes: 'Full Access',
    notifications: 'Full Access',
    analytics: 'Full Access',
    reports: 'Full Access',
    admins: 'Full Access',
    settings: 'Full Access'
  },
  admin: {
    dashboard: 'Full Access',
    templates: 'Full Access',
    categories: 'Full Access',
    users: 'Full Access',
    leaderboard: 'Full Access',
    likes: 'Full Access',
    notifications: 'Full Access',
    analytics: 'Full Access',
    reports: 'Full Access',
    admins: 'Read-Only',
    settings: 'Limited Access'
  },
  moderator: {
    dashboard: 'Full Access',
    templates: 'Review & Edit',
    categories: 'Read-Only',
    users: 'Inspect & Moderate',
    leaderboard: 'Read-Only',
    likes: 'Full Access',
    notifications: 'No Access',
    analytics: 'No Access',
    reports: 'No Access',
    admins: 'No Access',
    settings: 'No Access'
  }
};

/**
 * Checks whether a given role has access to a specific module
 */
export function hasModuleAccess(role, moduleId) {
  const normalizedRole = (role || '').toLowerCase().replace(/\s+/g, '_');
  const roleConfig = ROLE_PERMISSIONS_MATRIX[normalizedRole];
  if (!roleConfig) return false;

  const access = roleConfig[moduleId];
  return Boolean(access && access !== 'No Access');
}

/**
 * Returns complete matrix rows for displaying permissions on admin detail page
 */
export function getPermissionsMatrixForRole(role) {
  const normalizedRole = (role || '').toLowerCase().replace(/\s+/g, '_');
  const roleConfig = ROLE_PERMISSIONS_MATRIX[normalizedRole] || ROLE_PERMISSIONS_MATRIX.moderator;

  return ADMIN_MODULES.map((m) => {
    const access = roleConfig[m.id] || 'No Access';
    const isGranted = access !== 'No Access';

    return {
      moduleId: m.id,
      moduleLabel: m.label,
      description: m.description,
      access,
      isGranted
    };
  });
}
