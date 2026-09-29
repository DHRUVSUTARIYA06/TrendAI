import React, { useState } from 'react';
import { X, Copy, Check, Sparkles } from 'lucide-react';

export default function PromptModal({ isOpen, onClose, template }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !template) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(template.prompt || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={18} color="white" />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                {template.title} Prompt
              </h2>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Category: {template.category} • Sent directly to ChatGPT
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              color: 'var(--text-muted)',
              padding: '8px',
              borderRadius: '10px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{
          background: '#0d0b1a',
          border: '1px solid rgba(139, 92, 246, 0.25)',
          borderRadius: '16px',
          padding: '20px',
          color: '#e2e8f0',
          fontSize: '14px',
          lineHeight: '1.6',
          whiteSpace: 'pre-wrap',
          maxHeight: '300px',
          overflowY: 'auto',
          fontFamily: 'monospace',
          marginBottom: '24px'
        }}>
          {template.prompt}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            onClick={handleCopy}
            className="gradient-btn"
            style={{ padding: '10px 20px', fontSize: '13px' }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied to Clipboard!' : 'Copy Full Prompt'}
          </button>
        </div>
      </div>
    </div>
  );
}
