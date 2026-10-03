import React from 'react';
import {
  MoreHorizontal,
  Eye,
  Edit,
  Power,
  Star,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import Dropdown from '../common/Dropdown';
import EmptyState from '../common/EmptyState';
import { formatDate } from '../../utils/formatters';

const FALLBACK_CATEGORY_IMG = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80';

export default function CategoryTable({
  categories = [],
  sortBy = 'sort-order',
  onSortChange,
  onView,
  onEdit,
  onToggleStatus,
  onToggleFeatured,
  onDelete,
  onClearFilters,
  onAddCategory
}) {
  if (!categories || categories.length === 0) {
    return (
      <div className="admin-card" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <EmptyState
          title="No categories found"
          description="Try changing your search keywords or adjusting your filters."
          actionLabel="Clear Filters"
          onAction={onClearFilters || onAddCategory}
        />
      </div>
    );
  }

  const renderSortIndicator = (columnKey) => {
    let isActive = false;
    let isAsc = false;

    if (columnKey === 'name') {
      isActive = sortBy === 'name-asc' || sortBy === 'name-desc';
      isAsc = sortBy === 'name-asc';
    } else if (columnKey === 'templates') {
      isActive = sortBy === 'most-templates';
      isAsc = false;
    } else if (columnKey === 'uses') {
      isActive = sortBy === 'most-used';
      isAsc = false;
    } else if (columnKey === 'order') {
      isActive = sortBy === 'sort-order';
      isAsc = true;
    } else if (columnKey === 'updated') {
      isActive = sortBy === 'newest' || sortBy === 'oldest';
      isAsc = sortBy === 'oldest';
    }

    if (!isActive) {
      return <ArrowUpDown size={12} style={{ opacity: 0.35, marginLeft: '4px' }} />;
    }

    return isAsc ? (
      <ArrowUp size={12} style={{ color: 'var(--primary-purple)', marginLeft: '4px' }} />
    ) : (
      <ArrowDown size={12} style={{ color: 'var(--primary-purple)', marginLeft: '4px' }} />
    );
  };

  const handleHeaderSortClick = (columnKey) => {
    if (!onSortChange) return;

    if (columnKey === 'name') {
      onSortChange(sortBy === 'name-asc' ? 'name-desc' : 'name-asc');
    } else if (columnKey === 'templates') {
      onSortChange(sortBy === 'most-templates' ? 'sort-order' : 'most-templates');
    } else if (columnKey === 'uses') {
      onSortChange(sortBy === 'most-used' ? 'sort-order' : 'most-used');
    } else if (columnKey === 'order') {
      onSortChange('sort-order');
    } else if (columnKey === 'updated') {
      onSortChange(sortBy === 'newest' ? 'oldest' : 'newest');
    }
  };

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: '64px', paddingLeft: '18px' }}>Icon</th>
            <th
              onClick={() => handleHeaderSortClick('name')}
              style={{ cursor: 'pointer', userSelect: 'none' }}
              title="Click to sort by Name"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span>Category</span>
                {renderSortIndicator('name')}
              </div>
            </th>
            <th style={{ width: '130px' }}>Slug</th>
            <th
              onClick={() => handleHeaderSortClick('templates')}
              style={{ width: '110px', textAlign: 'right', cursor: 'pointer', userSelect: 'none' }}
              title="Click to sort by Template Count"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
                <span>Templates</span>
                {renderSortIndicator('templates')}
              </div>
            </th>
            <th
              onClick={() => handleHeaderSortClick('uses')}
              style={{ width: '110px', textAlign: 'right', cursor: 'pointer', userSelect: 'none' }}
              title="Click to sort by Uses"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
                <span>Uses</span>
                {renderSortIndicator('uses')}
              </div>
            </th>
            <th style={{ width: '95px' }}>Status</th>
            <th style={{ width: '105px' }}>Featured</th>
            <th
              onClick={() => handleHeaderSortClick('order')}
              style={{ width: '85px', textAlign: 'center', cursor: 'pointer', userSelect: 'none' }}
              title="Click to sort by Sort Order"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <span>Order</span>
                {renderSortIndicator('order')}
              </div>
            </th>
            <th
              onClick={() => handleHeaderSortClick('updated')}
              style={{ width: '115px', cursor: 'pointer', userSelect: 'none' }}
              title="Click to sort by Updated Date"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span>Updated</span>
                {renderSortIndicator('updated')}
              </div>
            </th>
            <th style={{ width: '60px', textAlign: 'center', paddingRight: '18px' }}>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => {
            const isActive = Boolean(cat.active);
            const isFeatured = Boolean(cat.featured);

            return (
              <tr key={cat.id || cat._id}>
                {/* Thumbnail / Emoji */}
                <td style={{ paddingLeft: '18px', width: '64px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                  >
                    {cat.imageUrl ? (
                      <img
                        src={cat.imageUrl}
                        alt={cat.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = FALLBACK_CATEGORY_IMG;
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: '22px' }}>{cat.emoji || '📁'}</span>
                    )}
                  </div>
                </td>

                {/* Category Name & Description */}
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        onClick={() => onView && onView(cat)}
                        className="template-title-link"
                        style={{
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        {cat.name}
                      </span>
                      {cat.emoji && <span style={{ fontSize: '13px' }}>{cat.emoji}</span>}
                    </div>
                    {cat.description && (
                      <p
                        style={{
                          fontSize: '11px',
                          color: 'var(--text-muted)',
                          margin: 0,
                          lineHeight: 1.4,
                          maxWidth: '320px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {cat.description}
                      </p>
                    )}
                  </div>
                </td>

                {/* Slug */}
                <td>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'monospace',
                      color: 'var(--soft-purple)',
                      backgroundColor: 'var(--primary-dim)',
                      border: '1px solid var(--primary-border)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      display: 'inline-block'
                    }}
                  >
                    {cat.slug}
                  </span>
                </td>

                {/* Template Count */}
                <td style={{ textAlign: 'right', fontWeight: 600, fontSize: '13px' }}>
                  {(cat.templateCount || 0).toLocaleString()}
                </td>

                {/* Uses */}
                <td style={{ textAlign: 'right', fontWeight: 600, fontSize: '13px', color: '#A78BFA' }}>
                  {(cat.usageCount || 0).toLocaleString()}
                </td>

                {/* Status */}
                <td>
                  <StatusBadge
                    status={isActive ? 'active' : 'inactive'}
                    label={isActive ? 'Active' : 'Inactive'}
                  />
                </td>

                {/* Featured */}
                <td>
                  {isFeatured ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'rgba(245, 158, 11, 0.12)',
                        border: '1px solid rgba(245, 158, 11, 0.25)',
                        color: 'var(--warning)',
                        fontSize: '11px',
                        fontWeight: 600
                      }}
                    >
                      <Star size={10} fill="currentColor" />
                      <span>Featured</span>
                    </span>
                  ) : (
                    <span style={{ fontSize: '11px', color: 'var(--text-disabled)' }}>—</span>
                  )}
                </td>

                {/* Sort Order */}
                <td style={{ textAlign: 'center' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      width: '26px',
                      height: '24px',
                      lineHeight: '24px',
                      borderRadius: '6px',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-color)',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {cat.sortOrder ?? '-'}
                  </span>
                </td>

                {/* Updated Date */}
                <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {formatDate(cat.updatedAt || cat.createdAt)}
                </td>

                {/* 3-Dot Actions Menu */}
                <td style={{ textAlign: 'center', paddingRight: '18px' }}>
                  <Dropdown
                    align="right"
                    width="190px"
                    trigger={
                      <button
                        className="btn-icon"
                        style={{ width: '32px', height: '32px', borderRadius: '6px' }}
                        title="Category actions"
                        aria-label={`Actions for ${cat.name}`}
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    }
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {/* View Details */}
                      <button
                        onClick={() => onView && onView(cat)}
                        className="btn-ghost"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          width: '100%',
                          textAlign: 'left',
                          fontSize: '12px'
                        }}
                      >
                        <Eye size={14} color="var(--text-secondary)" />
                        <span>View Details</span>
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => onEdit && onEdit(cat)}
                        className="btn-ghost"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          width: '100%',
                          textAlign: 'left',
                          fontSize: '12px'
                        }}
                      >
                        <Edit size={14} color="var(--text-secondary)" />
                        <span>Edit Category</span>
                      </button>

                      {/* Activate / Deactivate */}
                      <button
                        onClick={() => onToggleStatus && onToggleStatus(cat)}
                        className="btn-ghost"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          width: '100%',
                          textAlign: 'left',
                          fontSize: '12px',
                          color: isActive ? 'var(--warning)' : 'var(--success)'
                        }}
                      >
                        <Power size={14} />
                        <span>{isActive ? 'Deactivate' : 'Activate'}</span>
                      </button>

                      {/* Toggle Featured */}
                      <button
                        onClick={() => onToggleFeatured && onToggleFeatured(cat)}
                        className="btn-ghost"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          width: '100%',
                          textAlign: 'left',
                          fontSize: '12px',
                          color: isFeatured ? 'var(--text-muted)' : 'var(--warning)'
                        }}
                      >
                        <Star size={14} />
                        <span>{isFeatured ? 'Remove Featured' : 'Set as Featured'}</span>
                      </button>

                      <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '4px 0' }} />

                      {/* Delete */}
                      <button
                        onClick={() => onDelete && onDelete(cat)}
                        className="btn-ghost"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          width: '100%',
                          textAlign: 'left',
                          fontSize: '12px',
                          color: 'var(--danger)'
                        }}
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </Dropdown>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
