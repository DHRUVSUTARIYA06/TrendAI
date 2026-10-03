import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Eye,
  Edit2,
  Copy,
  Trash2,
  XCircle,
  Calendar,
  Sparkles,
  Flame,
  Megaphone,
  ShieldCheck,
  Bell
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { NOTIFICATION_TYPE_META, NOTIFICATION_AUDIENCE_META } from '../../types/notification';

function getTypeIcon(type) {
  switch (type) {
    case 'new_template':
      return <Sparkles size={14} color="var(--primary-purple)" />;
    case 'trending':
      return <Flame size={14} color="#F59E0B" />;
    case 'announcement':
      return <Megaphone size={14} color="#3B82F6" />;
    case 'system':
      return <ShieldCheck size={14} color="var(--text-muted)" />;
    case 'general':
    default:
      return <Bell size={14} color="var(--soft-purple)" />;
  }
}

function formatDate(isoStr) {
  if (!isoStr) return '—';
  try {
    const d = new Date(isoStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return '—';
  }
}

export default function NotificationTable({
  notifications = [],
  onDuplicate,
  onDelete,
  onCancelSchedule,
  onQuickSchedule
}) {
  const navigate = useNavigate();

  return (
    <div className="admin-card" style={{ padding: 0, overflow: 'hidden', marginBottom: '20px' }}>
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ width: '30%', minWidth: '240px' }}>Notification</th>
              <th style={{ width: '13%', minWidth: '120px' }}>Audience</th>
              <th style={{ width: '11%', minWidth: '100px' }}>Status</th>
              <th style={{ width: '14%', minWidth: '140px' }}>Scheduled</th>
              <th style={{ width: '14%', minWidth: '140px' }}>Sent</th>
              <th style={{ width: '10%', minWidth: '110px' }}>Created</th>
              <th style={{ width: '8%', minWidth: '110px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((item) => {
              const typeMeta = NOTIFICATION_TYPE_META[item.type] || NOTIFICATION_TYPE_META.general;
              const audienceMeta = NOTIFICATION_AUDIENCE_META[item.audience] || NOTIFICATION_AUDIENCE_META.all;
              const audienceLabel =
                item.audience === 'specific_users'
                  ? `${item.targetUserIds?.length || 1} Specific Users`
                  : audienceMeta.label;

              return (
                <tr key={item.id}>
                  {/* Notification Details */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border-color)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px'
                        }}
                      >
                        {getTypeIcon(item.type)}
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                          <span
                            onClick={() => navigate(`/admin/notifications/${item.id}`)}
                            style={{
                              fontSize: '13px',
                              fontWeight: 600,
                              color: 'var(--text-primary)',
                              cursor: 'pointer',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                            title={item.title}
                          >
                            {item.title}
                          </span>
                          <span
                            style={{
                              fontSize: '10px',
                              padding: '1px 6px',
                              borderRadius: '4px',
                              backgroundColor: 'rgba(255, 255, 255, 0.04)',
                              color: typeMeta.color,
                              border: '1px solid var(--border-color)',
                              flexShrink: 0
                            }}
                          >
                            {typeMeta.label}
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: '12px',
                            color: 'var(--text-muted)',
                            margin: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '320px'
                          }}
                          title={item.message}
                        >
                          {item.message}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Audience */}
                  <td>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        color: 'var(--text-secondary)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor:
                            item.audience === 'all'
                              ? 'var(--primary-purple)'
                              : item.audience === 'active'
                              ? 'var(--success)'
                              : item.audience === 'new_users'
                              ? 'var(--info)'
                              : 'var(--warning)'
                        }}
                      />
                      {audienceLabel}
                    </span>
                  </td>

                  {/* Status */}
                  <td>
                    <StatusBadge status={item.status} />
                  </td>

                  {/* Scheduled */}
                  <td>
                    <span style={{ fontSize: '12px', color: item.scheduledAt ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                      {formatDate(item.scheduledAt)}
                    </span>
                  </td>

                  {/* Sent */}
                  <td>
                    <span style={{ fontSize: '12px', color: item.sentAt ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                      {formatDate(item.sentAt)}
                    </span>
                  </td>

                  {/* Created */}
                  <td>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {formatDate(item.createdAt)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                      {/* View Action (Available for all except Drafts who primary action is Edit) */}
                      {item.status !== 'draft' && (
                        <button
                          onClick={() => navigate(`/admin/notifications/${item.id}`)}
                          className="btn-icon"
                          style={{ width: '30px', height: '30px' }}
                          title="View Details"
                        >
                          <Eye size={14} />
                        </button>
                      )}

                      {/* Edit Action (Draft or Scheduled only) */}
                      {(item.status === 'draft' || item.status === 'scheduled') && (
                        <button
                          onClick={() => navigate(`/admin/notifications/${item.id}/edit`)}
                          className="btn-icon"
                          style={{ width: '30px', height: '30px' }}
                          title="Edit Notification"
                        >
                          <Edit2 size={14} />
                        </button>
                      )}

                      {/* Quick Schedule Action (Draft only) */}
                      {item.status === 'draft' && onQuickSchedule && (
                        <button
                          onClick={() => onQuickSchedule(item)}
                          className="btn-icon"
                          style={{ width: '30px', height: '30px', color: 'var(--warning)' }}
                          title="Schedule Notification"
                        >
                          <Calendar size={14} />
                        </button>
                      )}

                      {/* Cancel Schedule Action (Scheduled only) */}
                      {item.status === 'scheduled' && onCancelSchedule && (
                        <button
                          onClick={() => onCancelSchedule(item)}
                          className="btn-icon"
                          style={{ width: '30px', height: '30px', color: 'var(--warning)' }}
                          title="Cancel Scheduled Delivery"
                        >
                          <XCircle size={14} />
                        </button>
                      )}

                      {/* Duplicate Action */}
                      {onDuplicate && (
                        <button
                          onClick={() => onDuplicate(item)}
                          className="btn-icon"
                          style={{ width: '30px', height: '30px' }}
                          title="Duplicate Notification"
                        >
                          <Copy size={14} />
                        </button>
                      )}

                      {/* Delete Action (Draft or Cancelled only) */}
                      {(item.status === 'draft' || item.status === 'cancelled') && onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="btn-icon"
                          style={{ width: '30px', height: '30px', color: 'var(--danger)' }}
                          title="Delete Draft"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
