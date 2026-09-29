const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Template = require('../models/Template');
const upload = require('../middleware/upload');

// Helper to format image URL with server host if relative
const formatTemplateResponse = (req, template) => {
  const obj = template.toObject ? template.toObject() : { ...template };
  delete obj.imageData;
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const host = req.get('host');

  if (obj.imageUrl) {
    if (obj.imageUrl.startsWith('/uploads/') || obj.imageUrl.startsWith('/api/templates/')) {
      obj.imageUrl = `${protocol}://${host}${obj.imageUrl}`;
    } else if (obj.imageUrl.includes('localhost:5000') || obj.imageUrl.includes('127.0.0.1:5000')) {
      obj.imageUrl = obj.imageUrl.replace(/localhost:5000|127\.0\.0\.1:5000/, host);
    }
  }
  return obj;
};

// GET /api/templates/:id/image - serve stored template image binary or redirect
router.get('/:id/image', async (req, res) => {
  try {
    const template = await Template.findById(req.params.id).select('+imageData');
    if (!template) {
      return res.status(404).send('Template not found');
    }

    if (template.imageData && template.imageData.length > 0) {
      res.set('Content-Type', template.imageMimeType || 'image/jpeg');
      res.set('Cache-Control', 'public, max-age=86400, s-maxage=86400');
      return res.send(template.imageData);
    }

    if (template.imageUrl) {
      if (template.imageUrl.startsWith('http://') || template.imageUrl.startsWith('https://')) {
        return res.redirect(template.imageUrl);
      }
      if (template.imageUrl.startsWith('/uploads/')) {
        const filePath = path.join(__dirname, '../../uploads', path.basename(template.imageUrl));
        if (fs.existsSync(filePath)) {
          return res.sendFile(filePath);
        }
      }
    }

    res.status(404).send('Image not found');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET /api/templates - list templates with filtering, search & sorting
router.get('/', async (req, res) => {
  try {
    const { category, search, trending, sort } = req.query;
    let query = {};

    if (category && category !== 'all') {
      if (category === 'trending') {
        query.isTrending = true;
      } else {
        query.category = category.toLowerCase();
      }
    }

    if (trending === 'true') {
      query.isTrending = true;
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { prompt: searchRegex },
        { category: searchRegex },
      ];
    }

    let sortOptions = { createdAt: -1 };
    if (sort === 'popular') {
      sortOptions = { usageCount: -1 };
    } else if (sort === 'trending') {
      sortOptions = { isTrending: -1, usageCount: -1 };
    }

    const templates = await Template.find(query).sort(sortOptions);
    const formatted = templates.map((t) => formatTemplateResponse(req, t));

    res.json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/templates/:id - get single template
router.get('/:id', async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }

    res.json({
      success: true,
      data: formatTemplateResponse(req, template),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/templates - create a template (supports file upload)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, prompt, category, tag, isTrending, imageUrl } = req.body;

    if (!title || !prompt || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, prompt, and category are required fields',
      });
    }

    if (!req.file && !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'A template image file or imageUrl must be provided',
      });
    }

    const templateData = {
      title,
      description: description || '',
      prompt,
      category: category.toLowerCase().trim(),
      imageUrl: imageUrl || '',
      isTrending: isTrending === 'true' || isTrending === true,
      tag: tag || 'p',
      usageCount: 0,
    };

    if (req.file) {
      templateData.imageData = req.file.buffer;
      templateData.imageMimeType = req.file.mimetype;
      templateData.imageUrl = '/api/templates/temp/image';
    }

    const template = await Template.create(templateData);

    if (req.file) {
      template.imageUrl = `/api/templates/${template._id}/image`;
      await template.save();
    }

    res.status(201).json({
      success: true,
      data: formatTemplateResponse(req, template),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/templates/:id - update a template
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }

    const { title, description, prompt, category, tag, isTrending, imageUrl, usageCount } = req.body;

    if (title) template.title = title;
    if (description !== undefined) template.description = description;
    if (prompt) template.prompt = prompt;
    if (category) template.category = category.toLowerCase().trim();
    if (tag) template.tag = tag;
    if (isTrending !== undefined) {
      template.isTrending = isTrending === 'true' || isTrending === true;
    }
    if (usageCount !== undefined) {
      template.usageCount = Number(usageCount);
    }

    if (req.file) {
      template.imageData = req.file.buffer;
      template.imageMimeType = req.file.mimetype;
      template.imageUrl = `/api/templates/${template._id}/image`;
    } else if (imageUrl) {
      template.imageUrl = imageUrl;
      template.imageData = undefined;
    }

    await template.save();

    res.json({
      success: true,
      data: formatTemplateResponse(req, template),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/templates/:id - delete a template
router.delete('/:id', async (req, res) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.id);
    if (!template) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }

    if (template.imageUrl && template.imageUrl.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '../../uploads', path.basename(template.imageUrl));
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch (_) {}
      }
    }

    res.json({
      success: true,
      message: 'Template deleted successfully',
      data: template,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/templates/:id/use - increment usage count when user creates with ChatGPT
router.post('/:id/use', async (req, res) => {
  try {
    const template = await Template.findByIdAndUpdate(
      req.params.id,
      { $inc: { usageCount: 1 } },
      { new: true }
    );
    if (!template) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }

    res.json({
      success: true,
      usageCount: template.usageCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
