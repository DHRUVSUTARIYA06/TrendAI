import 'package:flutter/material.dart';
import 'chatgpt_sheet.dart';

class ConfirmScreen extends StatefulWidget {
  const ConfirmScreen({super.key});

  @override
  State<ConfirmScreen> createState() => _ConfirmScreenState();
}

class _ConfirmScreenState extends State<ConfirmScreen> {
  bool _promptPrepared = false;
  bool _showAllChecks = false;

  @override
  void initState() {
    super.initState();
    _animateChecks();
  }

  Future<void> _animateChecks() async {
    await Future.delayed(const Duration(milliseconds: 500));
    setState(() => _showAllChecks = true);
    await Future.delayed(const Duration(milliseconds: 900));
    if (mounted) setState(() => _promptPrepared = true);
  }

  void _openChatGPT() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => const ChatGPTSheet(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Create with ChatGPT', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
      ),
      body: Stack(
        children: [
          Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Visualization
                  SizedBox(
                    height: 200,
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        Transform.translate(
                          offset: const Offset(-40, 0),
                          child: Transform.rotate(
                            angle: -0.1, // ~ -6 degrees
                            child: Container(
                              width: 132,
                              height: 178,
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(24),
                                color: Colors.grey.shade800,
                                border: Border.all(color: Colors.white24, width: 2),
                              ),
                            ),
                          ),
                        ),
                        Transform.translate(
                          offset: const Offset(40, 0),
                          child: Transform.rotate(
                            angle: 0.1, // ~ 6 degrees
                            child: Container(
                              width: 132,
                              height: 178,
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(24),
                                color: Colors.deepPurple,
                                border: Border.all(color: Colors.white24, width: 2),
                              ),
                            ),
                          ),
                        ),
                        Container(
                          width: 48,
                          height: 48,
                          decoration: const BoxDecoration(
                            shape: BoxShape.circle,
                            gradient: LinearGradient(
                              colors: [Color(0xFF8B5CF6), Color(0xFFEC4899)],
                            ),
                          ),
                          child: const Icon(Icons.add, color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 40),
                  
                  const Text('Ready to Create', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 16),
                  Text(
                    'We\'ll open ChatGPT with your photo and the selected prompt.',
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.grey.shade400, fontSize: 16),
                  ),
                  const SizedBox(height: 40),
                  
                  // Checklist
                  if (_showAllChecks) ...[
                    _buildCheckItem('✓ Photo selected'),
                    const SizedBox(height: 16),
                    _buildCheckItem('✓ Template selected'),
                    const SizedBox(height: 16),
                    _buildCheckItem(
                      _promptPrepared ? '✓ Prompt prepared' : '⏳ Preparing prompt...',
                      isComplete: _promptPrepared,
                    ),
                  ],
                  const SizedBox(height: 120),
                ],
              ),
            ),
          ),
          
          // Bottom CTA
          Positioned(
            left: 24,
            right: 24,
            bottom: MediaQuery.of(context).padding.bottom > 0 ? MediaQuery.of(context).padding.bottom : 24,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                GestureDetector(
                  onTap: _promptPrepared ? _openChatGPT : null,
                  child: Opacity(
                    opacity: _promptPrepared ? 1.0 : 0.5,
                    child: Container(
                      height: 56,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(28),
                        gradient: const LinearGradient(
                          begin: Alignment(-0.7, -0.5),
                          end: Alignment(0.9, 0.5),
                          colors: [Color(0xFF8B5CF6), Color(0xFFEC4899), Color(0xFF60A5FA)],
                        ),
                      ),
                      child: const Center(
                        child: Text(
                          'Open ChatGPT →',
                          style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  'Your image will be generated in your ChatGPT account.',
                  style: TextStyle(color: Colors.grey.shade500, fontSize: 12),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCheckItem(String text, {bool isComplete = true}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          width: 24,
          height: 24,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: isComplete
                ? const LinearGradient(colors: [Color(0xFF8B5CF6), Color(0xFFEC4899)])
                : null,
            color: !isComplete ? Colors.grey.shade800 : null,
          ),
          child: Icon(
            isComplete ? Icons.check : Icons.hourglass_bottom,
            color: Colors.white,
            size: 14,
          ),
        ),
        const SizedBox(width: 12),
        Text(
          text,
          style: TextStyle(
            fontSize: 16,
            color: isComplete ? Colors.white : Colors.grey.shade400,
            fontWeight: isComplete ? FontWeight.bold : FontWeight.normal,
          ),
        ),
      ],
    );
  }
}
