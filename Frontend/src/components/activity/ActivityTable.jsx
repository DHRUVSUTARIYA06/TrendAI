import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Eye,
  Layers,
  Heart,
  Play,
  Bookmark,
  HeartOff,
  BookmarkX
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

function getActivityBadge(type) {
  switch (type) {
    case 'like':
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 700,
            backgroundColor: 'rgba(244, 63, 94, 0.12)',
            color: '#F43F5E',
            border: '1px solid rgba(244, 63, 94, 0.25)',
            textTransform: 'uppercase',
            letterSpacing: '0.4px'
          }}
        >
          <Heart size={11} fill="#F43F5E" />
          <span>LIKE</span>
        </span>
      );
    case 'use':
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 700,
            backgroundColor: 'var(--primary-dim)',
            color: 'var(--soft-purple)',
            border: '1px solid var(--primary-border)',
            textTransform: 'uppercase',
            letterSpacing: '0.4px'
          }}
        >
          <Play size={11} fill="var(--soft-purple)" />
          <span>USE</span>
        </span>
      );
    case 'save':
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 700,
            backgroundColor: 'rgba(167, 139, 250, 0.12)',
            color: '#A78BFA',
            border: '1px solid rgba(167, 139, 250, 0.25)',
            textTransform: 'uppercase',
            letterSpacing: '0.4px'
          }}
        >
          <Bookmark size={11} fill="#A78BFA" />
          <span>SAVE</span>
        </span>
      );
    case 'unlike':
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 700,
            backgroundColor: 'var(--bg-elevated)',
            color: 'var(--text-muted)',
            border: '1px solid var(--border-color)',
            textTransform: 'uppercase',
            letterSpacing: '0.4px'
          }}
        >
          <HeartOff size={11} />
          <span>UNLIKE</span>
        </span>
      );
    case 'unsave':
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 700,
            backgroundColor: 'var(--bg-elevated)',
            color: 'var(--text-muted)',
            border: '1px solid var(--border-color)',
            textTransform: 'uppercase',
            letterSpacing: '0.4px'
          }}
        >
          <BookmarkX size={11} />
          <span>UNSAVE</span>
        </span>
      );
    default:
      return (
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: '6px',
            backgroundColor: 'var(--bg-elevated)',
            color: 'var(--text-secondary)'
          }}
        >
          {type?.toUpperCase() || 'ACTIVITY'}
        </span>
      );
  }
}

export default function ActivityTable({
  activities = [],
  onClearFilters
}) {
  const navigate = useNavigate();

  if (!activities || activities.length === 0) {
    return (
      <div className="admin-card" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <EmptyState
          title="No activity found"
          description="Activity will appear here as users interact with templates, or try adjusting active filters."
          actionLabel="Clear Filters"
          onAction={onClearFilters}
        />
      </div>
    );
  }

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: '150px', paddingLeft: '18px' }}>Date & Time</th>
            <th style={{ width: '220px' }}>User</th>
            <th style={{ width: '110px' }}>Activity</th>
            <th style={{ width: '230px' }}>Template</th>
            <th style={{ width: '130px' }}>Category</th>
            <th style={{ width: '100px' }}>Status</th>
            <th style={{ width: '150px', textAlign: 'right', paddingRight: '18px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((item) => (
            <tr key={item.id}>
              {/* Date & Time */}
              <td style={{ paddingLeft: '18px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {formatTimeAgo(item.timestamp)}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {formatDate(item.timestamp)}
                  </span>
                </div>
              </td>

              {/* User */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: 'var(--soft-purple)',
                      flexShrink: 0
                    }}
                  >
                    {item.userAvatar ? (
                      <img
                        src={item.userAvatar}
                        alt={item.userName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span>{getInitials(item.userName)}</span>
                    )}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      onClick={() => navigate(`/admin/users/${item.userId}`)}
                      className="template-title-link"
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {item.userName}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.userEmail}
                    </div>
                  </div>
                </div>
              </td>

              {/* Activity Type Badge */}
              <td>{getActivityBadge(item.type)}</td>

              {/* Template */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      flexShrink: 0
                    }}
                  >
                    {item.templateThumbnail && (
                      <img
                        src={item.templateThumbnail}
                        alt={item.templateName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                  <span
                    onClick={() => navigate(`/admin/templates/${item.templateId}/edit`)}
                    className="template-title-link"
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {item.templateName}
                  </span>
                </div>
              </td>

              {/* Category */}
              <td>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {item.category}
                </span>
              </td>

              {/* Status */}
              <td>
                <StatusBadge
                  status={item.status}
                  label={item.status === 'suspended' ? 'Suspended' : item.status === 'active' ? 'Active' : 'Inactive'}
                />
              </td>

              {/* Actions */}
              <td style={{ textAlign: 'right', paddingRight: '18px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    onClick={() => navigate(`/admin/users/${item.userId}`)}
                    className="btn btn-secondary btn-sm"
                    style={{ height: '30px', padding: '0 8px', fontSize: '11px', gap: '4px' }}
                    title={`View user ${item.userName}`}
                  >
                    <Eye size={12} />
                    <span>User</span>
                  </button>
                  <button
                    onClick={() => navigate(`/admin/templates/${item.templateId}/edit`)}
                    className="btn btn-secondary btn-sm"
                    style={{ height: '30px', padding: '0 8px', fontSize: '11px', gap: '4px' }}
                    title={`View template ${item.templateName}`}
                  >
                    <Layers size={12} />
                    <span>Template</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
