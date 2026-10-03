/**
 * Promptoo Admin — Centralized Likes & Activity Mock Seed Data
 */

export const INITIAL_ACTIVITIES = [
  {
    id: 'ACT-1001',
    userId: 'USR-10294',
    userName: 'Dhruv Sutariya',
    userEmail: 'dhruv.sutariya@promptoo.ai',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    templateId: 'tpl-02',
    templateName: 'Ghibli Forest Lake',
    templateThumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80',
    category: 'Anime 🎨',
    type: 'like',
    timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(), // 3 mins ago
    status: 'active'
  },
  {
    id: 'ACT-1002',
    userId: 'USR-10296',
    userName: 'Marcus Sterling',
    userEmail: 'marcus.sterling@visuals.io',
    userAvatar: null,
    templateId: 'tpl-01',
    templateName: 'Cyberpunk Neon Street',
    templateThumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=80',
    category: 'Cyberpunk 🌃',
    type: 'use',
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(), // 12 mins ago
    status: 'active'
  },
  {
    id: 'ACT-1003',
    userId: 'USR-10295',
    userName: 'Elena Rostova',
    userEmail: 'elena.r@artstudio.com',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    templateId: 'tpl-03',
    templateName: 'Cinematic Noir 35mm',
    templateThumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&auto=format&fit=crop&q=80',
    category: 'Cinematic 🎬',
    type: 'save',
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 mins ago
    status: 'active'
  },
  {
    id: 'ACT-1004',
    userId: 'USR-10297',
    userName: 'Sophia Chen',
    userEmail: 'sophia.chen@designwave.org',
    userAvatar: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=200&auto=format&fit=crop&q=80',
    templateId: 'tpl-04',
    templateName: 'Ethereal Cloud Kingdom',
    templateThumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80',
    category: 'Fantasy 🐉',
    type: 'like',
    timestamp: new Date(Date.now() - 48 * 60 * 1000).toISOString(), // 48 mins ago
    status: 'active'
  },
  {
    id: 'ACT-1005',
    userId: 'USR-10298',
    userName: 'Lucas Dubois',
    userEmail: 'lucas.d@parisphoto.fr',
    userAvatar: null,
    templateId: 'tpl-02',
    templateName: 'Ghibli Forest Lake',
    templateThumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80',
    category: 'Anime 🎨',
    type: 'use',
    timestamp: new Date(Date.now() - 75 * 60 * 1000).toISOString(), // 1.2h ago
    status: 'active'
  },
  {
    id: 'ACT-1006',
    userId: 'USR-10299',
    userName: 'Aaliyah Khan',
    userEmail: 'aaliyah.k@creativestack.net',
    userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    templateId: 'tpl-05',
    templateName: 'Vaporwave Sunset Highway',
    templateThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    category: 'Abstract 🔮',
    type: 'save',
    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(), // 2h ago
    status: 'active'
  },
  {
    id: 'ACT-1007',
    userId: 'USR-10301',
    userName: 'Vikram Malhotra',
    userEmail: 'vikram.m@mumbaicreative.in',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    templateId: 'tpl-06',
    templateName: 'Renaissance Oil Painting',
    templateThumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=200&auto=format&fit=crop&q=80',
    category: 'Portrait 🖼️',
    type: 'like',
    timestamp: new Date(Date.now() - 3.5 * 3600 * 1000).toISOString(), // 3.5h ago
    status: 'active'
  },
  {
    id: 'ACT-1008',
    userId: 'USR-10300',
    userName: 'Maya Patel',
    userEmail: 'maya.patel@horizon.co',
    userAvatar: null,
    templateId: 'tpl-01',
    templateName: 'Cyberpunk Neon Street',
    templateThumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=80',
    category: 'Cyberpunk 🌃',
    type: 'use',
    timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString(), // 5h ago
    status: 'active'
  },
  {
    id: 'ACT-1009',
    userId: 'USR-10302',
    userName: 'Hannah Schmidt',
    userEmail: 'hannah.s@berlinart.de',
    userAvatar: null,
    templateId: 'tpl-07',
    templateName: 'Minimalist Nordic Interior',
    templateThumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=200&auto=format&fit=crop&q=80',
    category: 'Design 🌿',
    type: 'unlike',
    timestamp: new Date(Date.now() - 8 * 3600 * 1000).toISOString(), // 8h ago
    status: 'active'
  },
  {
    id: 'ACT-1010',
    userId: 'USR-10294',
    userName: 'Dhruv Sutariya',
    userEmail: 'dhruv.sutariya@promptoo.ai',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    templateId: 'tpl-03',
    templateName: 'Cinematic Noir 35mm',
    templateThumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&auto=format&fit=crop&q=80',
    category: 'Cinematic 🎬',
    type: 'use',
    timestamp: new Date(Date.now() - 14 * 3600 * 1000).toISOString(), // 14h ago
    status: 'active'
  },
  {
    id: 'ACT-1011',
    userId: 'USR-10303',
    userName: 'Kenji Sato',
    userEmail: 'kenji.sato@tokyoai.jp',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    templateId: 'tpl-08',
    templateName: 'Neon Samurai Tokyo',
    templateThumbnail: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=80',
    category: 'Anime 🎨',
    type: 'save',
    timestamp: new Date(Date.now() - 20 * 3600 * 1000).toISOString(), // 20h ago
    status: 'inactive'
  },
  {
    id: 'ACT-1012',
    userId: 'USR-10307',
    userName: 'Oliver Hansen',
    userEmail: 'oliver.h@nordiclight.se',
    userAvatar: null,
    templateId: 'tpl-07',
    templateName: 'Minimalist Nordic Interior',
    templateThumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=200&auto=format&fit=crop&q=80',
    category: 'Design 🌿',
    type: 'unsave',
    timestamp: new Date(Date.now() - 26 * 3600 * 1000).toISOString(), // Yesterday
    status: 'suspended'
  },
  {
    id: 'ACT-1013',
    userId: 'USR-10296',
    userName: 'Marcus Sterling',
    userEmail: 'marcus.sterling@visuals.io',
    userAvatar: null,
    templateId: 'tpl-02',
    templateName: 'Ghibli Forest Lake',
    templateThumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80',
    category: 'Anime 🎨',
    type: 'like',
    timestamp: new Date(Date.now() - 32 * 3600 * 1000).toISOString(), // Yesterday
    status: 'active'
  },
  {
    id: 'ACT-1014',
    userId: 'USR-10295',
    userName: 'Elena Rostova',
    userEmail: 'elena.r@artstudio.com',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    templateId: 'tpl-01',
    templateName: 'Cyberpunk Neon Street',
    templateThumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=80',
    category: 'Cyberpunk 🌃',
    type: 'use',
    timestamp: new Date(Date.now() - 40 * 3600 * 1000).toISOString(), // Yesterday
    status: 'active'
  },
  {
    id: 'ACT-1015',
    userId: 'USR-10298',
    userName: 'Lucas Dubois',
    userEmail: 'lucas.d@parisphoto.fr',
    userAvatar: null,
    templateId: 'tpl-03',
    templateName: 'Cinematic Noir 35mm',
    templateThumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&auto=format&fit=crop&q=80',
    category: 'Cinematic 🎬',
    type: 'like',
    timestamp: new Date(Date.now() - 2 * 86400 * 1000).toISOString(), // 2 days ago
    status: 'active'
  },
  {
    id: 'ACT-1016',
    userId: 'USR-10297',
    userName: 'Sophia Chen',
    userEmail: 'sophia.chen@designwave.org',
    userAvatar: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=200&auto=format&fit=crop&q=80',
    templateId: 'tpl-02',
    templateName: 'Ghibli Forest Lake',
    templateThumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80',
    category: 'Anime 🎨',
    type: 'save',
    timestamp: new Date(Date.now() - 3 * 86400 * 1000).toISOString(), // 3 days ago
    status: 'active'
  },
  {
    id: 'ACT-1017',
    userId: 'USR-10299',
    userName: 'Aaliyah Khan',
    userEmail: 'aaliyah.k@creativestack.net',
    userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    templateId: 'tpl-01',
    templateName: 'Cyberpunk Neon Street',
    templateThumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=80',
    category: 'Cyberpunk 🌃',
    type: 'use',
    timestamp: new Date(Date.now() - 4 * 86400 * 1000).toISOString(), // 4 days ago
    status: 'active'
  },
  {
    id: 'ACT-1018',
    userId: 'USR-10301',
    userName: 'Vikram Malhotra',
    userEmail: 'vikram.m@mumbaicreative.in',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    templateId: 'tpl-04',
    templateName: 'Ethereal Cloud Kingdom',
    templateThumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80',
    category: 'Fantasy 🐉',
    type: 'like',
    timestamp: new Date(Date.now() - 5 * 86400 * 1000).toISOString(), // 5 days ago
    status: 'active'
  },
  {
    id: 'ACT-1019',
    userId: 'USR-10294',
    userName: 'Dhruv Sutariya',
    userEmail: 'dhruv.sutariya@promptoo.ai',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    templateId: 'tpl-05',
    templateName: 'Vaporwave Sunset Highway',
    templateThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    category: 'Abstract 🔮',
    type: 'use',
    timestamp: new Date(Date.now() - 6 * 86400 * 1000).toISOString(), // 6 days ago
    status: 'active'
  },
  {
    id: 'ACT-1020',
    userId: 'USR-10296',
    userName: 'Marcus Sterling',
    userEmail: 'marcus.sterling@visuals.io',
    userAvatar: null,
    templateId: 'tpl-03',
    templateName: 'Cinematic Noir 35mm',
    templateThumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&auto=format&fit=crop&q=80',
    category: 'Cinematic 🎬',
    type: 'save',
    timestamp: new Date(Date.now() - 7 * 86400 * 1000).toISOString(), // 7 days ago
    status: 'active'
  },
  {
    id: 'ACT-1021',
    userId: 'USR-10295',
    userName: 'Elena Rostova',
    userEmail: 'elena.r@artstudio.com',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    templateId: 'tpl-06',
    templateName: 'Renaissance Oil Painting',
    templateThumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=200&auto=format&fit=crop&q=80',
    category: 'Portrait 🖼️',
    type: 'use',
    timestamp: new Date(Date.now() - 10 * 86400 * 1000).toISOString(),
    status: 'active'
  },
  {
    id: 'ACT-1022',
    userId: 'USR-10298',
    userName: 'Lucas Dubois',
    userEmail: 'lucas.d@parisphoto.fr',
    userAvatar: null,
    templateId: 'tpl-01',
    templateName: 'Cyberpunk Neon Street',
    templateThumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=80',
    category: 'Cyberpunk 🌃',
    type: 'like',
    timestamp: new Date(Date.now() - 12 * 86400 * 1000).toISOString(),
    status: 'active'
  },
  {
    id: 'ACT-1023',
    userId: 'USR-10300',
    userName: 'Maya Patel',
    userEmail: 'maya.patel@horizon.co',
    userAvatar: null,
    templateId: 'tpl-02',
    templateName: 'Ghibli Forest Lake',
    templateThumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80',
    category: 'Anime 🎨',
    type: 'save',
    timestamp: new Date(Date.now() - 15 * 86400 * 1000).toISOString(),
    status: 'active'
  },
  {
    id: 'ACT-1024',
    userId: 'USR-10302',
    userName: 'Hannah Schmidt',
    userEmail: 'hannah.s@berlinart.de',
    userAvatar: null,
    templateId: 'tpl-03',
    templateName: 'Cinematic Noir 35mm',
    templateThumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&auto=format&fit=crop&q=80',
    category: 'Cinematic 🎬',
    type: 'use',
    timestamp: new Date(Date.now() - 18 * 86400 * 1000).toISOString(),
    status: 'active'
  },
  {
    id: 'ACT-1025',
    userId: 'USR-10294',
    userName: 'Dhruv Sutariya',
    userEmail: 'dhruv.sutariya@promptoo.ai',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    templateId: 'tpl-08',
    templateName: 'Neon Samurai Tokyo',
    templateThumbnail: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=80',
    category: 'Anime 🎨',
    type: 'like',
    timestamp: new Date(Date.now() - 21 * 86400 * 1000).toISOString(),
    status: 'active'
  }
];
