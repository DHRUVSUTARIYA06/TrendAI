import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class ChatGPTSheet extends StatelessWidget {
  const ChatGPTSheet({super.key});

  Future<void> _openChatGPT() async {
    final Uri url = Uri.parse('https://chatgpt.com/');
    if (!await launchUrl(url, mode: LaunchMode.externalApplication)) {
      // Fallback
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
      ),
      padding: EdgeInsets.only(
        left: 24,
        right: 24,
        top: 12,
        bottom: MediaQuery.of(context).padding.bottom > 0 ? MediaQuery.of(context).padding.bottom : 24,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Center(
            child: Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: Colors.grey.shade600,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          const SizedBox(height: 24),
          const Text(
            'Almost there',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 24),
          
          _buildListItem('1', 'Prompt copied to your clipboard. Just paste it in ChatGPT.'),
          const SizedBox(height: 16),
          _buildListItem('2', 'Your photo is ready to attach in ChatGPT.'),
          const SizedBox(height: 16),
          _buildListItem('3', 'Send it, and your image is created in your account.'),
          
          const SizedBox(height: 24),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.amber.withOpacity(0.12),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.amber.withOpacity(0.3)),
            ),
            child: const Text(
              'Prototype note: the production app will open ChatGPT with your photo and the prompt already attached.',
              style: TextStyle(color: Colors.amber, fontSize: 12.5, height: 1.4),
            ),
          ),
          const SizedBox(height: 24),
          
          GestureDetector(
            onTap: _openChatGPT,
            child: Container(
              height: 52,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(18),
                gradient: const LinearGradient(
                  begin: Alignment(-0.7, -0.5),
                  end: Alignment(0.9, 0.5),
                  colors: [Color(0xFF8B5CF6), Color(0xFFEC4899), Color(0xFF60A5FA)],
                ),
              ),
              alignment: Alignment.center,
              child: const Text(
                'Open chatgpt.com ↗',
                style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ),
          ),
          const SizedBox(height: 12),
          TextButton(
            onPressed: () {
              Navigator.pop(context); // Close sheet
              Navigator.popUntil(context, (route) => route.isFirst); // Back to root
            },
            child: const Text('Done', style: TextStyle(fontWeight: FontWeight.w600)),
          ),
        ],
      ),
    );
  }

  Widget _buildListItem(String number, String text) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 24,
          height: 24,
          decoration: const BoxDecoration(
            shape: BoxShape.circle,
            gradient: LinearGradient(
              colors: [Color(0xFF8B5CF6), Color(0xFFEC4899)],
            ),
          ),
          child: Center(
            child: Text(
              number,
              style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Text(
            text,
            style: const TextStyle(fontSize: 14, height: 1.4),
          ),
        ),
      ],
    );
  }
}
