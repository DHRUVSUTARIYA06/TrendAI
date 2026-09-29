import 'dart:convert';
import 'dart:io';
import 'package:flutter/foundation.dart' hide Category;
import 'package:http/http.dart' as http;
import '../models/category_model.dart';
import '../models/template_model.dart';

class ApiService {
  static String? _customBaseUrl;

  static void setBaseUrl(String url) {
    _customBaseUrl = url.trim();
  }

  static String get baseUrl {
    if (_customBaseUrl != null && _customBaseUrl!.isNotEmpty) {
      return _customBaseUrl!;
    }
    // Live Cloud Vercel backend (works worldwide on Android, iOS, and Web)
    return 'https://trend-ai-ten.vercel.app/api';
  }

  static String get hostAddress {
    try {
      final uri = Uri.parse(baseUrl);
      return uri.port != 0 && uri.port != 80 && uri.port != 443
          ? '${uri.host}:${uri.port}'
          : uri.host;
    } catch (_) {
      return 'trend-ai-ten.vercel.app';
    }
  }

  /// Fetch dynamic categories from MongoDB
  static Future<List<Category>?> fetchCategories() async {
    try {
      final uri = Uri.parse('$baseUrl/categories');
      debugPrint('Fetching categories from: $uri');
      final response = await http.get(uri).timeout(const Duration(seconds: 5));

      if (response.statusCode == 200) {
        final body = json.decode(response.body);
        if (body['success'] == true && body['data'] is List) {
          final list = (body['data'] as List)
              .map((item) => Category.fromJson(item as Map<String, dynamic>))
              .toList();
          return list;
        }
      }
    } catch (e) {
      debugPrint('ApiService.fetchCategories error: $e');
    }
    return null;
  }

  /// Fetch dynamic templates from MongoDB with optional category or search
  static Future<List<Template>?> fetchTemplates({
    String? category,
    String? search,
    bool? trending,
  }) async {
    try {
      final queryParams = <String, String>{};
      if (category != null && category.isNotEmpty && category != 'all') {
        queryParams['category'] = category;
      }
      if (search != null && search.isNotEmpty) {
        queryParams['search'] = search;
      }
      if (trending == true) {
        queryParams['trending'] = 'true';
      }

      final uri = Uri.parse('$baseUrl/templates').replace(queryParameters: queryParams.isEmpty ? null : queryParams);
      debugPrint('Fetching templates from: $uri');
      final response = await http.get(uri).timeout(const Duration(seconds: 5));

      if (response.statusCode == 200) {
        final body = json.decode(response.body);
        if (body['success'] == true && body['data'] is List) {
          final list = (body['data'] as List)
              .map((item) => Template.fromJson(
                    item as Map<String, dynamic>,
                    serverHost: hostAddress,
                  ))
              .toList();
          return list;
        }
      }
    } catch (e) {
      debugPrint('ApiService.fetchTemplates error: $e');
    }
    return null;
  }

  /// Fetch single template details including the dynamic prompt
  static Future<Template?> fetchTemplateById(String idOrMongoId) async {
    try {
      final uri = Uri.parse('$baseUrl/templates/$idOrMongoId');
      final response = await http.get(uri).timeout(const Duration(seconds: 5));

      if (response.statusCode == 200) {
        final body = json.decode(response.body);
        if (body['success'] == true && body['data'] != null) {
          return Template.fromJson(
            body['data'] as Map<String, dynamic>,
            serverHost: hostAddress,
          );
        }
      }
    } catch (e) {
      debugPrint('ApiService.fetchTemplateById error: $e');
    }
    return null;
  }

  /// Increment template usage count in MongoDB
  static Future<void> incrementUsage(String? mongoId) async {
    if (mongoId == null || mongoId.isEmpty) return;
    try {
      final uri = Uri.parse('$baseUrl/templates/$mongoId/use');
      await http.post(uri).timeout(const Duration(seconds: 3));
    } catch (e) {
      debugPrint('ApiService.incrementUsage error: $e');
    }
  }
}
