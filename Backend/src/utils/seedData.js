const Category = require('../models/Category');
const Template = require('../models/Template');

const defaultCategories = [
  { slug: 'trending', name: 'Trending', emoji: '🔥', order: 1 },
  { slug: 'ghibli', name: 'Ghibli Style', emoji: '🎨', order: 2 },
  { slug: 'cinematic', name: 'Cinematic', emoji: '🎬', order: 3 },
  { slug: 'couple', name: 'Couple', emoji: '❤️', order: 4 },
  { slug: 'royal', name: 'Royal', emoji: '👑', order: 5 },
  { slug: 'instagram', name: 'Instagram', emoji: '📸', order: 6 },
  { slug: 'professional', name: 'Professional', emoji: '👔', order: 7 },
  { slug: 'cartoon', name: 'Cartoon', emoji: '🧸', order: 8 },
  { slug: 'travel', name: 'Travel', emoji: '🌆', order: 9 },
  { slug: 'lifestyle', name: 'Lifestyle', emoji: '🏍️', order: 10 },
];

const sampleTemplates = [
  {
    title: 'Cinematic Rain Portrait',
    description: 'A moody rain-soaked street portrait with neon reflections and teal-orange cinematic grading.',
    prompt: 'Transform this photo into a moody rain-soaked street portrait with vibrant neon light reflections, wet pavement, dramatic shadows, and teal-and-orange cinematic color grading. Retain the facial identity and expression from the uploaded photo with ultra-high detail.',
    category: 'cinematic',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    usageCount: 12400,
    isTrending: true,
    tag: 'p',
  },
  {
    title: 'Ghibli Couple',
    description: 'A hand-painted anime couple in a sunlit meadow with soft watercolor clouds.',
    prompt: 'Transform this photo into a Studio Ghibli hand-painted anime style illustration. Depict the subjects standing in a sun-drenched grassy meadow with wildflowers under lush, billowing watercolor clouds and bright blue skies. Maintain key likeness and poses with soft anime features.',
    category: 'ghibli',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
    usageCount: 11800,
    isTrending: true,
    tag: 'c',
  },
  {
    title: 'Luxury Editorial Portrait',
    description: 'A high-end editorial portrait with soft studio light and a glossy magazine finish.',
    prompt: 'Transform this photo into a luxury high-fashion magazine cover portrait. Studio beauty lighting, smooth skin texture, refined elegant wardrobe, neutral studio background with gentle rim lighting. Preserve the exact facial structure, eye shape, and identity.',
    category: 'professional',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    usageCount: 10900,
    isTrending: true,
    tag: 'p',
  },
  {
    title: 'Neon Cyber Glow',
    description: 'A cyberpunk portrait lit by pink and blue neon with holographic reflections.',
    prompt: 'Transform this photo into an intense cyberpunk style portrait. Surround the subject with glowing magenta and cyan neon tubes, subtle holographic UI accents, atmospheric volumetric haze, and futuristic urban city lights reflected in the eyes and skin. Keep identity preserved.',
    category: 'trending',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    usageCount: 9800,
    isTrending: true,
    tag: 'p',
  },
  {
    title: 'Royal King',
    description: 'A regal king portrait with gold armor, a velvet cape, and a grand throne hall.',
    prompt: 'Transform this photo into a magnificent royal king portrait. Dress the subject in intricately engraved gold plate armor, an ermine-trimmed crimson velvet cloak, a gold crown with rubies, standing majestically in an ancient gothic throne room with chandelier candlelight. Keep facial identity recognizable.',
    category: 'royal',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
    usageCount: 9700,
    isTrending: true,
    tag: 'm',
  },
  {
    title: 'Sunset Slow Dance',
    description: 'A slow dance on a beach at sunset with warm glowing skin tones.',
    prompt: 'Transform this photo into a romantic slow dance on a golden beach at sunset. Warm golden hour sunlight filtering through, calm ocean waves washing onto the shore, lens flare, soft bokeh, gentle wind in the hair. Retain natural facial features and warm expressions.',
    category: 'couple',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80',
    usageCount: 9500,
    isTrending: true,
    tag: 'c',
  },
  {
    title: '3D Toy Figure',
    description: 'A glossy 3D toy figure with big eyes, smooth vinyl textures, and toy packaging.',
    prompt: 'Transform the subject in this photo into an adorable designer 3D vinyl collectible figure (Funko/Pop Mart style). Smooth stylized plastic shaders, large expressive eyes, glossy finish, cute proportions, standing inside a collector display box.',
    category: 'cartoon',
    imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=80',
    usageCount: 8100,
    isTrending: true,
    tag: 'p',
  },
  {
    title: '90s Retro Film Snapshot',
    description: 'A 90s film-camera snapshot with flash glare, warm grain, and faded vintage colors.',
    prompt: 'Transform this photo into an authentic 1990s 35mm disposable film snapshot. Direct on-camera flash, subtle lens vignetting, warm analog film grain, vintage color palette with slightly faded shadows. Preserve realistic facial likeness.',
    category: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    usageCount: 8600,
    isTrending: true,
    tag: 'f',
  },
  {
    title: 'Santorini Blue Terrace',
    description: 'A whitewashed Santorini terrace with blue domes and sparkling Aegean sea.',
    prompt: 'Transform this photo into a sunny travel dream in Santorini, Greece. The subject stands on a cliffside whitewashed balcony with bougainvillea flowers, iconic blue church domes, and the crystal blue Aegean Sea under radiant Mediterranean sunshine. Keep facial likeness intact.',
    category: 'travel',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&auto=format&fit=crop&q=80',
    usageCount: 6800,
    isTrending: false,
    tag: 'p',
  },
  {
    title: 'Street Fashion Oversized',
    description: 'A street-style fashion shot with an oversized jacket, city crosswalk, and golden light.',
    prompt: 'Transform this photo into a contemporary streetwear editorial photograph. The subject wears an oversized tailored trench coat with modern street sneakers, walking across a busy city intersection in warm late-afternoon light with city bus blur in the background. Keep likeness intact.',
    category: 'lifestyle',
    imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&auto=format&fit=crop&q=80',
    usageCount: 9100,
    isTrending: true,
    tag: 'm',
  },
];

const seedDatabaseIfEmpty = async () => {
  try {
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      console.log('Seeding initial categories...');
      await Category.insertMany(defaultCategories);
      console.log('Categories seeded successfully.');
    }

    const templateCount = await Template.countDocuments();
    if (templateCount === 0) {
      console.log('Seeding sample templates...');
      await Template.insertMany(sampleTemplates);
      console.log('Sample templates seeded successfully.');
    }
  } catch (error) {
    console.error('Seed error:', error);
  }
};

module.exports = { seedDatabaseIfEmpty, defaultCategories, sampleTemplates };
