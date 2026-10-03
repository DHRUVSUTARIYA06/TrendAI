import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatters';

function formatTimeAgo(dateString) {
  if (!dateString) return 'Never';
  const diffSec = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
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

export default function MostActiveUsers({ users = [] }) {
  const navigate = useNavigate();

  return (
    <div className="admin-card" style={{ flex: '1 1 340px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Most Active Users
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
            Creators driving high generation and interaction volume
          </p>
        </div>
      </div>

      {!users || users.length === 0 ? (
        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
          No user interaction data available.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {users.map((u) => (
            <div
              key={u.id}
              onClick={() => navigate(`/admin/users/${u.id}`)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: '10px',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-purple)';
                e.currentTarget.style.transform = 'translateX(2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
              title="Click to view creator account"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                {/* Rank */}
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: u.rank === 1 ? '#F59E0B' : u.rank === 2 ? '#94A3B8' : u.rank === 3 ? '#CD7F32' : 'var(--text-muted)',
                    width: '18px',
                    textAlign: 'center',
                    flexShrink: 0
                  }}
                >
                  #{u.rank}
                </span>

                {/* Avatar */}
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--soft-purple)',
                    background: 'linear-gradient(135deg, rgba(108, 77, 255, 0.2), rgba(139, 92, 246, 0.05))'
                  }}
                >
                  {u.avatarUrl ? (
                    <img
                      src={u.avatarUrl}
                      alt={u.displayName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <span>{getInitials(u.displayName)}</span>
                  )}
                </div>

                {/* Identity */}
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {u.displayName}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {u.email}
                  </div>
                </div>
              </div>

              {/* Interactions Breakdown */}
              <div style={{ textAlign: 'right', flexShrink: 0, paddingLeft: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {(u.templateUses || 0).toLocaleString()} <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 400 }}>uses</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {formatTimeAgo(u.lastActiveAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
