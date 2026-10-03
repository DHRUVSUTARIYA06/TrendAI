import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Activity,
  Award
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';
import { formatDate } from '../../utils/formatters';

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

function getInitials(name = '') {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function LeaderboardTable({
  users = [],
  period = 'weekly',
  sortBy = 'rank',
  sortDirection = 'asc',
  onSort,
  onClearFilters
}) {
  const navigate = useNavigate();

  if (!users || users.length === 0) {
    return (
      <div className="admin-card" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <EmptyState
          title="No leaderboard data found"
          description="Try adjusting your search criteria, changing the active period, or resetting filters."
          actionLabel="Clear Filters"
          onAction={onClearFilters}
        />
      </div>
    );
  }

  const renderSortIndicator = (field) => {
    if (sortBy !== field) {
      return <ArrowUpDown size={12} style={{ opacity: 0.35, marginLeft: '4px' }} />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp size={12} style={{ color: 'var(--primary-purple)', marginLeft: '4px' }} />
    ) : (
      <ArrowDown size={12} style={{ color: 'var(--primary-purple)', marginLeft: '4px' }} />
    );
  };

  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
            fontSize: '12px',
            fontWeight: 700,
            color: '#F59E0B',
            backgroundColor: 'rgba(245, 158, 11, 0.12)',
            padding: '2px 8px',
            borderRadius: '12px',
            border: '1px solid rgba(245, 158, 11, 0.3)'
          }}
        >
          🥇 #1
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
            fontSize: '12px',
            fontWeight: 700,
            color: '#94A3B8',
            backgroundColor: 'rgba(148, 163, 184, 0.12)',
            padding: '2px 8px',
            borderRadius: '12px',
            border: '1px solid rgba(148, 163, 184, 0.3)'
          }}
        >
          🥈 #2
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
            fontSize: '12px',
            fontWeight: 700,
            color: '#CD7F32',
            backgroundColor: 'rgba(205, 127, 50, 0.12)',
            padding: '2px 8px',
            borderRadius: '12px',
            border: '1px solid rgba(205, 127, 50, 0.3)'
          }}
        >
          🥉 #3
        </span>
      );
    }
    return (
      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', paddingLeft: '6px' }}>
        #{rank}
      </span>
    );
  };

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {/* Rank */}
            <th
              onClick={() => onSort('rank')}
              style={{ width: '85px', paddingLeft: '18px', cursor: 'pointer', userSelect: 'none' }}
              title="Sort by Rank"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span>Rank</span>
                {renderSortIndicator('rank')}
              </div>
            </th>

            {/* User */}
            <th style={{ width: '240px' }}>User</th>

            {/* Creations */}
            <th
              onClick={() => onSort('creations')}
              style={{ width: '105px', textAlign: 'right', cursor: 'pointer', userSelect: 'none' }}
              title="Sort by Total Creations"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
                <span>Creations</span>
                {renderSortIndicator('creations')}
              </div>
            </th>

            {/* Likes */}
            <th
              onClick={() => onSort('likes')}
              style={{ width: '95px', textAlign: 'right', cursor: 'pointer', userSelect: 'none' }}
              title="Sort by Likes"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
                <span>Likes</span>
                {renderSortIndicator('likes')}
              </div>
            </th>

            {/* Saved */}
            <th
              onClick={() => onSort('saved')}
              style={{ width: '95px', textAlign: 'right', cursor: 'pointer', userSelect: 'none' }}
              title="Sort by Saved Count"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
                <span>Saved</span>
                {renderSortIndicator('saved')}
              </div>
            </th>

            {/* Weekly Creations */}
            <th
              onClick={() => onSort('weeklyCreations')}
              style={{ width: '135px', textAlign: 'right', cursor: 'pointer', userSelect: 'none' }}
              title="Sort by Weekly Creations"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
                <span>Weekly Creations</span>
                {renderSortIndicator('weeklyCreations')}
              </div>
            </th>

            {/* Last Active */}
            <th
              onClick={() => onSort('lastActiveAt')}
              style={{ width: '115px', cursor: 'pointer', userSelect: 'none' }}
              title="Sort by Last Active"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span>Last Active</span>
                {renderSortIndicator('lastActiveAt')}
              </div>
            </th>

            {/* Status */}
            <th style={{ width: '95px' }}>Status</th>

            {/* Actions */}
            <th style={{ width: '120px', textAlign: 'right', paddingRight: '18px' }}>
              <span>Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isTopRanked = user.rank <= 3;
            return (
              <tr
                key={user.id}
                style={{
                  backgroundColor: isTopRanked
                    ? user.rank === 1
                      ? 'rgba(245, 158, 11, 0.02)'
                      : user.rank === 2
                      ? 'rgba(148, 163, 184, 0.02)'
                      : 'rgba(205, 127, 50, 0.02)'
                    : undefined
                }}
              >
                {/* Rank */}
                <td style={{ paddingLeft: '18px' }}>
                  {getRankBadge(user.rank)}
                </td>

                {/* User avatar + name + email */}
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        backgroundColor: 'var(--bg-elevated)',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: '12px',
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
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <span>{getInitials(user.displayName)}</span>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', minWidth: 0 }}>
                      <span
                        onClick={() => navigate(`/admin/users/${user.id}`)}
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
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {user.username || user.email}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Total Creations */}
                <td style={{ textAlign: 'right', fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
                  {(user.creations || 0).toLocaleString()}
                </td>

                {/* Likes */}
                <td style={{ textAlign: 'right', fontWeight: 600, fontSize: '13px', color: '#F43F5E' }}>
                  {(user.likes || 0).toLocaleString()}
                </td>

                {/* Saved */}
                <td style={{ textAlign: 'right', fontWeight: 600, fontSize: '13px', color: '#A78BFA' }}>
                  {(user.saved || 0).toLocaleString()}
                </td>

                {/* Weekly Creations */}
                <td style={{ textAlign: 'right', fontWeight: 600, fontSize: '13px', color: 'var(--info)' }}>
                  {(user.weeklyCreations || 0).toLocaleString()}
                </td>

                {/* Last Active */}
                <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {formatTimeAgo(user.lastActiveAt)}
                </td>

                {/* Status */}
                <td>
                  <StatusBadge
                    status={user.status}
                    label={user.status === 'suspended' ? 'Suspended' : user.status === 'active' ? 'Active' : 'Inactive'}
                  />
                </td>

                {/* Actions */}
                <td style={{ textAlign: 'right', paddingRight: '18px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={() => navigate(`/admin/users/${user.id}`)}
                      className="btn btn-secondary btn-sm"
                      style={{ height: '30px', padding: '0 8px', fontSize: '11px', gap: '4px' }}
                      title={`View user profile for ${user.displayName}`}
                    >
                      <Eye size={12} />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => navigate(`/admin/users/${user.id}`)}
                      className="btn-icon"
                      style={{ width: '30px', height: '30px', borderRadius: '6px' }}
                      title={`View activity for ${user.displayName}`}
                    >
                      <Activity size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
