import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, RefreshCw, Trash2, AlertCircle } from 'lucide-react';

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export default function ImageDropzone({
  value = null, // string URL or File object
  onChange,
  error = null,
  onErrorClear
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [localError, setLocalError] = useState(null);
  const fileInputRef = useRef(null);

  // Compute preview URL
  let previewUrl = null;
  if (value) {
    if (typeof value === 'string') {
      previewUrl = value;
    } else if (value instanceof File) {
      previewUrl = URL.createObjectURL(value);
    }
  }

  const validateAndProcessFile = (file) => {
    setLocalError(null);
    if (onErrorClear) onErrorClear();

    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setLocalError('Unsupported file type. Please upload a PNG, JPG, JPEG, or WEBP image.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setLocalError('File size exceeds 5MB limit. Please choose a smaller image.');
      return;
    }

    onChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onChange(null);
    setLocalError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const activeError = error || localError;

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />

      {previewUrl ? (
        /* Image Preview State */
        <div
          style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-elevated)',
            maxHeight: '340px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={previewUrl}
            alt="Template preview"
            style={{
              width: '100%',
              maxHeight: '340px',
              objectFit: 'contain',
              display: 'block'
            }}
          />

          {/* Action Overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              display: 'flex',
              gap: '8px',
              backgroundColor: 'rgba(8, 9, 13, 0.85)',
              padding: '6px 10px',
              borderRadius: '8px',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--border-color)'
            }}
          >
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn btn-secondary btn-sm"
              style={{ height: '30px', padding: '0 10px', fontSize: '11px', gap: '5px' }}
            >
              <RefreshCw size={12} />
              <span>Replace</span>
            </button>

            <button
              type="button"
              onClick={handleRemove}
              className="btn btn-danger btn-sm"
              style={{ height: '30px', padding: '0 10px', fontSize: '11px', gap: '5px' }}
            >
              <Trash2 size={12} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        /* Empty Dropzone State */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${
              activeError
                ? 'var(--danger)'
                : isDragOver
                ? 'var(--primary-purple)'
                : 'var(--border-strong)'
            }`,
            borderRadius: '12px',
            backgroundColor: isDragOver ? 'var(--primary-dim)' : 'var(--bg-elevated)',
            padding: '36px 20px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: isDragOver ? 'var(--primary-purple)' : 'rgba(108, 77, 255, 0.1)',
              color: isDragOver ? '#FFFFFF' : 'var(--soft-purple)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            {isDragOver ? <UploadCloud size={26} /> : <ImageIcon size={26} />}
          </div>

          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
              Upload Template Image
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Drag & drop an image here or{' '}
              <span style={{ color: 'var(--primary-purple)', fontWeight: 600, textDecoration: 'underline' }}>
                Browse Files
              </span>
            </div>
          </div>

          <div
            style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
              backgroundColor: 'var(--bg-surface)',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)'
            }}
          >
            Supported: PNG, JPG, JPEG, WEBP • Max 5MB
          </div>
        </div>
      )}

      {/* Error Feedback */}
      {activeError && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--danger)',
            fontSize: '12px',
            marginTop: '8px'
          }}
        >
          <AlertCircle size={14} />
          <span>{activeError}</span>
        </div>
      )}
    </div>
  );
}
