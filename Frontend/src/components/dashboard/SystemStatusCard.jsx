import React from 'react';
import { Server, Database, HardDrive, ShieldCheck, Cpu } from 'lucide-react';

const SERVICE_ICONS = {
  Database: Database,
  Storage: HardDrive,
  Authentication: ShieldCheck,
  'API Gateway': Cpu
};

export default function SystemStatusCard({ services = [] }) {
  return (
    <div className="admin-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Promptoo Services
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            Infrastructure and platform subsystem operational health
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--success)' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--success)' }} />
          <span>All Subsystems Operational</span>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px'
      }}>
        {services.map((svc, idx) => {
          const Icon = SERVICE_ICONS[svc.name] || Server;
          return (
            <div
              key={svc.name || idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon size={16} color="var(--soft-purple)" />
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {svc.name}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: svc.indicator === 'success' ? 'var(--success)' : 'var(--warning)'
                }} />
                <span style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: svc.indicator === 'success' ? 'var(--success)' : 'var(--warning)'
                }}>
                  {svc.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
