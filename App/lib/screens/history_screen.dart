import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:trend_ai/data/mock_data.dart';
import 'package:trend_ai/providers/app_state.dart';
import 'package:trend_ai/screens/detail_screen.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = context.watch<AppState>();
    final history = appState.history;

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('History', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            Text('Templates you\'ve sent to ChatGPT', style: TextStyle(fontSize: 12, color: Colors.grey.shade400)),
          ],
        ),
      ),
      body: history.isNotEmpty
          ? ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: history.length,
              itemBuilder: (context, index) {
                final item = history[index];
                final templateId = item['templateId'] as int? ?? 1;
                final template = MockData.getTemplateById(templateId);

                return GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => DetailScreen(templateId: templateId),
                      ),
                    );
                  },
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Theme.of(context).colorScheme.surface,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: Theme.of(context).colorScheme.outlineVariant.withOpacity(0.3)),
                    ),
                    child: Row(
                      children: [
                        Container(
                          width: 56,
                          height: 70,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(14),
                            gradient: const LinearGradient(
                              colors: [Color(0xFF8B5CF6), Color(0xFFEC4899)],
                            ),
                          ),
                          child: const Center(
                            child: Icon(Icons.auto_awesome, color: Colors.white, size: 24),
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                template?.title ?? 'AI Template',
                                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                '${template?.category ?? "Trending"} · Recently created',
                                style: TextStyle(color: Colors.grey.shade400, fontSize: 13),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            )
          : Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.history, size: 64, color: Colors.grey.shade700),
                  const SizedBox(height: 16),
                  Text('No history yet', style: TextStyle(color: Colors.grey.shade400, fontSize: 18)),
                  const SizedBox(height: 6),
                  const Text('Templates you create will show up here.', style: TextStyle(color: Colors.grey)),
                ],
              ),
            ),
    );
  }
}
