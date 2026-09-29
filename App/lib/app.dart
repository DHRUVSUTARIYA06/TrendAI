import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:trend_ai/theme/app_theme.dart';
import 'package:trend_ai/providers/app_state.dart';
import 'package:trend_ai/screens/main_shell.dart';
import 'package:trend_ai/screens/detail_screen.dart';
import 'package:trend_ai/screens/gallery_screen.dart';
import 'package:trend_ai/screens/upload_screen.dart';
import 'package:trend_ai/screens/confirm_screen.dart';
import 'package:trend_ai/screens/history_screen.dart';
import 'package:trend_ai/screens/info_screen.dart';

class TrendAIApp extends StatelessWidget {
  const TrendAIApp({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = context.watch<AppState>();

    return MaterialApp(
      title: 'TrendAI',
      shortcuts: const <ShortcutActivator, Intent>{},
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: appState.themeMode,
      home: const MainShell(),
      routes: {
        '/upload': (context) => const UploadScreen(),
        '/confirm': (context) => const ConfirmScreen(),
        '/history': (context) => const HistoryScreen(),
        '/info': (context) => const InfoScreen(type: 'about'),
      },
      onGenerateRoute: (settings) {
        if (settings.name == '/detail') {
          final args = settings.arguments as Map<String, dynamic>?;
          return MaterialPageRoute(
            builder: (context) => DetailScreen(templateId: args?['templateId'] as int? ?? 1),
          );
        }
        if (settings.name == '/gallery') {
          final args = settings.arguments as Map<String, dynamic>?;
          return MaterialPageRoute(
            builder: (context) => GalleryScreen(categoryId: args?['categoryId'] ?? 'all'),
          );
        }
        return null;
      },
      debugShowCheckedModeBanner: false,
    );
  }
}
