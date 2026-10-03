import React from 'react';

export default function LeaderboardSkeleton({ rows = 6 }) {
  return (
    <div>
      {/* Skeleton Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="admin-card"
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              opacity: 0.7
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: 'var(--bg-elevated)',
                animation: 'pulse 1.5s infinite ease-in-out',
                flexShrink: 0
              }}
            />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                style={{
                  height: '11px',
                  width: '60%',
                  borderRadius: '4px',
                  backgroundColor: 'var(--bg-elevated)',
                  animation: 'pulse 1.5s infinite ease-in-out'
                }}
              />
              <div
                style={{
                  height: '20px',
                  width: '45%',
                  borderRadius: '4px',
                  backgroundColor: 'var(--bg-elevated)',
                  animation: 'pulse 1.5s infinite ease-in-out'
                }}
              />
              <div
                style={{
                  height: '10px',
                  width: '75%',
                  borderRadius: '4px',
                  backgroundColor: 'var(--bg-elevated)',
                  animation: 'pulse 1.5s infinite ease-in-out'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Skeleton Podium */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="admin-card"
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              opacity: 0.7
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '4px'
              }}
            >
              <div
                style={{
                  height: '20px',
                  width: '70px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-elevated)',
                  animation: 'pulse 1.5s infinite ease-in-out'
                }}
              />
              <div
                style={{
                  height: '14px',
                  width: '50px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--bg-elevated)',
                  animation: 'pulse 1.5s infinite ease-in-out'
                }}
              />
            </div>

            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-elevated)',
                animation: 'pulse 1.5s infinite ease-in-out'
              }}
            />

            <div
              style={{
                height: '16px',
                width: '50%',
                borderRadius: '4px',
                backgroundColor: 'var(--bg-elevated)',
                animation: 'pulse 1.5s infinite ease-in-out'
              }}
            />

            <div
              style={{
                height: '12px',
                width: '35%',
                borderRadius: '4px',
                backgroundColor: 'var(--bg-elevated)',
                animation: 'pulse 1.5s infinite ease-in-out'
              }}
            />

            <div
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                paddingTop: '12px',
                borderTop: '1px solid var(--border-color)'
              }}
            >
              {Array.from({ length: 3 }).map((__, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div
                    style={{
                      height: '10px',
                      width: '60%',
                      borderRadius: '3px',
                      backgroundColor: 'var(--bg-elevated)',
                      animation: 'pulse 1.5s infinite ease-in-out'
                    }}
                  />
                  <div
                    style={{
                      height: '16px',
                      width: '40%',
                      borderRadius: '3px',
                      backgroundColor: 'var(--bg-elevated)',
                      animation: 'pulse 1.5s infinite ease-in-out'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Skeleton Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '85px', paddingLeft: '18px' }}>Rank</th>
              <th style={{ width: '240px' }}>User</th>
              <th style={{ width: '105px', textAlign: 'right' }}>Creations</th>
              <th style={{ width: '95px', textAlign: 'right' }}>Likes</th>
              <th style={{ width: '95px', textAlign: 'right' }}>Saved</th>
              <th style={{ width: '135px', textAlign: 'right' }}>Weekly Creations</th>
              <th style={{ width: '115px' }}>Last Active</th>
              <th style={{ width: '95px' }}>Status</th>
              <th style={{ width: '120px', textAlign: 'right', paddingRight: '18px' }}></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, idx) => (
              <tr key={idx} style={{ opacity: 0.6 }}>
                <td style={{ paddingLeft: '18px' }}>
                  <div
                    style={{
                      height: '20px',
                      width: '35px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--bg-elevated)',
                      animation: 'pulse 1.5s infinite ease-in-out'
                    }}
                  />
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--bg-elevated)',
                        animation: 'pulse 1.5s infinite ease-in-out',
                        flexShrink: 0
                      }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                      <div
                        style={{
                          height: '14px',
                          width: '65%',
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
                <td>
                  <div
                    style={{
                      height: '12px',
                      width: '65px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--bg-elevated)',
                      animation: 'pulse 1.5s infinite ease-in-out'
                    }}
                  />
                </td>
                <td>
                  <div
                    style={{
                      height: '20px',
                      width: '60px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--bg-elevated)',
                      animation: 'pulse 1.5s infinite ease-in-out'
                    }}
                  />
                </td>
                <td style={{ textAlign: 'right', paddingRight: '18px' }}>
                  <div
                    style={{
                      height: '28px',
                      width: '50px',
                      marginLeft: 'auto',
                      borderRadius: '6px',
                      backgroundColor: 'var(--bg-elevated)',
                      animation: 'pulse 1.5s infinite ease-in-out'
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
