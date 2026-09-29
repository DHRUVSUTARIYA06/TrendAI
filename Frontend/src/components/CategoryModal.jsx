import React, { useState } from 'react';
import { X, Plus, Trash2, FolderPlus } from 'lucide-react';
import { createCategory, deleteCategory } from '../api';

export default function CategoryModal({ isOpen, onClose, categories = [], onCategoriesUpdated }) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('✨');
  const [order, setOrder] = useState(categories.length + 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError('');

    try {
      await createCategory({
        name: name.trim(),
        emoji: emoji.trim() || '✨',
        order: Number(order) || 0,
      });
      setName('');
      setEmoji('✨');
      setOrder(categories.length + 2);
      onCategoriesUpdated();
    } catch (err) {
      console.error('Create category error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id, catName) => {
    if (!window.confirm(`Are you sure you want to delete "${catName}"?`)) return;

    try {
      await deleteCategory(id);
      onCategoriesUpdated();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete category');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ec4899, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FolderPlus size={18} color="white" />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                Manage Categories
              </h2>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Categories are shown in the app bar & filters
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              color: 'var(--text-muted)',
              padding: '8px',
              borderRadius: '10px'
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
            padding: '10px 14px',
            borderRadius: '12px',
            marginBottom: '16px',
            fontSize: '13px'
          }}>
            {error}
          </div>
        )}

        {/* Add New Category Form */}
        <form onSubmit={handleAddCategory} style={{
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '16px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          marginBottom: '24px'
        }}>
          <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '12px', color: '#cbd5e1' }}>
            Add New Category
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 70px auto', gap: '10px', alignItems: 'center' }}>
            <div>
              <input
                type="text"
                placeholder="Emoji"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                maxLength={4}
                style={{ textAlign: 'center', fontSize: '18px' }}
                title="Emoji icon"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Category Name (e.g. Cyberpunk)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Order"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                title="Display Order"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="gradient-btn"
              style={{ padding: '11px 16px', fontSize: '13px' }}
            >
              <Plus size={16} /> Add
            </button>
          </div>
        </form>

        {/* Categories List */}
        <div>
          <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '12px', color: '#94a3b8' }}>
            Active Categories ({categories.length})
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            maxHeight: '340px',
            overflowY: 'auto'
          }}>
            {categories.map((cat) => (
              <div
                key={cat._id || cat.slug}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 16px',
                  background: '#191733',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '20px' }}>{cat.emoji}</span>
                  <div>
                    <span style={{ fontWeight: '600', fontSize: '14px' }}>{cat.name}</span>
                    <span style={{
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      marginLeft: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '2px 6px',
                      borderRadius: '6px'
                    }}>
                      slug: {cat.slug}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Order: {cat.order}</span>
                  <button
                    onClick={() => handleDeleteCategory(cat._id, cat.name)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.12)',
                      color: '#f87171',
                      padding: '6px 8px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title="Delete category"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
