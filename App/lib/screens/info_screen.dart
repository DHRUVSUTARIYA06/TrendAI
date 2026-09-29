import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class InfoScreen extends StatelessWidget {
  final String type; // 'privacy', 'terms', or 'about'

  const InfoScreen({super.key, this.type = 'about'});

  @override
  Widget build(BuildContext context) {
    String title = '';
    Widget content = const SizedBox();

    switch (type) {
      case 'privacy':
        title = 'Privacy Policy';
        content = _buildPrivacyContent();
        break;
      case 'terms':
        title = 'Terms of Service';
        content = _buildTermsContent();
        break;
      case 'about':
      default:
        title = 'About TrendAI';
        content = _buildAboutContent();
        break;
    }

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          title,
          style: GoogleFonts.bricolageGrotesque(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: content,
      ),
    );
  }

  Widget _buildPrivacyContent() {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Your Photo Stays With You',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 8),
        Text(
          'TrendAI operates entirely on your device. We do not upload your photos to any remote server or train AI models on your personal images. Your photos remain in your local device storage until you choose to send them to ChatGPT.',
          style: TextStyle(color: Colors.grey, height: 1.5),
        ),
        SizedBox(height: 24),
        Text(
          'What We Store',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 8),
        Text(
          'Only your saved template preferences and creation history are stored locally on your device so that you can easily revisit your favorites. You can clear this data at any time from your device settings.',
          style: TextStyle(color: Colors.grey, height: 1.5),
        ),
        SizedBox(height: 24),
        Text(
          'Advertisements',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 8),
        Text(
          'Ads shown within the app are strictly governed by Google AdMob privacy and family safety policies.',
          style: TextStyle(color: Colors.grey, height: 1.5),
        ),
      ],
    );
  }

  Widget _buildTermsContent() {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Terms of Service',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 8),
        Text(
          'By using TrendAI, you agree to discover, copy, and create AI-based photo transformations responsibly. TrendAI provides crafted text prompts designed for image generation models in ChatGPT.',
          style: TextStyle(color: Colors.grey, height: 1.5),
        ),
        SizedBox(height: 24),
        Text(
          'Content Rights & Responsibilities',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 8),
        Text(
          'You must hold the necessary rights to any photo you upload and process with external AI services. Please respect privacy, likeness rights, and third-party terms of service.',
          style: TextStyle(color: Colors.grey, height: 1.5),
        ),
      ],
    );
  }

  Widget _buildAboutContent() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ShaderMask(
          shaderCallback: (bounds) => const LinearGradient(
            colors: [Color(0xFF8B5CF6), Color(0xFFEC4899), Color(0xFF60A5FA)],
          ).createShader(bounds),
          child: Text(
            'TrendAI',
            style: GoogleFonts.bricolageGrotesque(
              fontSize: 32,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ),
        const SizedBox(height: 8),
        const Text(
          'Discover. Copy. Create.',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: Color(0xFFEC4899)),
        ),
        const SizedBox(height: 16),
        const Text(
          'TrendAI is your discovery launchpad for viral AI photo styles. Browse curated templates across Cinematic, Ghibli, Royal, Anime, and more. Attach your portrait, copy the prompt, and create stunning visual art directly in your ChatGPT account.',
          style: TextStyle(color: Colors.grey, height: 1.5),
        ),
        const SizedBox(height: 24),
        const Text(
          'Version 1.0.0',
          style: TextStyle(color: Colors.grey, fontSize: 13),
        ),
      ],
    );
  }
}
