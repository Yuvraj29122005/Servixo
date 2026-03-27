import React from 'react';
import { Bell, User } from 'lucide-react';
import './Header.css';

const Header = ({ title, user }) => {
  return (
    <header className="dashboard-header">
      <div className="header-title">{title}</div>
      <div className="header-actions">
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="badge-dot"></span>
        </button>
        
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
