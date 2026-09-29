import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors extends ThemeExtension<AppColors> {
  final Color gradientViolet;
  final Color gradientPink;
  final Color gradientBlue;
  final Color surfaceVariant;
  final Color mutedText;
  final Color border;
  final Color glow;

  const AppColors({
    required this.gradientViolet,
    required this.gradientPink,
    required this.gradientBlue,
    required this.surfaceVariant,
    required this.mutedText,
    required this.border,
    required this.glow,
  });

  @override
  ThemeExtension<AppColors> copyWith() {
    return this;
  }

  @override
  ThemeExtension<AppColors> lerp(ThemeExtension<AppColors>? other, double t) {
    if (other is! AppColors) {
      return this;
    }
    return AppColors(
      gradientViolet: Color.lerp(gradientViolet, other.gradientViolet, t) ?? gradientViolet,
      gradientPink: Color.lerp(gradientPink, other.gradientPink, t) ?? gradientPink,
      gradientBlue: Color.lerp(gradientBlue, other.gradientBlue, t) ?? gradientBlue,
      surfaceVariant: Color.lerp(surfaceVariant, other.surfaceVariant, t) ?? surfaceVariant,
      mutedText: Color.lerp(mutedText, other.mutedText, t) ?? mutedText,
      border: Color.lerp(border, other.border, t) ?? border,
      glow: Color.lerp(glow, other.glow, t) ?? glow,
    );
  }
}

class AppTheme {
  static const primaryViolet = Color(0xFF7C3AED);
  static const primaryVioletDark = Color(0xFFC4B5FD);
  static const secondaryPink = Color(0xFFEC4899);
  static const secondaryPinkDark = Color(0xFFF472B6);
  
  static const gradientViolet = Color(0xFF8B5CF6);
  static const gradientPink = Color(0xFFEC4899);
  static const gradientBlue = Color(0xFF60A5FA);

  static const mainGradient = LinearGradient(
    colors: [gradientViolet, gradientPink, gradientBlue],
    begin: Alignment(-0.7, -0.5),
    end: Alignment(0.9, 0.5),
  );

  static ThemeData get lightTheme {
    final baseTextTheme = ThemeData.light().textTheme;
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryViolet,
        brightness: Brightness.light,
        primary: primaryViolet,
        secondary: secondaryPink,
        surface: const Color(0xFFFFFFFF),
      ),
      scaffoldBackgroundColor: const Color(0xFFFAF8FF),
      textTheme: GoogleFonts.dmSansTextTheme(baseTextTheme).copyWith(
        displayLarge: GoogleFonts.bricolageGrotesque(fontWeight: FontWeight.bold),
        displayMedium: GoogleFonts.bricolageGrotesque(fontWeight: FontWeight.bold),
        displaySmall: GoogleFonts.bricolageGrotesque(fontWeight: FontWeight.bold),
        headlineLarge: GoogleFonts.bricolageGrotesque(fontWeight: FontWeight.bold),
        headlineMedium: GoogleFonts.bricolageGrotesque(fontWeight: FontWeight.bold),
        headlineSmall: GoogleFonts.bricolageGrotesque(fontWeight: FontWeight.bold),
        titleLarge: GoogleFonts.bricolageGrotesque(fontWeight: FontWeight.bold),
        titleMedium: GoogleFonts.bricolageGrotesque(fontWeight: FontWeight.bold),
      ),
      cardTheme: CardTheme(
        color: const Color(0xFFFFFFFF),
        elevation: 0,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: const BorderSide(color: Color(0xFFE5E7EB))),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        iconTheme: IconThemeData(color: Color(0xFF1F2937)),
        titleTextStyle: TextStyle(color: Color(0xFF1F2937), fontSize: 20, fontWeight: FontWeight.bold),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: const Color(0xFFF3F4F6),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
        focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: primaryViolet)),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: Color(0xFFFFFFFF),
        selectedItemColor: primaryViolet,
        unselectedItemColor: Color(0xFF9CA3AF),
      ),
      extensions: const <ThemeExtension<dynamic>>[
        AppColors(
          gradientViolet: gradientViolet,
          gradientPink: gradientPink,
          gradientBlue: gradientBlue,
          surfaceVariant: Color(0xFFF3F4F6),
          mutedText: Color(0xFF6B7280),
          border: Color(0xFFE5E7EB),
          glow: Color(0x337C3AED),
        ),
      ],
    );
  }

  static ThemeData get darkTheme {
    final baseTextTheme = ThemeData.dark().textTheme;
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryVioletDark,
        brightness: Brightness.dark,
        primary: primaryVioletDark,
        secondary: secondaryPinkDark,
        surface: const Color(0xFF151220),
      ),
      scaffoldBackgroundColor: const Color(0xFF0A0812),
      textTheme: GoogleFonts.dmSansTextTheme(baseTextTheme).copyWith(
        displayLarge: GoogleFonts.bricolageGrotesque(fontWeight: FontWeight.bold),
        displayMedium: GoogleFonts.bricolageGrotesque(fontWeight: FontWeight.bold),
        displaySmall: GoogleFonts.bricolageGrotesque(fontWeight: FontWeight.bold),
        headlineLarge: GoogleFonts.bricolageGrotesque(fontWeight: FontWeight.bold),
        headlineMedium: GoogleFonts.bricolageGrotesque(fontWeight: FontWeight.bold),
        headlineSmall: GoogleFonts.bricolageGrotesque(fontWeight: FontWeight.bold),
        titleLarge: GoogleFonts.bricolageGrotesque(fontWeight: FontWeight.bold),
        titleMedium: GoogleFonts.bricolageGrotesque(fontWeight: FontWeight.bold),
      ),
      cardTheme: CardTheme(
        color: const Color(0xFF151220),
        elevation: 0,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: const BorderSide(color: Color(0xFF374151))),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        iconTheme: IconThemeData(color: Color(0xFFF9FAFB)),
        titleTextStyle: TextStyle(color: Color(0xFFF9FAFB), fontSize: 20, fontWeight: FontWeight.bold),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: const Color(0xFF1F2937),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
        focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: primaryVioletDark)),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: Color(0xFF151220),
        selectedItemColor: primaryVioletDark,
        unselectedItemColor: Color(0xFF6B7280),
      ),
      extensions: const <ThemeExtension<dynamic>>[
        AppColors(
          gradientViolet: gradientViolet,
          gradientPink: gradientPink,
          gradientBlue: gradientBlue,
          surfaceVariant: Color(0xFF1F2937),
          mutedText: Color(0xFF9CA3AF),
          border: Color(0xFF374151),
          glow: Color(0x33C4B5FD),
        ),
      ],
    );
  }
}
