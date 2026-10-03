/**
 * Promptoo Admin — Centralized Dashboard Mock Seed Data
 */

import { DATE_RANGES } from '../types/dashboard.js';

export const OVERVIEW_DATA = {
  [DATE_RANGES.TODAY]: {
    totalUsers: { value: '24,582', change: '+38 today', changeType: 'positive', label: 'Total Users', subtext: 'vs previous day' },
    totalTemplates: { value: '1,248', change: '+4 today', changeType: 'positive', label: 'Total Templates', subtext: 'published to app' },
    totalTemplateUses: { value: '14,280', change: '+14.2%', changeType: 'positive', label: 'Total Template Uses', subtext: 'vs previous day' },
    totalSavedLikes: { value: '6,140', change: '+9.8%', changeType: 'positive', label: 'Total Saved/Likes', subtext: 'user favorites' }
  },
  [DATE_RANGES.LAST_7_DAYS]: {
    totalUsers: { value: '24,582', change: '+384 new', changeType: 'positive', label: 'Total Users', subtext: 'vs previous week' },
    totalTemplates: { value: '1,248', change: '+12 new', changeType: 'positive', label: 'Total Templates', subtext: 'active styles' },
    totalTemplateUses: { value: '54,920', change: '+16.5%', changeType: 'positive', label: 'Total Template Uses', subtext: 'vs previous 7 days' },
    totalSavedLikes: { value: '28,450', change: '+10.2%', changeType: 'positive', label: 'Total Saved/Likes', subtext: 'user favorites' }
  },
  [DATE_RANGES.LAST_30_DAYS]: {
    totalUsers: { value: '24,582', change: '+12.5%', changeType: 'positive', label: 'Total Users', subtext: 'vs previous period' },
    totalTemplates: { value: '1,248', change: '+8.2%', changeType: 'positive', label: 'Total Templates', subtext: 'vs previous period' },
    totalTemplateUses: { value: '186,420', change: '+18.4%', changeType: 'positive', label: 'Total Template Uses', subtext: 'vs previous period' },
    totalSavedLikes: { value: '92,840', change: '+11.7%', changeType: 'positive', label: 'Total Saved/Likes', subtext: 'vs previous period' }
  },
  [DATE_RANGES.LAST_90_DAYS]: {
    totalUsers: { value: '24,582', change: '+34.8%', changeType: 'positive', label: 'Total Users', subtext: 'vs previous 90 days' },
    totalTemplates: { value: '1,248', change: '+22.4%', changeType: 'positive', label: 'Total Templates', subtext: 'vs previous 90 days' },
    totalTemplateUses: { value: '492,180', change: '+41.2%', changeType: 'positive', label: 'Total Template Uses', subtext: 'vs previous 90 days' },
    totalSavedLikes: { value: '241,600', change: '+29.6%', changeType: 'positive', label: 'Total Saved/Likes', subtext: 'vs previous 90 days' }
  },
  [DATE_RANGES.ALL_TIME]: {
    totalUsers: { value: '24,582', change: 'Lifetime', changeType: 'neutral', label: 'Total Users', subtext: 'registered accounts' },
    totalTemplates: { value: '1,248', change: 'Lifetime', changeType: 'neutral', label: 'Total Templates', subtext: 'all curated styles' },
    totalTemplateUses: { value: '1,280,450', change: 'Lifetime', changeType: 'neutral', label: 'Total Template Uses', subtext: 'total transformations' },
    totalSavedLikes: { value: '648,920', change: 'Lifetime', changeType: 'neutral', label: 'Total Saved/Likes', subtext: 'lifetime favorites' }
  }
};

export const TEMPLATE_USAGE_CHART_DATA = {
  [DATE_RANGES.TODAY]: [
    { date: '00:00', uses: 410 },
    { date: '04:00', uses: 220 },
    { date: '08:00', uses: 890 },
    { date: '12:00', uses: 2150 },
    { date: '16:00', uses: 3410 },
    { date: '20:00', uses: 4320 },
    { date: '23:59', uses: 2880 },
  ],
  [DATE_RANGES.LAST_7_DAYS]: [
    { date: 'Mon', uses: 6240 },
    { date: 'Tue', uses: 7120 },
    { date: 'Wed', uses: 8450 },
    { date: 'Thu', uses: 7920 },
    { date: 'Fri', uses: 9180 },
    { date: 'Sat', uses: 11420 },
    { date: 'Sun', uses: 10590 },
  ],
  [DATE_RANGES.LAST_30_DAYS]: [
    { date: 'Sep 01', uses: 4210 },
    { date: 'Sep 05', uses: 5120 },
    { date: 'Sep 10', uses: 5890 },
    { date: 'Sep 15', uses: 6420 },
    { date: 'Sep 20', uses: 7180 },
    { date: 'Sep 25', uses: 8240 },
    { date: 'Sep 28', uses: 9120 },
    { date: 'Sep 30', uses: 9840 },
  ],
  [DATE_RANGES.LAST_90_DAYS]: [
    { date: 'Month 1', uses: 124500 },
    { date: 'Month 2', uses: 168200 },
    { date: 'Month 3', uses: 199480 },
  ],
  [DATE_RANGES.ALL_TIME]: [
    { date: 'Q1', uses: 210000 },
    { date: 'Q2', uses: 340000 },
    { date: 'Q3', uses: 480000 },
    { date: 'Q4', uses: 650000 },
  ]
};

export const USER_GROWTH_CHART_DATA = {
  [DATE_RANGES.TODAY]: [
    { date: '00:00', newUsers: 4 },
    { date: '06:00', newUsers: 9 },
    { date: '12:00', newUsers: 24 },
    { date: '18:00', newUsers: 38 },
  ],
  [DATE_RANGES.LAST_7_DAYS]: [
    { date: 'Mon', newUsers: 42 },
    { date: 'Tue', newUsers: 51 },
    { date: 'Wed', newUsers: 48 },
    { date: 'Thu', newUsers: 64 },
    { date: 'Fri', newUsers: 72 },
    { date: 'Sat', newUsers: 89 },
    { date: 'Sun', newUsers: 78 },
  ],
  [DATE_RANGES.LAST_30_DAYS]: [
    { date: 'Sep 01', newUsers: 35 },
    { date: 'Sep 05', newUsers: 48 },
    { date: 'Sep 10', newUsers: 62 },
    { date: 'Sep 15', newUsers: 79 },
    { date: 'Sep 20', newUsers: 94 },
    { date: 'Sep 25', newUsers: 112 },
    { date: 'Sep 30', newUsers: 128 },
  ],
  [DATE_RANGES.LAST_90_DAYS]: [
    { date: 'Month 1', newUsers: 1840 },
    { date: 'Month 2', newUsers: 2450 },
    { date: 'Month 3', newUsers: 3120 },
  ],
  [DATE_RANGES.ALL_TIME]: [
    { date: '2024', newUsers: 4200 },
    { date: '2025', newUsers: 9800 },
    { date: '2026', newUsers: 10582 },
  ]
};

export const CATEGORY_PERFORMANCE_DATA = [
  { name: 'Cinematic', uses: 78240, percentage: 38, countLabel: '78,240 uses' },
  { name: 'Portrait', uses: 62840, percentage: 31, countLabel: '62,840 uses' },
  { name: 'Couple', uses: 42190, percentage: 21, countLabel: '42,190 uses' },
  { name: 'Travel', uses: 31480, percentage: 16, countLabel: '31,480 uses' },
  { name: 'Fashion', uses: 28920, percentage: 14, countLabel: '28,920 uses' },
  { name: 'AI Art', uses: 24810, percentage: 12, countLabel: '24,810 uses' }
];

export const TOP_TEMPLATES_DATA = [
  {
    rank: 1,
    title: 'Cinematic Rain Portrait',
    category: 'Cinematic',
    uses: '12,840',
    likes: '3,920',
    status: 'active'
  },
  {
    rank: 2,
    title: 'Vintage Film Portrait',
    category: 'Portrait',
    uses: '10,240',
    likes: '3,210',
    status: 'active'
  },
  {
    rank: 3,
    title: 'Couple Sunset',
    category: 'Couple',
    uses: '9,820',
    likes: '2,940',
    status: 'active'
  },
  {
    rank: 4,
    title: 'Monsoon Street Portrait',
    category: 'Cinematic',
    uses: '8,640',
    likes: '2,410',
    status: 'active'
  },
  {
    rank: 5,
    title: 'Golden Hour Couple',
    category: 'Couple',
    uses: '7,920',
    likes: '2,180',
    status: 'active'
  },
  {
    rank: 6,
    title: 'Luxury Editorial',
    category: 'Fashion',
    uses: '6,850',
    likes: '1,940',
    status: 'active'
  }
];

export const RECENT_ACTIVITY_DATA = [
  {
    id: 'act-1',
    type: 'user',
    title: 'New user registered',
    description: 'Sophia Miller created a new Promptoo account',
    timestamp: '2 minutes ago'
  },
  {
    id: 'act-2',
    type: 'template',
    title: 'Template milestone',
    description: 'Template "Cinematic Rain" reached 10K uses',
    timestamp: '15 minutes ago'
  },
  {
    id: 'act-3',
    type: 'template',
    title: 'New template published',
    description: 'Studio admin published "Retro Bollywood"',
    timestamp: '1 hour ago'
  },
  {
    id: 'act-4',
    type: 'like',
    title: 'User saved template',
    description: 'Alex Johnson favorited "Dreamy Travel Frame"',
    timestamp: '2 hours ago'
  },
  {
    id: 'act-5',
    type: 'template',
    title: 'Template was updated',
    description: 'Prompt weights calibrated for "Golden Hour Couple"',
    timestamp: '3 hours ago'
  },
  {
    id: 'act-6',
    type: 'system',
    title: 'Admin changed a setting',
    description: 'Weekly automated analytics report digest enabled',
    timestamp: '5 hours ago'
  }
];

export const SYSTEM_STATUS_DATA = [
  { name: 'Database', status: 'Connected', indicator: 'success' },
  { name: 'Storage', status: 'Connected', indicator: 'success' },
  { name: 'Authentication', status: 'Active', indicator: 'success' },
  { name: 'API Gateway', status: 'Operational', indicator: 'success' }
];
