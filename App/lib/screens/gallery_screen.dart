import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:trend_ai/models/template_model.dart';
import 'package:trend_ai/providers/app_state.dart';
import 'package:trend_ai/screens/detail_screen.dart';
import 'package:trend_ai/widgets/template_card.dart';

class GalleryScreen extends StatefulWidget {
  final dynamic categoryId;

  const GalleryScreen({super.key, this.categoryId});

  @override
  State<GalleryScreen> createState() => _GalleryScreenState();
}

class _GalleryScreenState extends State<GalleryScreen> {
  final List<String> tags = ['all', 'm', 'f', 'c', 'p'];
  final List<String> tagLabels = ['All', 'Male', 'Female', 'Couple', 'Portrait'];
  String selectedTag = 'all';
  String selectedSort = 'trending'; // 'trending', 'new', 'popular'

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final appState = context.watch<AppState>();
    final String catId = widget.categoryId != null ? widget.categoryId.toString() : 'all';

    final categoryObj = catId != 'all'
        ? appState.categories.firstWhere(
            (c) => c.id.toLowerCase() == catId.toLowerCase(),
            orElse: () => appState.categories.first,
          )
        : null;

    final String titleText = categoryObj != null
        ? '${categoryObj.emoji} ${categoryObj.name}'
        : '✨ ${appState.templates.length} Templates';

    List<Template> list = appState.templates.where((t) {
      final matchesCat = (catId == 'all' || t.category.toLowerCase() == catId.toLowerCase());
      final matchesTag = (selectedTag == 'all' || t.tag == selectedTag);
      return matchesCat && matchesTag;
    }).toList();

    // Sort
    if (selectedSort == 'trending') {
      list.sort((a, b) {
        if (a.isTrending != b.isTrending) {
          return b.isTrending ? 1 : -1;
        }
        return b.usageCount.compareTo(a.usageCount);
      });
    } else if (selectedSort == 'new') {
      list.sort((a, b) => b.added.compareTo(a.added));
    } else {
      list.sort((a, b) => b.usageCount.compareTo(a.usageCount));
    }

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              titleText,
              style: GoogleFonts.bricolageGrotesque(
                fontSize: 20,
                fontWeight: FontWeight.w800,
              ),
            ),
            Text(
              '${list.length} template${list.length == 1 ? '' : 's'}',
              style: TextStyle(fontSize: 12, color: theme.colorScheme.onSurface.withOpacity(0.6)),
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          // Filter Chips
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              children: List.generate(tags.length, (index) {
                final tag = tags[index];
                final isSelected = selectedTag == tag;
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: ChoiceChip(
                    label: Text(tagLabels[index]),
                    selected: isSelected,
                    onSelected: (selected) {
                      if (selected) setState(() => selectedTag = tag);
                    },
                    backgroundColor: theme.colorScheme.onSurface.withOpacity(0.06),
                    selectedColor: theme.colorScheme.onSurface,
                    labelStyle: TextStyle(
                      color: isSelected ? theme.scaffoldBackgroundColor : theme.colorScheme.onSurface,
                      fontWeight: FontWeight.w600,
                      fontSize: 13.5,
                    ),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(99)),
                  ),
                );
              }),
            ),
          ),
          // Sort Segments
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(
              color: theme.colorScheme.onSurface.withOpacity(0.06),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Row(
              children: [
                _buildSortBtn('trending', 'Trending'),
                _buildSortBtn('new', 'New'),
                _buildSortBtn('popular', 'Popular'),
              ],
            ),
          ),
          // Grid
          Expanded(
            child: list.isEmpty
                ? Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.search_off, size: 54, color: Colors.grey),
                        const SizedBox(height: 12),
                        const Text('Nothing here yet', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                        const SizedBox(height: 6),
                        const Text('No templates match this filter. Try another one.', style: TextStyle(color: Colors.grey)),
                        const SizedBox(height: 16),
                        ElevatedButton(
                          onPressed: () => setState(() => selectedTag = 'all'),
                          child: const Text('Show all'),
                        ),
                      ],
                    ),
                  )
                : GridView.builder(
                    padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      childAspectRatio: 0.68,
                      crossAxisSpacing: 12,
                      mainAxisSpacing: 12,
                    ),
                    itemCount: list.length,
                    itemBuilder: (context, index) {
                      final item = list[index];
                      return TemplateCard(
                        templateId: item.id,
                        title: item.title,
                        category: item.category,
                        usageCount: item.usageCount,
                        imageUrl: item.imageUrl,
                        isTrending: item.isTrending,
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) => DetailScreen(
                                templateId: item.id,
                                template: {
                                  'id': item.id,
                                  'title': item.title,
                                  'category': item.category,
                                  'count': item.usageCount,
                                  'description': item.description,
                                  'isTrending': item.isTrending,
                                  'prompt': item.prompt,
                                  'imageUrl': item.imageUrl,
                                },
                              ),
                            ),
                          );
                        },
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }

  Widget _buildSortBtn(String id, String label) {
    final isSelected = selectedSort == id;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => selectedSort = id),
        child: Container(
          height: 38,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            gradient: isSelected
                ? const LinearGradient(
                    colors: [Color(0xFF8B5CF6), Color(0xFFEC4899), Color(0xFF60A5FA)],
                  )
                : null,
          ),
          alignment: Alignment.center,
          child: Text(
            label,
            style: TextStyle(
              color: isSelected ? Colors.white : Theme.of(context).colorScheme.onSurface.withOpacity(0.7),
              fontWeight: FontWeight.w600,
              fontSize: 13.5,
            ),
          ),
        ),
      ),
    );
  }
}
