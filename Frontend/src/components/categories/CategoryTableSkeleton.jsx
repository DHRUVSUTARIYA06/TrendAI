import React from 'react';

export default function CategoryTableSkeleton({ rows = 5 }) {
  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: '64px' }}>Icon</th>
            <th>Category</th>
            <th style={{ width: '130px' }}>Slug</th>
            <th style={{ width: '110px', textAlign: 'right' }}>Templates</th>
            <th style={{ width: '110px', textAlign: 'right' }}>Uses</th>
            <th style={{ width: '95px' }}>Status</th>
            <th style={{ width: '105px' }}>Featured</th>
            <th style={{ width: '85px', textAlign: 'center' }}>Order</th>
            <th style={{ width: '115px' }}>Updated</th>
            <th style={{ width: '60px', textAlign: 'center' }}></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, idx) => (
            <tr key={idx} style={{ opacity: 0.7 }}>
              {/* Icon / Image Skeleton */}
              <td>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--bg-elevated)',
                    animation: 'pulse 1.5s infinite ease-in-out'
                  }}
                />
              </td>

              {/* Category Name & Desc */}
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div
                    style={{
                      height: '14px',
                      width: '45%',
                      borderRadius: '4px',
                      backgroundColor: 'var(--bg-elevated)',
                      animation: 'pulse 1.5s infinite ease-in-out'
                    }}
                  />
                  <div
                    style={{
                      height: '11px',
                      width: '80%',
                      borderRadius: '4px',
                      backgroundColor: 'var(--bg-elevated)',
                      animation: 'pulse 1.5s infinite ease-in-out'
                    }}
                  />
                </div>
              </td>

              {/* Slug */}
              <td>
                <div
                  style={{
                    height: '22px',
                    width: '75px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--bg-elevated)',
                    animation: 'pulse 1.5s infinite ease-in-out'
                  }}
                />
              </td>

              {/* Templates */}
              <td style={{ textAlign: 'right' }}>
                <div
                  style={{
                    height: '14px',
                    width: '40px',
                    marginLeft: 'auto',
                    borderRadius: '4px',
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
                    width: '55px',
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

              {/* Featured */}
              <td>
                <div
                  style={{
                    height: '20px',
                    width: '70px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--bg-elevated)',
                    animation: 'pulse 1.5s infinite ease-in-out'
                  }}
                />
              </td>

              {/* Sort Order */}
              <td style={{ textAlign: 'center' }}>
                <div
                  style={{
                    height: '18px',
                    width: '24px',
                    margin: '0 auto',
                    borderRadius: '4px',
                    backgroundColor: 'var(--bg-elevated)',
                    animation: 'pulse 1.5s infinite ease-in-out'
                  }}
                />
              </td>

              {/* Updated */}
              <td>
                <div
                  style={{
                    height: '13px',
                    width: '70px',
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
