import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Save,
  Send,
  ArrowLeft,
  Copy,
  Check,
  X,
  Plus,
  Info,
  Heart,
  Play,
  Bookmark,
  BarChart2
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import ImageDropzone from '../components/templates/ImageDropzone';
import LoadingState from '../components/common/LoadingState';
import StatusBadge from '../components/common/StatusBadge';
import { templateRepository } from '../repositories/templateRepository';
import { activityRepository } from '../repositories/activityRepository';
import { TEMPLATE_CATEGORIES } from '../types/template';
import { useToast } from '../context/ToastContext';

export default function TemplateFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const toast = useToast();

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [imageFileOrUrl, setImageFileOrUrl] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [version, setVersion] = useState('1.0');
  const [sortOrder, setSortOrder] = useState(0);
  const [featured, setFeatured] = useState(false);
  const [trending, setTrending] = useState(false);
  const [active, setActive] = useState(true);

  // Validation errors
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Operational states
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);
  const [engagementData, setEngagementData] = useState(null);

  // Load existing template if editing
  useEffect(() => {
    if (!isEditMode) return;

    const fetchTemplate = async () => {
      try {
        setLoading(true);
        const [tpl, eng] = await Promise.all([
          templateRepository.getTemplateById(id),
          activityRepository.getTemplateActivity({ templateId: id })
        ]);

        if (!tpl) {
          toast.error(`Template ${id} not found.`);
          navigate('/admin/templates');
          return;
        }

        setTitle(tpl.title || '');
        setCategory(tpl.category || '');
        setDescription(tpl.description || '');
        setTags(Array.isArray(tpl.tags) ? tpl.tags : []);
        setImageFileOrUrl(tpl.imageUrl || tpl.thumbnailUrl || null);
        setPrompt(tpl.prompt || '');
        setVersion(tpl.version || '1.0');
        setSortOrder(tpl.sortOrder || 0);
        setFeatured(Boolean(tpl.featured));
        setTrending(Boolean(tpl.trending));
        setActive(Boolean(tpl.active));
        setEngagementData(eng);
      } catch (err) {
        console.error('Failed to load template:', err);
        toast.error('Failed to load template data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id, isEditMode, navigate, toast]);

  // Inline validation
  const validateField = (field, val) => {
    switch (field) {
      case 'title':
        if (!val || !val.trim()) return 'Template title is required.';
        if (val.trim().length > 100) return 'Template title cannot exceed 100 characters.';
        return null;
      case 'category':
        if (!val || val === '') return 'Please select a category.';
        return null;
      case 'prompt':
        if (!val || !val.trim()) return 'AI prompt is required.';
        if (val.length > 5000) return 'AI prompt cannot exceed 5000 characters.';
        return null;
      case 'image':
        if (!val) return 'Please upload a template image.';
        return null;
      default:
        return null;
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let val;
    if (field === 'title') val = title;
    if (field === 'category') val = category;
    if (field === 'prompt') val = prompt;
    if (field === 'image') val = imageFileOrUrl;

    const err = validateField(field, val);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  // Tag management
  const handleAddTag = () => {
    const trimmed = tagInput.trim().toLowerCase().replace(/^#/, '');
    if (!trimmed) return;
    if (tags.includes(trimmed)) {
      setTagInput('');
      return;
    }
    setTags([...tags, trimmed]);
    setTagInput('');
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleCopyPrompt = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    setPromptCopied(true);
    toast.success('Prompt copied to clipboard!');
    setTimeout(() => setPromptCopied(false), 2000);
  };

  // Form submission (Draft vs Publish)
  const handleSubmit = async (publishImmediately) => {
    // Mark all as touched
    setTouched({ title: true, category: true, prompt: true, image: true });

    const titleErr = validateField('title', title);
    const categoryErr = validateField('category', category);
    const promptErr = validateField('prompt', prompt);
    const imageErr = validateField('image', imageFileOrUrl);

    setErrors({
      title: titleErr,
      category: categoryErr,
      prompt: promptErr,
      image: imageErr
    });

    if (titleErr || categoryErr || promptErr || imageErr) {
      toast.error('Please fix the errors in the form before saving.');
      return;
    }

    try {
      setSubmitting(true);

      const resolvedCategoryObj = TEMPLATE_CATEGORIES.find((c) => c.slug === category);
      const categoryName = resolvedCategoryObj
        ? `${resolvedCategoryObj.name} ${resolvedCategoryObj.emoji}`
        : category;

      // Handle image: File object vs URL string
      let finalImageUrl = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80';
      if (typeof imageFileOrUrl === 'string') {
        finalImageUrl = imageFileOrUrl;
      } else if (imageFileOrUrl instanceof File) {
        // In actual Supabase phase, this will upload to Supabase Storage bucket.
        // For now, create object URL for local session view
        finalImageUrl = URL.createObjectURL(imageFileOrUrl);
      }

      const payload = {
        title: title.trim(),
        category,
        categoryName,
        description: description.trim(),
        tags,
        prompt: prompt.trim(),
        imageUrl: finalImageUrl,
        thumbnailUrl: finalImageUrl,
        version: version.trim() || '1.0',
        sortOrder: Number(sortOrder) || 0,
        featured,
        trending,
        active: publishImmediately
      };

      if (isEditMode) {
        await templateRepository.updateTemplate(id, payload);
        toast.success(publishImmediately ? 'Template published successfully.' : 'Template saved as draft.');
      } else {
        await templateRepository.createTemplate(payload);
        toast.success(publishImmediately ? 'Template published successfully.' : 'Template draft saved successfully.');
      }

      navigate('/admin/templates');
    } catch (err) {
      console.error('Save template failed:', err);
      toast.error('Failed to save template. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px 0' }}>
        <LoadingState message="Loading template details..." />
      </div>
    );
  }

  const selectedCategoryObj = TEMPLATE_CATEGORIES.find((c) => c.slug === category);

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', paddingBottom: '60px' }}>
      {/* Header */}
      <PageHeader
        title={isEditMode ? 'Edit Template' : 'Create Template'}
        subtitle={
          isEditMode
            ? `Editing "${title || id}" • ID: ${id}`
            : 'Configure new AI generation style, prompt, metadata, and visuals.'
        }
        breadcrumbs={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Templates', path: '/admin/templates' },
          { label: isEditMode ? 'Edit' : 'New' }
        ]}
        actions={
          <button
            onClick={() => navigate('/admin/templates')}
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px' }}
          >
            <ArrowLeft size={14} />
            <span>Back to Templates</span>
          </button>
        }
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* =========================================================
            SECTION 1: Basic Information
            ========================================================= */}
        <div className="admin-card">
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
              1. Basic Information
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
              Primary naming, category taxonomy, description, and searchable tags.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Title */}
            <div>
              <label
                htmlFor="template-title"
                style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}
              >
                Template Title <span style={{ color: 'var(--danger)' }}>*</span>
              </label>
              <input
                id="template-title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (touched.title) setErrors((prev) => ({ ...prev, title: validateField('title', e.target.value) }));
                }}
                onBlur={() => handleBlur('title')}
                placeholder="e.g., Cinematic Rain Portrait"
                maxLength={100}
                style={{
                  borderColor: errors.title && touched.title ? 'var(--danger)' : undefined
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                {errors.title && touched.title ? (
                  <span style={{ fontSize: '12px', color: 'var(--danger)' }}>{errors.title}</span>
                ) : (
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Give the template a descriptive, catchy name.</span>
                )}
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{title.length} / 100</span>
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="template-category"
                style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}
              >
                Category <span style={{ color: 'var(--danger)' }}>*</span>
              </label>
              <select
                id="template-category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (touched.category) setErrors((prev) => ({ ...prev, category: validateField('category', e.target.value) }));
                }}
                onBlur={() => handleBlur('category')}
                style={{
                  borderColor: errors.category && touched.category ? 'var(--danger)' : undefined
                }}
              >
                <option value="">Select a category...</option>
                {TEMPLATE_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.emoji} {c.name}
                  </option>
                ))}
              </select>
              {errors.category && touched.category ? (
                <span style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '4px', display: 'block' }}>
                  {errors.category}
                </span>
              ) : (
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                  Determines where this template surfaces in the mobile app categories tab.
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="template-description"
                style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}
              >
                Description
              </label>
              <textarea
                id="template-description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe the visual mood, lighting, and aesthetic outcome..."
                style={{ resize: 'vertical' }}
              />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                Displayed to creators on the template detail sheet.
              </span>
            </div>

            {/* Tags Input */}
            <div>
              <label
                htmlFor="template-tags-input"
                style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}
              >
                Tags (Press Enter or Comma to add)
              </label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  id="template-tags-input"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="e.g. cinematic, rain, dramatic"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="btn btn-secondary btn-sm"
                  style={{ height: '40px', padding: '0 16px' }}
                >
                  <Plus size={16} />
                  <span>Add</span>
                </button>
              </div>

              {/* Tag Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', minHeight: '28px' }}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-color)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '12px',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <span>#{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        padding: 0
                      }}
                      aria-label={`Remove tag ${tag}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            SECTION 2: Template Image
            ========================================================= */}
        <div className="admin-card">
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
              2. Template Image <span style={{ color: 'var(--danger)' }}>*</span>
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
              High-resolution cover image shown on Explore feeds and detail screens.
            </p>
          </div>

          <ImageDropzone
            value={imageFileOrUrl}
            onChange={(fileOrUrl) => {
              setImageFileOrUrl(fileOrUrl);
              if (touched.image) {
                setErrors((prev) => ({ ...prev, image: validateField('image', fileOrUrl) }));
              }
            }}
            error={touched.image ? errors.image : null}
            onErrorClear={() => setErrors((prev) => ({ ...prev, image: null }))}
          />
        </div>

        {/* =========================================================
            SECTION 3: AI Prompt
            ========================================================= */}
        <div className="admin-card">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '16px',
              marginBottom: '20px'
            }}
          >
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                3. AI Generation Prompt <span style={{ color: 'var(--danger)' }}>*</span>
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                Master generative prompt passed to the transformation model.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyPrompt}
              disabled={!prompt}
              className="btn btn-secondary btn-sm"
              style={{ gap: '6px', fontSize: '12px' }}
            >
              {promptCopied ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
              <span>{promptCopied ? 'Copied' : 'Copy Prompt'}</span>
            </button>
          </div>

          <div>
            <textarea
              rows={7}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                if (touched.prompt) {
                  setErrors((prev) => ({ ...prev, prompt: validateField('prompt', e.target.value) }));
                }
              }}
              onBlur={() => handleBlur('prompt')}
              placeholder="e.g. Studio Ghibli style painting of a magical forest lake, anime masterpiece, Hayao Miyazaki aesthetic, warm vibrant daylight, lush foliage, sparkling water reflections, high art 8K..."
              maxLength={5000}
              style={{
                fontFamily: 'monospace',
                fontSize: '13px',
                lineHeight: 1.6,
                resize: 'vertical',
                borderColor: errors.prompt && touched.prompt ? 'var(--danger)' : undefined
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
              {errors.prompt && touched.prompt ? (
                <span style={{ fontSize: '12px', color: 'var(--danger)' }}>{errors.prompt}</span>
              ) : (
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Provide complete keywords, lighting, styles, and rendering parameters.
                </span>
              )}
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: prompt.length > 4800 ? 'var(--warning)' : 'var(--text-muted)'
                }}
              >
                {prompt.length} / 5000
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================
            SECTION 4: Metadata
            ========================================================= */}
        <div className="admin-card">
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
              4. Metadata & Discovery Flags
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
              Version control, display ordering, and promotional badge controls.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {/* Version */}
            <div>
              <label
                htmlFor="template-version"
                style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}
              >
                Version
              </label>
              <input
                id="template-version"
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="1.0"
              />
            </div>

            {/* Sort Order */}
            <div>
              <label
                htmlFor="template-sort-order"
                style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}
              >
                Sort Order Priority
              </label>
              <input
                id="template-sort-order"
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          {/* Toggle Switches */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-color)'
            }}
          >
            {/* Featured toggle */}
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '10px',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Featured Template</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Pin to homepage hero carousel</div>
              </div>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-purple)', cursor: 'pointer' }}
              />
            </label>

            {/* Trending toggle */}
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '10px',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Trending Badge</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Display trending flame badge</div>
              </div>
              <input
                type="checkbox"
                checked={trending}
                onChange={(e) => setTrending(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-purple)', cursor: 'pointer' }}
              />
            </label>

            {/* Active toggle */}
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '10px',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Active Status</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Visible to app users</div>
              </div>
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-purple)', cursor: 'pointer' }}
              />
            </label>
          </div>

          {/* Server-Controlled Protected Fields Notice */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '14px 16px',
              borderRadius: '10px',
              backgroundColor: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid var(--info-border)',
              marginTop: '20px'
            }}
          >
            <Info size={18} color="var(--info)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Protected Database Metrics:</span>{' '}
              Usage Count, Like Count, Creation Count, Created Date, and Updated Date are strictly managed by the backend engine and cannot be edited manually.
            </div>
          </div>
        </div>

        {/* =========================================================
            SECTION 5: Engagement & Activity Analytics (Read-Only)
            ========================================================= */}
        {isEditMode && engagementData && (
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BarChart2 size={18} color="var(--primary-purple)" />
                  <span>5. Engagement & Performance (Read-Only)</span>
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                  Real-time transformation usage, community favorites, and interaction volume.
                </p>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-muted)'
                }}
              >
                Read-Only Metrics
              </span>
            </div>

            {/* Metrics Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '14px',
                marginBottom: '20px'
              }}
            >
              <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <Play size={12} color="var(--primary-purple)" />
                  <span>Total Uses</span>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {(engagementData.totalUses || 0).toLocaleString()}
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <Heart size={12} color="#F43F5E" />
                  <span>Total Likes</span>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#F43F5E' }}>
                  {(engagementData.totalLikes || 0).toLocaleString()}
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <Bookmark size={12} color="#A78BFA" />
                  <span>Total Saves</span>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#A78BFA' }}>
                  {(engagementData.totalSaves || 0).toLocaleString()}
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <BarChart2 size={12} color="var(--warning)" />
                  <span>Combined Score</span>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--soft-purple)' }}>
                  {(engagementData.engagement || 0).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Recent Activity Table */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
                Recent Template Interactions
              </div>
              {!engagementData.recentActivity || engagementData.recentActivity.length === 0 ? (
                <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
                  No recent interactions logged for this template.
                </div>
              ) : (
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Action</th>
                        <th style={{ textAlign: 'right' }}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {engagementData.recentActivity.map((act) => (
                        <tr key={act.id}>
                          <td>
                            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                              {act.userName}
                            </span>
                          </td>
                          <td>
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: 600,
                                padding: '2px 6px',
                                borderRadius: '4px',
                                textTransform: 'uppercase',
                                backgroundColor: act.type === 'like' ? 'rgba(244, 63, 94, 0.1)' : act.type === 'use' ? 'var(--primary-dim)' : 'var(--bg-elevated)',
                                color: act.type === 'like' ? '#F43F5E' : act.type === 'use' ? 'var(--soft-purple)' : 'var(--text-secondary)'
                              }}
                            >
                              {act.type}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right', fontSize: '11px', color: 'var(--text-muted)' }}>
                            {new Date(act.timestamp).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================
            SECTION 6: Publishing Section
            ========================================================= */}
        <div
          className="admin-card"
          style={{
            position: 'sticky',
            bottom: '20px',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 40,
            border: '1px solid var(--border-strong)',
            backgroundColor: '#0F1118'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            {/* Publishing Summary Chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>
                Publishing Summary:
              </span>

              <StatusBadge
                status={active ? 'active' : 'inactive'}
                label={active ? 'Active' : 'Draft / Inactive'}
              />

              {category && selectedCategoryObj && (
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                >
                  {selectedCategoryObj.emoji} {selectedCategoryObj.name}
                </span>
              )}

              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-muted)'
                }}
              >
                v{version || '1.0'}
              </span>

              {featured && (
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(108, 77, 255, 0.15)',
                    color: 'var(--soft-purple)'
                  }}
                >
                  Featured
                </span>
              )}

              {trending && (
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(245, 158, 11, 0.15)',
                    color: 'var(--warning)'
                  }}
                >
                  Trending
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto' }}>
              <button
                type="button"
                onClick={() => navigate('/admin/templates')}
                disabled={submitting}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => handleSubmit(false)}
                disabled={submitting}
                className="btn btn-secondary btn-sm"
                style={{ gap: '6px' }}
              >
                <Save size={14} />
                <span>Save Draft</span>
              </button>

              <button
                type="button"
                onClick={() => handleSubmit(true)}
                disabled={submitting}
                className="btn btn-primary btn-sm"
                style={{ gap: '6px' }}
              >
                <Send size={14} />
                <span>{submitting ? 'Publishing...' : 'Publish Template'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
