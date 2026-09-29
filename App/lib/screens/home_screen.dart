import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:trend_ai/providers/app_state.dart';
import 'package:trend_ai/widgets/search_bar_widget.dart';
import 'package:trend_ai/widgets/feature_banner.dart';
import 'package:trend_ai/widgets/category_tile.dart';
import 'package:trend_ai/widgets/template_card.dart';
import 'package:trend_ai/screens/detail_screen.dart';
import 'package:trend_ai/screens/gallery_screen.dart';
import 'package:trend_ai/services/api_service.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final appState = context.watch<AppState>();
    final isSearching = appState.searchQuery != null && appState.searchQuery!.isNotEmpty;

    final searchResults = isSearching ? appState.searchTemplates(appState.searchQuery!) : [];

    return Scaffold(
      body: SafeArea(
        bottom: false,
        child: RefreshIndicator(
          onRefresh: () => appState.fetchFromBackend(),
          color: const Color(0xFFEC4899),
          child: ListView(
            padding: const EdgeInsets.only(left: 16, right: 16, top: 16, bottom: 90),
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 38,
                        height: 38,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(12),
                          gradient: const LinearGradient(
                            begin: Alignment(-0.7, -0.5),
                            end: Alignment(0.9, 0.5),
                            colors: [Color(0xFF8B5CF6), Color(0xFFEC4899), Color(0xFF60A5FA)],
                          ),
                        ),
                        child: const Icon(Icons.auto_awesome, color: Colors.white, size: 20),
                      ),
                      const SizedBox(width: 12),
                      Text.rich(
                        TextSpan(
                          text: 'Trend',
                          style: GoogleFonts.bricolageGrotesque(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: theme.colorScheme.onSurface,
                          ),
                          children: [
                            WidgetSpan(
                              child: ShaderMask(
                                shaderCallback: (bounds) => const LinearGradient(
                                  begin: Alignment(-0.7, -0.5),
                                  end: Alignment(0.9, 0.5),
                                  colors: [Color(0xFF8B5CF6), Color(0xFFEC4899), Color(0xFF60A5FA)],
                                ).createShader(bounds),
                                child: Text(
                                  'AI',
                                  style: GoogleFonts.bricolageGrotesque(
                                    fontSize: 24,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      IconButton(
                        icon: Icon(
                          Icons.sync,
                          size: 20,
                          color: appState.isBackendConnected ? const Color(0xFF10B981) : Colors.white60,
                        ),
                        tooltip: 'Sync with MongoDB',
                        onPressed: () async {
                          await appState.fetchFromBackend();
                          if (context.mounted) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text(appState.isBackendConnected
                                    ? '🟢 Connected to MongoDB: ${appState.templates.length} templates synced'
                                    : '🔴 Offline / Cannot reach server (${ApiService.baseUrl})'),
                                duration: const Duration(seconds: 2),
                              ),
                            );
                          }
                        },
                      ),
                      IconButton(
                        icon: const Icon(Icons.dns, size: 20),
                        tooltip: 'Server IP Configuration',
                        onPressed: () => _showServerDialog(context, appState),
                      ),
                      IconButton(
                        icon: Icon(appState.themeMode == ThemeMode.dark ? Icons.light_mode : Icons.dark_mode),
                        onPressed: () {
                          appState.setThemeMode(appState.themeMode == ThemeMode.dark ? ThemeMode.light : ThemeMode.dark);
                        },
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 24),
              Text(
                'Create what\'s trending 🔥',
                style: GoogleFonts.bricolageGrotesque(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                  height: 1.2,
                ),
              ),
              const SizedBox(height: 24),
              const SearchBarWidget(),
              const SizedBox(height: 24),
              if (isSearching)
                // Search results view
                searchResults.isEmpty
                    ? Center(
                        child: Padding(
                          padding: const EdgeInsets.symmetric(vertical: 40),
                          child: Column(
                            children: [
                              const Icon(Icons.search_off, size: 48, color: Colors.grey),
                              const SizedBox(height: 12),
                              Text(
                                'No templates found',
                                style: GoogleFonts.bricolageGrotesque(fontSize: 20, fontWeight: FontWeight.bold),
                              ),
                              const SizedBox(height: 6),
                              const Text('Try a style like Cinematic, Ghibli or Royal.', style: TextStyle(color: Colors.grey)),
                            ],
                          ),
                        ),
                      )
                    : GridView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          childAspectRatio: 0.7,
                          crossAxisSpacing: 16,
                          mainAxisSpacing: 16,
                        ),
                        itemCount: searchResults.length,
                        itemBuilder: (context, index) {
                          final t = searchResults[index];
                          return TemplateCard(
                            templateId: t.id,
                            title: t.title,
                            category: t.category,
                            usageCount: t.usageCount,
                            imageUrl: t.imageUrl,
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (_) => DetailScreen(templateId: t.id, template: {
                                    'id': t.id,
                                    'title': t.title,
                                    'category': t.category,
                                    'count': t.usageCount,
                                    'description': t.description,
                                    'isTrending': t.isTrending,
                                    'prompt': t.prompt,
                                    'imageUrl': t.imageUrl,
                                  }),
                                ),
                              );
                            },
                          );
                        },
                      )
              else
                // Normal home view
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    FeatureBanner(
                      onTap: () {
                        Navigator.push(context, MaterialPageRoute(builder: (_) => const GalleryScreen(categoryId: 'all')));
                      },
                    ),
                    const SizedBox(height: 32),
                    Text(
                      'How it works',
                      style: GoogleFonts.bricolageGrotesque(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 16),
                    SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: [
                          _buildStepCard(context, '1. Pick a trend', 'Browse live styles'),
                          _buildStepCard(context, '2. Add your photo', 'Upload a clear shot'),
                          _buildStepCard(context, '3. Send in ChatGPT', 'Direct creation'),
                        ],
                      ),
                    ),
                    const SizedBox(height: 32),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Categories',
                          style: GoogleFonts.bricolageGrotesque(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          '${appState.categories.length} total',
                          style: GoogleFonts.dmSans(
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: appState.categories.map((cat) => Padding(
                          padding: const EdgeInsets.only(right: 12),
                          child: CategoryTile(
                            categoryName: cat.name,
                            emoji: cat.emoji,
                            onTap: () {
                              Navigator.push(context, MaterialPageRoute(builder: (_) => GalleryScreen(categoryId: cat.id)));
                            },
                          ),
                        )).toList(),
                      ),
                    ),
                    const SizedBox(height: 32),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Popular Templates',
                          style: GoogleFonts.bricolageGrotesque(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        TextButton(
                          onPressed: () {
                            Navigator.push(context, MaterialPageRoute(builder: (_) => const GalleryScreen(categoryId: 'all')));
                          },
                          child: Text(
                            'See all',
                            style: GoogleFonts.dmSans(
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Builder(
                      builder: (context) {
                        final popular = appState.getTrendingTemplates().take(6).toList();
                        return GridView.builder(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 2,
                            childAspectRatio: 0.7,
                            crossAxisSpacing: 16,
                            mainAxisSpacing: 16,
                          ),
                          itemCount: popular.length,
                          itemBuilder: (context, index) {
                            final t = popular[index];
                            return TemplateCard(
                              templateId: t.id,
                              title: t.title,
                              category: t.category,
                              usageCount: t.usageCount,
                              imageUrl: t.imageUrl,
                              isTrending: t.isTrending,
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (_) => DetailScreen(templateId: t.id, template: {
                                      'id': t.id,
                                      'title': t.title,
                                      'category': t.category,
                                      'count': t.usageCount,
                                      'description': t.description,
                                      'isTrending': t.isTrending,
                                      'prompt': t.prompt,
                                      'imageUrl': t.imageUrl,
                                    }),
                                  ),
                                );
                              },
                            );
                          },
                        );
                      },
                    ),
                  ],
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStepCard(BuildContext context, String title, String subtitle) {
    final theme = Theme.of(context);
    return Container(
      width: 140,
      margin: const EdgeInsets.only(right: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: theme.colorScheme.surfaceContainerHighest.withOpacity(0.5),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: GoogleFonts.dmSans(
              fontWeight: FontWeight.bold,
              fontSize: 14,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            subtitle,
            style: GoogleFonts.dmSans(
              color: theme.colorScheme.onSurfaceVariant,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }

  void _showServerDialog(BuildContext context, AppState appState) {
    final controller = TextEditingController(text: ApiService.baseUrl);
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Row(
          children: [
            Icon(Icons.dns, color: Color(0xFF8B5CF6)),
            SizedBox(width: 10),
            Text('Server Connection', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Backend API URL (Your PC\'s Wi-Fi IP):',
              style: TextStyle(fontSize: 13, color: Colors.grey),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: controller,
              decoration: InputDecoration(
                hintText: 'http://192.168.0.106:5000/api',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                isDense: true,
              ),
            ),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: appState.isBackendConnected
                    ? Colors.green.withOpacity(0.12)
                    : Colors.red.withOpacity(0.12),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Row(
                children: [
                  Icon(
                    appState.isBackendConnected ? Icons.check_circle : Icons.error_outline,
                    size: 16,
                    color: appState.isBackendConnected ? Colors.greenAccent : Colors.redAccent,
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      appState.isBackendConnected
                          ? 'Connected (${appState.templates.length} templates from MongoDB)'
                          : 'Not connected to server',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: appState.isBackendConnected ? Colors.greenAccent : Colors.redAccent,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () async {
              ApiService.setBaseUrl(controller.text);
              Navigator.pop(ctx);
              await appState.fetchFromBackend();
              if (context.mounted) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text(appState.isBackendConnected
                        ? '🟢 Connected! Synced ${appState.templates.length} templates from MongoDB.'
                        : '🔴 Could not reach server. Verify PC & phone are on same Wi-Fi.'),
                  ),
                );
              }
            },
            child: const Text('Connect & Sync'),
          ),
        ],
      ),
    );
  }
}
