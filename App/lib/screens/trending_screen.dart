import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:trend_ai/providers/app_state.dart';
import 'package:trend_ai/widgets/template_card.dart';
import 'package:trend_ai/screens/detail_screen.dart';

class TrendingScreen extends StatefulWidget {
  const TrendingScreen({super.key});

  @override
  State<TrendingScreen> createState() => _TrendingScreenState();
}

class _TrendingScreenState extends State<TrendingScreen> {
  int _selectedTab = 0; // 0: Today, 1: This Week, 2: Popular
  final List<String> _tabs = ['Today', 'This Week', 'Popular'];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final appState = context.watch<AppState>();

    // Filter templates based on selection
    final allTemplates = List.of(appState.templates);
    if (_selectedTab == 0) {
      allTemplates.sort((a, b) => b.usageCount.compareTo(a.usageCount));
    } else if (_selectedTab == 1) {
      allTemplates.sort((a, b) => (b.usageCount * (0.75 + (b.id % 5) * 0.1)).compareTo(a.usageCount * (0.75 + (a.id % 5) * 0.1)));
    } else {
      allTemplates.sort((a, b) => (b.usageCount * (0.8 + (b.id % 7) * 0.05)).compareTo(a.usageCount * (0.8 + (a.id % 7) * 0.05)));
    }

    final top12 = allTemplates.take(12).toList();

    return Scaffold(
      body: SafeArea(
        bottom: false,
        child: RefreshIndicator(
          onRefresh: () => appState.fetchFromBackend(),
          color: const Color(0xFFEC4899),
          child: ListView(
            padding: const EdgeInsets.only(left: 16, right: 16, top: 16, bottom: 90),
            children: [
              Text(
                '🔥 Trending AI Templates',
                style: GoogleFonts.bricolageGrotesque(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  height: 1.2,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'See what everyone is creating today.',
                style: GoogleFonts.dmSans(
                  fontSize: 16,
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
              const SizedBox(height: 24),
              Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: theme.colorScheme.surfaceContainerHighest.withOpacity(0.5),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Row(
                  children: List.generate(_tabs.length, (index) {
                    final isSelected = _selectedTab == index;
                    return Expanded(
                      child: GestureDetector(
                        onTap: () => setState(() => _selectedTab = index),
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 10),
                          decoration: BoxDecoration(
                            color: isSelected ? theme.colorScheme.surface : Colors.transparent,
                            borderRadius: BorderRadius.circular(12),
                            boxShadow: isSelected
                                ? [
                                    BoxShadow(
                                      color: const Color(0xFFEC4899).withOpacity(0.3),
                                      blurRadius: 8,
                                      offset: const Offset(0, 2),
                                    )
                                  ]
                                : null,
                          ),
                          child: Text(
                            _tabs[index],
                            textAlign: TextAlign.center,
                            style: GoogleFonts.dmSans(
                              fontWeight: FontWeight.bold,
                              color: isSelected ? Colors.white : theme.colorScheme.onSurfaceVariant,
                            ),
                          ),
                        ),
                      ),
                    );
                  }),
                ),
              ),
              const SizedBox(height: 24),
              // Masonry-style two column grid
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      children: List.generate(
                        (top12.length + 1) ~/ 2,
                        (index) {
                          final actualIndex = index * 2;
                          if (actualIndex >= top12.length) return const SizedBox.shrink();
                          final t = top12[actualIndex];
                          return Padding(
                            padding: const EdgeInsets.only(bottom: 16),
                            child: TemplateCard(
                              templateId: t.id,
                              title: t.title,
                              category: t.category,
                              usageCount: t.usageCount,
                              imageUrl: t.imageUrl,
                              rank: actualIndex + 1,
                              ratio: actualIndex % 3 == 0 ? 1.4 : 1.15,
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (_) => DetailScreen(
                                      templateId: t.id,
                                      template: {
                                        'id': t.id,
                                        'title': t.title,
                                        'category': t.category,
                                        'count': t.usageCount,
                                        'description': t.description,
                                        'isTrending': t.isTrending,
                                        'prompt': t.prompt,
                                        'imageUrl': t.imageUrl,
                                      },
                                    ),
                                  ),
                                );
                              },
                            ),
                          );
                        },
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      children: List.generate(
                        top12.length ~/ 2,
                        (index) {
                          final actualIndex = index * 2 + 1;
                          if (actualIndex >= top12.length) return const SizedBox.shrink();
                          final t = top12[actualIndex];
                          return Padding(
                            padding: const EdgeInsets.only(bottom: 16),
                            child: TemplateCard(
                              templateId: t.id,
                              title: t.title,
                              category: t.category,
                              usageCount: t.usageCount,
                              imageUrl: t.imageUrl,
                              rank: actualIndex + 1,
                              ratio: actualIndex % 3 == 0 ? 1.15 : 1.4,
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (_) => DetailScreen(
                                      templateId: t.id,
                                      template: {
                                        'id': t.id,
                                        'title': t.title,
                                        'category': t.category,
                                        'count': t.usageCount,
                                        'description': t.description,
                                        'isTrending': t.isTrending,
                                        'prompt': t.prompt,
                                        'imageUrl': t.imageUrl,
                                      },
                                    ),
                                  ),
                                );
                              },
                            ),
                          );
                        },
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
