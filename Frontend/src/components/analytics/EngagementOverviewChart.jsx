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
import { TrendingUp, Heart, Bookmark, Layers } from 'lucide-react';

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

export default function EngagementOverviewChart({ data = [] }) {
  const [showUses, setShowUses] = useState(true);
  const [showLikes, setShowLikes] = useState(true);
  const [showSaves, setShowSaves] = useState(true);

  return (
    <div className="admin-card" style={{ padding: '24px' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <TrendingUp size={18} color="var(--primary-purple)" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Engagement Overview
            </h3>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            Compare interactions across template uses, likes, and bookmarks
          </p>
        </div>

        {/* Toggle Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setShowUses(!showUses)}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid',
              borderColor: showUses ? 'var(--primary-purple)' : 'var(--border-color)',
              backgroundColor: showUses ? 'var(--primary-dim)' : 'var(--bg-elevated)',
              color: showUses ? '#FFFFFF' : 'var(--text-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <Layers size={13} color="var(--primary-purple)" />
            <span>Uses</span>
          </button>

          <button
            onClick={() => setShowLikes(!showLikes)}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid',
              borderColor: showLikes ? '#F43F5E' : 'var(--border-color)',
              backgroundColor: showLikes ? 'rgba(244, 63, 94, 0.12)' : 'var(--bg-elevated)',
              color: showLikes ? '#FFFFFF' : 'var(--text-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <Heart size={13} color="#F43F5E" />
            <span>Likes</span>
          </button>

          <button
            onClick={() => setShowSaves(!showSaves)}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid',
              borderColor: showSaves ? '#A78BFA' : 'var(--border-color)',
              backgroundColor: showSaves ? 'rgba(167, 139, 250, 0.12)' : 'var(--bg-elevated)',
              color: showSaves ? '#FFFFFF' : 'var(--text-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <Bookmark size={13} color="#A78BFA" />
            <span>Saves</span>
          </button>
        </div>
      </div>

      <div style={{ width: '100%', height: '280px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="engUsesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary-purple)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--primary-purple)" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="engLikesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="engSavesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.4} />
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
              stroke="var(--chart-axis)"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: 'var(--chart-grid)' }}
              tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v)}
            />
            <Tooltip content={<CustomTooltip />} />

            {showUses && (
              <Area
                type="monotone"
                dataKey="templateUses"
                name="Template Uses"
                stroke="var(--primary-purple)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#engUsesGrad)"
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
                fill="url(#engLikesGrad)"
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
                fill="url(#engSavesGrad)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
