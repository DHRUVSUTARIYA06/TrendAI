import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ACTIVITY_PAGE_SIZE_OPTIONS } from '../../types/activity';

export default function ActivityPagination({
  page = 1,
  totalPages = 1,
  total = 0,
  pageSize = 10,
  onPageChange,
  onPageSizeChange
}) {
  if (total === 0) return null;

  const startRecord = Math.min((page - 1) * pageSize + 1, total);
  const endRecord = Math.min(page * pageSize, total);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        padding: '16px 4px 4px 4px'
      }}
    >
      {/* Range and count indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Showing <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{startRecord}–{endRecord}</span> of{' '}
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{total.toLocaleString()}</span> activities
        </div>

        {/* Page size select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
          <span>Per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(e.target.value)}
            style={{
              height: '30px',
              padding: '2px 8px',
              borderRadius: '6px',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '12px',
              cursor: 'pointer'
            }}
            aria-label="Select activity page size"
          >
            {ACTIVITY_PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Page navigation controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="btn btn-secondary btn-sm"
          style={{
            padding: '0 10px',
            opacity: page <= 1 ? 0.4 : 1,
            cursor: page <= 1 ? 'not-allowed' : 'pointer'
          }}
          aria-label="Previous Page"
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>

        {getPageNumbers().map((p, idx) => {
          if (p === '...') {
            return (
              <span
                key={`ellipsis-${idx}`}
                style={{
                  padding: '0 6px',
                  color: 'var(--text-muted)',
                  fontSize: '13px'
                }}
              >
                ...
              </span>
            );
          }

          const isCurrent = p === page;
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: isCurrent ? '1px solid var(--primary-purple)' : '1px solid var(--border-color)',
                backgroundColor: isCurrent ? 'var(--primary-purple)' : 'var(--bg-elevated)',
                color: isCurrent ? '#FFFFFF' : 'var(--text-secondary)',
                transition: 'all 0.15s ease'
              }}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {p}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="btn btn-secondary btn-sm"
          style={{
            padding: '0 10px',
            opacity: page >= totalPages ? 0.4 : 1,
            cursor: page >= totalPages ? 'not-allowed' : 'pointer'
          }}
          aria-label="Next Page"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
