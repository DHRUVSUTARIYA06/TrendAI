import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import {
  NOTIFICATION_STATUS_OPTIONS,
  NOTIFICATION_AUDIENCE_OPTIONS,
  NOTIFICATION_TYPE_OPTIONS,
  NOTIFICATION_DATE_OPTIONS
} from '../../types/notification';

export default function NotificationToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  audience,
  onAudienceChange,
  type,
  onTypeChange,
  dateRange,
  onDateRangeChange,
  onClearFilters,
  hasActiveFilters
}) {
  return (
    <div
      className="admin-card"
      style={{
        padding: '16px 20px',
        marginBottom: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}
    >
      {/* Search Input */}
      <div style={{ flex: '1 1 260px', minWidth: '220px', position: 'relative' }}>
        <Search
          size={16}
          style={{
            position: 'absolute',
            left: '12px',
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
          placeholder="Search notifications..."
          style={{
            width: '100%',
            height: '38px',
            padding: '0 12px 0 38px',
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontSize: '13px',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
        />
      </div>

      {/* Filter Controls Row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '10px',
          flex: '999 1 auto',
          justifyContent: 'flex-end'
        }}
      >
        {/* Status Dropdown */}
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          style={{
            height: '38px',
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
          {NOTIFICATION_STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Audience Dropdown */}
        <select
          value={audience}
          onChange={(e) => onAudienceChange(e.target.value)}
          style={{
            height: '38px',
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
          {NOTIFICATION_AUDIENCE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Type Dropdown */}
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          style={{
            height: '38px',
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
          {NOTIFICATION_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Date Range Dropdown */}
        <select
          value={dateRange}
          onChange={(e) => onDateRangeChange(e.target.value)}
          style={{
            height: '38px',
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
          {NOTIFICATION_DATE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="btn btn-secondary btn-sm"
            style={{
              height: '38px',
              padding: '0 14px',
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
