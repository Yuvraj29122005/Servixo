import React, { useState } from 'react';
import { Bell, User } from 'lucide-react';
import { useData } from '../data/DataContext';
import './Header.css';

const Header = ({ title, user }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = (useData && useData()) || {};
  const [showNotifications, setShowNotifications] = useState(false);

  const userNotifications = notifications 
    ? notifications.filter(n => n.target === user?.name || user?.role === 'admin' || n.target === 'all') 
    : [];
  const unreadCount = userNotifications.filter(n => !n.read).length;
  return (
    <header className="dashboard-header">
      <div className="header-title">{title}</div>
      <div className="header-actions">
        <div style={{ position: 'relative' }}>
          <button 
            className="icon-btn" 
            aria-label="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className="badge-dot" style={{ position: 'absolute', top: 0, right: 0, height: '8px', width: '8px', backgroundColor: 'red', borderRadius: '50%' }}></span>}
          </button>
          
          {showNotifications && (
            <div className="notifications-dropdown" style={{
              position: 'absolute', right: 0, top: '40px', width: '320px', 
              background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', zIndex: 50, padding: '1rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Notifications</h4>
                {unreadCount > 0 && (
                  <button onClick={markAllNotificationsRead} style={{ fontSize: '12px', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Mark all read
                  </button>
                )}
              </div>
              <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {userNotifications.length === 0 ? (
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>No notifications.</p>
                ) : (
                  userNotifications.map(n => (
                    <div key={n.id} onClick={() => { if(markNotificationRead) markNotificationRead(n.id) }} style={{
                      padding: '0.75rem', background: n.read ? '#f9fafb' : '#eff6ff', 
                      borderRadius: '6px', cursor: 'pointer', fontSize: '13px', border: '1px solid #f3f4f6'
                    }}>
                      <div style={{ fontWeight: n.read ? 'normal' : '600', color: '#111827', marginBottom: '4px' }}>{n.title}</div>
                      <div style={{ color: '#4b5563', fontSize: '12px' }}>{n.message}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">{user?.name || 'Manager User'}</span>
            <span className="user-role">{user?.role === 'admin' ? 'Administrator' : user?.role === 'mechanic' ? 'Mechanic' : user?.role === 'manager' ? 'Manager' : 'Customer'}</span>
          </div>
          <div className="avatar">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
