import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const uses = payload[0].value;
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
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary-purple)' }} />
          <span>{Number(uses).toLocaleString()} uses</span>
        </div>
      </div>
    );
  }
  return null;
}

export default function TemplateUsageChart({ data = [] }) {
  return (
    <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '340px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Template Usage
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            Template creation activity over time
          </p>
        </div>
      </div>

      <div style={{ flex: 1, width: '100%', minHeight: '260px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary-purple)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--primary-purple)" stopOpacity={0.0} />
              </linearGradient>
            </defs>
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
              tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="uses"
              stroke="var(--primary-purple)"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#purpleGradient)"
              activeDot={{ r: 6, fill: '#FFFFFF', stroke: 'var(--primary-purple)', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
