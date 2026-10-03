import React from 'react';
import {
  MoreHorizontal,
  Eye,
  Activity,
  Edit,
  CheckCircle,
  PauseCircle,
  Ban,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import Dropdown from '../common/Dropdown';
import EmptyState from '../common/EmptyState';
import { formatDate } from '../../utils/formatters';

// Format time ago e.g. "2 hours ago", "Yesterday", "3 days ago"
function formatTimeAgo(dateString) {
  if (!dateString) return 'Never';
  const now = Date.now();
  const past = new Date(dateString).getTime();
  const diffSec = Math.floor((now - past) / 1000);

  if (diffSec < 60) return 'Just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 172800) return 'Yesterday';
  const days = Math.floor(diffSec / 86400);
  if (days < 30) return `${days}d ago`;
  return formatDate(dateString);
}

// Generate initials from display name e.g. "Dhruv Sutariya" -> "DS"
function getInitials(name = '') {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function UserTable({
  users = [],
  sortBy = 'newest',
  onSortChange,
  onViewProfile,
  onViewActivity,
  onEditProfile,
  onStatusAction,
  onClearFilters
}) {
  if (!users || users.length === 0) {
    return (
      <div className="admin-card" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <EmptyState
          title="No users found"
          description="Try adjusting your search criteria or resetting active filters."
          actionLabel="Clear Filters"
          onAction={onClearFilters}
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
    } else if (columnKey === 'creations') {
      isActive = sortBy === 'most-creations';
      isAsc = false;
    } else if (columnKey === 'saved') {
      isActive = sortBy === 'most-saved';
      isAsc = false;
    } else if (columnKey === 'active') {
      isActive = sortBy === 'most-active';
      isAsc = false;
    } else if (columnKey === 'joined') {
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
    } else if (columnKey === 'creations') {
      onSortChange(sortBy === 'most-creations' ? 'newest' : 'most-creations');
    } else if (columnKey === 'saved') {
      onSortChange(sortBy === 'most-saved' ? 'newest' : 'most-saved');
    } else if (columnKey === 'active') {
      onSortChange(sortBy === 'most-active' ? 'newest' : 'most-active');
    } else if (columnKey === 'joined') {
      onSortChange(sortBy === 'newest' ? 'oldest' : 'newest');
    }
  };

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th
              onClick={() => handleHeaderSortClick('name')}
              style={{ width: '230px', paddingLeft: '18px', cursor: 'pointer', userSelect: 'none' }}
              title="Click to sort by Name"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span>User</span>
                {renderSortIndicator('name')}
              </div>
            </th>
            <th>Email</th>
            <th style={{ width: '100px' }}>Status</th>
            <th
              onClick={() => handleHeaderSortClick('creations')}
              style={{ width: '95px', textAlign: 'right', cursor: 'pointer', userSelect: 'none' }}
              title="Click to sort by Creations"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
                <span>Creations</span>
                {renderSortIndicator('creations')}
              </div>
            </th>
            <th
              onClick={() => handleHeaderSortClick('saved')}
              style={{ width: '85px', textAlign: 'right', cursor: 'pointer', userSelect: 'none' }}
              title="Click to sort by Saved Templates"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
                <span>Saved</span>
                {renderSortIndicator('saved')}
              </div>
            </th>
            <th style={{ width: '85px', textAlign: 'right' }}>Likes</th>
            <th
              onClick={() => handleHeaderSortClick('active')}
              style={{ width: '120px', cursor: 'pointer', userSelect: 'none' }}
              title="Click to sort by Last Activity"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span>Last Active</span>
                {renderSortIndicator('active')}
              </div>
            </th>
            <th
              onClick={() => handleHeaderSortClick('joined')}
              style={{ width: '115px', cursor: 'pointer', userSelect: 'none' }}
              title="Click to sort by Joined Date"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span>Joined</span>
                {renderSortIndicator('joined')}
              </div>
            </th>
            <th style={{ width: '50px', textAlign: 'center', paddingRight: '18px' }}>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isSuspended = user.status === 'suspended';
            const isActive = user.status === 'active';
            const isInactive = user.status === 'inactive';

            return (
              <tr key={user.id || user._id}>
                {/* User Avatar + Display Name + ID */}
                <td style={{ paddingLeft: '18px', width: '230px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Avatar with fallback initials */}
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        backgroundColor: 'var(--bg-elevated)',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: '13px',
                        fontWeight: 700,
                        color: 'var(--soft-purple)',
                        background: 'linear-gradient(135deg, rgba(108, 77, 255, 0.2), rgba(139, 92, 246, 0.05))'
                      }}
                    >
                      {user.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt={user.displayName}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <span>{getInitials(user.displayName)}</span>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                      <span
                        onClick={() => onViewProfile && onViewProfile(user)}
                        className="template-title-link"
                        style={{
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          fontSize: '13px',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {user.displayName}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                        {user.id}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {user.email}
                  </span>
                </td>

                {/* Status Badge */}
                <td>
                  <StatusBadge
                    status={user.status}
                    label={
                      isSuspended
                        ? 'Suspended'
                        : isActive
                        ? 'Active'
                        : 'Inactive'
                    }
                  />
                </td>

                {/* Creations */}
                <td style={{ textAlign: 'right', fontWeight: 600, fontSize: '13px' }}>
                  {(user.creationCount || 0).toLocaleString()}
                </td>

                {/* Saved */}
                <td style={{ textAlign: 'right', fontWeight: 600, fontSize: '13px', color: '#A78BFA' }}>
                  {(user.savedCount || 0).toLocaleString()}
                </td>

                {/* Likes */}
                <td style={{ textAlign: 'right', fontWeight: 600, fontSize: '13px', color: '#F43F5E' }}>
                  {(user.likeCount || 0).toLocaleString()}
                </td>

                {/* Last Active */}
                <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {formatTimeAgo(user.lastActiveAt)}
                </td>

                {/* Joined Date */}
                <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {formatDate(user.createdAt)}
                </td>

                {/* Actions Menu */}
                <td style={{ textAlign: 'center', paddingRight: '18px' }}>
                  <Dropdown
                    align="right"
                    width="190px"
                    trigger={
                      <button
                        className="btn-icon"
                        style={{ width: '32px', height: '32px', borderRadius: '6px' }}
                        title="User actions"
                        aria-label={`Actions for ${user.displayName}`}
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    }
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {/* View Profile */}
                      <button
                        onClick={() => onViewProfile && onViewProfile(user)}
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
                        <span>View Profile</span>
                      </button>

                      {/* View Activity */}
                      <button
                        onClick={() => onViewActivity && onViewActivity(user)}
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
                        <Activity size={14} color="var(--text-secondary)" />
                        <span>View Activity</span>
                      </button>

                      {/* Edit Profile */}
                      <button
                        onClick={() => onEditProfile && onEditProfile(user)}
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
                        <span>Edit Profile</span>
                      </button>

                      <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '4px 0' }} />

                      {/* Status-specific actions */}
                      {isSuspended ? (
                        <button
                          onClick={() => onStatusAction && onStatusAction(user, 'unsuspend')}
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
                            color: 'var(--success)'
                          }}
                        >
                          <CheckCircle size={14} />
                          <span>Unsuspend User</span>
                        </button>
                      ) : (
                        <>
                          {isActive ? (
                            <button
                              onClick={() => onStatusAction && onStatusAction(user, 'deactivate')}
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
                                color: 'var(--warning)'
                              }}
                            >
                              <PauseCircle size={14} />
                              <span>Deactivate</span>
                            </button>
                          ) : isInactive ? (
                            <button
                              onClick={() => onStatusAction && onStatusAction(user, 'activate')}
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
                                color: 'var(--success)'
                              }}
                            >
                              <CheckCircle size={14} />
                              <span>Activate</span>
                            </button>
                          ) : null}

                          <button
                            onClick={() => onStatusAction && onStatusAction(user, 'suspend')}
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
                            <Ban size={14} />
                            <span>Suspend User</span>
                          </button>
                        </>
                      )}
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
