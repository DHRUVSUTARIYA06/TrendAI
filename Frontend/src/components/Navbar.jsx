import React from 'react';
import { Sparkles, Plus, FolderPlus, Server, Trash2, LogOut } from 'lucide-react';

export default function Navbar({
  onOpenTemplateModal,
  onOpenCategoryModal,
  isConnected,
  onClearTestData,
  onLogout,
}) {
  return (
    <header style={{
      borderBottom: '1px solid var(--border-color)',
      background: 'rgba(10, 9, 21, 0.85)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '16px 32px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #8B5CF6, #EC4899, #60A5FA)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px -4px rgba(236, 72, 153, 0.4)'
          }}>
            <Sparkles size={22} color="white" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '22px',
                fontWeight: '800',
                letterSpacing: '-0.5px'
              }}>
                Trend<span className="gradient-text">AI</span>
              </h1>
              <span style={{
                background: 'rgba(139, 92, 246, 0.15)',
                color: '#c084fc',
                fontSize: '11px',
                fontWeight: '700',
                padding: '3px 8px',
                borderRadius: '6px',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                textTransform: 'uppercase'
              }}>
                Admin Studio
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Manage AI Templates, Prompts & Categories for TrendAI App
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Connection Status */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: isConnected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${isConnected ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)'}`,
            padding: '6px 14px',
            borderRadius: '30px',
            fontSize: '12px',
            fontWeight: '600',
            color: isConnected ? '#34d399' : '#f87171'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isConnected ? '#10b981' : '#ef4444',
              display: 'inline-block'
            }} />
            <span>{isConnected ? 'MongoDB Connected' : 'Connecting to API...'}</span>
          </div>

          <button
            onClick={onOpenCategoryModal}
            style={{
              background: '#1e1b3a',
              color: '#e2e8f0',
              border: '1px solid var(--border-color)',
              padding: '10px 18px',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FolderPlus size={16} />
            Categories
          </button>

          <button
            onClick={onOpenTemplateModal}
            className="gradient-btn"
            style={{ fontSize: '13px', padding: '10px 20px' }}
          >
            <Plus size={18} />
            Upload Template
          </button>

          {onClearTestData && (
            <button
              onClick={onClearTestData}
              title="Remove sample/demo test templates"
              style={{
                background: 'rgba(239, 68, 68, 0.12)',
                color: '#f87171',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '10px 14px',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Trash2 size={16} />
              <span>Clean Test Data</span>
            </button>
          )}

          {onLogout && (
            <button
              onClick={onLogout}
              title="Lock Admin Studio"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#94a3b8',
                border: '1px solid var(--border-color)',
                padding: '10px 14px',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <LogOut size={16} />
              <span>Lock</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
