import React from 'react';
import { Users, Layers, Wand2, Heart } from 'lucide-react';
import StatCard from '../common/StatCard';

export default function DashboardOverviewCards({ overview }) {
  if (!overview) return null;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '28px'
      }}
      className="dashboard-stats-grid"
    >
      {/* 1. Total Users */}
      <StatCard
        icon={Users}
        label={overview.totalUsers?.label || 'Total Users'}
        value={overview.totalUsers?.value || '24,582'}
        change={overview.totalUsers?.change || '+12.5%'}
        changeType={overview.totalUsers?.changeType || 'positive'}
        subtext={overview.totalUsers?.subtext || 'vs previous period'}
        iconColor="var(--info)"
      />

      {/* 2. Total Templates */}
      <StatCard
        icon={Layers}
        label={overview.totalTemplates?.label || 'Total Templates'}
        value={overview.totalTemplates?.value || '1,248'}
        change={overview.totalTemplates?.change || '+8.2%'}
        changeType={overview.totalTemplates?.changeType || 'positive'}
        subtext={overview.totalTemplates?.subtext || 'vs previous period'}
        iconColor="var(--primary-purple)"
      />

      {/* 3. Total Template Uses */}
      <StatCard
        icon={Wand2}
        label={overview.totalTemplateUses?.label || 'Total Template Uses'}
        value={overview.totalTemplateUses?.value || '186,420'}
        change={overview.totalTemplateUses?.change || '+18.4%'}
        changeType={overview.totalTemplateUses?.changeType || 'positive'}
        subtext={overview.totalTemplateUses?.subtext || 'vs previous period'}
        iconColor="var(--success)"
      />

      {/* 4. Total Saved/Likes */}
      <StatCard
        icon={Heart}
        label={overview.totalSavedLikes?.label || 'Total Saved/Likes'}
        value={overview.totalSavedLikes?.value || '92,840'}
        change={overview.totalSavedLikes?.change || '+11.7%'}
        changeType={overview.totalSavedLikes?.changeType || 'positive'}
        subtext={overview.totalSavedLikes?.subtext || 'vs previous period'}
        iconColor="var(--danger)"
      />
    </div>
  );
}
