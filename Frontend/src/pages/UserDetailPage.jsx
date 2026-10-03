import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Shield,
  Layers,
  Heart,
  Bookmark,
  Sparkles,
  Calendar,
  Clock,
  CheckCircle,
  PauseCircle,
  Ban,
  Activity,
  Lock,
  Mail,
  User,
  Trophy,
  Award
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import StatusBadge from '../components/common/StatusBadge';
import LoadingState from '../components/common/LoadingState';
import ConfirmDialog from '../components/common/ConfirmDialog';
import UserEditModal from '../components/users/UserEditModal';
import { userRepository } from '../repositories/userRepository';
import { leaderboardRepository } from '../repositories/leaderboardRepository';
import { formatDate } from '../utils/formatters';
import { useToast } from '../context/ToastContext';
import { USER_ACTIVITY_TABS } from '../types/user';

function getInitials(name = '') {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatTimeAgo(dateString) {
  if (!dateString) return 'Never';
  const diffSec = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (diffSec < 60) return 'Just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 172800) return 'Yesterday';
  const days = Math.floor(diffSec / 86400);
  if (days < 30) return `${days}d ago`;
  return formatDate(dateString);
}

export default function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tab state
  const [activeTab, setActiveTab] = useState('activity');
  const [activityTypeFilter, setActivityTypeFilter] = useState('all');

  // Sub-data states
  const [activityList, setActivityList] = useState([]);
  const [createdTemplates, setCreatedTemplates] = useState([]);
  const [savedTemplates, setSavedTemplates] = useState([]);
  const [likedTemplates, setLikedTemplates] = useState([]);
  const [leaderboardInfo, setLeaderboardInfo] = useState(null);
  const [rankHistory, setRankHistory] = useState([]);
  const [tabLoading, setTabLoading] = useState(false);

  // Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [statusConfirmAction, setStatusConfirmAction] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadUserData = async () => {
      try {
        setLoading(true);
        const u = await userRepository.getUserById(id);
        if (!u) {
          toast.error(`User ${id} not found.`);
          navigate('/admin/users');
          return;
        }
        if (isMounted) setUser(u);
      } catch (err) {
        console.error('Failed to load user:', err);
        toast.error('Failed to load user data.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadUserData();
    return () => {
      isMounted = false;
    };
  }, [id, navigate, toast]);

  // Load Tab Content
  useEffect(() => {
    if (!user) return;

    let isMounted = true;
    const fetchTabData = async () => {
      try {
        setTabLoading(true);
        if (activeTab === 'activity') {
          const act = await userRepository.getUserActivity(user.id, { type: activityTypeFilter });
          if (isMounted) setActivityList(act);
        } else if (activeTab === 'creations') {
          const cr = await userRepository.getUserCreatedTemplates(user.id);
          if (isMounted) setCreatedTemplates(cr);
        } else if (activeTab === 'saves') {
          const sv = await userRepository.getUserSavedTemplates(user.id);
          if (isMounted) setSavedTemplates(sv);
        } else if (activeTab === 'likes') {
          const lk = await userRepository.getUserLikedTemplates(user.id);
          if (isMounted) setLikedTemplates(lk);
        } else if (activeTab === 'leaderboard') {
          const [lbData, history] = await Promise.all([
            leaderboardRepository.getLeaderboardUser({ userId: user.id }),
            leaderboardRepository.getRankHistory({ userId: user.id })
          ]);
          if (isMounted) {
            setLeaderboardInfo(lbData);
            setRankHistory(history || []);
          }
        }
      } catch (err) {
        console.error('Error fetching tab data:', err);
      } finally {
        if (isMounted) setTabLoading(false);
      }
    };

    fetchTabData();
    return () => {
      isMounted = false;
    };
  }, [user, activeTab, activityTypeFilter]);

  // Status Action Handlers
  const handleStatusAction = (action) => {
    setStatusConfirmAction(action);
  };

  const handleConfirmStatusAction = async () => {
    if (!statusConfirmAction || !user) return;
    try {
      setActionLoading(true);
      let nextStatus = 'active';
      if (statusConfirmAction === 'deactivate') nextStatus = 'inactive';
      if (statusConfirmAction === 'suspend') nextStatus = 'suspended';
      if (statusConfirmAction === 'unsuspend') nextStatus = 'active';
      if (statusConfirmAction === 'activate') nextStatus = 'active';

      const updated = await userRepository.updateUserStatus(user.id, nextStatus);
      setUser(updated);
      toast.success(
        nextStatus === 'suspended'
          ? `User "${user.displayName}" suspended.`
          : nextStatus === 'inactive'
          ? `User "${user.displayName}" deactivated.`
          : `User "${user.displayName}" activated.`
      );
      setStatusConfirmAction(null);
    } catch (err) {
      console.error('Status update failed:', err);
      toast.error('Failed to update account status.');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px 0' }}>
        <LoadingState message="Loading user details..." />
      </div>
    );
  }

  if (!user) return null;

  const isSuspended = user.status === 'suspended';
  const isActive = user.status === 'active';

  return (
    <div style={{ maxWidth: '1120px', margin: '0 auto', paddingBottom: '60px' }}>
      {/* Page Header */}
      <PageHeader
        title="User Profile"
        subtitle={`Managing user account • ID: ${user.id}`}
        breadcrumbs={[
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Users', path: '/admin/users' },
          { label: user.displayName || user.id }
        ]}
        actions={
          <button
            onClick={() => navigate('/admin/users')}
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px' }}
          >
            <ArrowLeft size={14} />
            <span>Back to Users</span>
          </button>
        }
      />

      {/* =========================================================
          PROFILE HEADER CARD
          ========================================================= */}
      <div className="admin-card" style={{ marginBottom: '24px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          {/* Avatar & Core Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div
              style={{
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-elevated)',
                border: '2px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 700,
                color: 'var(--soft-purple)',
                background: 'linear-gradient(135deg, rgba(108, 77, 255, 0.25), rgba(139, 92, 246, 0.1))',
                flexShrink: 0
              }}
            >
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.displayName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <span>{getInitials(user.displayName)}</span>
              )}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {user.displayName}
                </h1>
                <StatusBadge
                  status={user.status}
                  label={isSuspended ? 'Suspended' : isActive ? 'Active' : 'Inactive'}
                />
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-muted)'
                  }}
                >
                  {user.id}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Mail size={14} color="var(--text-muted)" />
                  {user.email}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Calendar size={14} color="var(--text-muted)" />
                  Joined {formatDate(user.createdAt)}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={14} color="var(--text-muted)" />
                  Last active {formatTimeAgo(user.lastActiveAt)}
                </span>
              </div>

              {user.bio && (
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '8px 0 0 0', maxWidth: '640px', lineHeight: 1.5 }}>
                  {user.bio}
                </p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="btn btn-secondary btn-sm"
              style={{ gap: '6px' }}
            >
              <Edit size={14} />
              <span>Edit Profile</span>
            </button>

            {isSuspended ? (
              <button
                onClick={() => handleStatusAction('unsuspend')}
                className="btn btn-secondary btn-sm"
                style={{ gap: '6px', color: 'var(--success)' }}
              >
                <CheckCircle size={14} />
                <span>Unsuspend</span>
              </button>
            ) : (
              <>
                {isActive ? (
                  <button
                    onClick={() => handleStatusAction('deactivate')}
                    className="btn btn-secondary btn-sm"
                    style={{ gap: '6px', color: 'var(--warning)' }}
                  >
                    <PauseCircle size={14} />
                    <span>Deactivate</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleStatusAction('activate')}
                    className="btn btn-secondary btn-sm"
                    style={{ gap: '6px', color: 'var(--success)' }}
                  >
                    <CheckCircle size={14} />
                    <span>Activate</span>
                  </button>
                )}

                <button
                  onClick={() => handleStatusAction('suspend')}
                  className="btn btn-danger btn-sm"
                  style={{ gap: '6px' }}
                >
                  <Ban size={14} />
                  <span>Suspend</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================
          ACTIVITY STATISTICS CARDS
          ========================================================= */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
          marginBottom: '28px'
        }}
      >
        <div className="admin-card" style={{ padding: '14px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <Layers size={13} color="var(--primary-purple)" /> Templates Created
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {(user.creationCount || 0).toLocaleString()}
          </div>
        </div>

        <div className="admin-card" style={{ padding: '14px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <Sparkles size={13} color="#A78BFA" /> Weekly Creations
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#A78BFA' }}>
            {(user.weeklyCreations || 0).toLocaleString()}
          </div>
        </div>

        <div className="admin-card" style={{ padding: '14px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <Bookmark size={13} color="var(--info)" /> Saved Templates
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {(user.savedCount || 0).toLocaleString()}
          </div>
        </div>

        <div className="admin-card" style={{ padding: '14px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <Heart size={13} color="#F43F5E" /> Liked Templates
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#F43F5E' }}>
            {(user.likeCount || 0).toLocaleString()}
          </div>
        </div>

        <div className="admin-card" style={{ padding: '14px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <Sparkles size={13} color="var(--warning)" /> Total Uses
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {(user.totalUses || 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* =========================================================
          TAB NAVIGATION
          ========================================================= */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-color)',
          gap: '8px',
          marginBottom: '20px',
          overflowX: 'auto',
          scrollbarWidth: 'none'
        }}
      >
        {[
          { key: 'activity', label: 'Recent Activity', icon: Activity },
          { key: 'creations', label: 'My Creations', icon: Layers, count: user.creationCount },
          { key: 'saves', label: 'Saved Templates', icon: Bookmark, count: user.savedCount },
          { key: 'likes', label: 'Liked Templates', icon: Heart, count: user.likeCount },
          { key: 'leaderboard', label: 'Leaderboard & Rankings', icon: Trophy },
          { key: 'security', label: 'Account & Security', icon: Shield }
        ].map((tab) => {
          const isSelected = activeTab === tab.key;
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                fontSize: '13px',
                fontWeight: 600,
                color: isSelected ? 'var(--primary-purple)' : 'var(--text-secondary)',
                borderBottom: `2px solid ${isSelected ? 'var(--primary-purple)' : 'transparent'}`,
                backgroundColor: 'transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <TabIcon size={15} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  style={{
                    fontSize: '11px',
                    padding: '1px 6px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: isSelected ? 'var(--primary-dim)' : 'var(--bg-elevated)',
                    color: isSelected ? 'var(--soft-purple)' : 'var(--text-muted)'
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* =========================================================
          TAB 1: RECENT ACTIVITY
          ========================================================= */}
      {activeTab === 'activity' && (
        <div className="admin-card">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '20px'
            }}
          >
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                Activity Timeline
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                Recent actions and engagement logged on the platform
              </p>
            </div>

            {/* Filter pills */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {USER_ACTIVITY_TABS.map((pill) => (
                <button
                  key={pill.value}
                  onClick={() => setActivityTypeFilter(pill.value)}
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    cursor: 'pointer',
                    border: `1px solid ${activityTypeFilter === pill.value ? 'var(--primary-purple)' : 'var(--border-color)'}`,
                    backgroundColor: activityTypeFilter === pill.value ? 'var(--primary-dim)' : 'var(--bg-elevated)',
                    color: activityTypeFilter === pill.value ? '#FFFFFF' : 'var(--text-secondary)'
                  }}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {tabLoading ? (
            <LoadingState message="Loading activity timeline..." />
          ) : activityList.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              No activities found for this filter.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {activityList.map((item, idx) => {
                const isCreation = item.type === 'creation';
                const isSave = item.type === 'save';
                const isLike = item.type === 'like';
                const Icon = isCreation ? Layers : isSave ? Bookmark : isLike ? Heart : Shield;
                const iconColor = isCreation ? 'var(--primary-purple)' : isSave ? 'var(--info)' : isLike ? '#F43F5E' : 'var(--warning)';

                return (
                  <div
                    key={item.id || idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '8px',
                          backgroundColor: 'var(--bg-surface)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: iconColor,
                          flexShrink: 0
                        }}
                      >
                        <Icon size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {item.title}
                        </div>
                        {item.targetId && (
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                            Target: {item.targetId}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {formatTimeAgo(item.createdAt)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          TAB 2: MY CREATIONS
          ========================================================= */}
      {activeTab === 'creations' && (
        <div className="admin-card">
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              User Creations ({createdTemplates.length})
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Styles and prompts authored by this creator
            </p>
          </div>

          {tabLoading ? (
            <LoadingState message="Loading creations..." />
          ) : createdTemplates.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              No templates authored yet.
            </div>
          ) : (
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Template</th>
                    <th style={{ width: '130px' }}>Created</th>
                    <th style={{ width: '100px', textAlign: 'right' }}>Uses</th>
                    <th style={{ width: '100px', textAlign: 'right' }}>Likes</th>
                    <th style={{ width: '100px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {createdTemplates.map((t) => (
                    <tr key={t.id || t._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={t.thumbnailUrl || t.imageUrl}
                            alt={t.title}
                            style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{t.title}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{t.id}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{formatDate(t.createdAt)}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600, fontSize: '13px' }}>{(t.usageCount || 0).toLocaleString()}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600, fontSize: '13px', color: '#F43F5E' }}>{(t.likeCount || 0).toLocaleString()}</td>
                      <td><StatusBadge status={t.active ? 'active' : 'inactive'} label={t.active ? 'Active' : 'Inactive'} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          TAB 3: SAVED TEMPLATES
          ========================================================= */}
      {activeTab === 'saves' && (
        <div className="admin-card">
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Saved Templates ({savedTemplates.length})
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Styles bookmarked by this user in Promptoo
            </p>
          </div>

          {tabLoading ? (
            <LoadingState message="Loading saved styles..." />
          ) : savedTemplates.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              No saved templates.
            </div>
          ) : (
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Template</th>
                    <th style={{ width: '150px' }}>Category</th>
                    <th style={{ width: '140px' }}>Saved Date</th>
                  </tr>
                </thead>
                <tbody>
                  {savedTemplates.map((t) => (
                    <tr key={t.id || t._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={t.thumbnailUrl || t.imageUrl}
                            alt={t.title}
                            style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{t.title}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{t.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                          {t.categoryName || t.category}
                        </span>
                      </td>
                      <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {formatDate(t.savedAt || t.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          TAB 4: LIKED TEMPLATES
          ========================================================= */}
      {activeTab === 'likes' && (
        <div className="admin-card">
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Liked Templates ({likedTemplates.length})
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Styles endorsed and upvoted by this user
            </p>
          </div>

          {tabLoading ? (
            <LoadingState message="Loading liked styles..." />
          ) : likedTemplates.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              No liked templates.
            </div>
          ) : (
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Template</th>
                    <th style={{ width: '150px' }}>Category</th>
                    <th style={{ width: '140px' }}>Liked Date</th>
                  </tr>
                </thead>
                <tbody>
                  {likedTemplates.map((t) => (
                    <tr key={t.id || t._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={t.thumbnailUrl || t.imageUrl}
                            alt={t.title}
                            style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{t.title}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{t.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                          {t.categoryName || t.category}
                        </span>
                      </td>
                      <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {formatDate(t.likedAt || t.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          TAB: LEADERBOARD & PERFORMANCE (READ-ONLY)
          ========================================================= */}
      {activeTab === 'leaderboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Read-Only Leaderboard Performance Cards */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Trophy size={16} color="var(--warning)" />
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                  Leaderboard Performance & Standing
                </h3>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-muted)'
                }}
              >
                Read-Only Metrics
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                marginBottom: '8px'
              }}
            >
              <div style={{ padding: '12px 14px', borderRadius: '8px', backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Weekly Rank</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#F59E0B' }}>
                  #{leaderboardInfo?.weeklyRank || (user.weeklyCreations > 10 ? 3 : 12)}
                </div>
              </div>

              <div style={{ padding: '12px 14px', borderRadius: '8px', backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>All-Time Rank</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--soft-purple)' }}>
                  #{leaderboardInfo?.allTimeRank || (user.creationCount > 50 ? 2 : 8)}
                </div>
              </div>

              <div style={{ padding: '12px 14px', borderRadius: '8px', backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Total Creations</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {(user.creationCount || 0).toLocaleString()}
                </div>
              </div>

              <div style={{ padding: '12px 14px', borderRadius: '8px', backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Weekly Creations</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--info)' }}>
                  {(user.weeklyCreations || 0).toLocaleString()}
                </div>
              </div>

              <div style={{ padding: '12px 14px', borderRadius: '8px', backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Likes Received</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#F43F5E' }}>
                  {(user.likeCount || 0).toLocaleString()}
                </div>
              </div>

              <div style={{ padding: '12px 14px', borderRadius: '8px', backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Saved Templates</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#A78BFA' }}>
                  {(user.savedCount || 0).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* 10. Rank History Section */}
          <div className="admin-card">
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={16} color="var(--primary-purple)" />
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                  Rank History
                </h3>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                Historical weekly snapshot placements for this creator
              </p>
            </div>

            {tabLoading ? (
              <LoadingState message="Loading rank history..." />
            ) : rankHistory.length === 0 ? (
              <div style={{ padding: '28px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                No ranking history available.
              </div>
            ) : (
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ width: '140px' }}>Date</th>
                      <th style={{ width: '120px' }}>Rank</th>
                      <th style={{ textAlign: 'right' }}>Creations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankHistory.map((item) => (
                      <tr key={item.id}>
                        <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                          {item.date}
                        </td>
                        <td>
                          <span
                            style={{
                              fontSize: '12px',
                              fontWeight: 700,
                              color: item.rank <= 3 ? '#F59E0B' : 'var(--text-primary)',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              backgroundColor: item.rank <= 3 ? 'rgba(245, 158, 11, 0.1)' : 'var(--bg-elevated)'
                            }}
                          >
                            #{item.rank}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
                          {(item.creations || 0).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Leaderboard Security Note */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              padding: '16px 20px',
              borderRadius: '12px',
              backgroundColor: 'rgba(108, 77, 255, 0.08)',
              border: '1px solid rgba(108, 77, 255, 0.2)'
            }}
          >
            <Lock size={18} color="var(--soft-purple)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--text-primary)' }}>Integrity Safeguard:</strong>{' '}
              Leaderboard placements, ranks, and creation metrics are computed by asynchronous platform aggregation workers. Direct administrative overrides of ranks and generation tallies are restricted to maintain fair community competitions.
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 5: ACCOUNT & SECURITY INFORMATION
          ========================================================= */}
      {activeTab === 'security' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Profile vs Account Info Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {/* Profile Information */}
            <div className="admin-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <User size={16} color="var(--primary-purple)" />
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                  Profile Information
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Display Name</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user.displayName}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Public Email</span>
                  <span style={{ color: 'var(--text-primary)' }}>{user.email}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Role</span>
                  <span style={{ fontWeight: 600, color: 'var(--soft-purple)', textTransform: 'capitalize' }}>{user.role}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Last Profile Update</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{formatDate(user.updatedAt)}</span>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Biography</span>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.5, fontSize: '12px' }}>
                    {user.bio || 'No biography set.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Account & Security Information */}
            <div className="admin-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Shield size={16} color="var(--info)" />
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                  Account Information
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>User ID</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--text-primary)' }}>{user.id}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Account Status</span>
                  <StatusBadge status={user.status} label={user.status} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Registration Date</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{formatDate(user.createdAt)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Last Active Timestamp</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{formatDate(user.lastActiveAt)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Auth Identity Provider</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Email / Passwordless</span>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Security Callout */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              padding: '16px 20px',
              borderRadius: '12px',
              backgroundColor: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid var(--info-border)'
            }}
          >
            <Lock size={20} color="var(--info)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--text-primary)' }}>Security & Privacy Isolation:</strong>{' '}
              Password credentials, password hashes, auth tokens, refresh tokens, and service credentials are strictly managed by the backend identity service and never exposed in the client administrative interface.
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <UserEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={user}
          onUserUpdated={async (userId, payload) => {
            const updated = await userRepository.updateUserProfile(userId, payload);
            setUser(updated);
          }}
        />
      )}

      {/* Status Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(statusConfirmAction)}
        onClose={() => setStatusConfirmAction(null)}
        onConfirm={handleConfirmStatusAction}
        title={
          statusConfirmAction === 'suspend'
            ? 'Suspend User Account?'
            : statusConfirmAction === 'deactivate'
            ? 'Deactivate User Account?'
            : statusConfirmAction === 'unsuspend'
            ? 'Unsuspend User Account?'
            : 'Activate User Account?'
        }
        message={
          statusConfirmAction === 'suspend'
            ? `Are you sure you want to suspend "${user.displayName}"? The user will be blocked from accessing the Promptoo app.`
            : statusConfirmAction === 'deactivate'
            ? `Are you sure you want to deactivate "${user.displayName}"? The account will be marked inactive.`
            : statusConfirmAction === 'unsuspend'
            ? `Are you sure you want to unsuspend "${user.displayName}"? Account access will be restored.`
            : `Are you sure you want to activate "${user.displayName}"? The account will become fully active.`
        }
        confirmLabel={
          statusConfirmAction === 'suspend'
            ? 'Suspend User'
            : statusConfirmAction === 'deactivate'
            ? 'Deactivate User'
            : statusConfirmAction === 'unsuspend'
            ? 'Unsuspend User'
            : 'Activate User'
        }
        variant={statusConfirmAction === 'suspend' || statusConfirmAction === 'deactivate' ? 'danger' : 'primary'}
        loading={actionLoading}
      />
    </div>
  );
}
