import 'dart:io';
import 'dart:ui' as ui;
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';

class SampleImageHelper {
  static Future<String> getOrCreateSamplePhoto() async {
    if (kIsWeb) {
      return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80';
    }
    final tempDir = await getTemporaryDirectory();
    final sampleFile = File('${tempDir.path}/trendai_sample_portrait.png');
    if (await sampleFile.exists()) {
      return sampleFile.path;
    }

    final recorder = ui.PictureRecorder();
    final canvas = Canvas(recorder, const Rect.fromLTWH(0, 0, 600, 800));

    // Draw stylish gradient background
    final bgPaint = Paint()
      ..shader = ui.Gradient.linear(
        const Offset(0, 0),
        const Offset(600, 800),
        [const Color(0xFF6B21A8), const Color(0xFFEC4899), const Color(0xFF3B82F6)],
      );
    canvas.drawRect(const Rect.fromLTWH(0, 0, 600, 800), bgPaint);

    // Draw stylized portrait silhouette
    final headPaint = Paint()..color = const Color(0xFFFFDEC9);
    canvas.drawCircle(const Offset(300, 320), 120, headPaint);

    final hairPaint = Paint()..color = const Color(0xFF1E1B4B);
    canvas.drawCircle(const Offset(300, 260), 130, hairPaint);
    canvas.drawCircle(const Offset(300, 320), 120, headPaint);

    // Body
    final bodyPaint = Paint()..color = const Color(0xFF0F172A);
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        const Rect.fromLTWH(160, 430, 280, 370),
        const Radius.circular(80),
      ),
      bodyPaint,
    );

    // Text watermark
    final textPainter = TextPainter(
      text: const TextSpan(
        text: 'TrendAI Sample Portrait',
        style: TextStyle(
          color: Colors.white,
          fontSize: 28,
          fontWeight: FontWeight.bold,
          letterSpacing: 1.2,
        ),
      ),
      textDirection: TextDirection.ltr,
    );
    textPainter.layout(maxWidth: 560);
    textPainter.paint(canvas, Offset(300 - textPainter.width / 2, 720));

    final picture = recorder.endRecording();
    final image = await picture.toImage(600, 800);
    final byteData = await image.toByteData(format: ui.ImageByteFormat.png);
    final bytes = byteData!.buffer.asUint8List();

    await sampleFile.writeAsBytes(bytes);
    return sampleFile.path;
  }
}
