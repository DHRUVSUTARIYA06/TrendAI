import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Promptoo Admin — Common Pagination Component
 *
 * @param {number} currentPage - Current active page (1-indexed)
 * @param {number} totalPages - Total available pages
 * @param {number} [totalItems] - Total number of items across all pages
 * @param {number} [pageSize=10] - Number of items per page
 * @param {function} onPageChange - Callback when user selects another page
 */
export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  totalItems,
  pageSize = 10,
  onPageChange
}) {
  if (totalPages <= 1 && !totalItems) return null;

  const startItem = totalItems ? Math.min((currentPage - 1) * pageSize + 1, totalItems) : null;
  const endItem = totalItems ? Math.min(currentPage * pageSize, totalItems) : null;

  const handlePrev = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderTop: '1px solid var(--border-default)',
        fontSize: '13px',
        color: 'var(--text-secondary)'
      }}
    >
      <div>
        {totalItems != null && (
          <span>
            Showing <strong style={{ color: 'var(--text-primary)' }}>{startItem}</strong> to{' '}
            <strong style={{ color: 'var(--text-primary)' }}>{endItem}</strong> of{' '}
            <strong style={{ color: 'var(--text-primary)' }}>{totalItems}</strong> entries
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage <= 1}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid var(--border-default)',
            backgroundColor: currentPage <= 1 ? 'transparent' : 'var(--bg-surface)',
            color: currentPage <= 1 ? 'var(--text-muted)' : 'var(--text-primary)',
            fontSize: '12px',
            fontWeight: 500,
            cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
            opacity: currentPage <= 1 ? 0.5 : 1,
            transition: 'all 0.15s ease'
          }}
        >
          <ChevronLeft size={14} />
          Previous
        </button>

        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', padding: '0 4px' }}>
          Page <strong style={{ color: 'var(--text-primary)' }}>{currentPage}</strong> of{' '}
          <strong style={{ color: 'var(--text-primary)' }}>{Math.max(1, totalPages)}</strong>
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid var(--border-default)',
            backgroundColor: currentPage >= totalPages ? 'transparent' : 'var(--bg-surface)',
            color: currentPage >= totalPages ? 'var(--text-muted)' : 'var(--text-primary)',
            fontSize: '12px',
            fontWeight: 500,
            cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
            opacity: currentPage >= totalPages ? 0.5 : 1,
            transition: 'all 0.15s ease'
          }}
        >
          Next
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
