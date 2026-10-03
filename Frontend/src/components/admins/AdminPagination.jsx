import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE_OPTIONS = [10, 25, 50];

export default function AdminPagination({
  page = 1,
  pageSize = 10,
  total = 0,
  totalPages = 1,
  onPageChange,
  onPageSizeChange
}) {
  if (total === 0) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        padding: '12px 4px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Showing <strong style={{ color: 'var(--text-primary)' }}>{start}–{end}</strong> of{' '}
          <strong style={{ color: 'var(--text-primary)' }}>{total}</strong> admins
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            style={{
              height: '30px',
              padding: '0 8px',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              color: 'var(--text-primary)',
              fontSize: '12px',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="btn-icon"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            border: '1px solid var(--border-color)',
            opacity: page <= 1 ? 0.4 : 1,
            cursor: page <= 1 ? 'not-allowed' : 'pointer'
          }}
          title="Previous Page"
        >
          <ChevronLeft size={16} />
        </button>

        {pageNumbers.map((p) => {
          const isActive = p === page;
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: isActive ? 'var(--primary-purple)' : 'var(--border-color)',
                backgroundColor: isActive ? 'var(--primary-purple)' : 'var(--bg-elevated)',
                color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {p}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="btn-icon"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            border: '1px solid var(--border-color)',
            opacity: page >= totalPages ? 0.4 : 1,
            cursor: page >= totalPages ? 'not-allowed' : 'pointer'
          }}
          title="Next Page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
