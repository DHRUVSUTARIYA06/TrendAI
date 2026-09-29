import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:trend_ai/data/mock_data.dart';
import 'package:trend_ai/providers/app_state.dart';
import 'package:trend_ai/widgets/heart_button.dart';
import 'package:trend_ai/widgets/placeholder_art.dart';
import 'package:trend_ai/widgets/template_card.dart';

class DetailScreen extends StatefulWidget {
  final int? templateId;
  final Map<String, dynamic>? template;

  const DetailScreen({
    super.key,
    this.templateId,
    this.template,
  });

  @override
  State<DetailScreen> createState() => _DetailScreenState();
}

class _DetailScreenState extends State<DetailScreen> {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final appState = context.watch<AppState>();

    // Resolve template data
    final int resolvedId = widget.templateId ?? (widget.template?['id'] as int? ?? 1);
    final templateObj = appState.getTemplateById(resolvedId);

    final title = templateObj?.title ?? (widget.template?['title'] as String? ?? 'Cinematic Rain Portrait');
    final category = templateObj?.category ?? (widget.template?['category'] as String? ?? 'cinematic');
    final description = templateObj?.description ?? (widget.template?['description'] as String? ?? 'Transform your photo with moody cinematic lighting.');
    final usageCount = templateObj?.usageCount ?? (widget.template?['count'] as int? ?? 12400);
    final isTrending = templateObj?.isTrending ?? (widget.template?['isTrending'] as bool? ?? true);
    final imageUrl = templateObj?.imageUrl ?? (widget.template?['imageUrl'] as String?);
    final isSaved = appState.isSaved(resolvedId);

    final categoryObj = appState.categories.firstWhere(
      (c) => c.id.toLowerCase() == category.toLowerCase(),
      orElse: () => appState.categories.first,
    );

    final moreLikeThis = appState.templates
        .where((t) => t.category.toLowerCase() == category.toLowerCase() && t.id != resolvedId)
        .take(6)
        .toList();

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: Stack(
        children: [
          CustomScrollView(
            slivers: [
              SliverToBoxAdapter(
                child: Stack(
                  children: [
                    // Hero Image / Network Image / Placeholder
                    SizedBox(
                      height: 470,
                      width: double.infinity,
                      child: (imageUrl != null && imageUrl.isNotEmpty)
                          ? Image.network(
                              imageUrl,
                              fit: BoxFit.cover,
                              errorBuilder: (_, __, ___) => PlaceholderArt(category: category),
                            )
                          : PlaceholderArt(category: category),
                    ),
                    // Gradient overlay
                    Positioned.fill(
                      child: Container(
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                            colors: [
                              Colors.black.withOpacity(0.5),
                              Colors.transparent,
                              theme.scaffoldBackgroundColor,
                            ],
                            stops: const [0.0, 0.45, 1.0],
                          ),
                        ),
                      ),
                    ),
                    // Back button & Heart
                    Positioned(
                      top: MediaQuery.of(context).padding.top + 8,
                      left: 16,
                      right: 16,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          GestureDetector(
                            onTap: () => Navigator.pop(context),
                            child: Container(
                              width: 40,
                              height: 40,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Colors.black.withOpacity(0.55),
                                border: Border.all(color: Colors.white.withOpacity(0.2)),
                              ),
                              child: const Icon(Icons.arrow_back, color: Colors.white, size: 20),
                            ),
                          ),
                          HeartButton(templateId: resolvedId, size: 40),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              SliverToBoxAdapter(
                child: Transform.translate(
                  offset: const Offset(0, -52),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Badges
                        Row(
                          children: [
                            if (isTrending)
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                                margin: const EdgeInsets.only(right: 8),
                                decoration: BoxDecoration(
                                  color: Colors.white.withOpacity(0.14),
                                  borderRadius: BorderRadius.circular(99),
                                  border: Border.all(color: Colors.white.withOpacity(0.18)),
                                ),
                                child: const Text(
                                  '🔥 Trending',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 11.5,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                              decoration: BoxDecoration(
                                color: Colors.white.withOpacity(0.14),
                                borderRadius: BorderRadius.circular(99),
                                border: Border.all(color: Colors.white.withOpacity(0.18)),
                              ),
                              child: Text(
                                '${categoryObj.emoji} ${categoryObj.name}',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 11.5,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        // Title
                        Text(
                          title,
                          style: GoogleFonts.bricolageGrotesque(
                            fontSize: 32,
                            fontWeight: FontWeight.w800,
                            letterSpacing: -0.8,
                            height: 1.05,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          '${MockData.formatCount(usageCount)} people created this',
                          style: TextStyle(
                            color: theme.colorScheme.onSurface.withOpacity(0.68),
                            fontSize: 14,
                          ),
                        ),
                        const SizedBox(height: 14),
                        Text(
                          description,
                          style: TextStyle(
                            color: theme.colorScheme.onSurface.withOpacity(0.82),
                            fontSize: 15,
                            height: 1.5,
                          ),
                        ),
                        const SizedBox(height: 18),
                        // Save button
                        GestureDetector(
                          onTap: () => appState.toggleSave(resolvedId),
                          child: Container(
                            height: 48,
                            padding: const EdgeInsets.symmetric(horizontal: 18),
                            decoration: BoxDecoration(
                              color: isSaved
                                  ? const Color(0xFFEC4899).withOpacity(0.18)
                                  : theme.colorScheme.onSurface.withOpacity(0.08),
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(
                                color: isSaved
                                    ? const Color(0xFFEC4899).withOpacity(0.5)
                                    : theme.colorScheme.onSurface.withOpacity(0.11),
                              ),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(
                                  isSaved ? Icons.favorite : Icons.favorite_border,
                                  color: isSaved ? const Color(0xFFFF4D8D) : theme.colorScheme.onSurface,
                                  size: 18,
                                ),
                                const SizedBox(width: 8),
                                Text(
                                  isSaved ? 'Saved ❤️' : 'Save ❤️',
                                  style: TextStyle(
                                    fontWeight: FontWeight.w600,
                                    fontSize: 14.5,
                                    color: theme.colorScheme.onSurface,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 28),
                        Text(
                          'More like this',
                          style: GoogleFonts.bricolageGrotesque(
                            fontSize: 18,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        const SizedBox(height: 12),
                        // Horizontal cards
                        SizedBox(
                          height: 180,
                          child: ListView.builder(
                            scrollDirection: Axis.horizontal,
                            itemCount: moreLikeThis.length,
                            itemBuilder: (context, index) {
                              final item = moreLikeThis[index];
                              return Padding(
                                padding: const EdgeInsets.only(right: 10),
                                child: SizedBox(
                                  width: 132,
                                  child: TemplateCard(
                                    templateId: item.id,
                                    title: item.title,
                                    category: item.category,
                                    usageCount: item.usageCount,
                                    imageUrl: item.imageUrl,
                                    ratio: 1.35,
                                    onTap: () {
                                      Navigator.pushReplacement(
                                        context,
                                        MaterialPageRoute(
                                          builder: (_) => DetailScreen(templateId: item.id),
                                        ),
                                      );
                                    },
                                  ),
                                ),
                              );
                            },
                          ),
                        ),
                        const SizedBox(height: 100),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
          // Bottom CTA
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: Container(
              padding: EdgeInsets.only(
                left: 18,
                right: 18,
                top: 12,
                bottom: MediaQuery.of(context).padding.bottom > 0
                    ? MediaQuery.of(context).padding.bottom + 8
                    : 18,
              ),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    theme.scaffoldBackgroundColor.withOpacity(0.0),
                    theme.scaffoldBackgroundColor,
                  ],
                ),
              ),
              child: GestureDetector(
                onTap: () {
                  appState.startCreateFlow(resolvedId, templateObj);
                  Navigator.pushNamed(context, '/upload');
                },
                child: Container(
                  height: 56,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(19),
                    gradient: const LinearGradient(
                      begin: Alignment(-0.7, -0.5),
                      end: Alignment(0.9, 0.5),
                      colors: [Color(0xFF8B5CF6), Color(0xFFEC4899), Color(0xFF60A5FA)],
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xFFEC4899).withOpacity(0.38),
                        blurRadius: 34,
                        offset: const Offset(0, 12),
                      ),
                    ],
                  ),
                  child: const Center(
                    child: Text(
                      'Create This ✨',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16.5,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
