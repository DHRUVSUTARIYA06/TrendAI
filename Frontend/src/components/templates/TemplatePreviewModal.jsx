import React, { useState } from 'react';
import {
  Copy,
  Check,
  Edit,
  Power,
  Trash2,
  Calendar,
  Sparkles,
  Heart,
  Tag,
  Star,
  Flame,
  Info
} from 'lucide-react';
import Modal from '../common/Modal';
import StatusBadge from '../common/StatusBadge';
import { formatDate } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80';

export default function TemplatePreviewModal({
  isOpen,
  onClose,
  template,
  onEdit,
  onDuplicate,
  onToggleStatus,
  onDelete
}) {
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  if (!template) return null;

  const isActive = Boolean(template.active);
  const isFeatured = Boolean(template.featured);
  const isTrending = Boolean(template.trending);

  const handleCopyPrompt = () => {
    if (!template.prompt) return;
    navigator.clipboard.writeText(template.prompt);
    setCopied(true);
    toast.success('AI Prompt copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Template Details"
      maxWidth="780px"
      footer={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Danger delete */}
          <button
            onClick={() => {
              onClose();
              onDelete(template);
            }}
            className="btn btn-ghost btn-sm"
            style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => {
                onClose();
                onToggleStatus(template);
              }}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Power size={14} />
              <span>{isActive ? 'Deactivate' : 'Activate'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onDuplicate(template);
              }}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Copy size={14} />
              <span>Duplicate</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onEdit(template);
              }}
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Edit size={14} />
              <span>Edit Template</span>
            </button>
          </div>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Top: Large Image & Header Info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 260px) 1fr', gap: '20px' }}>
          {/* Image */}
          <div
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              aspectRatio: '1 / 1',
              maxHeight: '260px'
            }}
          >
            <img
              src={template.imageUrl || template.thumbnailUrl || FALLBACK_IMG}
              alt={template.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = FALLBACK_IMG;
              }}
            />
          </div>

          {/* Quick Info & Badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                <StatusBadge
                  status={isActive ? 'active' : 'inactive'}
                  label={isActive ? 'Active' : 'Inactive'}
                />
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {template.categoryName || template.category}
                </span>

                {isFeatured && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(108, 77, 255, 0.15)',
                      color: 'var(--soft-purple)'
                    }}
                  >
                    <Star size={11} /> Featured
                  </span>
                )}

                {isTrending && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(245, 158, 11, 0.15)',
                      color: 'var(--warning)'
                    }}
                  >
                    <Flame size={11} /> Trending
                  </span>
                )}
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                {template.title}
              </h2>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                ID: {template.id || template._id} • Version {template.version || '1.0'}
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {template.description || 'No description provided.'}
            </p>

            {/* Tags */}
            {Array.isArray(template.tags) && template.tags.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: 'auto' }}>
                <Tag size={13} color="var(--text-muted)" />
                {template.tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--bg-elevated)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AI Prompt Section */}
        <div
          style={{
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '16px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px'
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--soft-purple)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              AI Generation Prompt ({template.prompt ? template.prompt.length : 0} chars)
            </div>
            <button
              onClick={handleCopyPrompt}
              className="btn btn-secondary btn-sm"
              style={{ height: '30px', padding: '0 10px', fontSize: '11px', gap: '4px' }}
            >
              {copied ? <Check size={13} color="var(--success)" /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy Prompt'}</span>
            </button>
          </div>
          <div
            style={{
              fontSize: '13px',
              fontFamily: 'monospace',
              color: 'var(--text-primary)',
              lineHeight: 1.6,
              backgroundColor: 'var(--bg-primary)',
              padding: '12px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              maxHeight: '160px',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap'
            }}
          >
            {template.prompt || 'No prompt configured.'}
          </div>
        </div>

        {/* Server Controlled Metrics Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px'
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px 14px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <Sparkles size={13} color="#A78BFA" /> Total Uses
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {(template.usageCount || 0).toLocaleString()}
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px 14px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <Heart size={13} color="#F43F5E" /> Total Likes
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#F43F5E' }}>
              {(template.likeCount || 0).toLocaleString()}
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px 14px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <Calendar size={13} /> Created
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {formatDate(template.createdAt)}
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px 14px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <Info size={13} /> Last Updated
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {formatDate(template.updatedAt || template.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
