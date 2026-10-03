/**
 * Promptoo Admin — Template Types & Constants
 * 
 * Defines standard contracts, category taxonomies, status options,
 * and sorting definitions for the Template module.
 */

export const TEMPLATE_CATEGORIES = [
  { slug: 'cinematic', name: 'Cinematic', emoji: '🎬' },
  { slug: 'portrait', name: 'Portrait', emoji: '🖼️' },
  { slug: 'couple', name: 'Couple', emoji: '💑' },
  { slug: 'travel', name: 'Travel', emoji: '✈️' },
  { slug: 'fashion', name: 'Fashion', emoji: '✨' },
  { slug: 'ai-art', name: 'AI Art', emoji: '🎨' },
  { slug: 'vintage', name: 'Vintage', emoji: '📼' },
  { slug: 'festival', name: 'Festival', emoji: '🎉' },
  { slug: 'other', name: 'Other', emoji: '🔮' }
];

export const TEMPLATE_STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
];

export const TEMPLATE_SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'most-used', label: 'Most Used' },
  { value: 'most-liked', label: 'Most Liked' },
  { value: 'title-asc', label: 'A-Z' },
  { value: 'title-desc', label: 'Z-A' }
];
