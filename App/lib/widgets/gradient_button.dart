import 'package:flutter/material.dart';

class GradientButton extends StatefulWidget {
  final String label;
  final VoidCallback? onPressed;
  final IconData? icon;
  final bool disabled;

  const GradientButton({
    super.key,
    required this.label,
    this.onPressed,
    this.icon,
    this.disabled = false,
  });

  @override
  State<GradientButton> createState() => _GradientButtonState();
}

class _GradientButtonState extends State<GradientButton> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 100),
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.95).animate(_controller);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: widget.disabled ? null : (_) => _controller.forward(),
      onTapUp: widget.disabled ? null : (_) {
        _controller.reverse();
        widget.onPressed?.call();
      },
      onTapCancel: widget.disabled ? null : () => _controller.reverse(),
      child: ScaleTransition(
        scale: _scaleAnimation,
        child: Opacity(
          opacity: widget.disabled ? 0.38 : 1.0,
          child: Container(
            width: double.infinity,
            height: 56,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(19),
              gradient: widget.disabled
                  ? null
                  : const LinearGradient(
                      begin: Alignment(-0.7, -0.5),
                      end: Alignment(0.9, 0.5),
                      colors: [Color(0xFF8B5CF6), Color(0xFFEC4899), Color(0xFF60A5FA)],
                    ),
              color: widget.disabled ? Colors.grey.shade800 : null,
              boxShadow: widget.disabled
                  ? []
                  : [
                      BoxShadow(
                        color: const Color(0xFFEC4899).withOpacity(0.4),
                        blurRadius: 15,
                        offset: const Offset(0, 8),
                      ),
                    ],
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (widget.icon != null) ...[
                  Icon(widget.icon, color: Colors.white, size: 20),
                  const SizedBox(width: 8),
                ],
                Text(
                  widget.label,
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 16.5,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
