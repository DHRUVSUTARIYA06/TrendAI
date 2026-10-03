import React from 'react';
import { Search, X, RotateCcw } from 'lucide-react';
import { TEMPLATE_CATEGORIES, TEMPLATE_STATUS_OPTIONS, TEMPLATE_SORT_OPTIONS } from '../../types/template';

export default function TemplateToolbar({
  search = '',
  onSearchChange,
  category = 'all',
  onCategoryChange,
  status = 'all',
  onStatusChange,
  sortBy = 'newest',
  onSortChange,
  hasActiveFilters = false,
  onClearFilters
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        marginBottom: '20px'
      }}
    >
      {/* Left side: Search bar */}
      <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: '420px', minWidth: '240px' }}>
        <Search
          size={16}
          style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            pointerEvents: 'none'
          }}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search templates by title, category, ID..."
          style={{
            width: '100%',
            paddingLeft: '38px',
            paddingRight: search ? '36px' : '14px',
            height: '40px',
            borderRadius: '10px'
          }}
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2px',
              borderRadius: '4px'
            }}
            title="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Right side: Filters & Sorting */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        {/* Category filter */}
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          style={{
            height: '40px',
            width: '150px',
            borderRadius: '10px',
            paddingTop: '8px',
            paddingBottom: '8px'
          }}
          aria-label="Filter by Category"
        >
          <option value="all">All Categories</option>
          {TEMPLATE_CATEGORIES.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.emoji} {cat.name}
            </option>
          ))}
        </select>

        {/* Status filter */}
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          style={{
            height: '40px',
            width: '135px',
            borderRadius: '10px',
            paddingTop: '8px',
            paddingBottom: '8px'
          }}
          aria-label="Filter by Status"
        >
          {TEMPLATE_STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Sort by */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          style={{
            height: '40px',
            width: '150px',
            borderRadius: '10px',
            paddingTop: '8px',
            paddingBottom: '8px'
          }}
          aria-label="Sort Templates"
        >
          {TEMPLATE_SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="btn btn-ghost btn-sm"
            style={{
              height: '40px',
              padding: '0 12px',
              color: 'var(--soft-purple)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="Reset all filters"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
