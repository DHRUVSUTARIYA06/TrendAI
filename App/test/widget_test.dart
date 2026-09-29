import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:trend_ai/app.dart';
import 'package:trend_ai/providers/app_state.dart';

void main() {
  testWidgets('App loads smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(
      ChangeNotifierProvider(
        create: (_) => AppState(),
        child: const TrendAIApp(),
      ),
    );
    expect(find.byType(MaterialApp), findsOneWidget);
  });
}
