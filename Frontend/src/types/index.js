/**
 * Promptoo Admin — Data Models & Types Documentation
 * 
 * Defines standard contracts used between Repositories and UI components.
 * When Supabase is integrated, table records map directly to these contracts.
 */

export const RoleTypes = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  MODERATOR: 'Moderator'
};

export const TemplateStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
  ARCHIVED: 'archived'
};

export const UserStatus = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  INACTIVE: 'inactive'
};

export * from './dashboard';
export * from './template';
export * from './category';
export * from './user';
export * from './leaderboard';
export * from './activity';
export * from './notification';
export * from './analytics';
export * from './report';
export * from './admin';
export * from './settings';
