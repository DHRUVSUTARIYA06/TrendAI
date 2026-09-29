import React, { useState } from 'react';
import { Search, Flame, Edit, Trash2, Eye, Sparkles } from 'lucide-react';
import { deleteTemplate } from '../api';

export default function TemplateGrid({
  templates = [],
  categories = [],
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onEditTemplate,
  onViewPrompt,
  onTemplatesUpdated,
}) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete template "${title}"?`)) return;

    setDeletingId(id);
    try {
      await deleteTemplate(id);
      onTemplatesUpdated();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete template');
    } finally {
      setDeletingId(null);
    }
  };

  const getCategoryEmoji = (slug) => {
    const found = categories.find((c) => c.slug === slug);
    return found ? found.emoji : '✨';
  };

  return (
    <div>
      {/* Controls Bar: Search & Category Filter */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '28px'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '480px' }}>
          <Search
            size={18}
            color="var(--text-muted)"
            style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Search templates by title, description or prompt..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ paddingLeft: '44px' }}
          />
        </div>

        {/* Dynamic Category Filter Pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          scrollbarWidth: 'none',
        }}>
          <button
            onClick={() => onSelectCategory('all')}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              background: selectedCategory === 'all'
                ? 'linear-gradient(135deg, #8b5cf6, #ec4899)'
                : 'rgba(255, 255, 255, 0.05)',
              color: selectedCategory === 'all' ? 'white' : 'var(--text-muted)',
              border: `1px solid ${selectedCategory === 'all' ? 'transparent' : 'rgba(255, 255, 255, 0.08)'}`,
            }}
          >
            ✨ All ({templates.length})
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat._id || cat.slug}
                onClick={() => onSelectCategory(cat.slug)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                  background: isSelected
                    ? 'linear-gradient(135deg, #8b5cf6, #ec4899)'
                    : 'rgba(255, 255, 255, 0.05)',
                  color: isSelected ? 'white' : 'var(--text-muted)',
                  border: `1px solid ${isSelected ? 'transparent' : 'rgba(255, 255, 255, 0.08)'}`,
                }}
              >
                {cat.emoji} {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Templates Grid */}
      {templates.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Sparkles size={48} color="#a78bfa" style={{ margin: '0 auto 16px auto', opacity: 0.8 }} />
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
            No templates found
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Try changing your search query or upload your first template using the button above.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {templates.map((tpl) => (
            <div
              key={tpl._id}
              className="card"
              style={{
                padding: '0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 32px -8px rgba(0, 0, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Image Preview */}
              <div style={{ position: 'relative', width: '100%', height: '220px', background: '#1c1938' }}>
                <img
                  src={tpl.imageUrl}
                  alt={tpl.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80';
                  }}
                />

                {/* Trending Badge */}
                {tpl.isTrending && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
                  }}>
                    <Flame size={12} fill="white" />
                    <span>TRENDING</span>
                  </div>
                )}

                {/* Category Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(10, 9, 21, 0.75)',
                  backdropFilter: 'blur(8px)',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '4px 10px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}>
                  {getCategoryEmoji(tpl.category)} {tpl.category}
                </div>

                {/* Usage Count */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  background: 'rgba(0, 0, 0, 0.65)',
                  backdropFilter: 'blur(6px)',
                  color: '#e2e8f0',
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '3px 8px',
                  borderRadius: '8px'
                }}>
                  ✨ {tpl.usageCount ? tpl.usageCount.toLocaleString() : 0} uses
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px', color: '#f8fafc' }}>
                  {tpl.title}
                </h3>
                <p style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  lineHeight: '1.4',
                  marginBottom: '14px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {tpl.description || tpl.prompt}
                </p>

                {/* Prompt preview button */}
                <button
                  onClick={() => onViewPrompt(tpl)}
                  style={{
                    background: 'rgba(139, 92, 246, 0.1)',
                    color: '#c084fc',
                    border: '1px solid rgba(139, 92, 246, 0.25)',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    marginBottom: '16px',
                  }}
                >
                  <Eye size={14} /> View AI Prompt
                </button>

                {/* Actions Footer */}
                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingTop: '12px'
                }}>
                  <button
                    onClick={() => onEditTemplate(tpl)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#cbd5e1',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Edit size={13} /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(tpl._id, tpl.title)}
                    disabled={deletingId === tpl._id}
                    style={{
                      background: 'rgba(239, 68, 68, 0.12)',
                      color: '#f87171',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
