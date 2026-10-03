import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Edit2,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  Clock,
  Shield,
  CheckCircle2
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import LoadingState from '../components/common/LoadingState';
import StatusBadge from '../components/common/StatusBadge';
import ConfirmDialog from '../components/common/ConfirmDialog';
import PermissionsMatrix from '../components/admins/PermissionsMatrix';
import { adminRepository } from '../repositories/adminRepository';
import { ADMIN_ROLE_META } from '../types/admin';
import { useToast } from '../context/ToastContext';

function formatDate(isoStr) {
  if (!isoStr) return '—';
  try {
    const d = new Date(isoStr);
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return '—';
  }
}

export default function AdminDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        setLoading(true);
        const res = await adminRepository.getAdminById(id);
        if (!res) {
          toast.error(`Admin ${id} not found.`);
          navigate('/admin/admins');
          return;
        }
        setAdmin(res);
      } catch (err) {
        console.error('Failed to load admin:', err);
        toast.error('Failed to load admin profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [id, navigate, toast]);

  const handleToggleStatus = async () => {
    if (!admin) return;
    try {
      setToggling(true);
      const newStatus = admin.status === 'active' ? 'inactive' : 'active';
      const updated = await adminRepository.updateAdminStatus(admin.id, newStatus);
      setAdmin(updated);
      setShowStatusModal(false);
      toast.success(
        `Admin status changed to ${newStatus === 'active' ? 'Active' : 'Inactive'}.`
      );
    } catch {
      toast.error('Failed to update status.');
    } finally {
      setToggling(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading administrator profile..." />;
  }

  if (!admin) return null;

  const roleMeta = ADMIN_ROLE_META[admin.role] || {
    label: admin.role,
    color: 'var(--text-secondary)'
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', paddingBottom: '48px' }}>
      <PageHeader
        title={admin.displayName}
        subtitle="Administrator profile, security parameters, and assigned access privileges."
        breadcrumbs={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Admins', path: '/admin/admins' },
          { label: admin.displayName }
        ]}
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={() => navigate('/admin/admins')}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={() => setShowStatusModal(true)}
              className="btn btn-secondary btn-sm"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: admin.status === 'active' ? 'var(--warning)' : 'var(--success)'
              }}
            >
              {admin.status === 'active' ? <UserX size={14} /> : <UserCheck size={14} />}
              <span>{admin.status === 'active' ? 'Deactivate' : 'Activate'}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate(`/admin/admins/${admin.id}/edit`)}
              className="btn btn-primary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Edit2 size={14} />
              <span>Edit Admin</span>
            </button>
          </div>
        }
      />

      {/* Main Profile Card */}
      <div className="admin-card" style={{ marginBottom: '24px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px'
          }}
        >
          {/* Avatar & Core Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            {admin.avatar ? (
              <img
                src={admin.avatar}
                alt={admin.displayName}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--primary-border)'
                }}
              />
            ) : (
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-dim)',
                  border: '2px solid var(--primary-border)',
                  color: 'var(--soft-purple)',
                  fontSize: '22px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {admin.displayName?.[0]?.toUpperCase() || 'A'}
              </div>
            )}

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {admin.displayName}
                </h2>
                <StatusBadge status={admin.status} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', color: 'var(--text-muted)', fontSize: '13px' }}>
                <Mail size={14} />
                <span>{admin.email}</span>
              </div>
            </div>
          </div>

          {/* Role & ID Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                padding: '5px 12px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-elevated)',
                color: roleMeta.color,
                border: '1px solid var(--border-color)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Shield size={14} />
              <span>{roleMeta.label}</span>
            </span>

            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '5px 10px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-elevated)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)'
              }}
            >
              ID: {admin.id}
            </span>
          </div>
        </div>

        {/* Timestamps & Info Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-color)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={16} color="var(--text-muted)" />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Last Active</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {admin.lastActive}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={16} color="var(--text-muted)" />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Account Created</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {formatDate(admin.createdAt)}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={16} color="var(--success)" />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Auth State</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {admin.status === 'active' ? 'Authorized' : 'Suspended'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div style={{ marginTop: '32px' }}>
        <PermissionsMatrix role={admin.role} />
      </div>

      {/* Status Toggle Modal */}
      <ConfirmDialog
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        onConfirm={handleToggleStatus}
        title={
          admin.status === 'active'
            ? `Deactivate ${admin.displayName}?`
            : `Activate ${admin.displayName}?`
        }
        message={
          admin.status === 'active'
            ? `Deactivating "${admin.displayName}" will revoke their access to the Master Admin Panel immediately.`
            : `Activating "${admin.displayName}" will restore their administrative dashboard access.`
        }
        confirmLabel={admin.status === 'active' ? 'Deactivate Admin' : 'Activate Admin'}
        variant={admin.status === 'active' ? 'danger' : 'primary'}
        loading={toggling}
      />
    </div>
  );
}
