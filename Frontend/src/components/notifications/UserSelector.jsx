import React, { useState, useEffect, useCallback } from 'react';
import { Search, X, Check, Users } from 'lucide-react';
import { notificationRepository } from '../../repositories/notificationRepository';

export default function UserSelector({
  selectedUserIds = [],
  onChange,
  error = null
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async (query = '') => {
    try {
      setLoading(true);
      const res = await notificationRepository.getTargetUsers(query);
      setUsers(res);
    } catch (err) {
      console.error('Failed to search target users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(searchTerm);
  }, [fetchUsers, searchTerm]);

  const handleToggleUser = (userId) => {
    if (selectedUserIds.includes(userId)) {
      onChange(selectedUserIds.filter((id) => id !== userId));
    } else {
      onChange([...selectedUserIds, userId]);
    }
  };

  const handleRemoveUser = (userId) => {
    onChange(selectedUserIds.filter((id) => id !== userId));
  };

  // Find user details for selected chips
  const selectedUserDetails = users.filter((u) => selectedUserIds.includes(u.id));

  return (
    <div style={{ marginTop: '12px' }}>
      {/* Selected Users Chips */}
      {selectedUserIds.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Selected Recipients ({selectedUserIds.length})
            </span>
            <button
              type="button"
              onClick={() => onChange([])}
              style={{
                fontSize: '11px',
                color: 'var(--danger)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            >
              Clear all
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {selectedUserIds.map((userId) => {
              const u = selectedUserDetails.find((item) => item.id === userId);
              const displayName = u ? u.displayName : userId;

              return (
                <div
                  key={userId}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '3px 8px 3px 6px',
                    backgroundColor: 'var(--primary-dim)',
                    border: '1px solid var(--primary-border)',
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: 'var(--soft-purple)'
                  }}
                >
                  {u?.avatarUrl ? (
                    <img
                      src={u.avatarUrl}
                      alt={displayName}
                      style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary-purple)',
                        color: '#FFFFFF',
                        fontSize: '9px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {displayName[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                  <span style={{ fontWeight: 500 }}>{displayName}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveUser(userId)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--soft-purple)',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title="Remove user"
                  >
                    <X size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* User Search Input */}
      <div style={{ position: 'relative', marginBottom: '8px' }}>
        <Search
          size={14}
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            pointerEvents: 'none'
          }}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search creators and users by name or email..."
          style={{
            width: '100%',
            height: '36px',
            padding: '0 10px 0 32px',
            backgroundColor: 'var(--bg-elevated)',
            border: `1px solid ${error ? 'var(--danger)' : 'var(--border-color)'}`,
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontSize: '12px',
            outline: 'none'
          }}
        />
      </div>

      {error && (
        <span style={{ fontSize: '11px', color: 'var(--danger)', display: 'block', marginBottom: '8px' }}>
          {error}
        </span>
      )}

      {/* Users Selectable List */}
      <div
        style={{
          maxHeight: '180px',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '4px'
        }}
      >
        {loading ? (
          <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
            <Users size={16} style={{ margin: '0 auto 4px', display: 'block', opacity: 0.5 }} />
            No users found matching "{searchTerm}"
          </div>
        ) : (
          users.map((u) => {
            const isSelected = selectedUserIds.includes(u.id);

            return (
              <div
                key={u.id}
                onClick={() => handleToggleUser(u.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? 'rgba(108, 77, 255, 0.12)' : 'transparent',
                  transition: 'background-color 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  {u.avatarUrl ? (
                    <img
                      src={u.avatarUrl}
                      alt={u.displayName}
                      style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--bg-surface-hover)',
                        color: 'var(--text-primary)',
                        fontSize: '11px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      {u.displayName[0]?.toUpperCase() || 'U'}
                    </div>
                  )}

                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {u.displayName}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {u.email}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--primary-purple)' : 'var(--border-color)',
                    backgroundColor: isSelected ? 'var(--primary-purple)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}
                >
                  {isSelected && <Check size={12} />}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
