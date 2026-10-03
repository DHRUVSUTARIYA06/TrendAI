import React from 'react';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'No records found',
  emptyIcon = null,
  onRowClick = null,
  style = {}
}) {
  if (loading) {
    return <LoadingState message="Loading data..." />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="data-table-container" style={style}>
        <EmptyState
          icon={emptyIcon}
          title={emptyMessage}
          description="Try adjusting your filters or adding new items."
        />
      </div>
    );
  }

  return (
    <div className="data-table-container" style={style}>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={col.key || idx}
                style={{
                  width: col.width || 'auto',
                  textAlign: col.align || 'left',
                  ...col.headerStyle
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr
              key={row.id || row._id || rowIdx}
              onClick={() => onRowClick && onRowClick(row)}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              {columns.map((col, colIdx) => (
                <td
                  key={col.key || colIdx}
                  style={{
                    textAlign: col.align || 'left',
                    ...col.cellStyle
                  }}
                >
                  {col.render ? col.render(row[col.key], row, rowIdx) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
