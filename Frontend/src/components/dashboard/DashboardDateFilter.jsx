import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, Check } from 'lucide-react';
import { DATE_RANGES, DATE_RANGE_LABELS } from '../../types/dashboard';

export default function DashboardDateFilter({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options = [
    { id: DATE_RANGES.TODAY, label: DATE_RANGE_LABELS[DATE_RANGES.TODAY] },
    { id: DATE_RANGES.LAST_7_DAYS, label: DATE_RANGE_LABELS[DATE_RANGES.LAST_7_DAYS] },
    { id: DATE_RANGES.LAST_30_DAYS, label: DATE_RANGE_LABELS[DATE_RANGES.LAST_30_DAYS] },
    { id: DATE_RANGES.LAST_90_DAYS, label: DATE_RANGE_LABELS[DATE_RANGES.LAST_90_DAYS] },
    { id: DATE_RANGES.ALL_TIME, label: DATE_RANGE_LABELS[DATE_RANGES.ALL_TIME] },
  ];

  const currentLabel = DATE_RANGE_LABELS[value] || 'Last 30 days';

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="btn btn-secondary btn-sm"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          height: '38px',
          padding: '0 14px',
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--text-primary)',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: '10px'
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Calendar size={15} color="var(--primary-purple)" />
        <span>{currentLabel}</span>
        <ChevronDown
          size={14}
          color="var(--text-muted)"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.15s ease'
          }}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            width: '180px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-lg)',
            padding: '6px',
            zIndex: 100,
            animation: 'fadeIn 0.15s ease'
          }}
        >
          {options.map((opt) => {
            const isSelected = value === opt.id;
            return (
              <button
                key={opt.id}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.id);
                  setIsOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                  backgroundColor: isSelected ? 'var(--primary-dim)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color 0.15s'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'var(--bg-elevated)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                <span>{opt.label}</span>
                {isSelected && <Check size={14} color="var(--primary-purple)" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
