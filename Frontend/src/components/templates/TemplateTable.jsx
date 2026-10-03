import React from 'react';
import {
  MoreHorizontal,
  Eye,
  Edit,
  Copy,
  Power,
  Trash2,
  Flame,
  Star,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import Dropdown from '../common/Dropdown';
import EmptyState from '../common/EmptyState';
import { formatDate } from '../../utils/formatters';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80';

export default function TemplateTable({
  templates = [],
  sortBy = 'newest',
  onSortChange,
  onView,
  onEdit,
  onDuplicate,
  onToggleStatus,
  onDelete,
  onClearFilters
}) {
  if (!templates || templates.length === 0) {
    return (
      <div className="admin-card" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <EmptyState
          title="No templates found"
          description="Try changing your search query or reset your filters."
          actionLabel="Clear Filters"
          onAction={onClearFilters}
        />
      </div>
    );
  }

  const renderSortIndicator = (columnKey) => {
    let isActive = false;
    let isAsc = false;

    if (columnKey === 'title') {
      isActive = sortBy === 'title-asc' || sortBy === 'title-desc';
      isAsc = sortBy === 'title-asc';
    } else if (columnKey === 'uses') {
      isActive = sortBy === 'most-used';
      isAsc = false;
    } else if (columnKey === 'likes') {
      isActive = sortBy === 'most-liked';
      isAsc = false;
    } else if (columnKey === 'created') {
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

    if (columnKey === 'title') {
      onSortChange(sortBy === 'title-asc' ? 'title-desc' : 'title-asc');
    } else if (columnKey === 'uses') {
      onSortChange(sortBy === 'most-used' ? 'newest' : 'most-used');
    } else if (columnKey === 'likes') {
      onSortChange(sortBy === 'most-liked' ? 'newest' : 'most-liked');
    } else if (columnKey === 'created') {
      onSortChange(sortBy === 'newest' ? 'oldest' : 'newest');
    }
  };

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: '70px', paddingLeft: '20px' }}>Image</th>
            <th
              onClick={() => handleHeaderSortClick('title')}
              style={{ cursor: 'pointer', userSelect: 'none' }}
              title="Click to sort by Title"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span>Template</span>
                {renderSortIndicator('title')}
              </div>
            </th>
            <th style={{ width: '130px' }}>Category</th>
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
            <th
              onClick={() => handleHeaderSortClick('likes')}
              style={{ width: '110px', textAlign: 'right', cursor: 'pointer', userSelect: 'none' }}
              title="Click to sort by Likes"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
                <span>Likes</span>
                {renderSortIndicator('likes')}
              </div>
            </th>
            <th style={{ width: '100px' }}>Status</th>
            <th
              onClick={() => handleHeaderSortClick('created')}
              style={{ width: '125px', cursor: 'pointer', userSelect: 'none' }}
              title="Click to sort by Date Created"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span>Created</span>
                {renderSortIndicator('created')}
              </div>
            </th>
            <th style={{ width: '60px', textAlign: 'center', paddingRight: '20px' }}>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {templates.map((tpl) => {
            const isActive = Boolean(tpl.active);
            const isFeatured = Boolean(tpl.featured);
            const isTrending = Boolean(tpl.trending);

            return (
              <tr key={tpl.id || tpl._id}>
                {/* Thumbnail */}
                <td style={{ paddingLeft: '20px', width: '70px' }}>
                  <img
                    src={tpl.thumbnailUrl || tpl.imageUrl || FALLBACK_IMG}
                    alt={tpl.title}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-color)',
                      display: 'block'
                    }}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = FALLBACK_IMG;
                    }}
                  />
                </td>

                {/* Title & ID & Badges */}
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span
                        onClick={() => onView && onView(tpl)}
                        style={{
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                        className="template-title-link"
                      >
                        {tpl.title}
                      </span>

                      {/* Small Subtle Badges */}
                      {isFeatured && (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
                            padding: '1px 6px',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(108, 77, 255, 0.15)',
                            color: 'var(--soft-purple)',
                            fontSize: '10px',
                            fontWeight: 600
                          }}
                          title="Featured in Promptoo App"
                        >
                          <Star size={10} />
                          Featured
                        </span>
                      )}

                      {isTrending && (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
                            padding: '1px 6px',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(245, 158, 11, 0.15)',
                            color: 'var(--warning)',
                            fontSize: '10px',
                            fontWeight: 600
                          }}
                          title="Trending on Explore"
                        >
                          <Flame size={10} />
                          Trending
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                      ID: {tpl.id || tpl._id}
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-color)',
                      fontSize: '11px',
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                      textTransform: 'capitalize'
                    }}
                  >
                    {tpl.categoryName || tpl.category}
                  </span>
                </td>

                {/* Uses */}
                <td style={{ textAlign: 'right', fontWeight: 600, fontSize: '13px' }}>
                  {(tpl.usageCount || 0).toLocaleString()}
                </td>

                {/* Likes */}
                <td style={{ textAlign: 'right', fontWeight: 600, fontSize: '13px', color: '#F43F5E' }}>
                  {(tpl.likeCount || 0).toLocaleString()}
                </td>

                {/* Status */}
                <td>
                  <StatusBadge
                    status={isActive ? 'active' : 'inactive'}
                    label={isActive ? 'Active' : 'Inactive'}
                  />
                </td>

                {/* Created Date */}
                <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {formatDate(tpl.createdAt)}
                </td>

                {/* Actions Menu */}
                <td style={{ textAlign: 'center', paddingRight: '20px' }}>
                  <Dropdown
                    align="right"
                    width="180px"
                    trigger={
                      <button
                        className="btn-icon"
                        style={{ width: '32px', height: '32px', borderRadius: '6px' }}
                        title="Template actions"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    }
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {/* View */}
                      <button
                        onClick={() => onView && onView(tpl)}
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
                        onClick={() => onEdit && onEdit(tpl)}
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
                        <span>Edit Template</span>
                      </button>

                      {/* Duplicate */}
                      <button
                        onClick={() => onDuplicate && onDuplicate(tpl)}
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
                        <Copy size={14} color="var(--text-secondary)" />
                        <span>Duplicate</span>
                      </button>

                      {/* Activate / Deactivate */}
                      <button
                        onClick={() => onToggleStatus && onToggleStatus(tpl)}
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

                      {/* Divider */}
                      <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '4px 0' }} />

                      {/* Delete */}
                      <button
                        onClick={() => onDelete && onDelete(tpl)}
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
