import React from 'react';
import { useData } from '../../data/DataContext';
import { Bell, CheckCircle, AlertCircle, Info, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MechanicNotifications = () => {
  const { jobs, notifications, markNotificationRead, markAllNotificationsRead } = useData();
  const navigate = useNavigate();
  const mechanicName = 'Alex Johnson';

  const myNotifications = notifications.filter(n => n.target === mechanicName || n.target === 'all');

  const unreadCount = myNotifications.filter(n => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle size={20} style={{ color: '#16a34a' }} />;
      case 'warning': return <AlertCircle size={20} style={{ color: '#f59e0b' }} />;
      case 'info': return <Info size={20} style={{ color: '#2563eb' }} />;
      default: return <Bell size={20} style={{ color: '#6b7280' }} />;
    }
  };

  const getTimeDiff = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now - then;
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    return `${Math.floor(diffHr / 24)}d ago`;
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => navigate('/mechanic')}
            className="btn btn-outline"
            style={{ padding: '0.5rem' }}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>Notifications</h2>
            <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0.25rem 0 0' }}>
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <button className="btn btn-outline" onClick={markAllNotificationsRead}>
            Mark all as read
          </button>
        )}
      </div>

      {/* Notification List */}
      <div className="card" style={{ overflow: 'hidden' }}>
        {myNotifications.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
            <Bell size={40} style={{ marginBottom: '0.75rem', opacity: 0.3 }} />
            <p>No notifications yet.</p>
          </div>
        ) : (
          myNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              style={{
                display: 'flex',
                gap: '1rem',
                padding: '1.1rem 1.5rem',
                borderBottom: '1px solid #f1f5f9',
                cursor: 'pointer',
                background: notif.read ? 'transparent' : '#eff6ff',
                transition: 'background 0.2s',
                alignItems: 'flex-start'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: notif.read ? '#f9fafb' : '#dbeafe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {getIcon(notif.type)}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{
                  margin: 0,
                  fontSize: '0.9rem',
                  fontWeight: notif.read ? 400 : 600,
                  color: '#111827'
                }}>
                  {notif.title}
                </p>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.82rem', color: '#6b7280' }}>
                  {notif.message}
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem', flexShrink: 0 }}>
                <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
                  <Clock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.25rem' }} />
                  {getTimeDiff(notif.timestamp)}
                </span>
                {!notif.read && (
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#2563eb'
                  }} />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MechanicNotifications;
