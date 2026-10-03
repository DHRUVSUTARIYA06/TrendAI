import React, { useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastContext } from './ToastContextInstance';
export { useToast } from '../hooks/useToast';

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type = 'success', duration = 3500 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (msg, dur) => addToast({ message: msg, type: 'success', duration: dur }),
    error: (msg, dur) => addToast({ message: msg, type: 'error', duration: dur }),
    info: (msg, dur) => addToast({ message: msg, type: 'info', duration: dur })
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast Render Container */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 9999,
          pointerEvents: 'none',
          maxWidth: '380px'
        }}
      >
        {toasts.map((t) => {
          const isSuccess = t.type === 'success';
          const isError = t.type === 'error';
          const icon = isSuccess ? (
            <CheckCircle2 size={18} color="var(--success)" />
          ) : isError ? (
            <AlertCircle size={18} color="var(--danger)" />
          ) : (
            <Info size={18} color="var(--info)" />
          );

          const borderColor = isSuccess
            ? 'var(--success-border)'
            : isError
            ? 'var(--danger-border)'
            : 'var(--info-border)';

          const bgColor = 'var(--bg-surface)';

          return (
            <div
              key={t.id}
              style={{
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: bgColor,
                border: `1px solid ${borderColor}`,
                boxShadow: 'var(--shadow-lg)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                fontWeight: 500,
                animation: 'slideUp 0.2s ease',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ flexShrink: 0 }}>{icon}</div>
              <div style={{ flex: 1, lineHeight: 1.4 }}>{t.message}</div>
              <button
                onClick={() => removeToast(t.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '4px'
                }}
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
