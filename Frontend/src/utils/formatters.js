/**
 * Promptoo Admin — Formatting Utilities
 */

import { formatDate, formatRelativeTime } from './dateUtils.js';

export { formatDate, formatDateTime, formatRelativeTime, isValidDate } from './dateUtils.js';

export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return Number(num).toLocaleString();
};

export const formatTimeAgo = (timestamp) => {
  return formatRelativeTime(timestamp);
};
