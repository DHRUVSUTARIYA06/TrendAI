import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:trend_ai/providers/app_state.dart';

class HeartButton extends StatefulWidget {
  final int templateId;
  final double size;

  const HeartButton({
    super.key,
    required this.templateId,
    this.size = 34.0,
  });

  @override
  State<HeartButton> createState() => _HeartButtonState();
}

class _HeartButtonState extends State<HeartButton> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 200),
    );
    _scaleAnimation = TweenSequence<double>([
      TweenSequenceItem(tween: Tween<double>(begin: 1.0, end: 1.3), weight: 50),
      TweenSequenceItem(tween: Tween<double>(begin: 1.3, end: 1.0), weight: 50),
    ]).animate(CurvedAnimation(parent: _controller, curve: Curves.easeInOut));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _toggleHeart(BuildContext context, AppState state) {
    bool isSaved = state.savedIds.contains(widget.templateId);
    if (!isSaved) {
      _controller.forward(from: 0.0);
    }
    state.toggleSave(widget.templateId);
    
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(isSaved ? 'Removed from saved' : 'Saved to collection!'),
        duration: const Duration(seconds: 2),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AppState>(
      builder: (context, state, child) {
        final isSaved = state.savedIds.contains(widget.templateId);

        return GestureDetector(
          onTap: () => _toggleHeart(context, state),
          child: Container(
            width: widget.size,
            height: widget.size,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: Colors.black.withOpacity(0.4),
              border: Border.all(color: Colors.white.withOpacity(0.2), width: 1),
            ),
            child: Center(
              child: ScaleTransition(
                scale: _scaleAnimation,
                child: Icon(
                  isSaved ? Icons.favorite : Icons.favorite_border,
                  color: isSaved ? const Color(0xFFFF4D8D) : Colors.white,
                  size: widget.size * 0.5,
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
