import React from 'react';
import { Search, X, RotateCcw } from 'lucide-react';
import {
  LEADERBOARD_STATUS_OPTIONS,
  LEADERBOARD_ACTIVITY_OPTIONS,
  LEADERBOARD_PERIOD_OPTIONS
} from '../../types/leaderboard';

export default function LeaderboardToolbar({
  search = '',
  onSearchChange,
  period = 'weekly',
  onPeriodChange,
  status = 'all',
  onStatusChange,
  activity = 'all',
  onActivityChange,
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
          placeholder="Search users by name, username, or email..."
          style={{
            width: '100%',
            paddingLeft: '38px',
            paddingRight: search ? '36px' : '14px',
            height: '40px',
            borderRadius: '10px'
          }}
          aria-label="Search Leaderboard Users"
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

      {/* Controls & Filters */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        {/* Period Pill Switcher */}
        <div
          style={{
            display: 'inline-flex',
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '3px',
            gap: '3px',
            height: '40px',
            alignItems: 'center'
          }}
        >
          {LEADERBOARD_PERIOD_OPTIONS.map((opt) => {
            const isSelected = period === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onPeriodChange(opt.value)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '7px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: isSelected ? 'var(--primary-purple)' : 'transparent',
                  color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

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
          {LEADERBOARD_STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Activity filter */}
        <select
          value={activity}
          onChange={(e) => onActivityChange(e.target.value)}
          style={{
            height: '40px',
            width: '175px',
            borderRadius: '10px',
            paddingTop: '8px',
            paddingBottom: '8px'
          }}
          aria-label="Filter by Activity"
        >
          {LEADERBOARD_ACTIVITY_OPTIONS.map((opt) => (
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
