import '../models/category_model.dart';
import '../models/template_model.dart';

class MockData {
  static const List<Category> categories = [
    Category(id: 'trending', name: 'Trending', emoji: '🔥'),
    Category(id: 'ghibli', name: 'Ghibli Style', emoji: '🎨'),
    Category(id: 'cinematic', name: 'Cinematic', emoji: '🎬'),
    Category(id: 'couple', name: 'Couple', emoji: '❤️'),
    Category(id: 'royal', name: 'Royal', emoji: '👑'),
    Category(id: 'instagram', name: 'Instagram', emoji: '📸'),
    Category(id: 'professional', name: 'Professional', emoji: '👔'),
    Category(id: 'cartoon', name: 'Cartoon', emoji: '🧸'),
    Category(id: 'travel', name: 'Travel', emoji: '🌆'),
    Category(id: 'lifestyle', name: 'Lifestyle', emoji: '🏍️'),
  ];

  static final List<Template> templates = _generateTemplates();

  static const Map<String, List<List<dynamic>>> _raw = {
    'trending': [
      ['Cinematic Rain Portrait', 'a moody rain-soaked street portrait with neon reflections and teal-orange cinematic grading', 'p', 12400],
      ['Luxury Portrait', 'a high-end editorial portrait with soft studio light and a glossy magazine finish', 'p', 10900],
      ['Neon Cyber Glow', 'a cyberpunk portrait lit by pink and blue neon with holographic reflections', 'p', 9800],
      ['Golden Hour Glow', 'a dreamy golden-hour portrait with warm backlight and gentle lens flare', 'f', 9200],
      ['Glass Skin Close-Up', 'a beauty close-up with luminous glass skin, soft pink light and a clean backdrop', 'f', 7600],
      ['Y2K Sparkle', 'a Y2K pop portrait with glitter, chrome details and a hot pink flash', 'f', 6900],
      ['Mirror Selfie Flash', 'a stylish mirror selfie with hard flash, a dark room and moody shadows', 'm', 6100],
      ['Old Money Aesthetic', 'an old-money look with a tailored coat, ivory tones and a classic estate backdrop', 'm', 5800],
    ],
    'ghibli': [
      ['Ghibli Couple', 'a hand-painted anime couple in a sunlit meadow with soft watercolor clouds', 'c', 11800],
      ['Meadow Walk', 'a gentle hand-painted walk through rolling green hills under towering clouds', 'p', 8800],
      ['Sky Picnic', 'a cozy picnic on a grassy cliff above a painted sea of clouds', 'c', 6400],
      ['Spirit Forest', 'a glowing forest path with drifting light orbs and lush hand-painted leaves', 'f', 5200],
      ['Cloud Rider', 'a dreamy scene of riding the breeze above a painted village and bright summer sky', 'm', 4900],
      ['Seaside Train', 'a quiet train ride across shallow water at sunset in a soft anime style', 'p', 4300],
      ['Cozy Kitchen Morning', 'a warm hand-painted kitchen with morning light, steam and wildflowers', 'f', 3600],
      ['Sunny Village', 'a sun-drenched hillside village with laundry lines and blooming gardens', 'p', 3100],
    ],
    'cinematic': [
      ['Cinematic Street Portrait', 'a cinematic urban portrait with dramatic lighting, realistic details and a premium movie-style look', 'p', 8200],
      ['Cinematic Rain', 'a rainy-night city scene with glowing signs and a lone figure in the downpour', 'p', 9300],
      ['Noir Detective', 'a black-and-white noir portrait with venetian-blind shadows and drifting smoke', 'm', 6200],
      ['Desert Western', 'a dusty desert western close-up with warm sunset grading', 'm', 4700],
      ['Sci-Fi Hero', 'a cinematic sci-fi hero shot with volumetric fog and strong rim light', 'p', 5600],
      ['Midnight Drive', 'a night drive scene with dashboard glow and streaking city lights', 'p', 5100],
      ['Premiere Night', 'a red-carpet premiere shot with camera flashes and cinematic depth', 'f', 3900],
      ['Snowbound Drama', 'a snowy cinematic close-up with visible breath and muted teal tones', 'f', 3400],
    ],
    'couple': [
      ['Sunset Slow Dance', 'a slow dance on a beach at sunset with warm, glowing skin tones', 'c', 9500],
      ['Paris Rooftop', 'a romantic Paris rooftop evening with the tower glowing in the distance', 'c', 7800],
      ['Wedding Bloom', 'a wedding portrait surrounded by soft flowers and drifting petals', 'c', 6900],
      ['Rainy Umbrella Date', 'a shared umbrella on a rainy street with reflective pavement and neon signs', 'c', 6000],
      ['Beach Bonfire', 'a beach bonfire at dusk with sparks and a deep blue sky', 'c', 5200],
      ['Winter Cabin', 'a cozy winter cabin scene with a fireplace glow and falling snow outside', 'c', 4400],
      ['Vintage Film Couple', 'a vintage 35mm film portrait with warm grain and faded colors', 'c', 3900],
      ['Starry Rooftop', 'a rooftop under a huge night sky filled with stars and city lights', 'c', 3300],
    ],
    'royal': [
      ['Royal King', 'a regal king portrait with gold armor, a velvet cape and a grand throne hall', 'm', 9700],
      ['Queen of Gold', 'a golden queen portrait with a jeweled crown and a shimmering gown', 'f', 8400],
      ['Palace Ball', 'a royal couple at a candlelit palace ball with marble floors and chandeliers', 'c', 6100],
      ['Emerald Empress', 'an empress in emerald silk with gold embroidery and a jeweled tiara', 'f', 5300],
      ['Ancient Emperor', 'an ancient emperor in ornate ceremonial robes inside a lantern-lit hall', 'm', 4800],
      ['Velvet Throne', 'a dramatic portrait seated on a velvet throne with rich burgundy drapes', 'p', 4200],
      ['Knight of Dawn', 'a knight in polished armor at sunrise with a flowing cloak', 'm', 3700],
      ['Crystal Princess', 'a princess in a crystal-beaded gown with a delicate glass tiara', 'f', 3300],
    ],
    'instagram': [
      ['90s Retro', 'a 90s film-camera snapshot with flash glare, warm grain and faded colors', 'f', 8600],
      ['Pastel Dream', 'a soft pastel portrait with a lavender-pink backdrop and airy lighting', 'f', 7100],
      ['Sunset Sunglasses', 'a sunny portrait with bold sunglasses, warm haze and a golden glow', 'p', 6600],
      ['Café Aesthetic', 'a bright café window portrait with latte art, linen and morning light', 'f', 5900],
      ['Soft Film Grain', 'a muted portrait with soft film grain, gentle shadows and a matte finish', 'p', 5100],
      ['Polaroid Summer', 'an instant-photo look with a white border, summer light and a light leak', 'p', 4600],
      ['Balloon Pop', 'a playful portrait surrounded by bright balloons on a pastel backdrop', 'f', 3800],
      ['Minimal White Studio', 'a clean minimal portrait on a white studio backdrop with soft shadows', 'p', 3300],
    ],
    'professional': [
      ['Executive Headshot', 'a polished executive headshot with a tailored suit and a soft grey backdrop', 'p', 7400],
      ['Studio Grey Portrait', 'a classic studio portrait with a charcoal jacket and gentle rim light', 'm', 6300],
      ['Startup Founder', 'a confident founder portrait in a bright modern office with smart casual clothing', 'p', 5600],
      ['LinkedIn Bright', 'a friendly, bright profile photo with natural light and a blurred office background', 'f', 5300],
      ['Creative Director', 'a creative director portrait with a stylish jacket and a warm studio backdrop', 'p', 4200],
      ['Modern Doctor', 'a trustworthy medical professional portrait in a crisp white coat', 'p', 3600],
      ['Lawyer Classic', 'a distinguished portrait in a dark suit with a library backdrop', 'm', 3200],
      ['Speaker Stage', 'a keynote speaker portrait on a dark stage with a soft spotlight', 'p', 2900],
    ],
    'cartoon': [
      ['3D Toy Figure', 'a glossy 3D toy figure with big eyes, smooth shapes and a packaging-style backdrop', 'p', 8100],
      ['Pixel Hero', 'a retro pixel-art hero sprite on a colorful arcade backdrop', 'm', 6200],
      ['Comic Book Cover', 'a comic book cover with bold ink lines, halftone dots and dramatic action', 'p', 5400],
      ['Chibi Sticker', 'a cute chibi sticker with a thick white outline and pastel colors', 'f', 5000],
      ['Clay Animation', 'a hand-crafted clay animation character with fingerprints and a tiny set', 'p', 4300],
      ['Cartoon Superhero', 'a bright cartoon superhero with a flowing cape over a city skyline', 'm', 3900],
      ['Storybook Character', 'a whimsical storybook illustration with soft watercolor textures', 'f', 3400],
      ['Retro Cartoon', 'a 1930s rubber-hose cartoon character with vintage grain', 'p', 3000],
    ],
    'travel': [
      ['Santorini Blue', 'a whitewashed Santorini terrace with blue domes and a sparkling sea', 'p', 6800],
      ['Tokyo Neon Night', 'a rainy Tokyo alley at night with glowing signs and lanterns', 'p', 6400],
      ['Swiss Alps Trek', 'a crisp alpine trek with snowy peaks, a red jacket and a clear blue sky', 'p', 5100],
      ['Bali Sunrise', 'a Bali rice terrace at sunrise with soft mist and golden light', 'f', 4700],
      ['Desert Safari', 'a desert safari at golden hour with rolling dunes and a scarf in the wind', 'm', 4100],
      ['Venice Canal', 'a romantic Venice canal scene with a gondola and pastel buildings', 'c', 3800],
      ['New York Skyline', 'a rooftop view of the New York skyline at dusk', 'p', 3500],
      ['Northern Lights', 'a glowing aurora over a snowy landscape with a warm winter coat', 'p', 3200],
    ],
    'lifestyle': [
      ['Street Fashion', 'a street-style fashion shot with an oversized jacket, city crosswalk and golden hour light', 'm', 9100],
      ['Morning Coffee Run', 'a candid morning coffee run with steam, soft sun and city bustle', 'f', 5800],
      ['Gym Motivation', 'a powerful gym portrait with dramatic side light and chalk in the air', 'm', 5400],
      ['Rooftop Sunset', 'a relaxed rooftop hangout at sunset with string lights and a skyline', 'p', 4900],
      ['Motorbike Ride', 'a motorbike ride on an open road with a leather jacket and a golden sky', 'm', 4600],
      ['Cozy Bookshop', 'a cozy bookshop portrait among tall shelves with warm lamplight', 'f', 3700],
      ['Sneaker Drop', 'a sneaker campaign shot with bold color blocking and a low angle', 'm', 3500],
      ['Weekend Market', 'a sunny weekend market stroll with flowers, baskets and a linen outfit', 'f', 3000],
    ],
  };

  static List<Template> _generateTemplates() {
    final List<Template> list = [];
    int idCounter = 1;
    final now = DateTime.now().millisecondsSinceEpoch ~/ 1000;

    for (int ci = 0; ci < categories.length; ci++) {
      final cat = categories[ci];
      final rawList = _raw[cat.id] ?? [];
      for (final item in rawList) {
        final title = item[0] as String;
        final phrase = item[1] as String;
        final tag = item[2] as String;
        final usage = item[3] as int;

        list.add(Template(
          id: idCounter,
          title: title,
          category: cat.id,
          categoryIndex: ci,
          tag: tag,
          description: 'Turn your photo into $phrase.',
          usageCount: usage,
          isTrending: usage >= 8000,
          added: now - (idCounter * 86400),
        ));
        idCounter++;
      }
    }
    return list;
  }

  static String formatCount(int n) {
    if (n >= 1000000) {
      return '${(n / 1000000).toStringAsFixed(1).replaceAll(RegExp(r'\.0$'), '')}M';
    } else if (n >= 1000) {
      return '${(n / 1000).toStringAsFixed(1).replaceAll(RegExp(r'\.0$'), '')}K';
    }
    return n.toString();
  }

  static List<Template> getTemplatesByCategory(String categoryId) {
    if (categoryId == 'all') return templates;
    if (categoryId == 'trending') {
      return templates.where((t) => t.isTrending).toList();
    }
    return templates.where((t) => t.category == categoryId).toList();
  }

  static List<Template> searchTemplates(String query) {
    if (query.isEmpty) return templates;
    final q = query.toLowerCase().trim();
    return templates.where((t) {
      final cat = categories.firstWhere((c) => c.id == t.category, orElse: () => const Category(id: '', name: '', emoji: ''));
      return t.title.toLowerCase().contains(q) ||
          cat.name.toLowerCase().contains(q) ||
          t.description.toLowerCase().contains(q);
    }).toList();
  }

  static List<Template> getTrendingTemplates() {
    return List<Template>.from(templates)..sort((a, b) => b.usageCount.compareTo(a.usageCount));
  }

  static Template? getTemplateById(int id) {
    try {
      return templates.firstWhere((t) => t.id == id);
    } catch (_) {
      return templates.isNotEmpty ? templates.first : null;
    }
  }
}
