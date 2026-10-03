import React from 'react';

export default function TemplateTableSkeleton({ rows = 5 }) {
  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: '70px' }}>Image</th>
            <th>Template</th>
            <th style={{ width: '130px' }}>Category</th>
            <th style={{ width: '100px', textAlign: 'right' }}>Uses</th>
            <th style={{ width: '100px', textAlign: 'right' }}>Likes</th>
            <th style={{ width: '100px' }}>Status</th>
            <th style={{ width: '120px' }}>Created</th>
            <th style={{ width: '60px', textAlign: 'center' }}></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, idx) => (
            <tr key={idx} style={{ opacity: 0.7 }}>
              {/* Image Skeleton */}
              <td>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-elevated)',
                    animation: 'pulse 1.5s infinite ease-in-out'
                  }}
                />
              </td>

              {/* Title & ID Skeleton */}
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div
                    style={{
                      height: '14px',
                      width: '60%',
                      borderRadius: '4px',
                      backgroundColor: 'var(--bg-elevated)',
                      animation: 'pulse 1.5s infinite ease-in-out'
                    }}
                  />
                  <div
                    style={{
                      height: '11px',
                      width: '35%',
                      borderRadius: '4px',
                      backgroundColor: 'var(--bg-elevated)',
                      animation: 'pulse 1.5s infinite ease-in-out'
                    }}
                  />
                </div>
              </td>

              {/* Category */}
              <td>
                <div
                  style={{
                    height: '22px',
                    width: '80px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-elevated)',
                    animation: 'pulse 1.5s infinite ease-in-out'
                  }}
                />
              </td>

              {/* Uses */}
              <td style={{ textAlign: 'right' }}>
                <div
                  style={{
                    height: '14px',
                    width: '50px',
                    marginLeft: 'auto',
                    borderRadius: '4px',
                    backgroundColor: 'var(--bg-elevated)',
                    animation: 'pulse 1.5s infinite ease-in-out'
                  }}
                />
              </td>

              {/* Likes */}
              <td style={{ textAlign: 'right' }}>
                <div
                  style={{
                    height: '14px',
                    width: '45px',
                    marginLeft: 'auto',
                    borderRadius: '4px',
                    backgroundColor: 'var(--bg-elevated)',
                    animation: 'pulse 1.5s infinite ease-in-out'
                  }}
                />
              </td>

              {/* Status */}
              <td>
                <div
                  style={{
                    height: '22px',
                    width: '65px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-elevated)',
                    animation: 'pulse 1.5s infinite ease-in-out'
                  }}
                />
              </td>

              {/* Created */}
              <td>
                <div
                  style={{
                    height: '13px',
                    width: '75px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--bg-elevated)',
                    animation: 'pulse 1.5s infinite ease-in-out'
                  }}
                />
              </td>

              {/* Actions */}
              <td style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--bg-elevated)',
                    margin: '0 auto',
                    animation: 'pulse 1.5s infinite ease-in-out'
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
