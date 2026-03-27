import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Wrench, Bell, User, LogOut } from 'lucide-react';
import './MechanicLayout.css';

const MechanicLayout = ({ title, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="mechanic-fullpage-layout">
      <header className="mechanic-topbar">
        <div className="mechanic-topbar-left">
          <div className="mechanic-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <span style={{ color: '#16a34a' }}><Wrench size={22} /></span>
            <span className="mechanic-brand-name">Servixo</span>
          </div>
          <span className="mechanic-topbar-title">{title}</span>
        </div>
        <div className="mechanic-topbar-right">
          <button className="mechanic-notif-btn" onClick={() => navigate('/mechanic/notifications')} aria-label="Notifications">
            <Bell size={20} />
          </button>
          <div className="mechanic-topbar-user" onClick={() => navigate('/mechanic/profile')}>
            <div className="mechanic-topbar-user-info">
              <span className="mechanic-topbar-username">{user?.name}</span>
              <span className="mechanic-topbar-role">Mechanic</span>
            </div>
            <div className="avatar">
              <User size={18} />
            </div>
          </div>
          <button className="mechanic-logout-btn" onClick={handleLogout} aria-label="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </header>
      <div className="mechanic-fullpage-body">
        <Outlet />
      </div>
    </div>
  );
};

export default MechanicLayout;
