import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function CustomGrowthTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    return (
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '10px',
        padding: '10px 14px',
        boxShadow: 'var(--shadow-md)',
        fontSize: '12px'
      }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 500 }}>
          {label}
        </div>
        <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--secondary-purple)' }} />
          <span>{Number(val).toLocaleString()} new users</span>
        </div>
      </div>
    );
  }
  return null;
}

export default function UserGrowthChart({ data = [] }) {
  return (
    <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '340px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            User Growth
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            New users over time
          </p>
        </div>
      </div>

      <div style={{ flex: 1, width: '100%', minHeight: '260px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-color)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="var(--text-muted)"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: 'var(--border-color)' }}
            />
            <YAxis
              stroke="var(--text-muted)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomGrowthTooltip />} />
            <Bar
              dataKey="newUsers"
              fill="var(--secondary-purple)"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
