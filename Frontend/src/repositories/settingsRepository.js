/**
 * Promptoo Admin — Settings Repository Interface & Mock Provider
 *
 * Encapsulates application configuration, preferences, and system parameters.
 * Local settings are persisted to localStorage so adjustments remain active across reloads.
 */

const STORAGE_KEY = 'promptoo_admin_settings_v1';

import { DEFAULT_SETTINGS } from '../mock/settingsMockData.js';

function loadStoredSettings() {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      if (item) {
        return JSON.parse(item);
      }
    } catch {
      // Fallback
    }
  }
  return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
}

function saveStoredSettings(settings) {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Fallback
    }
  }
}

let currentSettings = loadStoredSettings();

export const settingsRepository = {
  /**
   * Retrieves all configuration sections
   */
  getSettings: async () => {
    await new Promise((resolve) => setTimeout(resolve, 60));
    return JSON.parse(JSON.stringify(currentSettings));
  },

  /**
   * Updates General configuration
   */
  updateGeneralSettings: async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 80));
    currentSettings.general = {
      ...currentSettings.general,
      ...data
    };
    saveStoredSettings(currentSettings);
    return JSON.parse(JSON.stringify(currentSettings.general));
  },

  /**
   * Updates Appearance preferences
   */
  updateAppearanceSettings: async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 70));
    currentSettings.appearance = {
      ...currentSettings.appearance,
      ...data
    };
    saveStoredSettings(currentSettings);
    return JSON.parse(JSON.stringify(currentSettings.appearance));
  },

  /**
   * Updates Notification toggles
   */
  updateNotificationSettings: async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 70));
    currentSettings.notifications = {
      ...currentSettings.notifications,
      ...data
    };
    saveStoredSettings(currentSettings);
    return JSON.parse(JSON.stringify(currentSettings.notifications));
  },

  /**
   * Updates Security preferences
   */
  updateSecuritySettings: async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 70));
    currentSettings.security = {
      ...currentSettings.security,
      ...data
    };
    saveStoredSettings(currentSettings);
    return JSON.parse(JSON.stringify(currentSettings.security));
  },

  /**
   * Updates Application feature flags
   */
  updateApplicationSettings: async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 70));
    currentSettings.application = {
      ...currentSettings.application,
      ...data
    };
    saveStoredSettings(currentSettings);
    return JSON.parse(JSON.stringify(currentSettings.application));
  },

  /**
   * Resets all configuration to factory defaults
   */
  resetSettings: async () => {
    await new Promise((resolve) => setTimeout(resolve, 90));
    currentSettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
    saveStoredSettings(currentSettings);
    return JSON.parse(JSON.stringify(currentSettings));
  },

  /**
   * Refreshes settings from storage
   */
  refreshSettings: async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    currentSettings = loadStoredSettings();
    return JSON.parse(JSON.stringify(currentSettings));
  }
};
