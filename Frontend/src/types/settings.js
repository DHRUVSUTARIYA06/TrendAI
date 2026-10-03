/**
 * Promptoo Admin — Settings Types & Enums
 */

export const SETTINGS_TABS = [
  { id: 'general', label: 'General', icon: 'Globe' },
  { id: 'appearance', label: 'Appearance', icon: 'Palette' },
  { id: 'notifications', label: 'Notifications', icon: 'Bell' },
  { id: 'security', label: 'Security', icon: 'ShieldCheck' },
  { id: 'application', label: 'Application', icon: 'Sliders' },
  { id: 'about', label: 'About', icon: 'Info' }
];

export const TIMEZONE_OPTIONS = [
  { value: 'Asia/Kolkata', label: 'Asia/Kolkata (UTC+05:30)' },
  { value: 'America/New_York', label: 'America/New_York (UTC-04:00)' },
  { value: 'America/Los_Angeles', label: 'America/Los_Angeles (UTC-07:00)' },
  { value: 'Europe/London', label: 'Europe/London (UTC+01:00)' },
  { value: 'Europe/Paris', label: 'Europe/Paris (UTC+02:00)' },
  { value: 'Asia/Tokyo', label: 'Asia/Tokyo (UTC+09:00)' },
  { value: 'UTC', label: 'Universal Time (UTC)' }
];

export const LANGUAGE_OPTIONS = [
  { value: 'en-US', label: 'English (United States)' },
  { value: 'en-GB', label: 'English (United Kingdom)' },
  { value: 'es-ES', label: 'Español' },
  { value: 'fr-FR', label: 'Français' },
  { value: 'ja-JP', label: '日本語' }
];

export const SESSION_TIMEOUT_OPTIONS = [
  { value: '15m', label: '15 Minutes' },
  { value: '30m', label: '30 Minutes' },
  { value: '1h', label: '1 Hour' },
  { value: '4h', label: '4 Hours' }
];

export const LEADERBOARD_PERIOD_OPTIONS = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'all-time', label: 'All Time' }
];

export const THEME_OPTIONS = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'system', label: 'System' }
];
