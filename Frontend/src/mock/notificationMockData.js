/**
 * Promptoo Admin — Centralized Notification Mock Seed Data
 */

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'NTF-1001',
    title: 'Weekend Prompting Masterclass Live',
    message: 'Join our lead prompt engineers this Saturday for an exclusive deep-dive into cinematic noir lighting.',
    type: 'announcement',
    audience: 'all',
    targetUserIds: [],
    status: 'draft',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
    scheduledAt: null,
    sentAt: null,
    targetedCount: 2847,
    deliveredCount: 0,
    failedCount: 0,
    createdBy: 'Dhruv Sutariya',
    history: [
      {
        id: 'HIST-01',
        status: 'draft',
        timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        message: 'Notification draft created by Dhruv Sutariya',
        actor: 'Dhruv Sutariya'
      }
    ]
  },
  {
    id: 'NTF-1002',
    title: 'Upcoming AI Model v2.4 Release Notes',
    message: 'Review early documentation for ultra-high-resolution canvas rendering and photorealistic texture presets.',
    type: 'general',
    audience: 'active',
    targetUserIds: [],
    status: 'draft',
    createdAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString(), // 10 hours ago
    updatedAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    scheduledAt: null,
    sentAt: null,
    targetedCount: 1420,
    deliveredCount: 0,
    failedCount: 0,
    createdBy: 'Admin',
    history: [
      {
        id: 'HIST-02',
        status: 'draft',
        timestamp: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
        message: 'Notification draft created by Admin',
        actor: 'Admin'
      }
    ]
  },
  {
    id: 'NTF-1003',
    title: 'Creator Spotlight: Sophia Chen',
    message: 'Discover how top creator Sophia Chen designs neon cyber aesthetics using custom Promptoo filters.',
    type: 'trending',
    audience: 'all',
    targetUserIds: [],
    status: 'scheduled',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    scheduledAt: new Date(Date.now() + 18 * 3600 * 1000).toISOString(), // Tomorrow morning
    sentAt: null,
    targetedCount: 2847,
    deliveredCount: 0,
    failedCount: 0,
    createdBy: 'Admin',
    history: [
      {
        id: 'HIST-03',
        status: 'draft',
        timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        message: 'Draft initialized',
        actor: 'Admin'
      },
      {
        id: 'HIST-04',
        status: 'scheduled',
        timestamp: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
        message: 'Notification scheduled for delivery',
        actor: 'Admin'
      }
    ]
  },
  {
    id: 'NTF-1004',
    title: 'Cyberpunk Neon V2 Dropping Tomorrow',
    message: 'The sequel to our top-performing template is going live with 12 new high-contrast neon variations.',
    type: 'new_template',
    audience: 'active',
    targetUserIds: [],
    status: 'scheduled',
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(), // 1.5 days ago
    updatedAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
    scheduledAt: new Date(Date.now() + 30 * 3600 * 1000).toISOString(), // In 30 hours
    sentAt: null,
    targetedCount: 1420,
    deliveredCount: 0,
    failedCount: 0,
    createdBy: 'Dhruv Sutariya',
    history: [
      {
        id: 'HIST-05',
        status: 'draft',
        timestamp: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
        message: 'Created as draft',
        actor: 'Dhruv Sutariya'
      },
      {
        id: 'HIST-06',
        status: 'scheduled',
        timestamp: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
        message: 'Scheduled for dispatch',
        actor: 'Dhruv Sutariya'
      }
    ]
  },
  {
    id: 'NTF-1005',
    title: 'Welcome to Promptoo Creator Studio!',
    message: 'Your creative toolkit is ready. Try generating your first anime portrait or exploring the template catalog.',
    type: 'announcement',
    audience: 'new_users',
    targetUserIds: [],
    status: 'sent',
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 42 * 3600 * 1000).toISOString(),
    scheduledAt: new Date(Date.now() - 44 * 3600 * 1000).toISOString(),
    sentAt: new Date(Date.now() - 42 * 3600 * 1000).toISOString(),
    targetedCount: 310,
    deliveredCount: 304,
    failedCount: 6,
    createdBy: 'Admin',
    history: [
      {
        id: 'HIST-07',
        status: 'draft',
        timestamp: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
        message: 'Notification drafted',
        actor: 'Admin'
      },
      {
        id: 'HIST-08',
        status: 'scheduled',
        timestamp: new Date(Date.now() - 44 * 3600 * 1000).toISOString(),
        message: 'Scheduled for immediate batch processing',
        actor: 'Admin'
      },
      {
        id: 'HIST-09',
        status: 'sending',
        timestamp: new Date(Date.now() - 42.5 * 3600 * 1000).toISOString(),
        message: 'Batch dispatch in progress',
        actor: 'System'
      },
      {
        id: 'HIST-10',
        status: 'sent',
        timestamp: new Date(Date.now() - 42 * 3600 * 1000).toISOString(),
        message: 'Successfully delivered to 304 / 310 recipients (98.1% success)',
        actor: 'System'
      }
    ]
  },
  {
    id: 'NTF-1006',
    title: 'New Ghibli Forest Lake Template Available',
    message: 'Bring whimsical hand-drawn aesthetic to your creations with our latest Miyazaki-inspired template.',
    type: 'new_template',
    audience: 'all',
    targetUserIds: [],
    status: 'sent',
    createdAt: new Date(Date.now() - 3 * 86400 * 1000).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 3 * 86400 * 1000).toISOString(),
    scheduledAt: null,
    sentAt: new Date(Date.now() - 3 * 86400 * 1000).toISOString(),
    targetedCount: 2847,
    deliveredCount: 2812,
    failedCount: 35,
    createdBy: 'Dhruv Sutariya',
    history: [
      {
        id: 'HIST-11',
        status: 'draft',
        timestamp: new Date(Date.now() - 3.2 * 86400 * 1000).toISOString(),
        message: 'Draft created',
        actor: 'Dhruv Sutariya'
      },
      {
        id: 'HIST-12',
        status: 'sending',
        timestamp: new Date(Date.now() - 3.05 * 86400 * 1000).toISOString(),
        message: 'Immediate delivery triggered',
        actor: 'Dhruv Sutariya'
      },
      {
        id: 'HIST-13',
        status: 'sent',
        timestamp: new Date(Date.now() - 3 * 86400 * 1000).toISOString(),
        message: 'Delivered to 2,812 active devices',
        actor: 'System'
      }
    ]
  },
  {
    id: 'NTF-1007',
    title: 'Weekly Leaderboard Winners Announced!',
    message: 'Check out the top prompt creators this week. Congratulations to Marcus Sterling on taking 1st place! 🏆',
    type: 'trending',
    audience: 'all',
    targetUserIds: [],
    status: 'sent',
    createdAt: new Date(Date.now() - 5 * 86400 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 5 * 86400 * 1000).toISOString(),
    scheduledAt: null,
    sentAt: new Date(Date.now() - 5 * 86400 * 1000).toISOString(),
    targetedCount: 2847,
    deliveredCount: 2795,
    failedCount: 52,
    createdBy: 'Admin',
    history: [
      {
        id: 'HIST-14',
        status: 'draft',
        timestamp: new Date(Date.now() - 5.1 * 86400 * 1000).toISOString(),
        message: 'Leaderboard notification draft ready',
        actor: 'Admin'
      },
      {
        id: 'HIST-15',
        status: 'sent',
        timestamp: new Date(Date.now() - 5 * 86400 * 1000).toISOString(),
        message: 'Delivered broadcast to 2,795 users',
        actor: 'System'
      }
    ]
  },
  {
    id: 'NTF-1008',
    title: 'VIP Creator Beta Access: Multi-Layer Prompts',
    message: 'You have been selected to beta-test multi-pass layered diffusion rendering before public rollout.',
    type: 'announcement',
    audience: 'specific_users',
    targetUserIds: ['USR-10294', 'USR-10295', 'USR-10296'],
    status: 'sent',
    createdAt: new Date(Date.now() - 7 * 86400 * 1000).toISOString(), // 7 days ago
    updatedAt: new Date(Date.now() - 7 * 86400 * 1000).toISOString(),
    scheduledAt: null,
    sentAt: new Date(Date.now() - 7 * 86400 * 1000).toISOString(),
    targetedCount: 3,
    deliveredCount: 3,
    failedCount: 0,
    createdBy: 'Dhruv Sutariya',
    history: [
      {
        id: 'HIST-16',
        status: 'draft',
        timestamp: new Date(Date.now() - 7.1 * 86400 * 1000).toISOString(),
        message: 'VIP invitation prepared for 3 creators',
        actor: 'Dhruv Sutariya'
      },
      {
        id: 'HIST-17',
        status: 'sent',
        timestamp: new Date(Date.now() - 7 * 86400 * 1000).toISOString(),
        message: 'Targeted notification sent directly',
        actor: 'System'
      }
    ]
  },
  {
    id: 'NTF-1009',
    title: 'Scheduled Core Engine Upgrade: 2AM UTC',
    message: 'We will be performing a 15-minute maintenance on diffusion clusters. API calls may experience slight latency.',
    type: 'system',
    audience: 'all',
    targetUserIds: [],
    status: 'sent',
    createdAt: new Date(Date.now() - 12 * 86400 * 1000).toISOString(), // 12 days ago
    updatedAt: new Date(Date.now() - 12 * 86400 * 1000).toISOString(),
    scheduledAt: null,
    sentAt: new Date(Date.now() - 12 * 86400 * 1000).toISOString(),
    targetedCount: 2847,
    deliveredCount: 2780,
    failedCount: 67,
    createdBy: 'Admin',
    history: [
      {
        id: 'HIST-18',
        status: 'sent',
        timestamp: new Date(Date.now() - 12 * 86400 * 1000).toISOString(),
        message: 'System maintenance broadcast dispatched',
        actor: 'Admin'
      }
    ]
  },
  {
    id: 'NTF-1010',
    title: 'APNS Push Gateway Timeout During Delivery',
    message: 'Apple Push Notification Service gateway experienced connection reset on legacy endpoint pool.',
    type: 'system',
    audience: 'all',
    targetUserIds: [],
    status: 'failed',
    createdAt: new Date(Date.now() - 14 * 86400 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 14 * 86400 * 1000).toISOString(),
    scheduledAt: null,
    sentAt: null,
    targetedCount: 2847,
    deliveredCount: 412,
    failedCount: 2435,
    createdBy: 'System',
    history: [
      {
        id: 'HIST-19',
        status: 'sending',
        timestamp: new Date(Date.now() - 14.1 * 86400 * 1000).toISOString(),
        message: 'Attempted push broadcast',
        actor: 'System'
      },
      {
        id: 'HIST-20',
        status: 'failed',
        timestamp: new Date(Date.now() - 14 * 86400 * 1000).toISOString(),
        message: 'Gateway HTTP/2 connection error (ECONNRESET)',
        actor: 'System'
      }
    ]
  },
  {
    id: 'NTF-1011',
    title: 'Flash Weekend Studio Pass Promo [Cancelled]',
    message: 'Unlock unlimited 4K exports this weekend with 50% discount on prompt credit bundles.',
    type: 'announcement',
    audience: 'active',
    targetUserIds: [],
    status: 'cancelled',
    createdAt: new Date(Date.now() - 18 * 86400 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 17 * 86400 * 1000).toISOString(),
    scheduledAt: new Date(Date.now() - 17 * 86400 * 1000).toISOString(),
    sentAt: null,
    targetedCount: 1420,
    deliveredCount: 0,
    failedCount: 0,
    createdBy: 'Admin',
    history: [
      {
        id: 'HIST-21',
        status: 'draft',
        timestamp: new Date(Date.now() - 18 * 86400 * 1000).toISOString(),
        message: 'Draft created',
        actor: 'Admin'
      },
      {
        id: 'HIST-22',
        status: 'scheduled',
        timestamp: new Date(Date.now() - 17.5 * 86400 * 1000).toISOString(),
        message: 'Scheduled for weekend release',
        actor: 'Admin'
      },
      {
        id: 'HIST-23',
        status: 'cancelled',
        timestamp: new Date(Date.now() - 17 * 86400 * 1000).toISOString(),
        message: 'Cancelled by Admin before dispatch',
        actor: 'Admin'
      }
    ]
  },
  {
    id: 'NTF-1012',
    title: 'New Cinematic Noir 35mm Style Added',
    message: 'Explore moody retro photographic grain with high dynamic range chiaroscuro lighting.',
    type: 'new_template',
    audience: 'all',
    targetUserIds: [],
    status: 'sent',
    createdAt: new Date(Date.now() - 22 * 86400 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 22 * 86400 * 1000).toISOString(),
    scheduledAt: null,
    sentAt: new Date(Date.now() - 22 * 86400 * 1000).toISOString(),
    targetedCount: 2847,
    deliveredCount: 2801,
    failedCount: 46,
    createdBy: 'Dhruv Sutariya',
    history: [
      {
        id: 'HIST-24',
        status: 'sent',
        timestamp: new Date(Date.now() - 22 * 86400 * 1000).toISOString(),
        message: 'Delivered broadcast to 2,801 devices',
        actor: 'System'
      }
    ]
  }
];
