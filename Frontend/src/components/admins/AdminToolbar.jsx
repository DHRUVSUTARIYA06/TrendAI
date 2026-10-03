import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { ADMIN_ROLE_OPTIONS, ADMIN_STATUS_OPTIONS } from '../../types/admin';

export default function AdminToolbar({
  search,
  onSearchChange,
  role,
  onRoleChange,
  status,
  onStatusChange,
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
          placeholder="Search admins by name or email..."
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

      {/* Filter Selectors Row */}
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
        {/* Role Filter */}
        <select
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
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
          {ADMIN_ROLE_OPTIONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>

        {/* Status Filter */}
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
          {ADMIN_STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
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
