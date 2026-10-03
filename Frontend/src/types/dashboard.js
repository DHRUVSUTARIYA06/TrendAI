/**
 * Promptoo Master Admin — Dashboard Data Models & Type Contracts
 * 
 * Defines standard interfaces consumed by the Dashboard UI.
 * When Supabase is integrated, table & RPC responses will map to these structures.
 */

export const DATE_RANGES = {
  TODAY: 'today',
  LAST_7_DAYS: '7d',
  LAST_30_DAYS: '30d',
  LAST_90_DAYS: '90d',
  ALL_TIME: 'all',
};

export const DATE_RANGE_LABELS = {
  [DATE_RANGES.TODAY]: 'Today',
  [DATE_RANGES.LAST_7_DAYS]: 'Last 7 days',
  [DATE_RANGES.LAST_30_DAYS]: 'Last 30 days',
  [DATE_RANGES.LAST_90_DAYS]: 'Last 90 days',
  [DATE_RANGES.ALL_TIME]: 'All time',
};

/**
 * @typedef {Object} StatMetric
 * @property {string|number} value
 * @property {string} change
 * @property {'positive'|'negative'|'neutral'} changeType
 * @property {string} label
 * @property {string} [subtext]
 */

/**
 * @typedef {Object} DashboardOverview
 * @property {StatMetric} totalUsers
 * @property {StatMetric} totalTemplates
 * @property {StatMetric} totalTemplateUses
 * @property {StatMetric} totalSavedLikes
 */

/**
 * @typedef {Object} UsageDataPoint
 * @property {string} date
 * @property {number} uses
 */

/**
 * @typedef {Object} UserGrowthPoint
 * @property {string} date
 * @property {number} newUsers
 */

/**
 * @typedef {Object} CategoryPerformance
 * @property {string} name
 * @property {number} uses
 * @property {number} percentage
 */

/**
 * @typedef {Object} TopTemplate
 * @property {number} rank
 * @property {string} title
 * @property {string} category
 * @property {number} uses
 * @property {number} likes
 * @property {'active'|'draft'|'inactive'} status
 */

/**
 * @typedef {Object} RecentActivity
 * @property {string} id
 * @property {string} type - 'user'|'template'|'like'|'system'
 * @property {string} title
 * @property {string} description
 * @property {string} timestamp
 */

/**
 * @typedef {Object} SystemServiceStatus
 * @property {string} name
 * @property {'Connected'|'Active'|'Operational'|'Degraded'|'Offline'} status
 * @property {'success'|'warning'|'danger'} indicator
 */
