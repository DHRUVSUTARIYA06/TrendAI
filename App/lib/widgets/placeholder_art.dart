import 'package:flutter/material.dart';

class PlaceholderArt extends StatelessWidget {
  final String category;
  final Widget? child;
  
  const PlaceholderArt({
    super.key,
    required this.category,
    this.child,
  });

  List<Color> _getCategoryColors() {
    final cat = category.toLowerCase();
    if (cat.contains('trending')) return [const Color(0xFF8B5CF6), const Color(0xFFEC4899)];
    if (cat.contains('ghibli')) return [const Color(0xFF38BDF8), const Color(0xFF34D399)];
    if (cat.contains('cinematic')) return [const Color(0xFF0F766E), const Color(0xFFEA580C)];
    if (cat.contains('couple')) return [const Color(0xFFD946EF), const Color(0xFFF43F5E)];
    if (cat.contains('royal')) return [const Color(0xFF991B1B), const Color(0xFFEAB308)];
    if (cat.contains('instagram')) return [const Color(0xFFFDE047), const Color(0xFFF9A8D4)];
    if (cat.contains('professional')) return [const Color(0xFF64748B), const Color(0xFF3B82F6)];
    if (cat.contains('cartoon')) return [const Color(0xFFEF4444), const Color(0xFFEAB308)];
    if (cat.contains('travel')) return [const Color(0xFF0EA5E9), const Color(0xFF84CC16)];
    if (cat.contains('lifestyle')) return [const Color(0xFFF97316), const Color(0xFF8B5CF6)];
    
    // default
    return [const Color(0xFF6366F1), const Color(0xFFA855F7)];
  }

  IconData _getCategoryIcon() {
    final cat = category.toLowerCase();
    if (cat.contains('trending')) return Icons.local_fire_department;
    if (cat.contains('ghibli')) return Icons.nature;
    if (cat.contains('cinematic')) return Icons.movie;
    if (cat.contains('couple')) return Icons.favorite;
    if (cat.contains('royal')) return Icons.diamond;
    if (cat.contains('instagram')) return Icons.camera_alt;
    if (cat.contains('professional')) return Icons.work;
    if (cat.contains('cartoon')) return Icons.face;
    if (cat.contains('travel')) return Icons.flight;
    if (cat.contains('lifestyle')) return Icons.coffee;
    return Icons.image;
  }

  @override
  Widget build(BuildContext context) {
    final colors = _getCategoryColors();
    
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: colors,
        ),
      ),
      child: Stack(
        fit: StackFit.expand,
        children: [
          // Decorative circles
          Positioned(
            top: -20,
            right: -20,
            child: Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.white.withOpacity(0.1),
              ),
            ),
          ),
          Positioned(
            bottom: -30,
            left: -10,
            child: Container(
              width: 120,
              height: 120,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.black.withOpacity(0.1),
              ),
            ),
          ),
          Center(
            child: Icon(
              _getCategoryIcon(),
              size: 48,
              color: Colors.white.withOpacity(0.5),
            ),
          ),
          if (child != null) child!,
        ],
      ),
    );
  }
}
