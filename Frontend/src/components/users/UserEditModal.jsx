import React, { useState, useEffect } from 'react';
import { Lock, Info, Save } from 'lucide-react';
import Modal from '../common/Modal';
import { useToast } from '../../context/ToastContext';

export default function UserEditModal({
  isOpen,
  onClose,
  user,
  onUserUpdated
}) {
  const toast = useToast();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setBio(user.bio || '');
      setAvatarUrl(user.avatarUrl || '');
      setErrors({});
    }
  }, [user]);

  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!displayName.trim()) {
      setErrors({ displayName: 'Display name is required.' });
      return;
    }

    try {
      setSaving(true);
      await onUserUpdated(user.id, {
        displayName: displayName.trim(),
        bio: bio.trim(),
        avatarUrl: avatarUrl.trim() || null
      });
      toast.success('User profile updated successfully.');
      onClose();
    } catch (err) {
      console.error('Failed to update user profile:', err);
      toast.error(err.message || 'Failed to update user profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit User Profile"
      maxWidth="600px"
      footer={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', width: '100%' }}>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="btn btn-primary"
            style={{ gap: '6px' }}
          >
            <Save size={14} />
            <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Editable Section */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--soft-purple)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
            Admin-Editable Profile Information
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Display Name */}
            <div>
              <label
                htmlFor="edit-display-name"
                style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}
              >
                Display Name <span style={{ color: 'var(--danger)' }}>*</span>
              </label>
              <input
                id="edit-display-name"
                type="text"
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  if (errors.displayName) setErrors({});
                }}
                maxLength={60}
                placeholder="User's public display name"
                style={{
                  borderColor: errors.displayName ? 'var(--danger)' : undefined
                }}
              />
              {errors.displayName && (
                <span style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '4px', display: 'block' }}>
                  {errors.displayName}
                </span>
              )}
            </div>

            {/* Avatar URL */}
            <div>
              <label
                htmlFor="edit-avatar-url"
                style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}
              >
                Avatar Image URL (Optional)
              </label>
              <input
                id="edit-avatar-url"
                type="text"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
              />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                If empty, the user initials fallback will be shown.
              </span>
            </div>

            {/* Bio */}
            <div>
              <label
                htmlFor="edit-bio"
                style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}
              >
                Bio
              </label>
              <textarea
                id="edit-bio"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={300}
                placeholder="Short bio or creator description..."
                style={{ resize: 'vertical' }}
              />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                {bio.length} / 300 characters
              </span>
            </div>
          </div>
        </div>

        {/* Read-Only Server Protected Section */}
        <div
          style={{
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
            <Lock size={13} />
            <span>Protected Database Fields (Read-Only)</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              fontSize: '12px'
            }}
          >
            <div>
              <span style={{ color: 'var(--text-muted)' }}>User ID:</span>{' '}
              <strong style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>{user.id}</strong>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)' }}>Email Identity:</span>{' '}
              <strong style={{ color: 'var(--text-primary)' }}>{user.email}</strong>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)' }}>Creations:</span>{' '}
              <strong style={{ color: 'var(--text-primary)' }}>{user.creationCount || 0}</strong>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)' }}>Total Saved:</span>{' '}
              <strong style={{ color: 'var(--text-primary)' }}>{user.savedCount || 0}</strong>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)' }}>Total Likes:</span>{' '}
              <strong style={{ color: 'var(--text-primary)' }}>{user.likeCount || 0}</strong>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)' }}>Platform Role:</span>{' '}
              <strong style={{ color: 'var(--text-primary)', textTransform: 'capitalize' }}>{user.role || 'user'}</strong>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-muted)',
              fontSize: '11px',
              marginTop: '12px',
              paddingTop: '10px',
              borderTop: '1px solid var(--border-color)'
            }}
          >
            <Info size={13} color="var(--info)" />
            <span>Identity credentials and metrics are strictly protected and controlled by database rules.</span>
          </div>
        </div>
      </form>
    </Modal>
  );
}
