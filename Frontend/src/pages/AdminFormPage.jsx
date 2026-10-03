import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  UserCheck,
  Mail,
  Shield,
  Activity,
  AlertCircle,
  CheckCircle2,
  Lock
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import LoadingState from '../components/common/LoadingState';
import { adminRepository } from '../repositories/adminRepository';
import { ADMIN_ROLE_SELECT_OPTIONS } from '../types/admin';
import { getPermissionsMatrixForRole } from '../utils/adminPermissions';
import { useToast } from '../context/ToastContext';

export default function AdminFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const toast = useToast();

  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin');
  const [status, setStatus] = useState('active');

  // Errors & Touched
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (!isEditMode) return;

    const fetchAdmin = async () => {
      try {
        setLoading(true);
        const admin = await adminRepository.getAdminById(id);
        if (!admin) {
          toast.error(`Admin ${id} not found.`);
          navigate('/admin/admins');
          return;
        }

        setDisplayName(admin.displayName || '');
        setEmail(admin.email || '');
        setRole(admin.role || 'admin');
        setStatus(admin.status || 'active');
      } catch (err) {
        console.error('Failed to load admin:', err);
        toast.error('Failed to load admin account.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [id, isEditMode, navigate, toast]);

  const validate = () => {
    const errs = {};
    if (!displayName.trim()) {
      errs.displayName = 'Display Name is required.';
    } else if (displayName.trim().length < 2) {
      errs.displayName = 'Display Name must be at least 2 characters.';
    }

    if (!isEditMode) {
      if (!email.trim()) {
        errs.email = 'Email address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        errs.email = 'Please provide a valid email address.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ displayName: true, email: true });

    if (!validate()) {
      toast.error('Please resolve the errors before submitting.');
      return;
    }

    try {
      setSubmitting(true);
      if (isEditMode) {
        await adminRepository.updateAdmin(id, {
          displayName: displayName.trim(),
          role,
          status
        });
        toast.success(`Admin "${displayName}" updated successfully.`);
      } else {
        await adminRepository.createAdmin({
          displayName: displayName.trim(),
          email: email.trim(),
          role,
          status
        });
        toast.success(`Admin "${displayName}" created successfully.`);
      }
      navigate('/admin/admins');
    } catch (err) {
      console.error('Failed to save admin:', err);
      toast.error(err.message || 'Failed to save admin account.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading administrator details..." />;
  }

  const selectedRoleMeta = ADMIN_ROLE_SELECT_OPTIONS.find((r) => r.value === role);
  const permissionsSummary = getPermissionsMatrixForRole(role);
  const grantedCount = permissionsSummary.filter((p) => p.isGranted).length;

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', paddingBottom: '48px' }}>
      <PageHeader
        title={isEditMode ? 'Edit Administrator' : 'Add Administrator'}
        subtitle={
          isEditMode
            ? `Modify role, display parameters, and access state for ${displayName || id}.`
            : 'Provision a new administrative account with role-based access permissions.'
        }
        breadcrumbs={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Admins', path: '/admin/admins' },
          { label: isEditMode ? 'Edit Admin' : 'New Admin' }
        ]}
        actions={
          <button
            type="button"
            onClick={() => navigate('/admin/admins')}
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={14} />
            <span>Back to Admins</span>
          </button>
        }
      />

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Core Profile Card */}
        <div className="admin-card">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '16px',
              borderBottom: '1px solid var(--border-color)',
              marginBottom: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <UserCheck size={18} color="var(--primary-purple)" />
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Account Identity & Credentials
              </h3>
            </div>
            {isEditMode && (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)'
                }}
              >
                ID: {id}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Display Name */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '6px'
                }}
              >
                Full Display Name <span style={{ color: 'var(--danger)' }}>*</span>
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  if (errors.displayName) setErrors((prev) => ({ ...prev, displayName: null }));
                }}
                onBlur={() => handleBlur('displayName')}
                placeholder="e.g. Elena Rostova"
                style={{
                  borderColor: touched.displayName && errors.displayName ? 'var(--danger)' : undefined
                }}
              />
              {touched.displayName && errors.displayName && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', color: 'var(--danger)', fontSize: '11px' }}>
                  <AlertCircle size={12} />
                  <span>{errors.displayName}</span>
                </div>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '6px'
                }}
              >
                <Mail size={14} color="var(--info)" />
                <span>Email Address {isEditMode ? '(Read-Only)' : <span style={{ color: 'var(--danger)' }}>*</span>}</span>
              </label>
              <input
                type="email"
                value={email}
                disabled={isEditMode}
                readOnly={isEditMode}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                }}
                onBlur={() => handleBlur('email')}
                placeholder="e.g. elena.r@promptoo.ai"
                style={{
                  backgroundColor: isEditMode ? 'var(--bg-elevated)' : undefined,
                  cursor: isEditMode ? 'not-allowed' : 'text',
                  borderColor: touched.email && errors.email ? 'var(--danger)' : undefined
                }}
              />
              {touched.email && errors.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', color: 'var(--danger)', fontSize: '11px' }}>
                  <AlertCircle size={12} />
                  <span>{errors.email}</span>
                </div>
              )}
              {isEditMode && (
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                  Administrator email addresses cannot be modified after creation.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Role & Access Level Card */}
        <div className="admin-card">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              paddingBottom: '16px',
              borderBottom: '1px solid var(--border-color)',
              marginBottom: '20px'
            }}
          >
            <Shield size={18} color="var(--soft-purple)" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Role Assignment & Authorization
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {/* Role Select */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '6px'
                }}
              >
                Administrative Role <span style={{ color: 'var(--danger)' }}>*</span>
              </label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                {ADMIN_ROLE_SELECT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {selectedRoleMeta && (
                <div
                  style={{
                    marginTop: '8px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    fontSize: '11px',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
                    {selectedRoleMeta.label}
                  </strong>
                  {selectedRoleMeta.description}
                </div>
              )}
            </div>

            {/* Status Select */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '6px'
                }}
              >
                <Activity size={14} color="var(--success)" />
                <span>Account Status</span>
              </label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="active">Active (Permitted Studio Access)</option>
                <option value="inactive">Inactive (Access Suspended)</option>
              </select>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                Inactive administrators are immediately barred from accessing the panel.
              </span>
            </div>
          </div>

          {/* Role Permissions Preview Box */}
          <div
            style={{
              marginTop: '20px',
              padding: '14px 16px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Permissions Granted
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--primary-dim)',
                  color: 'var(--soft-purple)'
                }}
              >
                {grantedCount} of {permissionsSummary.length} System Modules Authorized
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
              {permissionsSummary.map((p) => (
                <span
                  key={p.moduleId}
                  style={{
                    fontSize: '11px',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: p.isGranted ? 'var(--bg-elevated)' : 'rgba(239, 68, 68, 0.05)',
                    color: p.isGranted ? 'var(--text-primary)' : 'var(--text-muted)',
                    border: '1px solid',
                    borderColor: p.isGranted ? 'var(--border-color)' : 'rgba(239, 68, 68, 0.15)'
                  }}
                >
                  {p.isGranted ? (
                    <CheckCircle2 size={11} color="var(--success)" />
                  ) : (
                    <Lock size={11} color="var(--text-muted)" />
                  )}
                  <span>{p.moduleLabel}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Security & Authentication Notice */}
        <div
          style={{
            padding: '14px 18px',
            borderRadius: '8px',
            backgroundColor: 'rgba(108, 77, 255, 0.05)',
            border: '1px solid var(--primary-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <Lock size={16} color="var(--soft-purple)" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
            <strong>Security Notice:</strong> Promptoo Master Admin utilizes role gates. Password configuration and multi-factor credentials are bound when connecting the production Supabase Auth provider.
          </p>
        </div>

        {/* Form Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '8px'
          }}
        >
          <button
            type="button"
            onClick={() => navigate('/admin/admins')}
            disabled={submitting}
            className="btn btn-secondary"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
            style={{ minWidth: '140px' }}
          >
            <Save size={15} />
            <span>{submitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Create Admin'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
