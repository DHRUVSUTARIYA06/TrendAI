import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';
import '../data/mock_data.dart';
import '../models/template_model.dart';
import '../providers/app_state.dart';
import '../services/chatgpt_service.dart';
import '../utils/sample_image_helper.dart';
import '../widgets/placeholder_art.dart';

class UploadScreen extends StatefulWidget {
  const UploadScreen({super.key});

  @override
  State<UploadScreen> createState() => _UploadScreenState();
}

class _UploadScreenState extends State<UploadScreen> {
  final ImagePicker _picker = ImagePicker();
  String? _selectedImagePath;
  bool _isSample = false;
  bool _isProcessing = false;

  @override
  void initState() {
    super.initState();
    final appState = context.read<AppState>();
    if (appState.photoPath != null) {
      _selectedImagePath = appState.photoPath;
      _isSample = appState.photoIsSample;
    }
  }

  Future<void> _pickImage(ImageSource source) async {
    try {
      final XFile? image = await _picker.pickImage(
        source: source,
        maxWidth: 1920,
        maxHeight: 1920,
        imageQuality: 90,
      );
      if (image != null) {
        setState(() {
          _selectedImagePath = image.path;
          _isSample = false;
        });
        if (mounted) {
          context.read<AppState>().setPhoto(image.path, isSample: false);
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Could not access image: $e')),
        );
      }
    }
  }

  Future<void> _useSamplePhoto() async {
    setState(() => _isProcessing = true);
    try {
      final samplePath = await SampleImageHelper.getOrCreateSamplePhoto();
      setState(() {
        _selectedImagePath = samplePath;
        _isSample = true;
      });
      if (mounted) {
        context.read<AppState>().setPhoto(samplePath, isSample: true);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to load sample photo: $e')),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _isProcessing = false);
      }
    }
  }

  void _showImageSourceDialog() {
    final theme = Theme.of(context);
    showModalBottomSheet(
      context: context,
      backgroundColor: theme.colorScheme.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
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
                const SizedBox(height: 16),
                const Text(
                  'Choose Photo Source',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 20),
                ListTile(
                  leading: Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: const Color(0xFF8B5CF6).withOpacity(0.15),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Icon(Icons.photo_library, color: Color(0xFF8B5CF6)),
                  ),
                  title: const Text('Choose from Gallery', style: TextStyle(fontWeight: FontWeight.w600)),
                  subtitle: const Text('Pick your best portrait from device photos'),
                  onTap: () {
                    Navigator.pop(ctx);
                    _pickImage(ImageSource.gallery);
                  },
                ),
                const Divider(),
                ListTile(
                  leading: Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: const Color(0xFFEC4899).withOpacity(0.15),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Icon(Icons.camera_alt, color: Color(0xFFEC4899)),
                  ),
                  title: const Text('Take a Photo', style: TextStyle(fontWeight: FontWeight.w600)),
                  subtitle: const Text('Snap a new photo with your camera'),
                  onTap: () {
                    Navigator.pop(ctx);
                    _pickImage(ImageSource.camera);
                  },
                ),
                const Divider(),
                ListTile(
                  leading: Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: const Color(0xFF60A5FA).withOpacity(0.15),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Icon(Icons.auto_awesome, color: Color(0xFF60A5FA)),
                  ),
                  title: const Text('Use Sample Photo', style: TextStyle(fontWeight: FontWeight.w600)),
                  subtitle: const Text('Test instantly with a demo portrait'),
                  onTap: () {
                    Navigator.pop(ctx);
                    _useSamplePhoto();
                  },
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Future<void> _handleCreateWithChatGPT(Template template) async {
    if (_selectedImagePath == null) {
      _showImageSourceDialog();
      return;
    }

    setState(() => _isProcessing = true);

    try {
      await ChatGPTService.createWithChatGPT(
        context: context,
        template: template,
        imagePath: _selectedImagePath,
      );
    } finally {
      if (mounted) {
        setState(() => _isProcessing = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final appState = context.watch<AppState>();

    final template = appState.currentSelectedTemplate ??
        (appState.currentFlowId != null
            ? (appState.getTemplateById(appState.currentFlowId!) ?? MockData.templates.first)
            : MockData.templates.first);

    final hasPhoto = _selectedImagePath != null && _selectedImagePath!.isNotEmpty;

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Upload Your Photo',
              style: GoogleFonts.bricolageGrotesque(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const Text('Step 2 of 2', style: TextStyle(fontSize: 12, color: Colors.grey)),
          ],
        ),
        actions: [
          if (hasPhoto)
            IconButton(
              icon: const Icon(Icons.share_outlined),
              tooltip: 'Share via other apps',
              onPressed: () => ChatGPTService.shareGeneral(
                context: context,
                template: template,
                imagePath: _selectedImagePath,
              ),
            ),
        ],
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Step Indicator (Step 1 -> Step 2)
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _buildStepDot(true, Colors.purple),
                    _buildStepLine(true),
                    _buildStepDot(true, const Color(0xFFEC4899), hasRing: true),
                  ],
                ),
                const SizedBox(height: 24),

                // Upload Area or Photo Preview
                if (!hasPhoto) ...[
                  GestureDetector(
                    onTap: _showImageSourceDialog,
                    child: Container(
                      height: 320,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(28),
                        border: Border.all(
                          color: const Color(0xFFEC4899).withOpacity(0.5),
                          width: 2,
                        ),
                        color: const Color(0xFF8B5CF6).withOpacity(0.08),
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Container(
                            width: 84,
                            height: 84,
                            decoration: BoxDecoration(
                              color: theme.colorScheme.surface,
                              borderRadius: BorderRadius.circular(22),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withOpacity(0.1),
                                  blurRadius: 16,
                                  offset: const Offset(0, 6),
                                ),
                              ],
                            ),
                            child: const Center(
                              child: Text('📸', style: TextStyle(fontSize: 38)),
                            ),
                          ),
                          const SizedBox(height: 18),
                          const Text(
                            'Upload Your Photo',
                            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 6),
                          Text(
                            'Tap to choose from Gallery or Camera',
                            style: TextStyle(color: Colors.grey.shade400, fontSize: 13),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Center(
                    child: TextButton.icon(
                      onPressed: _useSamplePhoto,
                      icon: const Icon(Icons.auto_awesome, size: 18, color: Color(0xFF60A5FA)),
                      label: const Text(
                        'or try with a sample photo',
                        style: TextStyle(color: Color(0xFF60A5FA), fontWeight: FontWeight.w600),
                      ),
                    ),
                  ),
                ] else ...[
                  // Photo Preview Container
                  Container(
                    height: 320,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(28),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.2),
                          blurRadius: 18,
                          offset: const Offset(0, 8),
                        ),
                      ],
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(28),
                      child: Stack(
                        fit: StackFit.expand,
                        children: [
                          // Display image
                          if (kIsWeb)
                            Image.network(
                              _selectedImagePath!,
                              fit: BoxFit.cover,
                              errorBuilder: (_, __, ___) => Container(
                                color: Colors.grey.shade800,
                                child: const Center(child: Icon(Icons.image, size: 64, color: Colors.white54)),
                              ),
                            )
                          else if (File(_selectedImagePath!).existsSync())
                            Image.file(
                              File(_selectedImagePath!),
                              fit: BoxFit.cover,
                            )
                          else
                            Container(
                              color: Colors.grey.shade800,
                              child: const Center(
                                child: Icon(Icons.image, size: 64, color: Colors.white54),
                              ),
                            ),
                          // Badge
                          Positioned(
                            top: 14,
                            right: 14,
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                              decoration: BoxDecoration(
                                color: Colors.black.withOpacity(0.65),
                                borderRadius: BorderRadius.circular(16),
                                border: Border.all(color: Colors.white24, width: 0.8),
                              ),
                              child: Text(
                                _isSample ? '✨ Sample Photo' : '📷 Your Photo',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 12,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: _showImageSourceDialog,
                          icon: const Icon(Icons.refresh, size: 18),
                          label: const Text('Change Photo'),
                          style: OutlinedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(vertical: 14),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      OutlinedButton(
                        onPressed: () {
                          setState(() {
                            _selectedImagePath = null;
                            _isSample = false;
                          });
                          context.read<AppState>().clearPhoto();
                        },
                        style: OutlinedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
                          foregroundColor: Colors.redAccent,
                          side: const BorderSide(color: Colors.redAccent),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                        ),
                        child: const Icon(Icons.delete_outline, size: 20),
                      ),
                    ],
                  ),
                ],
                const SizedBox(height: 24),

                // Selected Template Card
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: theme.colorScheme.surface,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: theme.dividerColor.withOpacity(0.1)),
                  ),
                  child: Row(
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.circular(14),
                        child: SizedBox(
                          width: 58,
                          height: 58,
                          child: (template.imageUrl != null && template.imageUrl!.isNotEmpty)
                              ? Image.network(
                                  template.imageUrl!,
                                  fit: BoxFit.cover,
                                  errorBuilder: (_, __, ___) => PlaceholderArt(category: template.category),
                                )
                              : PlaceholderArt(
                                  category: template.category,
                                ),
                        ),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              template.title,
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                            const SizedBox(height: 4),
                            Text(
                              '${MockData.formatCount(template.usageCount)} creations • ${template.category.toUpperCase()}',
                              style: TextStyle(
                                color: Colors.grey.shade400,
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 120),
              ],
            ),
          ),

          // Bottom Action Button: Direct to ChatGPT
          Positioned(
            left: 20,
            right: 20,
            bottom: MediaQuery.of(context).padding.bottom > 0
                ? MediaQuery.of(context).padding.bottom + 8
                : 20,
            child: GestureDetector(
              onTap: _isProcessing ? null : () => _handleCreateWithChatGPT(template),
              child: Container(
                height: 58,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(29),
                  gradient: const LinearGradient(
                    begin: Alignment(-0.7, -0.5),
                    end: Alignment(0.9, 0.5),
                    colors: [Color(0xFF8B5CF6), Color(0xFFEC4899), Color(0xFF60A5FA)],
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFFEC4899).withOpacity(hasPhoto ? 0.42 : 0.2),
                      blurRadius: 28,
                      offset: const Offset(0, 10),
                    ),
                  ],
                ),
                child: Center(
                  child: _isProcessing
                      ? const SizedBox(
                          width: 24,
                          height: 24,
                          child: CircularProgressIndicator(
                            color: Colors.white,
                            strokeWidth: 2.5,
                          ),
                        )
                      : Text(
                          hasPhoto ? '✨ Create with ChatGPT' : 'Select Photo to Create ✨',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 17,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 0.3,
                          ),
                        ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStepDot(bool active, Color color, {bool hasRing = false}) {
    return Container(
      width: hasRing ? 24 : 16,
      height: hasRing ? 24 : 16,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: hasRing ? Colors.transparent : (active ? color : color.withOpacity(0.3)),
        border: hasRing ? Border.all(color: color, width: 2) : null,
      ),
      child: hasRing
          ? Center(
              child: Container(
                width: 12,
                height: 12,
                decoration: BoxDecoration(shape: BoxShape.circle, color: color),
              ),
            )
          : null,
    );
  }

  Widget _buildStepLine(bool active) {
    return Container(
      width: 48,
      height: 2,
      color: active ? Colors.purple : Colors.grey.shade800,
    );
  }
}
