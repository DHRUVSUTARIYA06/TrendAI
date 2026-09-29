import 'package:flutter/material.dart';
import 'package:trend_ai/widgets/heart_button.dart';
import 'package:trend_ai/widgets/placeholder_art.dart';

class TemplateCard extends StatelessWidget {
  final int templateId;
  final String title;
  final String category;
  final int usageCount;
  final String? imageUrl;
  final int? rank;
  final bool isTrending;
  final double ratio;
  final VoidCallback onTap;

  const TemplateCard({
    super.key,
    required this.templateId,
    required this.title,
    required this.category,
    required this.usageCount,
    this.imageUrl,
    this.rank,
    this.isTrending = false,
    this.ratio = 1.3,
    required this.onTap,
  });

  Widget _buildRankBadge() {
    List<Color> gradientColors;
    if (rank == 1) {
      gradientColors = [const Color(0xFFFFD700), const Color(0xFFFFA500)]; // Gold
    } else if (rank == 2) {
      gradientColors = [const Color(0xFFE0E0E0), const Color(0xFF9E9E9E)]; // Silver
    } else if (rank == 3) {
      gradientColors = [const Color(0xFFCD7F32), const Color(0xFF8B4513)]; // Bronze
    } else {
      gradientColors = [Colors.black.withOpacity(0.6), Colors.black.withOpacity(0.6)];
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        gradient: LinearGradient(colors: gradientColors),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.white.withOpacity(0.3), width: 1),
      ),
      child: Text(
        '#$rank',
        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
      ),
    );
  }

  Widget _buildTrendingBadge() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF8B5CF6), Color(0xFFEC4899)],
        ),
        borderRadius: BorderRadius.circular(12),
      ),
      child: const Text(
        'Trending',
        style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final hasNetworkImage = imageUrl != null && imageUrl!.isNotEmpty;

    return GestureDetector(
      onTap: onTap,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(22),
        child: AspectRatio(
          aspectRatio: 1 / ratio,
          child: Stack(
            fit: StackFit.expand,
            children: [
              if (hasNetworkImage)
                Image.network(
                  imageUrl!,
                  fit: BoxFit.cover,
                  errorBuilder: (context, error, stackTrace) =>
                      PlaceholderArt(category: category),
                  loadingBuilder: (context, child, loadingProgress) {
                    if (loadingProgress == null) return child;
                    return Container(
                      color: const Color(0xFF191733),
                      child: const Center(
                        child: SizedBox(
                          width: 20,
                          height: 20,
                          child: CircularProgressIndicator(strokeWidth: 2, color: Colors.purpleAccent),
                        ),
                      ),
                    );
                  },
                )
              else
                PlaceholderArt(category: category),

              // Gradient Overlay
              Positioned.fill(
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.transparent,
                        Colors.transparent,
                        Colors.black.withOpacity(0.85),
                      ],
                    ),
                  ),
                ),
              ),
              // Badges
              Positioned(
                top: 12,
                left: 12,
                child: rank != null 
                    ? _buildRankBadge() 
                    : (isTrending ? _buildTrendingBadge() : const SizedBox.shrink()),
              ),
              // Heart Button
              Positioned(
                top: 12,
                right: 12,
                child: HeartButton(templateId: templateId),
              ),
              // Bottom content
              Positioned(
                bottom: 12,
                left: 12,
                right: 12,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '${(usageCount / 1000).toStringAsFixed(1)}K uses',
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.7),
                        fontSize: 12,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text('Create This ✨', style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w600)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
