const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET /api/categories - get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1, createdAt: 1 });
    res.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/categories - create a category
router.post('/', async (req, res) => {
  try {
    const { name, emoji, order } = req.body;
    let { slug } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    if (!slug) {
      slug = name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Category with this slug already exists' });
    }

    const category = await Category.create({
      name,
      slug,
      emoji: emoji || '✨',
      order: order !== undefined ? Number(order) : 0,
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/categories/:id - update a category
router.put('/:id', async (req, res) => {
  try {
    const { name, emoji, slug, order } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    if (name) category.name = name;
    if (emoji) category.emoji = emoji;
    if (slug) category.slug = slug.toLowerCase();
    if (order !== undefined) category.order = Number(order);

    await category.save();

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/categories/:id - delete a category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.json({
      success: true,
      message: 'Category deleted successfully',
      data: category,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
