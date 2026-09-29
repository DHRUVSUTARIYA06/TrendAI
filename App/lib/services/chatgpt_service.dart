import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/template_model.dart';
import '../providers/app_state.dart';

class ChatGPTService {
  static const MethodChannel _channel = MethodChannel('com.trendai.app/chatgpt');

  static String generatePrompt(Template template) {
    if (template.prompt != null && template.prompt!.trim().isNotEmpty) {
      return template.prompt!.trim();
    }
    return 'Please transform this photo into: ${template.title}.\n'
        'Style Description: ${template.description}\n'
        'Instructions: Keep the facial likeness, identity, and expressions from the photo intact while applying this template\'s aesthetic, lighting, and mood. Generate in ultra-detailed high resolution.';
  }

  static Future<bool> isChatGPTAppInstalled() async {
    if (kIsWeb || !Platform.isAndroid) return false;
    try {
      final bool? installed = await _channel.invokeMethod<bool>('isChatGPTInstalled');
      return installed ?? false;
    } catch (_) {
      return false;
    }
  }

  /// Directly opens ChatGPT with the photo attached and the prompt pre-filled
  static Future<void> createWithChatGPT({
    required BuildContext context,
    required Template template,
    String? imagePath,
  }) async {
    final prompt = generatePrompt(template);

    // 1. Copy prompt to clipboard so it's always immediately available
    await Clipboard.setData(ClipboardData(text: prompt));

    // 2. Add to generation history
    if (context.mounted) {
      context.read<AppState>().addToHistory(template.id);
    }

    bool openedDirectly = false;

    // 3. Try to open native ChatGPT app on Android with image and prompt
    if (!kIsWeb && Platform.isAndroid) {
      try {
        final bool? result = await _channel.invokeMethod<bool>('openChatGPT', {
          'imagePath': imagePath,
          'prompt': prompt,
        });
        openedDirectly = result == true;
      } catch (e) {
        debugPrint('Direct ChatGPT app launch error: $e');
      }
    }

    if (openedDirectly) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: const Row(
              children: [
                Icon(Icons.check_circle, color: Color(0xFF10B981)),
                SizedBox(width: 10),
                Expanded(
                  child: Text(
                    'ChatGPT opened! Photo & prompt ready — just tap Send ✨',
                    style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600),
                  ),
                ),
              ],
            ),
            backgroundColor: const Color(0xFF1E1B2E),
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            duration: const Duration(seconds: 4),
          ),
        );
      }
      return;
    }

    // 4. Fallback: If ChatGPT app is not installed or on another platform,
    // open ChatGPT web with prompt in query param & inform user
    final Uri webUrl = Uri.parse('https://chatgpt.com/?q=${Uri.encodeComponent(prompt)}');

    try {
      await launchUrl(webUrl, mode: LaunchMode.externalApplication);
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: const Row(
              children: [
                Icon(Icons.content_paste, color: Color(0xFF60A5FA)),
                SizedBox(width: 10),
                Expanded(
                  child: Text(
                    'Prompt copied! Opening ChatGPT (attach photo if needed)',
                    style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600),
                  ),
                ),
              ],
            ),
            backgroundColor: const Color(0xFF1E1B2E),
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            duration: const Duration(seconds: 4),
          ),
        );
      }
    } catch (e) {
      debugPrint('Web launch error: $e');
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Could not open ChatGPT: $e'),
            backgroundColor: Colors.redAccent,
          ),
        );
      }
    }
  }

  /// Fallback option to share image and prompt to any installed app via Android Chooser
  static Future<void> shareGeneral({
    required BuildContext context,
    required Template template,
    String? imagePath,
  }) async {
    final prompt = generatePrompt(template);
    await Clipboard.setData(ClipboardData(text: prompt));

    if (!kIsWeb && Platform.isAndroid) {
      try {
        await _channel.invokeMethod('shareGeneral', {
          'imagePath': imagePath,
          'prompt': prompt,
        });
      } catch (e) {
        debugPrint('Share general error: $e');
      }
    }
  }
}
