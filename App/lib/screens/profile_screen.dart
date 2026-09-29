import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:trend_ai/providers/app_state.dart';
import 'package:trend_ai/screens/history_screen.dart';
import 'package:trend_ai/screens/info_screen.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final appState = context.watch<AppState>();

    return Scaffold(
      body: SafeArea(
        bottom: false,
        child: ListView(
          padding: const EdgeInsets.only(left: 16, right: 16, top: 32, bottom: 90),
          children: [
            Center(
              child: Container(
                width: 96,
                height: 96,
                padding: const EdgeInsets.all(4),
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: LinearGradient(
                    begin: Alignment(-0.7, -0.5),
                    end: Alignment(0.9, 0.5),
                    colors: [Color(0xFF8B5CF6), Color(0xFFEC4899), Color(0xFF60A5FA)],
                  ),
                ),
                child: Container(
                  decoration: BoxDecoration(
                    color: theme.colorScheme.surface,
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    Icons.person_rounded,
                    size: 48,
                    color: theme.colorScheme.onSurface,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Text(
              'Your Profile',
              textAlign: TextAlign.center,
              style: GoogleFonts.bricolageGrotesque(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              'Creating since 2026',
              textAlign: TextAlign.center,
              style: GoogleFonts.dmSans(
                fontSize: 14,
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
            const SizedBox(height: 32),
            Row(
              children: [
                _buildStatCard(context, '${appState.history.length}', 'Created'),
                const SizedBox(width: 12),
                _buildStatCard(context, '${appState.savedIds.length}', 'Saved'),
                const SizedBox(width: 12),
                _buildStatCard(context, '0', 'Recent'),
              ],
            ),
            const SizedBox(height: 32),
            Text(
              'Appearance',
              style: GoogleFonts.bricolageGrotesque(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            _buildThemeSelector(context, appState),
            const SizedBox(height: 32),
            Text(
              'Activity',
              style: GoogleFonts.bricolageGrotesque(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            _buildMenuSection(context, [
              _MenuItem(Icons.access_time_rounded, 'History', onTap: () {
                Navigator.push(context, MaterialPageRoute(builder: (_) => const HistoryScreen()));
              }),
              _MenuItem(Icons.favorite_rounded, 'Saved Templates', onTap: () {
                appState.setTrendTab('saved');
              }),
            ]),
            const SizedBox(height: 32),
            Text(
              'About',
              style: GoogleFonts.bricolageGrotesque(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            _buildMenuSection(context, [
              _MenuItem(Icons.shield_rounded, 'Privacy', onTap: () {
                Navigator.push(context, MaterialPageRoute(builder: (_) => const InfoScreen(type: 'privacy')));
              }),
              _MenuItem(Icons.description_rounded, 'Terms', onTap: () {
                Navigator.push(context, MaterialPageRoute(builder: (_) => const InfoScreen(type: 'terms')));
              }),
              _MenuItem(Icons.info_rounded, 'About TrendAI', onTap: () {
                Navigator.push(context, MaterialPageRoute(builder: (_) => const InfoScreen(type: 'about')));
              }),
            ]),
          ],
        ),
      ),
    );
  }

  Widget _buildStatCard(BuildContext context, String value, String label) {
    final theme = Theme.of(context);
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 16),
        decoration: BoxDecoration(
          color: theme.colorScheme.surfaceContainerHighest.withOpacity(0.5),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Column(
          children: [
            Text(
              value,
              style: GoogleFonts.bricolageGrotesque(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: GoogleFonts.dmSans(
                fontSize: 12,
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildThemeSelector(BuildContext context, AppState appState) {
    final theme = Theme.of(context);
    final List<ThemeMode> modes = [ThemeMode.system, ThemeMode.light, ThemeMode.dark];
    final List<String> labels = ['System', 'Light', 'Dark'];

    return Container(
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: theme.colorScheme.surfaceContainerHighest.withOpacity(0.5),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        children: List.generate(modes.length, (index) {
          final isSelected = appState.themeMode == modes[index];
          return Expanded(
            child: GestureDetector(
              onTap: () {
                appState.setThemeMode(modes[index]);
              },
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 12),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16),
                  gradient: isSelected
                      ? const LinearGradient(
                          begin: Alignment(-0.7, -0.5),
                          end: Alignment(0.9, 0.5),
                          colors: [Color(0xFF8B5CF6), Color(0xFFEC4899), Color(0xFF60A5FA)],
                        )
                      : null,
                ),
                child: Text(
                  labels[index],
                  textAlign: TextAlign.center,
                  style: GoogleFonts.dmSans(
                    fontWeight: FontWeight.bold,
                    color: isSelected ? Colors.white : theme.colorScheme.onSurfaceVariant,
                  ),
                ),
              ),
            ),
          );
        }),
      ),
    );
  }

  Widget _buildMenuSection(BuildContext context, List<_MenuItem> items) {
    final theme = Theme.of(context);
    return Container(
      decoration: BoxDecoration(
        color: theme.colorScheme.surfaceContainerHighest.withOpacity(0.5),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        children: items.asMap().entries.map((entry) {
          final isLast = entry.key == items.length - 1;
          final item = entry.value;
          return Column(
            children: [
              ListTile(
                contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                leading: Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      begin: Alignment(-0.7, -0.5),
                      end: Alignment(0.9, 0.5),
                      colors: [Color(0xFF8B5CF6), Color(0xFFEC4899), Color(0xFF60A5FA)],
                    ),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Icon(item.icon, color: Colors.white, size: 20),
                ),
                title: Text(
                  item.label,
                  style: GoogleFonts.dmSans(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                trailing: Icon(
                  Icons.chevron_right_rounded,
                  color: theme.colorScheme.onSurfaceVariant,
                ),
                onTap: item.onTap,
              ),
              if (!isLast)
                Divider(
                  height: 1,
                  indent: 64,
                  endIndent: 16,
                  color: theme.colorScheme.outlineVariant.withOpacity(0.5),
                ),
            ],
          );
        }).toList(),
      ),
    );
  }
}

class _MenuItem {
  final IconData icon;
  final String label;
  final VoidCallback? onTap;

  _MenuItem(this.icon, this.label, {this.onTap});
}
