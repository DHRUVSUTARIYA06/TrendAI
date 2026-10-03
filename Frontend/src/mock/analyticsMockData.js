/**
 * Promptoo Admin — Centralized Analytics Mock Seed Data
 */

export const CATEGORIES_DATA = [
  { slug: 'cinematic', name: 'Cinematic 🎬', templateCount: 34, uses: 22400, likes: 8120, saves: 4890 },
  { slug: 'anime', name: 'Anime 🎨', templateCount: 42, uses: 19800, likes: 7450, saves: 4120 },
  { slug: 'cyberpunk', name: 'Cyberpunk 🌃', templateCount: 26, uses: 14200, likes: 5310, saves: 3040 },
  { slug: 'portrait', name: 'Portrait 🖼️', templateCount: 28, uses: 11900, likes: 4200, saves: 2310 },
  { slug: 'fantasy', name: 'Fantasy 🐉', templateCount: 18, uses: 8900, likes: 3180, saves: 1740 },
  { slug: 'fashion', name: 'Fashion ✨', templateCount: 22, uses: 7600, likes: 2790, saves: 1480 }
];

export const TOP_TEMPLATES_SEED = [
  {
    rank: 1,
    id: 'TMP-001',
    title: 'Cinematic Rain Portrait',
    category: 'Cinematic 🎬',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    uses: 18420,
    likes: 6850,
    saves: 3420,
    status: 'active'
  },
  {
    rank: 2,
    id: 'TMP-002',
    title: 'Studio Ghibli Forest Lake',
    category: 'Anime 🎨',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80',
    uses: 16900,
    likes: 5740,
    saves: 2980,
    status: 'active'
  },
  {
    rank: 3,
    id: 'TMP-003',
    title: 'Cyberpunk Neon Street',
    category: 'Cyberpunk 🌃',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=80',
    uses: 14120,
    likes: 4890,
    saves: 2540,
    status: 'active'
  },
  {
    rank: 4,
    id: 'TMP-004',
    title: 'Ethereal Cloud Kingdom',
    category: 'Fantasy 🐉',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80',
    uses: 11840,
    likes: 3950,
    saves: 1980,
    status: 'active'
  },
  {
    rank: 5,
    id: 'TMP-005',
    title: 'Editorial 35mm Studio Grain',
    category: 'Portrait 🖼️',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    uses: 9650,
    likes: 3120,
    saves: 1650,
    status: 'active'
  },
  {
    rank: 6,
    id: 'TMP-006',
    title: 'Vaporwave Sunset Highway',
    category: 'Cyberpunk 🌃',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=200&auto=format&fit=crop&q=80',
    uses: 8420,
    likes: 2780,
    saves: 1390,
    status: 'active'
  },
  {
    rank: 7,
    id: 'TMP-007',
    title: 'Minimalist Nordic Interior',
    category: 'Fashion ✨',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=200&auto=format&fit=crop&q=80',
    uses: 7210,
    likes: 2430,
    saves: 1180,
    status: 'active'
  },
  {
    rank: 8,
    id: 'TMP-008',
    title: 'Neon Samurai Tokyo',
    category: 'Anime 🎨',
    thumbnailUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=80',
    uses: 6890,
    likes: 2210,
    saves: 1040,
    status: 'active'
  },
  {
    rank: 9,
    id: 'TMP-009',
    title: 'Golden Hour Tuscan Villa',
    category: 'Cinematic 🎬',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&auto=format&fit=crop&q=80',
    uses: 5940,
    likes: 1980,
    saves: 920,
    status: 'active'
  },
  {
    rank: 10,
    id: 'TMP-010',
    title: 'Monochrome Bauhaus Geometry',
    category: 'Portrait 🖼️',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    uses: 4820,
    likes: 1610,
    saves: 750,
    status: 'active'
  }
];

export const TOP_USERS_SEED = [
  {
    rank: 1,
    id: 'USR-10296',
    displayName: 'Marcus Sterling',
    email: 'marcus.sterling@visuals.io',
    avatarUrl: null,
    templateUses: 1240,
    likes: 130,
    saves: 62,
    lastActiveAt: '12 minutes ago'
  },
  {
    rank: 2,
    id: 'USR-10295',
    displayName: 'Elena Rostova',
    email: 'elena.r@artstudio.com',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    templateUses: 490,
    likes: 84,
    saves: 45,
    lastActiveAt: '25 minutes ago'
  },
  {
    rank: 3,
    id: 'USR-10298',
    displayName: 'Lucas Dubois',
    email: 'lucas.d@parisphoto.fr',
    avatarUrl: null,
    templateUses: 360,
    likes: 47,
    saves: 29,
    lastActiveAt: '1 hour ago'
  },
  {
    rank: 4,
    id: 'USR-10297',
    displayName: 'Sophia Chen',
    email: 'sophia.chen@designwave.org',
    avatarUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=200&auto=format&fit=crop&q=80',
    templateUses: 215,
    likes: 52,
    saves: 31,
    lastActiveAt: '2 hours ago'
  },
  {
    rank: 5,
    id: 'USR-10294',
    displayName: 'Dhruv Sutariya',
    email: 'dhruv.sutariya@promptoo.ai',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    templateUses: 182,
    likes: 25,
    saves: 18,
    lastActiveAt: 'Just now'
  },
  {
    rank: 6,
    id: 'USR-10300',
    displayName: 'Mateo Rossi',
    email: 'mateo.rossi@milano.it',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    templateUses: 164,
    likes: 31,
    saves: 22,
    lastActiveAt: '3 hours ago'
  },
  {
    rank: 7,
    id: 'USR-10299',
    displayName: 'Aaliyah Khan',
    email: 'aaliyah.k@creativestack.net',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    templateUses: 140,
    likes: 38,
    saves: 19,
    lastActiveAt: '5 hours ago'
  },
  {
    rank: 8,
    id: 'USR-10301',
    displayName: 'Vikram Malhotra',
    email: 'vikram.m@mumbaifilms.in',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    templateUses: 128,
    likes: 19,
    saves: 14,
    lastActiveAt: '8 hours ago'
  },
  {
    rank: 9,
    id: 'USR-10303',
    displayName: 'Kenji Sato',
    email: 'kenji.sato@tokyoai.jp',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    templateUses: 112,
    likes: 22,
    saves: 16,
    lastActiveAt: 'Yesterday'
  },
  {
    rank: 10,
    id: 'USR-10305',
    displayName: 'Camila Rodriguez',
    email: 'camila.r@bogotaart.co',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    templateUses: 98,
    likes: 17,
    saves: 12,
    lastActiveAt: '2 days ago'
  }
];
