import { useState, useEffect, useCallback, useMemo } from 'react';
import { settingsRepository } from '../repositories/settingsRepository';

export function useAdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState(null);
  const [draftSettings, setDraftSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await settingsRepository.getSettings();
      setSettings(res);
      setDraftSettings(JSON.parse(JSON.stringify(res)));
    } catch (err) {
      console.error('Failed to load settings:', err);
      setError('Unable to load settings.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Check if draft has changes compared to saved settings
  const isDirty = useMemo(() => {
    if (!settings || !draftSettings) return false;
    return JSON.stringify(settings) !== JSON.stringify(draftSettings);
  }, [settings, draftSettings]);

  // Update a single field in draft
  const updateDraft = useCallback((section, field, value) => {
    setDraftSettings((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      };
    });
  }, []);

  // Save all draft changes
  const saveChanges = useCallback(async () => {
    if (!draftSettings) return;
    try {
      setSaving(true);
      await Promise.all([
        settingsRepository.updateGeneralSettings(draftSettings.general),
        settingsRepository.updateAppearanceSettings(draftSettings.appearance),
        settingsRepository.updateNotificationSettings(draftSettings.notifications),
        settingsRepository.updateSecuritySettings(draftSettings.security),
        settingsRepository.updateApplicationSettings(draftSettings.application)
      ]);
      const refreshed = await settingsRepository.getSettings();
      setSettings(refreshed);
      setDraftSettings(JSON.parse(JSON.stringify(refreshed)));
      return true;
    } catch (err) {
      console.error('Failed to save settings:', err);
      throw err;
    } finally {
      setSaving(false);
    }
  }, [draftSettings]);

  // Discard changes and revert to saved settings
  const discardChanges = useCallback(() => {
    if (settings) {
      setDraftSettings(JSON.parse(JSON.stringify(settings)));
    }
  }, [settings]);

  // Reset to factory defaults
  const resetToDefaults = useCallback(async () => {
    try {
      setSaving(true);
      const defaults = await settingsRepository.resetSettings();
      setSettings(defaults);
      setDraftSettings(JSON.parse(JSON.stringify(defaults)));
      return true;
    } catch (err) {
      console.error('Failed to reset settings:', err);
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  return {
    activeTab,
    setActiveTab,
    settings,
    draftSettings,
    isDirty,
    loading,
    saving,
    error,
    updateDraft,
    saveChanges,
    discardChanges,
    resetToDefaults,
    refresh: fetchSettings
  };
}
