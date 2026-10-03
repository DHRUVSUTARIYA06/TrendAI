import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import LoadingState from '../components/common/LoadingState';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { useAdminSettings } from '../hooks/useAdminSettings';
import { useToast } from '../context/ToastContext';
import SettingsNav from '../components/settings/SettingsNav';
import GeneralSettingsSection from '../components/settings/GeneralSettingsSection';
import AppearanceSettingsSection from '../components/settings/AppearanceSettingsSection';
import NotificationSettingsSection from '../components/settings/NotificationSettingsSection';
import SecuritySettingsSection from '../components/settings/SecuritySettingsSection';
import ApplicationSettingsSection from '../components/settings/ApplicationSettingsSection';
import AboutSettingsSection from '../components/settings/AboutSettingsSection';
import UnsavedChangesBar from '../components/settings/UnsavedChangesBar';
import { RotateCcw } from 'lucide-react';

export default function SettingsPage() {
  const toast = useToast();
  const {
    activeTab,
    setActiveTab,
    draftSettings,
    isDirty,
    loading,
    saving,
    error,
    updateDraft,
    saveChanges,
    discardChanges,
    resetToDefaults
  } = useAdminSettings();

  const [showResetModal, setShowResetModal] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleSave = async () => {
    try {
      await saveChanges();
      toast.success('Settings updated successfully.');
    } catch {
      toast.error('Failed to save settings. Please try again.');
    }
  };

  const handleConfirmReset = async () => {
    try {
      setResetting(true);
      await resetToDefaults();
      setShowResetModal(false);
      toast.success('Configuration reset to factory defaults.');
    } catch {
      toast.error('Failed to reset configuration.');
    } finally {
      setResetting(false);
    }
  };

  if (loading && !draftSettings) {
    return <LoadingState message="Loading platform configuration..." />;
  }

  return (
    <div style={{ paddingBottom: isDirty ? '80px' : '32px' }}>
      <PageHeader
        title="Settings"
        subtitle="Manage Promptoo application configuration, service integrations, and security."
        breadcrumbs={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Settings' }
        ]}
        actions={
          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <RotateCcw size={13} />
            <span>Reset Defaults</span>
          </button>
        }
      />

      {error && (
        <div
          className="admin-card"
          style={{
            marginBottom: '20px',
            borderColor: 'var(--danger-border)',
            backgroundColor: 'var(--danger-dim)',
            color: 'var(--danger)'
          }}
        >
          {error}
        </div>
      )}

      {/* Main Settings Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(200px, 240px) 1fr',
          gap: '24px',
          alignItems: 'start'
        }}
      >
        {/* Left Nav */}
        <SettingsNav activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Right Active Section */}
        <div>
          {activeTab === 'general' && (
            <GeneralSettingsSection
              data={draftSettings?.general}
              onChange={(f, v) => updateDraft('general', f, v)}
            />
          )}

          {activeTab === 'appearance' && (
            <AppearanceSettingsSection
              data={draftSettings?.appearance}
              onChange={(f, v) => updateDraft('appearance', f, v)}
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationSettingsSection
              data={draftSettings?.notifications}
              onChange={(f, v) => updateDraft('notifications', f, v)}
            />
          )}

          {activeTab === 'security' && (
            <SecuritySettingsSection
              data={draftSettings?.security}
              onChange={(f, v) => updateDraft('security', f, v)}
            />
          )}

          {activeTab === 'application' && (
            <ApplicationSettingsSection
              data={draftSettings?.application}
              onChange={(f, v) => updateDraft('application', f, v)}
            />
          )}

          {activeTab === 'about' && (
            <AboutSettingsSection
              data={draftSettings?.about}
              onResetDefaults={() => setShowResetModal(true)}
            />
          )}
        </div>
      </div>

      {/* Floating Unsaved Changes Alert */}
      <UnsavedChangesBar
        isDirty={isDirty}
        saving={saving}
        onSave={handleSave}
        onDiscard={discardChanges}
      />

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleConfirmReset}
        title="Reset All Settings to Factory Defaults?"
        message="This action will restore all application feature flags, appearance options, notification preferences, and general settings back to initial factory defaults. Any customized preferences will be reverted."
        confirmLabel="Reset to Factory Defaults"
        variant="danger"
        loading={resetting}
      />
    </div>
  );
}
