import React from 'react';
import { Check, X, ShieldAlert } from 'lucide-react';
import { getPermissionsMatrixForRole } from '../../utils/adminPermissions';

export default function PermissionsMatrix({ role }) {
  const permissions = getPermissionsMatrixForRole(role);

  return (
    <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <ShieldAlert size={16} color="var(--primary-purple)" />
          <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Role Permissions Matrix (Read-Only)
          </h4>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
          Capabilities automatically derived from the assigned administrative role
        </p>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ width: '35%' }}>Access Module</th>
              <th style={{ width: '45%' }}>Description</th>
              <th style={{ width: '20%', textAlign: 'right' }}>Authorization</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm) => (
              <tr key={perm.moduleId}>
                <td>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {perm.moduleLabel}
                  </span>
                </td>

                <td>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {perm.description}
                  </span>
                </td>

                <td style={{ textAlign: 'right' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor:
                        perm.access === 'Full Access'
                          ? 'var(--success-dim)'
                          : perm.access === 'No Access'
                          ? 'rgba(239, 68, 68, 0.1)'
                          : 'var(--warning-dim)',
                      color:
                        perm.access === 'Full Access'
                          ? 'var(--success)'
                          : perm.access === 'No Access'
                          ? 'var(--danger)'
                          : 'var(--warning)',
                      border: '1px solid',
                      borderColor:
                        perm.access === 'Full Access'
                          ? 'var(--success-border)'
                          : perm.access === 'No Access'
                          ? 'var(--danger-border)'
                          : 'var(--warning-border)'
                    }}
                  >
                    {perm.isGranted ? <Check size={12} /> : <X size={12} />}
                    <span>{perm.access}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
