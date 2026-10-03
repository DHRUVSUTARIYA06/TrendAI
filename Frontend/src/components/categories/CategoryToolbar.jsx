import React from 'react';
import { Search, X, RotateCcw } from 'lucide-react';
import {
  CATEGORY_STATUS_OPTIONS,
  CATEGORY_FEATURED_OPTIONS,
  CATEGORY_SORT_OPTIONS
} from '../../types/category';

export default function CategoryToolbar({
  search = '',
  onSearchChange,
  status = 'all',
  onStatusChange,
  featured = 'all',
  onFeaturedChange,
  sortBy = 'sort-order',
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
      {/* Search Input */}
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
          placeholder="Search categories by name, slug, description..."
          style={{
            width: '100%',
            paddingLeft: '38px',
            paddingRight: search ? '36px' : '14px',
            height: '40px',
            borderRadius: '10px'
          }}
          aria-label="Search Categories"
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

      {/* Filters & Sorting */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '10px'
        }}
      >
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
          {CATEGORY_STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Featured filter */}
        <select
          value={featured}
          onChange={(e) => onFeaturedChange(e.target.value)}
          style={{
            height: '40px',
            width: '145px',
            borderRadius: '10px',
            paddingTop: '8px',
            paddingBottom: '8px'
          }}
          aria-label="Filter by Featured"
        >
          {CATEGORY_FEATURED_OPTIONS.map((opt) => (
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
            width: '155px',
            borderRadius: '10px',
            paddingTop: '8px',
            paddingBottom: '8px'
          }}
          aria-label="Sort Categories"
        >
          {CATEGORY_SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Reset button */}
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
            title="Reset filters"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
