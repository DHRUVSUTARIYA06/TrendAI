import React from 'react';
import { AlertCircle, Save, RotateCcw, Loader2 } from 'lucide-react';

export default function UnsavedChangesBar({
  isDirty = false,
  saving = false,
  onSave,
  onDiscard
}) {
  if (!isDirty) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--primary-purple)',
        borderRadius: '12px',
        padding: '12px 20px',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        maxWidth: '700px',
        width: 'calc(100% - 48px)',
        animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-dim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--soft-purple)',
            flexShrink: 0
          }}
        >
          <AlertCircle size={16} />
        </div>
        <div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', display: 'block' }}>
            Careful — you have unsaved changes!
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Remember to save your settings before switching sections or leaving the page.
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <button
          type="button"
          onClick={onDiscard}
          disabled={saving}
          className="btn btn-secondary btn-sm"
          style={{ height: '34px', padding: '0 12px' }}
        >
          <RotateCcw size={13} />
          <span>Discard</span>
        </button>

        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="btn btn-primary btn-sm"
          style={{ height: '34px', padding: '0 16px' }}
        >
          {saving ? (
            <>
              <Loader2 size={13} className="spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save size={13} />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
