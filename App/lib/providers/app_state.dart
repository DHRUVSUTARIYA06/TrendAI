import 'package:flutter/material.dart';
import '../data/mock_data.dart';
import '../models/category_model.dart';
import '../models/template_model.dart';
import '../services/api_service.dart';

class AppState extends ChangeNotifier {
  ThemeMode _themeMode = ThemeMode.system;
  final Set<int> _savedIds = {1, 2, 3}; // Init with defaults
  final List<Map<String, dynamic>> _history = [];
  String? _searchQuery;
  String _trendTab = 'today'; // 'today', 'week', 'popular'
  String? _photoPath;
  bool _photoIsSample = false;
  int? _currentFlowId;
  String? _currentPrompt;
  Template? _currentSelectedTemplate;

  // Dynamic MongoDB state
  List<Category> _categories = List.from(MockData.categories);
  List<Template> _templates = List.from(MockData.templates);
  bool _isLoadingBackend = false;
  bool _isBackendConnected = false;

  AppState() {
    // Initial fetch from backend on app launch
    fetchFromBackend();
  }

  ThemeMode get themeMode => _themeMode;
  Set<int> get savedIds => _savedIds;
  List<Map<String, dynamic>> get history => _history;
  String? get searchQuery => _searchQuery;
  String get trendTab => _trendTab;
  String? get photoPath => _photoPath;
  bool get photoIsSample => _photoIsSample;
  int? get currentFlowId => _currentFlowId;
  String? get currentPrompt => _currentPrompt;
  Template? get currentSelectedTemplate => _currentSelectedTemplate;

  List<Category> get categories => _categories;
  List<Template> get templates => _templates;
  bool get isLoadingBackend => _isLoadingBackend;
  bool get isBackendConnected => _isBackendConnected;

  Future<void> fetchFromBackend() async {
    _isLoadingBackend = true;
    notifyListeners();

    try {
      final fetchedCategories = await ApiService.fetchCategories();
      if (fetchedCategories != null && fetchedCategories.isNotEmpty) {
        _categories = fetchedCategories;
        _isBackendConnected = true;
      }

      final fetchedTemplates = await ApiService.fetchTemplates();
      if (fetchedTemplates != null && fetchedTemplates.isNotEmpty) {
        _templates = fetchedTemplates;
        _isBackendConnected = true;
      }
    } catch (e) {
      debugPrint('Error fetching data from MongoDB backend: $e');
    } finally {
      _isLoadingBackend = false;
      notifyListeners();
    }
  }

  void setThemeMode(ThemeMode mode) {
    _themeMode = mode;
    notifyListeners();
  }

  void toggleSave(int id) {
    if (_savedIds.contains(id)) {
      _savedIds.remove(id);
    } else {
      _savedIds.add(id);
    }
    notifyListeners();
  }

  bool isSaved(int id) {
    return _savedIds.contains(id);
  }

  void addToHistory(int templateId) {
    _history.insert(0, {
      'templateId': templateId,
      'timestamp': DateTime.now().millisecondsSinceEpoch ~/ 1000,
    });

    // Also notify MongoDB backend to increment usage count
    final tpl = getTemplateById(templateId);
    if (tpl?.mongoId != null) {
      ApiService.incrementUsage(tpl!.mongoId);
    }

    notifyListeners();
  }

  void setSearchQuery(String q) {
    _searchQuery = q.isEmpty ? null : q;
    notifyListeners();
  }

  void setTrendTab(String tab) {
    _trendTab = tab;
    notifyListeners();
  }

  void setPhoto(String path, {bool isSample = false}) {
    _photoPath = path;
    _photoIsSample = isSample;
    notifyListeners();
  }

  void clearPhoto() {
    _photoPath = null;
    _photoIsSample = false;
    notifyListeners();
  }

  void startCreateFlow(int templateId, [Template? template]) {
    _currentFlowId = templateId;
    _currentSelectedTemplate = template ?? getTemplateById(templateId);
    _currentPrompt = _currentSelectedTemplate?.prompt;
    clearPhoto();
    notifyListeners();
  }

  // Dynamic filter helpers
  List<Template> getTemplatesByCategory(String categoryId) {
    if (categoryId == 'all') return _templates;
    if (categoryId == 'trending') {
      return _templates.where((t) => t.isTrending).toList();
    }
    return _templates.where((t) => t.category.toLowerCase() == categoryId.toLowerCase()).toList();
  }

  List<Template> getTrendingTemplates() {
    return List<Template>.from(_templates)
      ..sort((a, b) => b.usageCount.compareTo(a.usageCount));
  }

  List<Template> searchTemplates(String query) {
    if (query.isEmpty) return _templates;
    final q = query.toLowerCase().trim();
    return _templates.where((t) {
      return t.title.toLowerCase().contains(q) ||
          t.category.toLowerCase().contains(q) ||
          t.description.toLowerCase().contains(q) ||
          (t.prompt != null && t.prompt!.toLowerCase().contains(q));
    }).toList();
  }

  Template? getTemplateById(int id) {
    try {
      return _templates.firstWhere((t) => t.id == id);
    } catch (_) {
      try {
        return MockData.getTemplateById(id);
      } catch (_) {
        return _templates.isNotEmpty ? _templates.first : null;
      }
    }
  }
}
