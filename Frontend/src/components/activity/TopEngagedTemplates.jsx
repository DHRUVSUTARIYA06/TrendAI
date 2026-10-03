import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TopEngagedTemplates({ templates = [] }) {
  const navigate = useNavigate();

  return (
    <div className="admin-card" style={{ flex: '1 1 340px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Top Engaged Templates
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
            Highest combined score (Uses + Likes + Saves)
          </p>
        </div>
      </div>

      {!templates || templates.length === 0 ? (
        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
          No template engagement data available.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => navigate(`/admin/templates/${tpl.id}/edit`)}
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
              title="Click to view/edit template"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                {/* Rank */}
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: tpl.rank === 1 ? '#F59E0B' : tpl.rank === 2 ? '#94A3B8' : tpl.rank === 3 ? '#CD7F32' : 'var(--text-muted)',
                    width: '20px',
                    textAlign: 'center',
                    flexShrink: 0
                  }}
                >
                  #{tpl.rank}
                </span>

                {/* Thumbnail */}
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={tpl.thumbnailUrl}
                    alt={tpl.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>

                {/* Title & Category */}
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
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {tpl.category}
                  </div>
                </div>
              </div>

              {/* Engagement Score & Sub-metrics */}
              <div style={{ textAlign: 'right', flexShrink: 0, paddingLeft: '12px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--soft-purple)' }}>
                  {(tpl.engagement || 0).toLocaleString()} <span style={{ fontSize: '10px', fontWeight: 500, color: 'var(--text-muted)' }}>pts</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  <span>{(tpl.uses || 0).toLocaleString()} uses</span>
                  <span>•</span>
                  <span>{(tpl.likes || 0).toLocaleString()} likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
