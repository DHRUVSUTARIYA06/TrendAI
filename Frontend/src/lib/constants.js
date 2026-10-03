/**
 * Promptoo Admin — System Constants
 */

export const APP_CONFIG = {
  name: 'Promptoo',
  title: 'Master Admin',
  version: '2.0.0',
};

export const NAV_GROUPS = [
  {
    key: 'MAIN',
    label: 'MAIN',
    items: [
      { path: '/admin/dashboard', label: 'Dashboard', iconName: 'LayoutDashboard' },
      { path: '/admin/templates', label: 'Templates', iconName: 'Layers' },
      { path: '/admin/categories', label: 'Categories', iconName: 'Tag' },
      { path: '/admin/users', label: 'Users', iconName: 'Users' },
      { path: '/admin/leaderboard', label: 'Leaderboard', iconName: 'Trophy' },
    ]
  },
  {
    key: 'ENGAGEMENT',
    label: 'ENGAGEMENT',
    items: [
      { path: '/admin/likes', label: 'Likes & Activity', iconName: 'Heart' },
      { path: '/admin/notifications', label: 'Notifications', iconName: 'Bell', badge: '3' },
    ]
  },
  {
    key: 'ANALYTICS',
    label: 'ANALYTICS',
    items: [
      { path: '/admin/analytics', label: 'Analytics', iconName: 'BarChart3' },
      { path: '/admin/reports', label: 'Reports', iconName: 'FileText' },
    ]
  },
  {
    key: 'SYSTEM',
    label: 'SYSTEM',
    items: [
      { path: '/admin/admins', label: 'Admins', iconName: 'ShieldCheck' },
      { path: '/admin/settings', label: 'Settings', iconName: 'Settings' },
    ]
  }
];
