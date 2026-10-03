import React from 'react';
import { Search, X, RotateCcw } from 'lucide-react';
import {
  DATE_RANGE_OPTIONS,
  ACTIVITY_TYPE_OPTIONS,
  ACTIVITY_STATUS_OPTIONS
} from '../../types/activity';

export default function ActivityToolbar({
  search = '',
  onSearchChange,
  dateRange = '30d',
  onDateRangeChange,
  activityType = 'all',
  onActivityTypeChange,
  status = 'all',
  onStatusChange,
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
      <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '360px', minWidth: '220px' }}>
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
          placeholder="Search users or templates..."
          style={{
            width: '100%',
            paddingLeft: '38px',
            paddingRight: search ? '36px' : '14px',
            height: '40px',
            borderRadius: '10px'
          }}
          aria-label="Search Activity Logs"
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

      {/* Filter Dropdowns */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        {/* Date Range Select */}
        <select
          value={dateRange}
          onChange={(e) => onDateRangeChange(e.target.value)}
          style={{
            height: '40px',
            width: '130px',
            borderRadius: '10px',
            paddingTop: '8px',
            paddingBottom: '8px'
          }}
          aria-label="Filter by Date Range"
        >
          {DATE_RANGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Activity Type Select */}
        <select
          value={activityType}
          onChange={(e) => onActivityTypeChange(e.target.value)}
          style={{
            height: '40px',
            width: '150px',
            borderRadius: '10px',
            paddingTop: '8px',
            paddingBottom: '8px'
          }}
          aria-label="Filter by Activity Type"
        >
          {ACTIVITY_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* User Status Select */}
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
          aria-label="Filter by User Status"
        >
          {ACTIVITY_STATUS_OPTIONS.map((opt) => (
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
            <span>Clear Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
