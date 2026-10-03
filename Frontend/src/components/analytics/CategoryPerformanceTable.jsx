import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, ArrowUpDown, ExternalLink } from 'lucide-react';

export default function CategoryPerformanceTable({
  categories = [],
  sortBy = 'uses',
  sortDirection = 'desc',
  onSortChange
}) {
  const navigate = useNavigate();

  const handleHeaderClick = (field) => {
    if (sortBy === field) {
      onSortChange(field, sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      onSortChange(field, 'desc');
    }
  };

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
            <Tag size={16} color="var(--primary-purple)" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Category Performance
            </h3>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            Usage velocity, total likes, and engagement ranking across creative style genres
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/categories')}
          className="btn btn-secondary btn-sm"
          style={{ gap: '6px' }}
        >
          <span>Manage Categories</span>
          <ExternalLink size={12} />
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th
                onClick={() => handleHeaderClick('name')}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span>Category</span>
                  <ArrowUpDown size={12} color="var(--text-muted)" />
                </div>
              </th>
              <th
                onClick={() => handleHeaderClick('templateCount')}
                style={{ cursor: 'pointer', userSelect: 'none', textAlign: 'right' }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                  <span>Templates</span>
                  <ArrowUpDown size={12} color="var(--text-muted)" />
                </div>
              </th>
              <th
                onClick={() => handleHeaderClick('uses')}
                style={{ cursor: 'pointer', userSelect: 'none', textAlign: 'right' }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                  <span>Uses</span>
                  <ArrowUpDown size={12} color="var(--text-muted)" />
                </div>
              </th>
              <th
                onClick={() => handleHeaderClick('likes')}
                style={{ cursor: 'pointer', userSelect: 'none', textAlign: 'right' }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                  <span>Likes</span>
                  <ArrowUpDown size={12} color="var(--text-muted)" />
                </div>
              </th>
              <th
                onClick={() => handleHeaderClick('saves')}
                style={{ cursor: 'pointer', userSelect: 'none', textAlign: 'right' }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                  <span>Saves</span>
                  <ArrowUpDown size={12} color="var(--text-muted)" />
                </div>
              </th>
              <th
                onClick={() => handleHeaderClick('engagement')}
                style={{ cursor: 'pointer', userSelect: 'none', textAlign: 'right' }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                  <span>Engagement</span>
                  <ArrowUpDown size={12} color="var(--text-muted)" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat.slug}
                onClick={() => navigate('/admin/categories')}
                style={{ cursor: 'pointer' }}
                title="View in Categories management"
              >
                <td>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {cat.name}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {cat.templateCount}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                    {cat.uses?.toLocaleString()}
                  </strong>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', color: '#F43F5E' }}>
                    {cat.likes?.toLocaleString()}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', color: '#A78BFA' }}>
                    {cat.saves?.toLocaleString()}
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
                    {cat.engagement?.toLocaleString()}
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
