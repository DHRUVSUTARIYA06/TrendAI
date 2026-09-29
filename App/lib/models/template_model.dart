class Template {
  final int id;
  final String? mongoId;
  final String title;
  final String category;
  final int categoryIndex;
  final String tag;
  final String description;
  final String? prompt;
  final String? imageUrl;
  final int usageCount;
  final bool isTrending;
  final bool isSaved;
  final int added;

  const Template({
    required this.id,
    this.mongoId,
    required this.title,
    required this.category,
    required this.categoryIndex,
    required this.tag,
    required this.description,
    this.prompt,
    this.imageUrl,
    required this.usageCount,
    required this.isTrending,
    this.isSaved = false,
    required this.added,
  });

  factory Template.fromJson(Map<String, dynamic> json, {int? fallbackId, int? catIndex, String? serverHost}) {
    final mongoId = json['_id']?.toString();
    final rawId = json['id'];
    int finalId = fallbackId ?? 1;
    if (rawId is int) {
      finalId = rawId;
    } else if (mongoId != null) {
      finalId = mongoId.hashCode.abs();
    }

    String? img = json['imageUrl'] as String?;
    if (img != null && serverHost != null) {
      img = img.replaceAll(RegExp(r'localhost:5000|127\.0\.0\.1:5000|10\.0\.2\.2:5000'), serverHost);
    }

    return Template(
      id: finalId,
      mongoId: mongoId,
      title: json['title'] as String? ?? 'Untitled Template',
      category: (json['category'] as String? ?? 'trending').toLowerCase(),
      categoryIndex: catIndex ?? 0,
      tag: json['tag'] as String? ?? 'p',
      description: json['description'] as String? ?? '',
      prompt: json['prompt'] as String?,
      imageUrl: img,
      usageCount: (json['usageCount'] as num?)?.toInt() ?? 0,
      isTrending: json['isTrending'] as bool? ?? false,
      added: json['createdAt'] != null
          ? DateTime.tryParse(json['createdAt'] as String)?.millisecondsSinceEpoch ?? DateTime.now().millisecondsSinceEpoch
          : DateTime.now().millisecondsSinceEpoch,
    );
  }

  Template copyWith({
    int? id,
    String? mongoId,
    String? title,
    String? category,
    int? categoryIndex,
    String? tag,
    String? description,
    String? prompt,
    String? imageUrl,
    int? usageCount,
    bool? isTrending,
    bool? isSaved,
    int? added,
  }) {
    return Template(
      id: id ?? this.id,
      mongoId: mongoId ?? this.mongoId,
      title: title ?? this.title,
      category: category ?? this.category,
      categoryIndex: categoryIndex ?? this.categoryIndex,
      tag: tag ?? this.tag,
      description: description ?? this.description,
      prompt: prompt ?? this.prompt,
      imageUrl: imageUrl ?? this.imageUrl,
      usageCount: usageCount ?? this.usageCount,
      isTrending: isTrending ?? this.isTrending,
      isSaved: isSaved ?? this.isSaved,
      added: added ?? this.added,
    );
  }
}
