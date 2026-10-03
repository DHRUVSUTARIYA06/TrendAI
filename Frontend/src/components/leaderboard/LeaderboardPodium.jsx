import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Heart, Bookmark } from 'lucide-react';

function getInitials(name = '') {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function LeaderboardPodium({ topUsers = [], period = 'weekly' }) {
  const navigate = useNavigate();
  const isWeekly = period === 'weekly';

  if (!topUsers || topUsers.length === 0) {
    return null;
  }

  // Find 1st, 2nd, and 3rd rank users
  const first = topUsers.find((u) => u.rank === 1) || topUsers[0];
  const second = topUsers.find((u) => u.rank === 2) || topUsers[1];
  const third = topUsers.find((u) => u.rank === 3) || topUsers[2];

  // Podium order for desktop: [Second (Silver), First (Gold), Third (Bronze)]
  const podiumOrder = [
    { user: second, rank: 2, medal: '🥈', accentColor: '#94A3B8', bgAccent: 'rgba(148, 163, 184, 0.08)', title: '2nd Place' },
    { user: first, rank: 1, medal: '🥇', accentColor: '#F59E0B', bgAccent: 'rgba(245, 158, 11, 0.08)', title: '1st Place', isChampion: true },
    { user: third, rank: 3, medal: '🥉', accentColor: '#CD7F32', bgAccent: 'rgba(205, 127, 50, 0.08)', title: '3rd Place' }
  ].filter((p) => Boolean(p.user));

  const handleUserClick = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Top 3 Podium
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
            Leading Promptoo creators for {isWeekly ? 'the current weekly cycle' : 'all-time lifetime activity'}
          </p>
        </div>
      </div>

      <div
        className="leaderboard-podium-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          alignItems: 'end'
        }}
      >
        {podiumOrder.map(({ user, rank, medal, accentColor, bgAccent, isChampion }) => {
          const creationCount = isWeekly ? user.weeklyCreations : user.creations;

          return (
            <div
              key={user.id}
              onClick={() => handleUserClick(user.id)}
              className="admin-card"
              style={{
                cursor: 'pointer',
                position: 'relative',
                padding: '20px',
                border: `1px solid ${isChampion ? 'rgba(245, 158, 11, 0.35)' : 'var(--border-color)'}`,
                backgroundColor: isChampion ? 'rgba(23, 25, 35, 0.95)' : 'var(--bg-surface)',
                boxShadow: isChampion ? '0 8px 24px -6px rgba(245, 158, 11, 0.08)' : undefined,
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accentColor;
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isChampion ? 'rgba(245, 158, 11, 0.35)' : 'var(--border-color)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Rank Badge Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginBottom: '14px'
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: bgAccent,
                    border: `1px solid ${accentColor}40`,
                    color: accentColor,
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.3px'
                  }}
                >
                  <span>{medal}</span>
                  <span>Rank #{rank}</span>
                </div>

                <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                  {user.id}
                </span>
              </div>

              {/* Avatar circle */}
              <div
                style={{
                  width: isChampion ? '68px' : '60px',
                  height: isChampion ? '68px' : '60px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-elevated)',
                  border: `2px solid ${accentColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isChampion ? '22px' : '19px',
                  fontWeight: 700,
                  color: accentColor,
                  background: `linear-gradient(135deg, ${accentColor}25, transparent)`,
                  marginBottom: '12px',
                  flexShrink: 0
                }}
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.displayName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <span>{getInitials(user.displayName)}</span>
                )}
              </div>

              {/* User Identity */}
              <h3
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: '0 0 2px 0',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%'
                }}
              >
                {user.displayName}
              </h3>

              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  marginBottom: '16px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%'
                }}
              >
                {user.username || user.email}
              </div>

              {/* Metrics Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                  width: '100%',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-color)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                    <Layers size={11} color="var(--primary-purple)" />
                    <span>{isWeekly ? 'Weekly' : 'Total'}</span>
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {creationCount?.toLocaleString() || 0}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                    <Heart size={11} color="#F43F5E" />
                    <span>Likes</span>
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#F43F5E' }}>
                    {(user.likes || 0).toLocaleString()}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                    <Bookmark size={11} color="var(--info)" />
                    <span>Saved</span>
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {(user.saved || 0).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
