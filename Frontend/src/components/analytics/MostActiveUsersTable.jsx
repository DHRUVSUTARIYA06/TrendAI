import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ExternalLink } from 'lucide-react';

export default function MostActiveUsersTable({ users = [] }) {
  const navigate = useNavigate();

  return (
    <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Users size={16} color="var(--primary-purple)" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Most Active Users
            </h3>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            Top creators by transformation dispatches and community interactions
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/users')}
          className="btn btn-secondary btn-sm"
          style={{ gap: '6px' }}
        >
          <span>All Users</span>
          <ExternalLink size={12} />
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Rank</th>
              <th>User</th>
              <th style={{ textAlign: 'right' }}>Template Uses</th>
              <th style={{ textAlign: 'right' }}>Likes</th>
              <th style={{ textAlign: 'right' }}>Saves</th>
              <th style={{ textAlign: 'right' }}>Last Active</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                onClick={() => navigate(`/admin/users/${u.id}`)}
                style={{ cursor: 'pointer' }}
                title="Click to view creator profile in user management"
              >
                <td>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color:
                        u.rank === 1
                          ? '#F59E0B'
                          : u.rank === 2
                          ? '#E2E8F0'
                          : u.rank === 3
                          ? '#D97706'
                          : 'var(--text-muted)'
                    }}
                  >
                    #{u.rank}
                  </span>
                </td>

                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {u.avatarUrl ? (
                      <img
                        src={u.avatarUrl}
                        alt={u.displayName}
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          flexShrink: 0
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--bg-elevated)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                          fontSize: '12px',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {u.displayName?.[0] || 'U'}
                      </div>
                    )}

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
                      <div
                        style={{
                          fontSize: '11px',
                          color: 'var(--text-muted)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {u.email}
                      </div>
                    </div>
                  </div>
                </td>

                <td style={{ textAlign: 'right' }}>
                  <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                    {u.templateUses?.toLocaleString()}
                  </strong>
                </td>

                <td style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', color: '#F43F5E' }}>
                    {u.likes?.toLocaleString()}
                  </span>
                </td>

                <td style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', color: '#A78BFA' }}>
                    {u.saves?.toLocaleString()}
                  </span>
                </td>

                <td style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {u.lastActiveAt}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
