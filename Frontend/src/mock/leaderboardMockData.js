/**
 * Promptoo Admin — Centralized Leaderboard Mock Seed Data
 */

export const INITIAL_LEADERBOARD_USERS = [
  {
    id: 'USR-10296',
    displayName: 'Marcus Sterling',
    username: '@marcus_vfx',
    email: 'marcus.sterling@visuals.io',
    avatarUrl: null, // Tests fallback initials "MS"
    status: 'active',
    creations: 215,
    weeklyCreations: 28,
    likes: 1840,
    saved: 420,
    lastActiveAt: new Date(Date.now() - 45 * 60 * 1000).toISOString() // 45m ago
  },
  {
    id: 'USR-10295',
    displayName: 'Elena Rostova',
    username: '@elena_art',
    email: 'elena.r@artstudio.com',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    status: 'active',
    creations: 184,
    weeklyCreations: 24,
    likes: 1520,
    saved: 380,
    lastActiveAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString() // 2h ago
  },
  {
    id: 'USR-10294',
    displayName: 'Dhruv Sutariya',
    username: '@dhruvsutariya',
    email: 'dhruv.sutariya@promptoo.ai',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    status: 'active',
    creations: 162,
    weeklyCreations: 21,
    likes: 1390,
    saved: 310,
    lastActiveAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString() // 3h ago
  },
  {
    id: 'USR-10298',
    displayName: 'Lucas Dubois',
    username: '@lucas_paris',
    email: 'lucas.d@parisphoto.fr',
    avatarUrl: null, // "LD"
    status: 'active',
    creations: 140,
    weeklyCreations: 18,
    likes: 1120,
    saved: 275,
    lastActiveAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
  },
  {
    id: 'USR-10301',
    displayName: 'Vikram Malhotra',
    username: '@vikram_m',
    email: 'vikram.m@mumbaicreative.in',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    status: 'active',
    creations: 128,
    weeklyCreations: 16,
    likes: 980,
    saved: 240,
    lastActiveAt: new Date(Date.now() - 7 * 3600 * 1000).toISOString()
  },
  {
    id: 'USR-10297',
    displayName: 'Sophia Chen',
    username: '@sophiac',
    email: 'sophia.chen@designwave.org',
    avatarUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=200&auto=format&fit=crop&q=80',
    status: 'active',
    creations: 115,
    weeklyCreations: 15,
    likes: 920,
    saved: 215,
    lastActiveAt: new Date(Date.now() - 11 * 3600 * 1000).toISOString()
  },
  {
    id: 'USR-10304',
    displayName: 'Mateo Rossi',
    username: '@mateorossi',
    email: 'mateo.rossi@milanodesign.it',
    avatarUrl: null, // "MR"
    status: 'active',
    creations: 98,
    weeklyCreations: 14,
    likes: 840,
    saved: 195,
    lastActiveAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString()
  },
  {
    id: 'USR-10299',
    displayName: 'Aaliyah Khan',
    username: '@aaliyah_k',
    email: 'aaliyah.k@creativestack.net',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    status: 'active',
    creations: 92,
    weeklyCreations: 12,
    likes: 760,
    saved: 180,
    lastActiveAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString()
  },
  {
    id: 'USR-10302',
    displayName: 'Hannah Schmidt',
    username: '@hannah_s',
    email: 'hannah.s@berlinart.de',
    avatarUrl: null, // "HS"
    status: 'active',
    creations: 85,
    weeklyCreations: 11,
    likes: 690,
    saved: 165,
    lastActiveAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString() // Yesterday
  },
  {
    id: 'USR-10306',
    displayName: 'Chloe Bennett',
    username: '@chloeb',
    email: 'chloe.bennett@sydneydigital.au',
    avatarUrl: null, // "CB"
    status: 'active',
    creations: 76,
    weeklyCreations: 10,
    likes: 610,
    saved: 145,
    lastActiveAt: new Date(Date.now() - 28 * 3600 * 1000).toISOString()
  },
  {
    id: 'USR-10300',
    displayName: 'Maya Patel',
    username: '@mayapatel',
    email: 'maya.patel@horizon.co',
    avatarUrl: null, // "MP"
    status: 'active',
    creations: 68,
    weeklyCreations: 9,
    likes: 540,
    saved: 130,
    lastActiveAt: new Date(Date.now() - 32 * 3600 * 1000).toISOString()
  },
  {
    id: 'USR-10303',
    displayName: 'Kenji Sato',
    username: '@kenjisato',
    email: 'kenji.sato@tokyoai.jp',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    status: 'inactive',
    creations: 64,
    weeklyCreations: 4,
    likes: 510,
    saved: 120,
    lastActiveAt: new Date(Date.now() - 5 * 86400 * 1000).toISOString()
  },
  {
    id: 'USR-10305',
    displayName: 'Fatima Al-Mansoor',
    username: '@fatima_am',
    email: 'fatima.m@dubaifuture.ae',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    status: 'active',
    creations: 58,
    weeklyCreations: 8,
    likes: 470,
    saved: 110,
    lastActiveAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString()
  },
  {
    id: 'USR-10307',
    displayName: 'Oliver Hansen',
    username: '@oliver_h',
    email: 'oliver.h@nordiclight.se',
    avatarUrl: null, // "OH"
    status: 'suspended',
    creations: 52,
    weeklyCreations: 2,
    likes: 420,
    saved: 95,
    lastActiveAt: new Date(Date.now() - 7 * 86400 * 1000).toISOString()
  },
  {
    id: 'USR-10308',
    displayName: 'Amara Okafor',
    username: '@amara_okafor',
    email: 'amara.okafor@lagosvisuals.ng',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&auto=format&fit=crop&q=80',
    status: 'active',
    creations: 46,
    weeklyCreations: 7,
    likes: 380,
    saved: 88,
    lastActiveAt: new Date(Date.now() - 16 * 3600 * 1000).toISOString()
  },
  {
    id: 'USR-10309',
    displayName: 'Gabriel Silva',
    username: '@gabrielsilva',
    email: 'gabriel.s@riomedia.br',
    avatarUrl: null,
    status: 'active',
    creations: 42,
    weeklyCreations: 6,
    likes: 340,
    saved: 75,
    lastActiveAt: new Date(Date.now() - 22 * 3600 * 1000).toISOString()
  },
  {
    id: 'USR-10310',
    displayName: 'Zoe Katsaros',
    username: '@zoekatsaros',
    email: 'zoe.k@athensart.gr',
    avatarUrl: null,
    status: 'active',
    creations: 38,
    weeklyCreations: 5,
    likes: 310,
    saved: 68,
    lastActiveAt: new Date(Date.now() - 30 * 3600 * 1000).toISOString()
  },
  {
    id: 'USR-10311',
    displayName: 'Lars Lindqvist',
    username: '@lars_l',
    email: 'lars.l@stockholmstudios.se',
    avatarUrl: null,
    status: 'active',
    creations: 32,
    weeklyCreations: 4,
    likes: 260,
    saved: 55,
    lastActiveAt: new Date(Date.now() - 40 * 3600 * 1000).toISOString()
  },
  {
    id: 'USR-10312',
    displayName: 'Priya Sharma',
    username: '@priyasharma',
    email: 'priya.s@delhidesign.in',
    avatarUrl: null,
    status: 'active',
    creations: 27,
    weeklyCreations: 3,
    likes: 215,
    saved: 48,
    lastActiveAt: new Date(Date.now() - 2 * 86400 * 1000).toISOString()
  },
  {
    id: 'USR-10313',
    displayName: 'Tariq Mansour',
    username: '@tariq_m',
    email: 'tariq.m@cairofuture.eg',
    avatarUrl: null,
    status: 'inactive',
    creations: 22,
    weeklyCreations: 1,
    likes: 180,
    saved: 38,
    lastActiveAt: new Date(Date.now() - 10 * 86400 * 1000).toISOString()
  },
  {
    id: 'USR-10314',
    displayName: 'Yuki Takahashi',
    username: '@yuki_t',
    email: 'yuki.t@kyotocreative.jp',
    avatarUrl: null,
    status: 'active',
    creations: 18,
    weeklyCreations: 3,
    likes: 145,
    saved: 32,
    lastActiveAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString()
  },
  {
    id: 'USR-10315',
    displayName: 'Evelyn Reed',
    username: '@evelynreed',
    email: 'evelyn.r@seattlestudios.com',
    avatarUrl: null,
    status: 'active',
    creations: 14,
    weeklyCreations: 2,
    likes: 110,
    saved: 24,
    lastActiveAt: new Date(Date.now() - 4 * 86400 * 1000).toISOString()
  },
  {
    id: 'USR-10316',
    displayName: 'Kofi Mensah',
    username: '@kofi_m',
    email: 'kofi.mensah@accraarts.gh',
    avatarUrl: null,
    status: 'active',
    creations: 11,
    weeklyCreations: 2,
    likes: 85,
    saved: 18,
    lastActiveAt: new Date(Date.now() - 3 * 86400 * 1000).toISOString()
  },
  {
    id: 'USR-10317',
    displayName: 'Isabella Romano',
    username: '@isabellaromano',
    email: 'isabella.r@romadesign.it',
    avatarUrl: null,
    status: 'active',
    creations: 8,
    weeklyCreations: 1,
    likes: 62,
    saved: 14,
    lastActiveAt: new Date(Date.now() - 6 * 86400 * 1000).toISOString()
  },
  {
    id: 'USR-10318',
    displayName: 'Carlos Mendoza',
    username: '@carlos_m',
    email: 'carlos.m@buenosairesmedia.ar',
    avatarUrl: null,
    status: 'active',
    creations: 5,
    weeklyCreations: 1,
    likes: 40,
    saved: 9,
    lastActiveAt: new Date(Date.now() - 8 * 86400 * 1000).toISOString()
  }
];

export const MOCK_RANK_HISTORY = {
  'USR-10296': [
    { id: 'rh-101', userId: 'USR-10296', date: 'Oct 03', rank: 1, creations: 28 },
    { id: 'rh-102', userId: 'USR-10296', date: 'Sep 26', rank: 2, creations: 22 },
    { id: 'rh-103', userId: 'USR-10296', date: 'Sep 19', rank: 3, creations: 19 },
    { id: 'rh-104', userId: 'USR-10296', date: 'Sep 12', rank: 4, creations: 16 }
  ],
  'USR-10295': [
    { id: 'rh-201', userId: 'USR-10295', date: 'Oct 03', rank: 2, creations: 24 },
    { id: 'rh-202', userId: 'USR-10295', date: 'Sep 26', rank: 1, creations: 25 },
    { id: 'rh-203', userId: 'USR-10295', date: 'Sep 19', rank: 2, creations: 21 },
    { id: 'rh-204', userId: 'USR-10295', date: 'Sep 12', rank: 2, creations: 18 }
  ],
  'USR-10294': [
    { id: 'rh-301', userId: 'USR-10294', date: 'Oct 03', rank: 3, creations: 21 },
    { id: 'rh-302', userId: 'USR-10294', date: 'Sep 26', rank: 3, creations: 20 },
    { id: 'rh-303', userId: 'USR-10294', date: 'Sep 19', rank: 1, creations: 24 },
    { id: 'rh-304', userId: 'USR-10294', date: 'Sep 12', rank: 3, creations: 17 }
  ],
  'USR-10298': [
    { id: 'rh-401', userId: 'USR-10298', date: 'Oct 03', rank: 4, creations: 18 },
    { id: 'rh-402', userId: 'USR-10298', date: 'Sep 26', rank: 4, creations: 17 },
    { id: 'rh-403', userId: 'USR-10298', date: 'Sep 19', rank: 5, creations: 14 }
  ],
  'USR-10301': [
    { id: 'rh-501', userId: 'USR-10301', date: 'Oct 03', rank: 5, creations: 16 },
    { id: 'rh-502', userId: 'USR-10301', date: 'Sep 26', rank: 6, creations: 13 },
    { id: 'rh-503', userId: 'USR-10301', date: 'Sep 19', rank: 4, creations: 15 }
  ]
};
