const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Template title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    prompt: {
      type: String,
      required: [true, 'AI Prompt is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      lowercase: true,
      index: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Template preview image is required'],
      trim: true,
    },
    usageCount: {
      type: Number,
      default: 0,
      index: true,
    },
    isTrending: {
      type: Boolean,
      default: false,
      index: true,
    },
    tag: {
      type: String,
      default: 'p', // 'p' for portrait, 'f' for female, 'm' for male, 'c' for couple
    },
    imageData: {
      type: Buffer,
      select: false,
    },
    imageMimeType: {
      type: String,
      default: 'image/jpeg',
    },
  },
  {
    timestamps: true,
  }
);

// Search index on title, description, prompt
templateSchema.index({ title: 'text', description: 'text', prompt: 'text' });

module.exports = mongoose.model('Template', templateSchema);
