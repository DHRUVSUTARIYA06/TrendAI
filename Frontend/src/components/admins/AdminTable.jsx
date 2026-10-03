import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit2, UserCheck, UserX } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { ADMIN_ROLE_META } from '../../types/admin';

function formatDate(isoStr) {
  if (!isoStr) return '—';
  try {
    const d = new Date(isoStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return '—';
  }
}

export default function AdminTable({
  admins = [],
  onToggleStatus
}) {
  const navigate = useNavigate();

  return (
    <div className="admin-card" style={{ padding: 0, overflow: 'hidden', marginBottom: '20px' }}>
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ minWidth: '220px' }}>Admin</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Active</th>
              <th>Created</th>
              <th style={{ textAlign: 'right', minWidth: '120px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => {
              const roleMeta = ADMIN_ROLE_META[admin.role] || {
                label: admin.role,
                color: 'var(--text-secondary)'
              };

              return (
                <tr key={admin.id}>
                  {/* Admin User Info */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {admin.avatar ? (
                        <img
                          src={admin.avatar}
                          alt={admin.displayName}
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '1px solid var(--border-color)',
                            flexShrink: 0
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary-dim)',
                            border: '1px solid var(--primary-border)',
                            color: 'var(--soft-purple)',
                            fontSize: '13px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          {admin.displayName?.[0]?.toUpperCase() || 'A'}
                        </div>
                      )}

                      <div style={{ minWidth: 0 }}>
                        <span
                          onClick={() => navigate(`/admin/admins/${admin.id}`)}
                          style={{
                            fontSize: '13px',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            display: 'block',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {admin.displayName}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          {admin.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                        backgroundColor: 'var(--bg-elevated)',
                        color: roleMeta.color,
                        border: '1px solid var(--border-color)',
                        display: 'inline-block'
                      }}
                    >
                      {roleMeta.label}
                    </span>
                  </td>

                  {/* Status */}
                  <td>
                    <StatusBadge status={admin.status} />
                  </td>

                  {/* Last Active */}
                  <td>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {admin.lastActive}
                    </span>
                  </td>

                  {/* Created Date */}
                  <td>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {formatDate(admin.createdAt)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => navigate(`/admin/admins/${admin.id}`)}
                        className="btn-icon"
                        style={{ width: '30px', height: '30px' }}
                        title="View Profile & Permissions"
                      >
                        <Eye size={14} />
                      </button>

                      <button
                        onClick={() => navigate(`/admin/admins/${admin.id}/edit`)}
                        className="btn-icon"
                        style={{ width: '30px', height: '30px' }}
                        title="Edit Admin"
                      >
                        <Edit2 size={14} />
                      </button>

                      <button
                        onClick={() => onToggleStatus(admin)}
                        className="btn-icon"
                        style={{
                          width: '30px',
                          height: '30px',
                          color: admin.status === 'active' ? 'var(--warning)' : 'var(--success)'
                        }}
                        title={admin.status === 'active' ? 'Deactivate Admin' : 'Activate Admin'}
                      >
                        {admin.status === 'active' ? <UserX size={14} /> : <UserCheck size={14} />}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
