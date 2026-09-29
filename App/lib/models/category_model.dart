class Category {
  final String id;
  final String name;
  final String emoji;
  final int order;

  const Category({
    required this.id,
    required this.name,
    required this.emoji,
    this.order = 0,
  });

  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(
      id: (json['slug'] ?? json['id'] ?? json['_id'] ?? '').toString().toLowerCase(),
      name: (json['name'] ?? '').toString(),
      emoji: (json['emoji'] ?? '✨').toString(),
      order: (json['order'] as num?)?.toInt() ?? 0,
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'slug': id,
    'name': name,
    'emoji': emoji,
    'order': order,
  };
}
