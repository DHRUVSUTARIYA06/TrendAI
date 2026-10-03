/**
 * Promptoo Admin — Date & Time Utilities
 *
 * Consistent date formatting, relative timestamps, and range boundaries.
 */

/**
 * Formats an ISO string, timestamp, or Date object into human-readable date.
 * Example: 'Oct 3, 2026'
 */
export function formatDate(dateInput, options = {}) {
  if (!dateInput) return '—';
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      ...options
    });
  } catch {
    return '—';
  }
}

/**
 * Formats an ISO string or Date into date with time.
 * Example: 'Oct 3, 2026, 4:15 PM'
 */
export function formatDateTime(dateInput) {
  if (!dateInput) return '—';
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return '—';
  }
}

/**
 * Formats a timestamp into human-readable relative duration.
 * Example: '5 minutes ago', '2 hours ago', 'Yesterday'
 */
export function formatRelativeTime(dateInput) {
  if (!dateInput) return 'Just now';

  // If already relative string like '2 hours ago', return as-is
  if (typeof dateInput === 'string' && (dateInput.includes('ago') || dateInput.includes('Just now') || dateInput.includes('Yesterday'))) {
    return dateInput;
  }

  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);

    const now = Date.now();
    const diffMs = now - d.getTime();

    if (diffMs < 0) {
      // Future date
      const futureMins = Math.round(Math.abs(diffMs) / 60000);
      if (futureMins < 60) return `in ${futureMins}m`;
      const futureHours = Math.round(futureMins / 60);
      if (futureHours < 24) return `in ${futureHours}h`;
      return formatDate(d);
    }

    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return 'Just now';

    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;

    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}h ago`;

    const diffDays = Math.floor(diffHour / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;

    return formatDate(d);
  } catch {
    return 'Just now';
  }
}

/**
 * Checks if a string or value is a valid date
 */
export function isValidDate(val) {
  if (!val) return false;
  const d = new Date(val);
  return !isNaN(d.getTime());
}
