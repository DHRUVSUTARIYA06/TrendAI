import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { Layers } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: 'var(--chart-tooltip-bg)',
          border: '1px solid var(--chart-tooltip-border)',
          borderRadius: '10px',
          padding: '12px 16px',
          boxShadow: 'var(--shadow-md)',
          minWidth: '160px'
        }}
      >
        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
          {label}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {payload.map((entry, index) => (
            <div
              key={`item-${index}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px',
                gap: '12px'
              }}
            >
              <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: entry.color
                  }}
                />
                {entry.name}:
              </span>
              <strong style={{ color: 'var(--text-primary)' }}>{entry.value?.toLocaleString()}</strong>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function TemplateUsageChart({ data = [] }) {
  return (
    <div className="admin-card" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Layers size={18} color="var(--soft-purple)" />
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Template Usage
          </h3>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
          Daily transformations dispatched vs unique creators
        </p>
      </div>

      <div style={{ width: '100%', height: '280px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="usageGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--soft-purple)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--soft-purple)" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="uniqueUsersGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="var(--chart-axis)"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: 'var(--chart-grid)' }}
            />
            <YAxis
              stroke="var(--chart-axis)"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: 'var(--chart-grid)' }}
              tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v)}
            />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="templateUses"
              name="Template Uses"
              stroke="var(--soft-purple)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#usageGrad)"
            />
            <Area
              type="monotone"
              dataKey="uniqueUsers"
              name="Unique Users"
              stroke="#22C55E"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#uniqueUsersGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
