import React from 'react';
import { Users, Layers, TrendingUp, Tag, Activity, Trophy, ArrowRight } from 'lucide-react';

const ICON_MAP = {
  Users,
  Layers,
  TrendingUp,
  Tag,
  Activity,
  Trophy
};

export default function ReportCardsGrid({
  reports = [],
  onViewReport,
  generating = false
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}
    >
      {reports.map((report) => {
        const IconComponent = ICON_MAP[report.iconName] || Layers;

        return (
          <div
            key={report.id}
            className="admin-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s ease, border-color 0.2s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: report.color
                  }}
                >
                  <IconComponent size={20} />
                </div>

                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--soft-purple)',
                    backgroundColor: 'var(--primary-dim)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    border: '1px solid var(--primary-border)'
                  }}
                >
                  30 Days Default
                </span>
              </div>

              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
                {report.title}
              </h4>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 20px 0' }}>
                {report.description}
              </p>
            </div>

            <button
              onClick={() => onViewReport(report.id)}
              disabled={generating}
              className="btn btn-secondary"
              style={{
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>View Report</span>
              <ArrowRight size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
