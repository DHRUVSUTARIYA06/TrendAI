/**
 * Promptoo Admin — Administrator Types & Constants
 */

export const AdminRole = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MODERATOR: 'moderator'
};

export const AdminStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
};

export const ADMIN_ROLE_OPTIONS = [
  { value: 'all', label: 'All Roles' },
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'moderator', label: 'Moderator' }
];

export const ADMIN_ROLE_SELECT_OPTIONS = [
  { value: 'super_admin', label: 'Super Admin', description: 'Full access to all platform and system controls' },
  { value: 'admin', label: 'Admin', description: 'Access to templates, categories, users, analytics, and reports' },
  { value: 'moderator', label: 'Moderator', description: 'Moderation access to templates, users, and activity feeds' }
];

export const ADMIN_STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
];

export const ADMIN_ROLE_META = {
  super_admin: { label: 'Super Admin', color: 'var(--soft-purple)', badgeClass: 'status-badge-primary' },
  admin: { label: 'Admin', color: 'var(--info)', badgeClass: 'status-badge-info' },
  moderator: { label: 'Moderator', color: 'var(--warning)', badgeClass: 'status-badge-warning' }
};
