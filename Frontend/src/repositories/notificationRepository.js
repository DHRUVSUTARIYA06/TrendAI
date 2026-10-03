/**
 * Promptoo Admin — Notification Repository Interface & Mock Provider
 *
 * Encapsulates all data access, filtering, creation, scheduling,
 * status transitions, history tracking, and audience management for notifications.
 *
 * Designed to cleanly map to future Supabase `notifications`,
 * `notification_deliveries`, and `notification_history` tables.
 */

import { userRepository } from './userRepository.js';

import { INITIAL_NOTIFICATIONS } from '../mock/notificationMockData.js';

let mockNotifications = [...INITIAL_NOTIFICATIONS];

function filterByDateRange(records, dateRange) {
  if (!dateRange || dateRange === 'all') return records;

  const now = Date.now();
  let maxAgeMs = 30 * 86400 * 1000;

  if (dateRange === 'today') {
    maxAgeMs = 24 * 3600 * 1000;
  } else if (dateRange === '7d') {
    maxAgeMs = 7 * 86400 * 1000;
  } else if (dateRange === '30d') {
    maxAgeMs = 30 * 86400 * 1000;
  }

  return records.filter((r) => {
    const time = new Date(r.createdAt).getTime();
    return now - time <= maxAgeMs;
  });
}

function calculateTargetedCount(audience, targetUserIds = []) {
  switch (audience) {
    case 'all':
      return 2847;
    case 'active':
      return 1420;
    case 'new_users':
      return 310;
    case 'specific_users':
      return targetUserIds.length || 1;
    default:
      return 2847;
  }
}

export const notificationRepository = {
  /**
   * Retrieves paginated, filtered, and searched notifications
   */
  getNotifications: async ({
    search = '',
    status = 'all',
    audience = 'all',
    type = 'all',
    dateRange = 'all',
    sortBy = 'newest',
    page = 1,
    pageSize = 10
  } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 80));

    let filtered = filterByDateRange(mockNotifications, dateRange);

    // Filter by Status
    if (status && status !== 'all') {
      filtered = filtered.filter((n) => n.status === status);
    }

    // Filter by Audience
    if (audience && audience !== 'all') {
      filtered = filtered.filter((n) => n.audience === audience);
    }

    // Filter by Type
    if (type && type !== 'all') {
      filtered = filtered.filter((n) => n.type === type);
    }

    // Case-insensitive search across title, message, audience label
    if (search && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter((n) => {
        const titleMatch = n.title?.toLowerCase().includes(q);
        const msgMatch = n.message?.toLowerCase().includes(q);
        const audienceMatch = n.audience?.toLowerCase().includes(q);
        return titleMatch || msgMatch || audienceMatch;
      });
    }

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      // default: newest first
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Pagination
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const startIndex = (currentPage - 1) * pageSize;
    const paginated = filtered.slice(startIndex, startIndex + pageSize);

    return {
      notifications: paginated,
      total,
      page: currentPage,
      pageSize,
      totalPages
    };
  },

  /**
   * Retrieves high-level metric counts for stat cards
   */
  getNotificationStats: async () => {
    await new Promise((resolve) => setTimeout(resolve, 60));

    const total = mockNotifications.length;
    const drafts = mockNotifications.filter((n) => n.status === 'draft').length;
    const scheduled = mockNotifications.filter((n) => n.status === 'scheduled').length;
    const sent = mockNotifications.filter((n) => n.status === 'sent').length;
    const failed = mockNotifications.filter((n) => n.status === 'failed').length;
    const sending = mockNotifications.filter((n) => n.status === 'sending').length;
    const cancelled = mockNotifications.filter((n) => n.status === 'cancelled').length;

    return {
      total,
      drafts,
      scheduled,
      sent,
      failed,
      sending,
      cancelled
    };
  },

  /**
   * Retrieves a single notification by ID
   */
  getNotificationById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 60));
    const item = mockNotifications.find((n) => n.id === id);
    if (!item) return null;
    return JSON.parse(JSON.stringify(item));
  },

  /**
   * Creates a new notification (draft, scheduled, or sent in demo mode)
   */
  createNotification: async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const now = new Date().toISOString();
    const newId = `NTF-${1000 + mockNotifications.length + 1}`;
    const targetedCount = calculateTargetedCount(data.audience, data.targetUserIds);

    let status = data.status || 'draft';
    let sentAt = null;
    let scheduledAt = data.scheduledAt || null;
    let deliveredCount = 0;
    let failedCount = 0;

    const initialHistory = [
      {
        id: `HIST-${Date.now()}-1`,
        status: 'draft',
        timestamp: now,
        message: 'Notification drafted in admin panel',
        actor: 'Admin'
      }
    ];

    if (status === 'scheduled' && scheduledAt) {
      initialHistory.push({
        id: `HIST-${Date.now()}-2`,
        status: 'scheduled',
        timestamp: now,
        message: `Notification scheduled for ${new Date(scheduledAt).toLocaleString()}`,
        actor: 'Admin'
      });
    } else if (status === 'sent') {
      sentAt = now;
      deliveredCount = Math.round(targetedCount * 0.98);
      failedCount = targetedCount - deliveredCount;
      initialHistory.push({
        id: `HIST-${Date.now()}-2`,
        status: 'sending',
        timestamp: now,
        message: 'Immediate delivery triggered (Demo Mode)',
        actor: 'Admin'
      });
      initialHistory.push({
        id: `HIST-${Date.now()}-3`,
        status: 'sent',
        timestamp: now,
        message: `Marked as sent in demo mode to ${deliveredCount} simulated recipients`,
        actor: 'System'
      });
    }

    const newNotification = {
      id: newId,
      title: data.title.trim(),
      message: data.message.trim(),
      type: data.type || 'general',
      audience: data.audience || 'all',
      targetUserIds: data.targetUserIds || [],
      status,
      createdAt: now,
      updatedAt: now,
      scheduledAt,
      sentAt,
      targetedCount,
      deliveredCount,
      failedCount,
      createdBy: 'Admin',
      history: initialHistory
    };

    mockNotifications.unshift(newNotification);
    return JSON.parse(JSON.stringify(newNotification));
  },

  /**
   * Updates an existing notification.
   * NOTE: Already sent notifications cannot be edited. Protected fields cannot be changed.
   */
  updateNotification: async (id, data) => {
    await new Promise((resolve) => setTimeout(resolve, 90));

    const index = mockNotifications.findIndex((n) => n.id === id);
    if (index === -1) {
      throw new Error(`Notification ${id} not found`);
    }

    const existing = mockNotifications[index];
    if (existing.status === 'sent') {
      throw new Error('This notification has already been sent and cannot be edited.');
    }

    const now = new Date().toISOString();
    const targetedCount = calculateTargetedCount(
      data.audience || existing.audience,
      data.targetUserIds || existing.targetUserIds
    );

    let nextStatus = data.status || existing.status;
    let scheduledAt = data.scheduledAt !== undefined ? data.scheduledAt : existing.scheduledAt;
    let sentAt = existing.sentAt;
    let deliveredCount = existing.deliveredCount;
    let failedCount = existing.failedCount;

    const historyUpdates = [...existing.history];

    if (nextStatus === 'scheduled' && scheduledAt) {
      historyUpdates.push({
        id: `HIST-${Date.now()}-sched`,
        status: 'scheduled',
        timestamp: now,
        message: `Schedule updated to ${new Date(scheduledAt).toLocaleString()}`,
        actor: 'Admin'
      });
    } else if (nextStatus === 'sent') {
      sentAt = now;
      deliveredCount = Math.round(targetedCount * 0.98);
      failedCount = targetedCount - deliveredCount;
      historyUpdates.push({
        id: `HIST-${Date.now()}-sent`,
        status: 'sent',
        timestamp: now,
        message: `Marked as sent in demo mode to ${deliveredCount} recipients`,
        actor: 'System'
      });
    } else {
      historyUpdates.push({
        id: `HIST-${Date.now()}-edit`,
        status: nextStatus,
        timestamp: now,
        message: 'Notification details updated',
        actor: 'Admin'
      });
    }

    const updated = {
      ...existing,
      title: data.title !== undefined ? data.title.trim() : existing.title,
      message: data.message !== undefined ? data.message.trim() : existing.message,
      type: data.type !== undefined ? data.type : existing.type,
      audience: data.audience !== undefined ? data.audience : existing.audience,
      targetUserIds: data.targetUserIds !== undefined ? data.targetUserIds : existing.targetUserIds,
      status: nextStatus,
      updatedAt: now,
      scheduledAt,
      sentAt,
      targetedCount,
      deliveredCount,
      failedCount,
      history: historyUpdates
    };

    mockNotifications[index] = updated;
    return JSON.parse(JSON.stringify(updated));
  },

  /**
   * Duplicates an existing notification:
   * Creates a new draft copy, appends "(Copy)", resets delivery stats & timestamps.
   */
  duplicateNotification: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 80));

    const existing = mockNotifications.find((n) => n.id === id);
    if (!existing) {
      throw new Error(`Notification ${id} not found`);
    }

    const now = new Date().toISOString();
    const newId = `NTF-${1000 + mockNotifications.length + 1}`;

    const duplicate = {
      id: newId,
      title: `${existing.title} (Copy)`.slice(0, 80),
      message: existing.message,
      type: existing.type,
      audience: existing.audience,
      targetUserIds: [...(existing.targetUserIds || [])],
      status: 'draft',
      createdAt: now,
      updatedAt: now,
      scheduledAt: null,
      sentAt: null,
      targetedCount: existing.targetedCount,
      deliveredCount: 0,
      failedCount: 0,
      createdBy: 'Admin',
      history: [
        {
          id: `HIST-${Date.now()}-dup`,
          status: 'draft',
          timestamp: now,
          message: `Duplicated from notification ${existing.id}`,
          actor: 'Admin'
        }
      ]
    };

    mockNotifications.unshift(duplicate);
    return JSON.parse(JSON.stringify(duplicate));
  },

  /**
   * Deletes a draft or cancelled notification.
   */
  deleteNotification: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 75));

    const existing = mockNotifications.find((n) => n.id === id);
    if (!existing) {
      throw new Error(`Notification ${id} not found`);
    }

    if (existing.status !== 'draft' && existing.status !== 'cancelled') {
      throw new Error('Only draft or cancelled notifications can be permanently removed.');
    }

    mockNotifications = mockNotifications.filter((n) => n.id !== id);
    return true;
  },

  /**
   * Schedules a draft notification for later dispatch
   */
  scheduleNotification: async (id, scheduledAt) => {
    await new Promise((resolve) => setTimeout(resolve, 80));

    const index = mockNotifications.findIndex((n) => n.id === id);
    if (index === -1) throw new Error(`Notification ${id} not found`);

    const now = new Date().toISOString();
    const existing = mockNotifications[index];

    const updated = {
      ...existing,
      status: 'scheduled',
      scheduledAt: new Date(scheduledAt).toISOString(),
      updatedAt: now,
      history: [
        ...existing.history,
        {
          id: `HIST-${Date.now()}-sched`,
          status: 'scheduled',
          timestamp: now,
          message: `Scheduled for delivery on ${new Date(scheduledAt).toLocaleString()}`,
          actor: 'Admin'
        }
      ]
    };

    mockNotifications[index] = updated;
    return JSON.parse(JSON.stringify(updated));
  },

  /**
   * Cancels a scheduled notification
   */
  cancelNotification: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 80));

    const index = mockNotifications.findIndex((n) => n.id === id);
    if (index === -1) throw new Error(`Notification ${id} not found`);

    const now = new Date().toISOString();
    const existing = mockNotifications[index];

    if (existing.status !== 'scheduled') {
      throw new Error('Only scheduled notifications can be cancelled.');
    }

    const updated = {
      ...existing,
      status: 'cancelled',
      updatedAt: now,
      history: [
        ...existing.history,
        {
          id: `HIST-${Date.now()}-cancel`,
          status: 'cancelled',
          timestamp: now,
          message: 'Delivery schedule cancelled by Admin',
          actor: 'Admin'
        }
      ]
    };

    mockNotifications[index] = updated;
    return JSON.parse(JSON.stringify(updated));
  },

  /**
   * Marks a notification as sent in demo mode
   */
  markAsSent: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 80));

    const index = mockNotifications.findIndex((n) => n.id === id);
    if (index === -1) throw new Error(`Notification ${id} not found`);

    const now = new Date().toISOString();
    const existing = mockNotifications[index];

    const deliveredCount = Math.round(existing.targetedCount * 0.98);
    const failedCount = existing.targetedCount - deliveredCount;

    const updated = {
      ...existing,
      status: 'sent',
      sentAt: now,
      updatedAt: now,
      deliveredCount,
      failedCount,
      history: [
        ...existing.history,
        {
          id: `HIST-${Date.now()}-send`,
          status: 'sent',
          timestamp: now,
          message: `Marked as sent in demo mode to ${deliveredCount} recipients`,
          actor: 'System'
        }
      ]
    };

    mockNotifications[index] = updated;
    return JSON.parse(JSON.stringify(updated));
  },

  /**
   * Retrieves status transition history for a single notification
   */
  getNotificationHistory: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const item = mockNotifications.find((n) => n.id === id);
    if (!item) return [];
    return [...item.history].reverse();
  },

  /**
   * Retrieves users from userRepository for specific audience selection
   */
  getTargetUsers: async (search = '') => {
    const res = await userRepository.getUsers({ search, limit: 50 });
    return res.users.map((u) => ({
      id: u.id,
      displayName: u.displayName,
      email: u.email,
      avatarUrl: u.avatarUrl,
      role: u.role
    }));
  },

  /**
   * Resets mock data to default seed
   */
  refreshNotifications: async () => {
    await new Promise((resolve) => setTimeout(resolve, 120));
    mockNotifications = [...INITIAL_NOTIFICATIONS];
    return true;
  }
};
