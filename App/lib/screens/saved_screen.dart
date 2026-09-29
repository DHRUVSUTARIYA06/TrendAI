import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:trend_ai/providers/app_state.dart';
import 'package:trend_ai/widgets/template_card.dart';
import 'package:trend_ai/data/mock_data.dart';
import 'package:trend_ai/screens/detail_screen.dart';

class SavedScreen extends StatelessWidget {
  const SavedScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final appState = context.watch<AppState>();
    final saved = MockData.templates.where((t) => appState.savedIds.contains(t.id)).toList();
    final savedCount = saved.length;

    return Scaffold(
      body: SafeArea(
        bottom: false,
        child: savedCount == 0
            ? _buildEmptyState(context, theme)
            : ListView(
                padding: const EdgeInsets.only(left: 16, right: 16, top: 16, bottom: 90),
                children: [
                  Text(
                    '❤️ Saved Templates',
                    style: GoogleFonts.bricolageGrotesque(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      height: 1.2,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '$savedCount template${savedCount == 1 ? '' : 's'} saved',
                    style: GoogleFonts.dmSans(
                      fontSize: 16,
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                  const SizedBox(height: 24),
                  GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      childAspectRatio: 0.7,
                      crossAxisSpacing: 16,
                      mainAxisSpacing: 16,
                    ),
                    itemCount: savedCount,
                    itemBuilder: (context, index) {
                      final t = saved[index];
                      return TemplateCard(
                        templateId: t.id,
                        title: t.title,
                        category: t.category,
                        usageCount: t.usageCount,
                        isTrending: t.isTrending,
                        onTap: () {
                          Navigator.push(context, MaterialPageRoute(builder: (_) => DetailScreen(templateId: t.id)));
                        },
                      );
                    },
                  ),
                ],
              ),
      ),
    );
  }

  Widget _buildEmptyState(BuildContext context, ThemeData theme) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                color: theme.colorScheme.surfaceContainerHighest,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.favorite_border_rounded,
                size: 40,
                color: Colors.grey,
              ),
            ),
            const SizedBox(height: 24),
            Text(
              'Save templates you love.',
              style: GoogleFonts.bricolageGrotesque(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            Text(
              'Your favorite AI trends will appear here.',
              style: GoogleFonts.dmSans(
                fontSize: 16,
                color: theme.colorScheme.onSurfaceVariant,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: () {
                // Return to home or navigate
              },
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                backgroundColor: theme.colorScheme.primary,
                foregroundColor: theme.colorScheme.onPrimary,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                ),
              ),
              child: Text(
                'Browse trending',
                style: GoogleFonts.dmSans(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
