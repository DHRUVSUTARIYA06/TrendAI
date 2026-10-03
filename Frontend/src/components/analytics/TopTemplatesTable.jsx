import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, ExternalLink } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function TopTemplatesTable({ templates = [] }) {
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
            <Layers size={16} color="var(--primary-purple)" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Top Performing Templates
            </h3>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            Ranked by total engagement score (Uses + Likes + Saves)
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/templates')}
          className="btn btn-secondary btn-sm"
          style={{ gap: '6px' }}
        >
          <span>All Templates</span>
          <ExternalLink size={12} />
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Rank</th>
              <th>Template</th>
              <th>Category</th>
              <th style={{ textAlign: 'right' }}>Uses</th>
              <th style={{ textAlign: 'right' }}>Likes</th>
              <th style={{ textAlign: 'right' }}>Saves</th>
              <th style={{ textAlign: 'right' }}>Engagement</th>
              <th style={{ textAlign: 'center', width: '100px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((tpl) => (
              <tr
                key={tpl.id}
                onClick={() => navigate(`/admin/templates/${tpl.id}/edit`)}
                style={{ cursor: 'pointer' }}
                title="Click to view & edit template in template management"
              >
                <td>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color:
                        tpl.rank === 1
                          ? '#F59E0B'
                          : tpl.rank === 2
                          ? '#E2E8F0'
                          : tpl.rank === 3
                          ? '#D97706'
                          : 'var(--text-muted)'
                    }}
                  >
                    #{tpl.rank}
                  </span>
                </td>

                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={tpl.thumbnailUrl}
                      alt={tpl.title}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        border: '1px solid var(--border-color)',
                        flexShrink: 0
                      }}
                    />
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
                        {tpl.title}
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {tpl.id}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {tpl.category}
                  </span>
                </td>

                <td style={{ textAlign: 'right' }}>
                  <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                    {tpl.uses?.toLocaleString()}
                  </strong>
                </td>

                <td style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', color: '#F43F5E' }}>
                    {tpl.likes?.toLocaleString()}
                  </span>
                </td>

                <td style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', color: '#A78BFA' }}>
                    {tpl.saves?.toLocaleString()}
                  </span>
                </td>

                <td style={{ textAlign: 'right' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'var(--soft-purple)',
                      backgroundColor: 'var(--primary-dim)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      border: '1px solid var(--primary-border)'
                    }}
                  >
                    {tpl.engagement?.toLocaleString()}
                  </span>
                </td>

                <td style={{ textAlign: 'center' }}>
                  <StatusBadge status={tpl.status || 'active'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
