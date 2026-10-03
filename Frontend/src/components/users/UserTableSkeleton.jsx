import React from 'react';

export default function UserTableSkeleton({ rows = 5 }) {
  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: '220px' }}>User</th>
            <th>Email</th>
            <th style={{ width: '100px' }}>Status</th>
            <th style={{ width: '90px', textAlign: 'right' }}>Creations</th>
            <th style={{ width: '80px', textAlign: 'right' }}>Saved</th>
            <th style={{ width: '80px', textAlign: 'right' }}>Likes</th>
            <th style={{ width: '120px' }}>Last Active</th>
            <th style={{ width: '110px' }}>Joined</th>
            <th style={{ width: '50px', textAlign: 'center' }}></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, idx) => (
            <tr key={idx} style={{ opacity: 0.7 }}>
              {/* User Skeleton (Avatar + Name + ID) */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-elevated)',
                      flexShrink: 0,
                      animation: 'pulse 1.5s infinite ease-in-out'
                    }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                    <div
                      style={{
                        height: '14px',
                        width: '70%',
                        borderRadius: '4px',
                        backgroundColor: 'var(--bg-elevated)',
                        animation: 'pulse 1.5s infinite ease-in-out'
                      }}
                    />
                    <div
                      style={{
                        height: '11px',
                        width: '45%',
                        borderRadius: '4px',
                        backgroundColor: 'var(--bg-elevated)',
                        animation: 'pulse 1.5s infinite ease-in-out'
                      }}
                    />
                  </div>
                </div>
              </td>

              {/* Email */}
              <td>
                <div
                  style={{
                    height: '13px',
                    width: '60%',
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

              {/* Creations */}
              <td style={{ textAlign: 'right' }}>
                <div
                  style={{
                    height: '14px',
                    width: '35px',
                    marginLeft: 'auto',
                    borderRadius: '4px',
                    backgroundColor: 'var(--bg-elevated)',
                    animation: 'pulse 1.5s infinite ease-in-out'
                  }}
                />
              </td>

              {/* Saved */}
              <td style={{ textAlign: 'right' }}>
                <div
                  style={{
                    height: '14px',
                    width: '30px',
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
                    width: '30px',
                    marginLeft: 'auto',
                    borderRadius: '4px',
                    backgroundColor: 'var(--bg-elevated)',
                    animation: 'pulse 1.5s infinite ease-in-out'
                  }}
                />
              </td>

              {/* Last Active */}
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

              {/* Joined */}
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

              {/* Action Dots */}
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
