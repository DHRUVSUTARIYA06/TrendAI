/**
 * Promptoo Admin — Repositories Barrel Export
 *
 * Central data access interfaces for all 11 admin modules.
 * In production Supabase integration, these repositories provide the abstraction
 * layer swapping mock/local providers for Supabase Client query execution.
 */

export * from './categoryRepository.js';
export * from './templateRepository.js';
export * from './userRepository.js';
export * from './dashboardRepository.js';
export * from './leaderboardRepository.js';
export * from './activityRepository.js';
export * from './notificationRepository.js';
export * from './analyticsRepository.js';
export * from './reportRepository.js';
export * from './adminRepository.js';
export * from './settingsRepository.js';
