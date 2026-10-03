import React, { useState } from 'react';
import { X, Download, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { REPORT_DATE_RANGES } from '../../types/report';

export default function ReportDetailModal({
  isOpen,
  onClose,
  report,
  dateRange = '30d',
  onRangeChange,
  generating = false
}) {
  const [copied, setCopied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  if (!isOpen || !report) return null;

  // Real client-side CSV download
  const handleExportCSV = () => {
    if (!report.columns || !report.data) return;

    const headers = report.columns.map((c) => `"${c.label}"`).join(',');
    const rows = report.data.map((row) => {
      return report.columns
        .map((c) => {
          const val = row[c.key] !== undefined ? String(row[c.key]) : '';
          return `"${val.replace(/"/g, '""')}"`;
        })
        .join(',');
    });

    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${report.id}_${dateRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formattedGeneratedDate = report.generatedAt
    ? new Date(report.generatedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Just now';

  // Pagination for report rows
  const totalRows = report.data?.length || 0;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = report.data?.slice(startIndex, startIndex + pageSize) || [];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
    >
      <div
        className="admin-card"
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          animation: 'modalSlideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-surface)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(108, 77, 255, 0.1)',
                border: '1px solid var(--primary-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-purple)'
              }}
            >
              <FileText size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {report.title}
              </h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                Generated on {formattedGeneratedDate} • Report ID: {report.id}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleExportCSV}
              className="btn btn-secondary btn-sm"
              style={{ gap: '6px' }}
              title="Download real CSV file"
            >
              {copied ? <CheckCircle2 size={13} color="var(--success)" /> : <Download size={13} />}
              <span>{copied ? 'CSV Downloaded!' : 'Export CSV'}</span>
            </button>

            <button
              onClick={onClose}
              className="btn-icon"
              style={{ width: '32px', height: '32px' }}
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Body Scroll Area */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {/* Controls Bar: Range Selector */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={15} color="var(--text-muted)" />
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Report Period:
              </span>
              <div style={{ display: 'inline-flex', gap: '4px' }}>
                {REPORT_DATE_RANGES.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => {
                      setCurrentPage(1);
                      onRangeChange(r.value);
                    }}
                    disabled={generating}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: dateRange === r.value ? 'var(--primary-purple)' : 'var(--border-color)',
                      backgroundColor: dateRange === r.value ? 'var(--primary-dim)' : 'var(--bg-elevated)',
                      color: dateRange === r.value ? '#FFFFFF' : 'var(--text-muted)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Showing {totalRows} records
            </span>
          </div>

          {/* Key Metrics Summary Cards */}
          {report.summaryMetrics && report.summaryMetrics.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '12px',
                marginBottom: '24px'
              }}
            >
              {report.summaryMetrics.map((sm, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 16px',
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px'
                  }}
                >
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    {sm.label}
                  </span>
                  <strong style={{ fontSize: '17px', color: 'var(--text-primary)' }}>
                    {typeof sm.value === 'number' ? sm.value.toLocaleString() : sm.value}
                  </strong>
                </div>
              ))}
            </div>
          )}

          {/* Report Data Table */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {report.columns?.map((col) => (
                      <th key={col.key} style={{ fontSize: '12px' }}>
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {report.columns?.map((col) => (
                        <td key={col.key} style={{ fontSize: '12px' }}>
                          {row[col.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '16px',
                fontSize: '12px',
                color: 'var(--text-secondary)'
              }}
            >
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="btn btn-secondary btn-sm"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="btn btn-secondary btn-sm"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
