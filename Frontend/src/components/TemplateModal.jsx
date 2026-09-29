import React, { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Sparkles, Check } from 'lucide-react';
import { createTemplate, updateTemplate } from '../api';

export default function TemplateModal({ isOpen, onClose, template, categories = [], onSaved }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isTrending, setIsTrending] = useState(false);
  const [tag, setTag] = useState('p');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (template) {
      setTitle(template.title || '');
      setCategory(template.category || (categories[0]?.slug || ''));
      setDescription(template.description || '');
      setPrompt(template.prompt || '');
      setImageUrl(template.imageUrl || '');
      setImagePreview(template.imageUrl || '');
      setIsTrending(template.isTrending || false);
      setTag(template.tag || 'p');
      setImageFile(null);
    } else {
      setTitle('');
      setCategory(categories[0]?.slug || 'trending');
      setDescription('');
      setPrompt('');
      setImageUrl('');
      setImagePreview('');
      setIsTrending(false);
      setTag('p');
      setImageFile(null);
    }
    setError('');
  }, [template, categories, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please provide a title');
      return;
    }
    if (!category) {
      setError('Please select a category');
      return;
    }
    if (!prompt.trim()) {
      setError('Please provide the AI transformation prompt');
      return;
    }
    if (!imageFile && !imageUrl) {
      setError('Please upload a preview image or enter an image URL');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('category', category);
      formData.append('description', description.trim());
      formData.append('prompt', prompt.trim());
      formData.append('isTrending', isTrending);
      formData.append('tag', tag);

      if (imageFile) {
        formData.append('image', imageFile);
      } else if (imageUrl) {
        formData.append('imageUrl', imageUrl.trim());
      }

      if (template?._id) {
        await updateTemplate(template._id, formData);
      } else {
        await createTemplate(formData);
      }

      onSaved();
      onClose();
    } catch (err) {
      console.error('Save template error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to save template');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={18} color="white" />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                {template ? 'Edit Template' : 'Upload New Template'}
              </h2>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {template ? 'Update template details and prompt' : 'Add a new trending AI style to the mobile app'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              color: 'var(--text-muted)',
              padding: '8px',
              borderRadius: '10px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#fca5a5',
            padding: '12px 16px',
            borderRadius: '12px',
            marginBottom: '20px',
            fontSize: '13px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Title & Category Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: '#cbd5e1' }}>
                Template Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Cinematic Rain Portrait"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: '#cbd5e1' }}>
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {categories.map((c) => (
                  <option key={c.slug || c._id} value={c.slug}>
                    {c.emoji} {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: '#cbd5e1' }}>
              Short Description / Tagline
            </label>
            <input
              type="text"
              placeholder="e.g. A moody rain-soaked street portrait with neon reflections."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* AI Prompt (Core feature for ChatGPT) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1' }}>
                AI Prompt (Sent directly to ChatGPT) *
              </label>
              <span style={{ fontSize: '11px', color: '#a78bfa' }}>
                ✨ Used when user taps "Create with ChatGPT"
              </span>
            </div>
            <textarea
              rows={4}
              placeholder="e.g. Transform this photo into a moody rain-soaked street portrait with vibrant neon light reflections, wet pavement, dramatic shadows, and teal-orange cinematic color grading. Retain the facial likeness and identity from the uploaded photo."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
              style={{ resize: 'vertical', lineHeight: '1.5' }}
            />
          </div>

          {/* Image Upload Area */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: '#cbd5e1' }}>
              Preview Image (Upload file or enter URL) *
            </label>
            
            <div style={{ display: 'grid', gridTemplateColumns: imagePreview ? '140px 1fr' : '1fr', gap: '16px', alignItems: 'center' }}>
              {imagePreview && (
                <div style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid rgba(139, 92, 246, 0.4)',
                  position: 'relative'
                }}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              <div>
                <label style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: '2px dashed rgba(255, 255, 255, 0.15)',
                  borderRadius: '16px',
                  padding: '20px',
                  cursor: 'pointer',
                  background: 'rgba(255, 255, 255, 0.02)',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}>
                  <Upload size={24} color="#a78bfa" />
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>
                    {imageFile ? imageFile.name : 'Click to upload image (JPG, PNG, WEBP)'}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    High quality preview shown in the app
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </label>

                <div style={{ marginTop: '10px' }}>
                  <input
                    type="url"
                    placeholder="Or paste an image URL (e.g. Unsplash / CDN)"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      if (!imageFile) setImagePreview(e.target.value);
                    }}
                    style={{ fontSize: '12px', padding: '8px 12px' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Options Row (Trending & Tag) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '14px 18px',
            borderRadius: '14px',
            border: '1px solid var(--border-color)',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isTrending}
                onChange={(e) => setIsTrending(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#ec4899', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '13px', fontWeight: '600' }}>🔥 Mark as Trending Style</span>
            </label>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Subject Type:</span>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                style={{ width: 'auto', padding: '6px 12px', fontSize: '12px' }}
              >
                <option value="p">👤 General / Portrait</option>
                <option value="f">👩 Female</option>
                <option value="m">👨 Male</option>
                <option value="c">👫 Couple</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#e2e8f0',
                padding: '12px 20px',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '13px'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="gradient-btn"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Saving to Database...' : template ? 'Update Template' : 'Publish to App ✨'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
