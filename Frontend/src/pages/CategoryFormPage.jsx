import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Save,
  Send,
  ArrowLeft,
  Info,
  Sparkles
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import ImageDropzone from '../components/templates/ImageDropzone';
import LoadingState from '../components/common/LoadingState';
import StatusBadge from '../components/common/StatusBadge';
import { categoryRepository } from '../repositories/categoryRepository';
import { useToast } from '../context/ToastContext';

export default function CategoryFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const toast = useToast();

  // Form fields
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [emoji, setEmoji] = useState('✨');
  const [description, setDescription] = useState('');
  const [imageFileOrUrl, setImageFileOrUrl] = useState(null);
  const [sortOrder, setSortOrder] = useState(0);
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(true);

  // Validation
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Loading & submission
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);

  // Auto-generate slug from name
  const generateSlug = (rawName) => {
    return rawName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (val) => {
    setName(val);
    if (!slugManuallyEdited && !isEditMode) {
      setSlug(generateSlug(val));
    }
    if (touched.name) {
      setErrors((prev) => ({ ...prev, name: validateField('name', val) }));
    }
  };

  const handleSlugChange = (val) => {
    setSlugManuallyEdited(true);
    const cleaned = val.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setSlug(cleaned);
    if (touched.slug) {
      setErrors((prev) => ({ ...prev, slug: validateField('slug', cleaned) }));
    }
  };

  // Load category in edit mode
  useEffect(() => {
    if (!isEditMode) return;

    const fetchCategory = async () => {
      try {
        setLoading(true);
        const cat = await categoryRepository.getCategoryById(id);
        if (!cat) {
          toast.error(`Category ${id} not found.`);
          navigate('/admin/categories');
          return;
        }

        setName(cat.name || '');
        setSlug(cat.slug || '');
        setEmoji(cat.emoji || '✨');
        setDescription(cat.description || '');
        setImageFileOrUrl(cat.imageUrl || null);
        setSortOrder(cat.sortOrder ?? 0);
        setFeatured(Boolean(cat.featured));
        setActive(Boolean(cat.active));
        setSlugManuallyEdited(true);
      } catch (err) {
        console.error('Failed to load category:', err);
        toast.error('Failed to load category.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id, isEditMode, navigate, toast]);

  // Field validation
  const validateField = (field, val) => {
    switch (field) {
      case 'name':
        if (!val || !val.trim()) return 'Category name is required.';
        if (val.trim().length > 60) return 'Category name cannot exceed 60 characters.';
        return null;
      case 'slug':
        if (!val || !val.trim()) return 'Slug is required.';
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val.trim())) {
          return 'Slug can only contain lowercase letters, numbers, and hyphens.';
        }
        return null;
      case 'sortOrder':
        if (val === '' || isNaN(Number(val)) || Number(val) < 0) {
          return 'Sort order must be a non-negative number.';
        }
        return null;
      default:
        return null;
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let val;
    if (field === 'name') val = name;
    if (field === 'slug') val = slug;
    if (field === 'sortOrder') val = sortOrder;

    const err = validateField(field, val);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  // Submission
  const handleSubmit = async (publishImmediately) => {
    setTouched({ name: true, slug: true, sortOrder: true });

    const nameErr = validateField('name', name);
    const slugErr = validateField('slug', slug);
    const orderErr = validateField('sortOrder', sortOrder);

    setErrors({
      name: nameErr,
      slug: slugErr,
      sortOrder: orderErr
    });

    if (nameErr || slugErr || orderErr) {
      toast.error('Please fix errors in the form before saving.');
      return;
    }

    try {
      setSubmitting(true);

      // Handle image
      let finalImageUrl = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80';
      if (typeof imageFileOrUrl === 'string') {
        finalImageUrl = imageFileOrUrl;
      } else if (imageFileOrUrl instanceof File) {
        finalImageUrl = URL.createObjectURL(imageFileOrUrl);
      }

      const payload = {
        name: name.trim(),
        slug: slug.trim(),
        emoji: emoji.trim() || '✨',
        description: description.trim(),
        imageUrl: finalImageUrl,
        sortOrder: Number(sortOrder) || 0,
        featured,
        active: publishImmediately
      };

      if (isEditMode) {
        await categoryRepository.updateCategory(id, payload);
        toast.success(publishImmediately ? 'Category updated successfully.' : 'Category saved as draft.');
      } else {
        await categoryRepository.createCategory(payload);
        toast.success(publishImmediately ? 'Category created successfully.' : 'Category draft created successfully.');
      }

      navigate('/admin/categories');
    } catch (err) {
      console.error('Failed to save category:', err);
      toast.error(err.message || 'Failed to save category.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px 0' }}>
        <LoadingState message="Loading category..." />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', paddingBottom: '60px' }}>
      {/* Header */}
      <PageHeader
        title={isEditMode ? 'Edit Category' : 'Create Category'}
        subtitle={
          isEditMode
            ? `Editing "${name || id}" • ID: ${id}`
            : 'Configure new template category taxonomy, visual icon, and discovery priority.'
        }
        breadcrumbs={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Categories', path: '/admin/categories' },
          { label: isEditMode ? 'Edit' : 'New' }
        ]}
        actions={
          <button
            onClick={() => navigate('/admin/categories')}
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px' }}
          >
            <ArrowLeft size={14} />
            <span>Back to Categories</span>
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
              Primary naming, URL-friendly slug, and descriptive overview.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Category Name & Emoji */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '16px' }}>
              <div>
                <label
                  htmlFor="category-name"
                  style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}
                >
                  Category Name <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  id="category-name"
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onBlur={() => handleBlur('name')}
                  placeholder="e.g., Cinematic"
                  maxLength={60}
                  style={{
                    borderColor: errors.name && touched.name ? 'var(--danger)' : undefined
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  {errors.name && touched.name ? (
                    <span style={{ fontSize: '12px', color: 'var(--danger)' }}>{errors.name}</span>
                  ) : (
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Descriptive category title.</span>
                  )}
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{name.length} / 60</span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="category-emoji"
                  style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}
                >
                  Emoji Icon
                </label>
                <input
                  id="category-emoji"
                  type="text"
                  value={emoji}
                  onChange={(e) => setEmoji(e.target.value)}
                  placeholder="🎬"
                  maxLength={4}
                  style={{ textAlign: 'center', fontSize: '16px' }}
                />
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block', textAlign: 'center' }}>
                  Mobile badge icon
                </span>
              </div>
            </div>

            {/* Slug */}
            <div>
              <label
                htmlFor="category-slug"
                style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}
              >
                Slug <span style={{ color: 'var(--danger)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="category-slug"
                  type="text"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  onBlur={() => handleBlur('slug')}
                  placeholder="cinematic"
                  style={{
                    fontFamily: 'monospace',
                    paddingLeft: '14px',
                    borderColor: errors.slug && touched.slug ? 'var(--danger)' : undefined
                  }}
                />
              </div>
              {errors.slug && touched.slug ? (
                <span style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '4px', display: 'block' }}>
                  {errors.slug}
                </span>
              ) : (
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                  Unique URL-safe key used to bind templates to this category (e.g., <code>ai-art</code>).
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="category-description"
                style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}
              >
                Description
              </label>
              <textarea
                id="category-description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly explain the theme, artistic style, or mood of templates in this category..."
                maxLength={300}
                style={{ resize: 'vertical' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Shown in category exploration and administration dialogs.
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{description.length} / 300</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            SECTION 2: Appearance & Cover Image
            ========================================================= */}
        <div className="admin-card">
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
              2. Category Appearance
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
              Visual cover artwork shown in category headers and card thumbnails.
            </p>
          </div>

          <ImageDropzone
            value={imageFileOrUrl}
            onChange={(fileOrUrl) => setImageFileOrUrl(fileOrUrl)}
            error={null}
          />
        </div>

        {/* =========================================================
            SECTION 3: Publishing & Ordering
            ========================================================= */}
        <div className="admin-card">
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
              3. Publishing & Ordering
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
              Display order ranking and user visibility toggles.
            </p>
          </div>

          <div>
            {/* Sort Order */}
            <div style={{ maxWidth: '280px', marginBottom: '20px' }}>
              <label
                htmlFor="category-sort-order"
                style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}
              >
                Sort Order Priority
              </label>
              <input
                id="category-sort-order"
                type="number"
                min={0}
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                onBlur={() => handleBlur('sortOrder')}
                placeholder="1"
              />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                Lower numbers appear first in the app tab order.
              </span>
            </div>

            {/* Toggle switches */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '16px',
                paddingTop: '16px',
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
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Featured Category</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Highlight in top category cards</div>
                </div>
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
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
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Visible to users in the app</div>
                </div>
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary-purple)', cursor: 'pointer' }}
                />
              </label>
            </div>

            {/* Server-controlled fields notice */}
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
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Analytics & Metrics Notice:</span>{' '}
                Template Count, Total Usage, Created Date, and Updated Date are tracked automatically by the platform engine and cannot be modified manually.
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            SECTION 4: Publishing Summary & Buttons
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
            {/* Summary badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>
                Publishing Summary:
              </span>

              <StatusBadge
                status={active ? 'active' : 'inactive'}
                label={active ? 'Active' : 'Draft / Inactive'}
              />

              {slug && (
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--soft-purple)'
                  }}
                >
                  {slug}
                </span>
              )}

              {featured && (
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(245, 158, 11, 0.15)',
                    color: 'var(--warning)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}
                >
                  <Sparkles size={11} /> Featured
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto' }}>
              <button
                type="button"
                onClick={() => navigate('/admin/categories')}
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
                <span>{submitting ? 'Saving...' : 'Save Category'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
