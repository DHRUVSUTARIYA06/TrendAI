/**
 * Promptoo Admin — Report Repository Interface & Mock Provider
 *
 * Encapsulates report generation, structured data exports,
 * and historical report snapshots across all 6 core business domains.
 */

import { REPORT_DEFINITIONS } from '../types/report.js';
import { analyticsRepository } from './analyticsRepository.js';
import { MOCK_REPORT_ACTIVITY_DATA, MOCK_REPORT_ACTIVITY_METRICS } from '../mock/reportMockData.js';

export const reportRepository = {
  /**
   * Retrieves available report definitions
   */
  getAvailableReports: async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return [...REPORT_DEFINITIONS];
  },

  /**
   * Generates a structured report dataset based on type & date range
   */
  generateReport: async ({ reportType = 'user_growth', dateRange = '30d', filters = {} } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 140));

    const def = REPORT_DEFINITIONS.find((r) => r.id === reportType) || REPORT_DEFINITIONS[0];
    const generatedAt = new Date().toISOString();

    const stats = await analyticsRepository.getOverviewStats({ dateRange });

    let data = [];
    let columns = [];
    let summaryMetrics = [];

    switch (reportType) {
      case 'user_growth': {
        const growth = await analyticsRepository.getUserGrowth({ dateRange, interval: 'daily' });
        columns = [
          { key: 'date', label: 'Date' },
          { key: 'newUsers', label: 'New Creators' },
          { key: 'totalUsers', label: 'Total Creators' },
          { key: 'growthRate', label: 'Day-over-Day Growth' }
        ];
        data = growth.map((g, idx) => ({
          date: g.date,
          newUsers: g.newUsers,
          totalUsers: g.totalUsers,
          growthRate: idx === 0 ? '+1.2%' : `+${(1.1 + (idx % 3) * 0.4).toFixed(1)}%`
        }));
        summaryMetrics = [
          { label: 'Total Users', value: stats.totalUsers },
          { label: 'New Registrations', value: stats.newUsers },
          { label: 'Active Creators', value: stats.activeUsers },
          { label: 'Growth Velocity', value: '+15.2%' }
        ];
        break;
      }

      case 'template_performance': {
        const templates = await analyticsRepository.getTopTemplates({ dateRange, limit: 10 });
        columns = [
          { key: 'rank', label: 'Rank' },
          { key: 'title', label: 'Template Name' },
          { key: 'category', label: 'Category' },
          { key: 'uses', label: 'Template Uses' },
          { key: 'likes', label: 'Likes' },
          { key: 'saves', label: 'Saves' },
          { key: 'engagement', label: 'Engagement Score' }
        ];
        data = templates.map((t) => ({
          rank: `#${t.rank}`,
          title: t.title,
          category: t.category,
          uses: t.uses.toLocaleString(),
          likes: t.likes.toLocaleString(),
          saves: t.saves.toLocaleString(),
          engagement: t.engagement.toLocaleString()
        }));
        summaryMetrics = [
          { label: 'Total Uses', value: stats.templateUses },
          { label: 'Total Likes', value: stats.totalLikes },
          { label: 'Total Saves', value: stats.totalSaves },
          { label: 'Top Performer', value: templates[0]?.title || '—' }
        ];
        break;
      }

      case 'engagement': {
        const eng = await analyticsRepository.getEngagementOverview({ dateRange });
        columns = [
          { key: 'date', label: 'Date' },
          { key: 'templateUses', label: 'Uses' },
          { key: 'likes', label: 'Likes' },
          { key: 'saves', label: 'Saves' },
          { key: 'totalInteractions', label: 'Total Interactions' }
        ];
        data = eng.map((e) => ({
          date: e.date,
          templateUses: e.templateUses.toLocaleString(),
          likes: e.likes.toLocaleString(),
          saves: e.saves.toLocaleString(),
          totalInteractions: (e.templateUses + e.likes + e.saves).toLocaleString()
        }));
        summaryMetrics = [
          { label: 'Total Likes', value: stats.totalLikes },
          { label: 'Total Saves', value: stats.totalSaves },
          { label: 'Template Uses', value: stats.templateUses },
          { label: 'Engagement Change', value: '+14.8%' }
        ];
        break;
      }

      case 'category_performance': {
        const cats = await analyticsRepository.getCategoryPerformance({ dateRange, categoryId: filters.category || 'all' });
        columns = [
          { key: 'name', label: 'Category' },
          { key: 'templateCount', label: 'Templates' },
          { key: 'uses', label: 'Uses' },
          { key: 'likes', label: 'Likes' },
          { key: 'saves', label: 'Saves' },
          { key: 'engagement', label: 'Engagement Score' }
        ];
        data = cats.map((c) => ({
          name: c.name,
          templateCount: c.templateCount,
          uses: c.uses.toLocaleString(),
          likes: c.likes.toLocaleString(),
          saves: c.saves.toLocaleString(),
          engagement: c.engagement.toLocaleString()
        }));
        summaryMetrics = [
          { label: 'Categories Analyzed', value: cats.length },
          { label: 'Leading Category', value: cats[0]?.name || '—' },
          { label: 'Total Uses', value: stats.templateUses },
          { label: 'Avg Uses / Cat', value: Math.round(stats.templateUses / (cats.length || 1)).toLocaleString() }
        ];
        break;
      }

      case 'activity': {
        columns = [
          { key: 'time', label: 'Timestamp' },
          { key: 'user', label: 'User' },
          { key: 'action', label: 'Action' },
          { key: 'template', label: 'Template' },
          { key: 'status', label: 'Status' }
        ];
        data = [...MOCK_REPORT_ACTIVITY_DATA];
        summaryMetrics = [...MOCK_REPORT_ACTIVITY_METRICS];
        break;
      }

      case 'leaderboard': {
        const users = await analyticsRepository.getMostActiveUsers({ dateRange, limit: 10 });
        columns = [
          { key: 'rank', label: 'Rank' },
          { key: 'displayName', label: 'Creator' },
          { key: 'email', label: 'Email' },
          { key: 'templateUses', label: 'Generations' },
          { key: 'likes', label: 'Likes' },
          { key: 'saves', label: 'Saves' },
          { key: 'score', label: 'Leaderboard Points' }
        ];
        data = users.map((u) => ({
          rank: `#${u.rank}`,
          displayName: u.displayName,
          email: u.email,
          templateUses: u.templateUses.toLocaleString(),
          likes: u.likes.toLocaleString(),
          saves: u.saves.toLocaleString(),
          score: (u.templateUses * 10 + u.likes * 5 + u.saves * 8).toLocaleString()
        }));
        summaryMetrics = [
          { label: 'Top Creator', value: users[0]?.displayName || '—' },
          { label: 'Creators Ranked', value: users.length },
          { label: 'Top Score', value: (users[0]?.templateUses * 10 + users[0]?.likes * 5 + users[0]?.saves * 8).toLocaleString() },
          { label: 'Active Creators', value: stats.activeUsers }
        ];
        break;
      }

      default:
        break;
    }

    return {
      id: `REP-${reportType.toUpperCase()}-${Date.now().toString(36)}`,
      reportType,
      title: def.title,
      description: def.description,
      dateRange,
      generatedAt,
      summaryMetrics,
      columns,
      data
    };
  },

  /**
   * Refreshes report data
   */
  refreshReports: async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return true;
  }
};
