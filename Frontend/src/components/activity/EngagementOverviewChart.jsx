import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { Heart, Play, Bookmark } from 'lucide-react';

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
          minWidth: '150px'
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

export default function EngagementOverviewChart({
  data = [],
  loading = false
}) {
  const [showUses, setShowUses] = useState(true);
  const [showLikes, setShowLikes] = useState(true);
  const [showSaves, setShowSaves] = useState(true);

  return (
    <div className="admin-card" style={{ marginBottom: '24px' }}>
      {/* Header & Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          marginBottom: '20px'
        }}
      >
        <div>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Engagement Overview
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
            Template transformations, user likes, and collection saves over time
          </p>
        </div>

        {/* Metric Toggles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowUses((prev) => !prev)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: `1px solid ${showUses ? 'var(--primary-purple)' : 'var(--border-color)'}`,
              backgroundColor: showUses ? 'var(--primary-dim)' : 'transparent',
              color: showUses ? '#FFFFFF' : 'var(--text-muted)',
              transition: 'all 0.15s ease'
            }}
          >
            <Play size={12} fill={showUses ? 'var(--primary-purple)' : 'none'} />
            <span>Template Uses</span>
          </button>

          <button
            onClick={() => setShowLikes((prev) => !prev)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: `1px solid ${showLikes ? '#F43F5E' : 'var(--border-color)'}`,
              backgroundColor: showLikes ? 'rgba(244, 63, 94, 0.12)' : 'transparent',
              color: showLikes ? '#FFFFFF' : 'var(--text-muted)',
              transition: 'all 0.15s ease'
            }}
          >
            <Heart size={12} fill={showLikes ? '#F43F5E' : 'none'} color="#F43F5E" />
            <span>Likes</span>
          </button>

          <button
            onClick={() => setShowSaves((prev) => !prev)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: `1px solid ${showSaves ? '#A78BFA' : 'var(--border-color)'}`,
              backgroundColor: showSaves ? 'rgba(167, 139, 250, 0.12)' : 'transparent',
              color: showSaves ? '#FFFFFF' : 'var(--text-muted)',
              transition: 'all 0.15s ease'
            }}
          >
            <Bookmark size={12} fill={showSaves ? '#A78BFA' : 'none'} color="#A78BFA" />
            <span>Saves</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div style={{ width: '100%', height: '280px' }}>
        {loading ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '10px',
              backgroundColor: 'var(--bg-elevated)',
              animation: 'pulse 1.5s infinite ease-in-out'
            }}
          />
        ) : !data || data.length === 0 ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'var(--text-muted)',
              fontSize: '13px'
            }}
          >
            No engagement activity recorded for this date range.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradientUses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6C4DFF" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6C4DFF" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="gradientLikes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="gradientSaves" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#A78BFA" stopOpacity={0.0} />
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
                stroke="#71717A"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v)}
              />

              <Tooltip content={<CustomTooltip />} />

              {showUses && (
                <Area
                  type="monotone"
                  dataKey="uses"
                  name="Uses"
                  stroke="#6C4DFF"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#gradientUses)"
                />
              )}

              {showLikes && (
                <Area
                  type="monotone"
                  dataKey="likes"
                  name="Likes"
                  stroke="#F43F5E"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#gradientLikes)"
                />
              )}

              {showSaves && (
                <Area
                  type="monotone"
                  dataKey="saves"
                  name="Saves"
                  stroke="#A78BFA"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#gradientSaves)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
