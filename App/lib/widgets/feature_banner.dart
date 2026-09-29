import 'package:flutter/material.dart';
import 'package:trend_ai/widgets/gradient_button.dart';

class FeatureBanner extends StatelessWidget {
  final VoidCallback onTap;

  const FeatureBanner({
    super.key,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 348,
        width: double.infinity,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(30),
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF2A1B54), Color(0xFF1F113D)],
          ),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(30),
          child: Stack(
            fit: StackFit.expand,
            children: [
              // Radial Glow
              Positioned(
                top: -50,
                right: -50,
                child: Container(
                  width: 200,
                  height: 200,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xFFEC4899).withOpacity(0.3),
                        blurRadius: 100,
                        spreadRadius: 50,
                      ),
                    ],
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(24.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Badge
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Text(
                        'TRENDING TODAY',
                        style: TextStyle(
                          color: Color(0xFFF9A8D4),
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          letterSpacing: 1.2,
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    // Title
                    const Text(
                      '80 Viral AI\nTemplates',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 32,
                        fontWeight: FontWeight.w900,
                        height: 1.1,
                      ),
                    ),
                    const Spacer(),
                    // Collage effect (placeholder)
                    SizedBox(
                      height: 100,
                      child: Stack(
                        children: [
                          Positioned(
                            left: 40,
                            child: _buildPreviewCard(const Color(0xFF3B82F6), -0.1),
                          ),
                          Positioned(
                            left: 20,
                            child: _buildPreviewCard(const Color(0xFFEC4899), 0.0),
                          ),
                          Positioned(
                            left: 0,
                            child: _buildPreviewCard(const Color(0xFF8B5CF6), 0.1),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),
                    // Button
                    GradientButton(
                      label: 'Explore 80 Templates →',
                      onPressed: onTap,
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

  Widget _buildPreviewCard(Color color, double rotation) {
    return Transform.rotate(
      angle: rotation,
      child: Container(
        width: 70,
        height: 90,
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.white, width: 2),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.2),
              blurRadius: 8,
              offset: const Offset(0, 4),
            ),
          ],
        ),
      ),
    );
  }
}
