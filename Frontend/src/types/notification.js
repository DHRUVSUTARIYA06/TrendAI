/**
 * Promptoo Admin — Notification Types & Enums
 *
 * Defines contracts, statuses, audience segments, and options
 * for the Notifications Management module.
 */

export const NotificationStatus = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  SENDING: 'sending',
  SENT: 'sent',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
};

export const NotificationType = {
  GENERAL: 'general',
  NEW_TEMPLATE: 'new_template',
  TRENDING: 'trending',
  ANNOUNCEMENT: 'announcement',
  SYSTEM: 'system'
};

export const NotificationAudience = {
  ALL: 'all',
  ACTIVE: 'active',
  NEW_USERS: 'new_users',
  SPECIFIC_USERS: 'specific_users'
};

export const NOTIFICATION_STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'sending', label: 'Sending' },
  { value: 'sent', label: 'Sent' },
  { value: 'failed', label: 'Failed' },
  { value: 'cancelled', label: 'Cancelled' }
];

export const NOTIFICATION_TYPE_OPTIONS = [
  { value: 'all', label: 'All Types' },
  { value: 'general', label: 'General' },
  { value: 'new_template', label: 'New Template' },
  { value: 'trending', label: 'Trending' },
  { value: 'announcement', label: 'Announcement' },
  { value: 'system', label: 'System' }
];

export const NOTIFICATION_FORM_TYPE_OPTIONS = [
  { value: 'general', label: 'General', icon: 'Bell' },
  { value: 'new_template', label: 'New Template', icon: 'Sparkles' },
  { value: 'trending', label: 'Trending', icon: 'Flame' },
  { value: 'announcement', label: 'Announcement', icon: 'Megaphone' },
  { value: 'system', label: 'System', icon: 'ShieldCheck' }
];

export const NOTIFICATION_AUDIENCE_OPTIONS = [
  { value: 'all', label: 'All Users' },
  { value: 'active', label: 'Active Users' },
  { value: 'new_users', label: 'New Users' },
  { value: 'specific_users', label: 'Specific Users' }
];

export const NOTIFICATION_DATE_OPTIONS = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' }
];

export const NOTIFICATION_PAGE_SIZE_OPTIONS = [10, 25, 50];

export const NOTIFICATION_TYPE_META = {
  general: { label: 'General', color: 'var(--soft-purple)', badgeClass: 'status-badge-primary', emoji: '🔔' },
  new_template: { label: 'New Template', color: 'var(--primary-purple)', badgeClass: 'status-badge-primary', emoji: '✨' },
  trending: { label: 'Trending', color: '#F59E0B', badgeClass: 'status-badge-warning', emoji: '🔥' },
  announcement: { label: 'Announcement', color: '#3B82F6', badgeClass: 'status-badge-info', emoji: '📢' },
  system: { label: 'System', color: 'var(--text-muted)', badgeClass: 'status-badge-muted', emoji: '⚙️' }
};

export const NOTIFICATION_AUDIENCE_META = {
  all: { label: 'All Users', badgeClass: 'status-badge-primary' },
  active: { label: 'Active Users', badgeClass: 'status-badge-success' },
  new_users: { label: 'New Users', badgeClass: 'status-badge-info' },
  specific_users: { label: 'Specific Users', badgeClass: 'status-badge-warning' }
};
