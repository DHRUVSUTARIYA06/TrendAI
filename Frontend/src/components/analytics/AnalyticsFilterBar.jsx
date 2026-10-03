import React from 'react';
import { RotateCcw, Filter } from 'lucide-react';
import { ANALYTICS_DATE_RANGES, ANALYTICS_METRIC_OPTIONS } from '../../types/analytics';

const CATEGORY_FILTER_OPTIONS = [
  { value: 'all', label: 'All Categories' },
  { value: 'cinematic', label: 'Cinematic 🎬' },
  { value: 'anime', label: 'Anime 🎨' },
  { value: 'cyberpunk', label: 'Cyberpunk 🌃' },
  { value: 'portrait', label: 'Portrait 🖼️' },
  { value: 'fantasy', label: 'Fantasy 🐉' },
  { value: 'fashion', label: 'Fashion ✨' }
];

export default function AnalyticsFilterBar({
  dateRange,
  onDateRangeChange,
  metricFilter,
  onMetricFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  onClearFilters,
  hasActiveFilters
}) {
  return (
    <div
      className="admin-card"
      style={{
        padding: '14px 20px',
        marginBottom: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Filter size={16} color="var(--primary-purple)" />
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Analytics Filters
        </span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
        {/* Date Range Selector */}
        <select
          value={dateRange}
          onChange={(e) => onDateRangeChange(e.target.value)}
          style={{
            height: '36px',
            padding: '0 12px',
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          {ANALYTICS_DATE_RANGES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>

        {/* Metric Filter */}
        <select
          value={metricFilter}
          onChange={(e) => onMetricFilterChange(e.target.value)}
          style={{
            height: '36px',
            padding: '0 12px',
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          {ANALYTICS_METRIC_OPTIONS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryFilterChange(e.target.value)}
          style={{
            height: '36px',
            padding: '0 12px',
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          {CATEGORY_FILTER_OPTIONS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="btn btn-secondary btn-sm"
            style={{
              height: '36px',
              padding: '0 12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-secondary)'
            }}
          >
            <RotateCcw size={13} />
            <span>Clear Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
