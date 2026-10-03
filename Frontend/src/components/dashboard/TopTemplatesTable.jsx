import React from 'react';
import { Layers, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';

export default function TopTemplatesTable({ templates = [] }) {
  const navigate = useNavigate();

  return (
    <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Top Performing Templates
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            Leading transformation styles driving creative usage
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/templates')}
          className="btn btn-ghost btn-sm"
          style={{ fontSize: '12px', gap: '4px' }}
        >
          <span>View All</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="data-table-container" style={{ border: 'none', backgroundColor: 'transparent' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Rank</th>
              <th>Template</th>
              <th>Category</th>
              <th style={{ textAlign: 'right' }}>Uses</th>
              <th style={{ textAlign: 'right' }}>Likes</th>
              <th style={{ textAlign: 'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((tpl) => (
              <tr key={tpl.rank}>
                <td>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: '4px',
                    backgroundColor: tpl.rank === 1 ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-elevated)',
                    color: tpl.rank === 1 ? 'var(--warning)' : 'var(--text-secondary)'
                  }}>
                    #{tpl.rank}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Layers size={14} color="var(--primary-purple)" />
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {tpl.title}
                    </span>
                  </div>
                </td>
                <td>
                  <span style={{
                    fontSize: '11px',
                    color: 'var(--text-secondary)',
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>
                    {tpl.category}
                  </span>
                </td>
                <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {tpl.uses}
                </td>
                <td style={{ textAlign: 'right', color: 'var(--text-secondary)' }}>
                  {tpl.likes}
                </td>
                <td style={{ textAlign: 'right' }}>
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
