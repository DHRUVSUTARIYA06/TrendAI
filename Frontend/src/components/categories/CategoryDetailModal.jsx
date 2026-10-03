import React, { useState, useEffect } from 'react';
import {
  Edit,
  Power,
  Trash2,
  Calendar,
  Layers,
  Sparkles,
  Star,
  Info
} from 'lucide-react';
import Modal from '../common/Modal';
import StatusBadge from '../common/StatusBadge';
import LoadingState from '../common/LoadingState';
import { formatDate } from '../../utils/formatters';
import { categoryRepository } from '../../repositories/categoryRepository';

const FALLBACK_CATEGORY_IMG = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80';

export default function CategoryDetailModal({
  isOpen,
  onClose,
  category,
  onEdit,
  onToggleStatus,
  onDelete
}) {
  const [templates, setTemplates] = useState([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);

  useEffect(() => {
    if (!category) return;

    let isMounted = true;
    const fetchTemplates = async () => {
      try {
        setLoadingTemplates(true);
        const list = await categoryRepository.getCategoryTemplates(category.id || category.slug);
        if (isMounted) setTemplates(list);
      } catch (err) {
        console.error('Failed to load category templates:', err);
      } finally {
        if (isMounted) setLoadingTemplates(false);
      }
    };

    fetchTemplates();
    return () => {
      isMounted = false;
    };
  }, [category]);

  if (!category) return null;

  const isActive = Boolean(category.active);
  const isFeatured = Boolean(category.featured);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Category Details"
      maxWidth="780px"
      footer={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Delete action */}
          <button
            onClick={() => {
              onClose();
              onDelete(category);
            }}
            className="btn btn-ghost btn-sm"
            style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => {
                onClose();
                onToggleStatus(category);
              }}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Power size={14} />
              <span>{isActive ? 'Deactivate' : 'Activate'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onEdit(category);
              }}
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Edit size={14} />
              <span>Edit Category</span>
            </button>
          </div>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {/* Top: Category Header Information */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 180px) 1fr', gap: '20px' }}>
          {/* Category Thumbnail / Cover */}
          <div
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              aspectRatio: '1 / 1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {category.imageUrl ? (
              <img
                src={category.imageUrl}
                alt={category.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_CATEGORY_IMG;
                }}
              />
            ) : (
              <span style={{ fontSize: '48px' }}>{category.emoji || '📁'}</span>
            )}
          </div>

          {/* Details & Badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <StatusBadge
                status={isActive ? 'active' : 'inactive'}
                label={isActive ? 'Active' : 'Inactive'}
              />

              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: 'var(--soft-purple)',
                  backgroundColor: 'var(--primary-dim)',
                  border: '1px solid var(--primary-border)',
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}
              >
                slug: {category.slug}
              </span>

              {isFeatured && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(245, 158, 11, 0.15)',
                    border: '1px solid rgba(245, 158, 11, 0.25)',
                    color: 'var(--warning)'
                  }}
                >
                  <Star size={11} fill="currentColor" /> Featured
                </span>
              )}

              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)'
                }}
              >
                Sort Order: {category.sortOrder ?? 0}
              </span>
            </div>

            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>
                {category.name} {category.emoji}
              </h2>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                ID: {category.id || category._id}
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {category.description || 'No description provided.'}
            </p>
          </div>
        </div>

        {/* Analytics Statistics Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px'
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px 14px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <Layers size={13} color="#A78BFA" /> Total Templates
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {(category.templateCount || 0).toLocaleString()}
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px 14px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <Sparkles size={13} color="var(--primary-purple)" /> Total Usage
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {(category.usageCount || 0).toLocaleString()}
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px 14px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <Calendar size={13} /> Created
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {formatDate(category.createdAt)}
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px 14px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <Info size={13} /> Last Updated
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {formatDate(category.updatedAt || category.createdAt)}
            </div>
          </div>
        </div>

        {/* Templates in Category Section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Templates in Category ({templates.length})
            </h4>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Templates assigned to this category slug
            </span>
          </div>

          {loadingTemplates ? (
            <LoadingState message="Loading templates..." />
          ) : templates.length === 0 ? (
            <div
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px dashed var(--border-color)',
                borderRadius: '8px',
                padding: '24px',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '12px'
              }}
            >
              No templates currently assigned to this category.
            </div>
          ) : (
            <div className="data-table-container" style={{ maxHeight: '220px', overflowY: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Template</th>
                    <th style={{ width: '90px', textAlign: 'right' }}>Uses</th>
                    <th style={{ width: '90px', textAlign: 'right' }}>Likes</th>
                    <th style={{ width: '90px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {templates.map((tpl) => (
                    <tr key={tpl.id || tpl._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={tpl.thumbnailUrl || tpl.imageUrl || FALLBACK_CATEGORY_IMG}
                            alt={tpl.title}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '6px',
                              objectFit: 'cover',
                              backgroundColor: 'var(--bg-primary)'
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = FALLBACK_CATEGORY_IMG;
                            }}
                          />
                          <div>
                            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                              {tpl.title}
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                              {tpl.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right', fontSize: '12px', fontWeight: 500 }}>
                        {(tpl.usageCount || 0).toLocaleString()}
                      </td>
                      <td style={{ textAlign: 'right', fontSize: '12px', fontWeight: 500, color: '#F43F5E' }}>
                        {(tpl.likeCount || 0).toLocaleString()}
                      </td>
                      <td>
                        <StatusBadge
                          status={tpl.active ? 'active' : 'inactive'}
                          label={tpl.active ? 'Active' : 'Inactive'}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
