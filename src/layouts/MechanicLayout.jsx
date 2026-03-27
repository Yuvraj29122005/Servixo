import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Wrench, Bell, User, LogOut } from 'lucide-react';
import './MechanicLayout.css';
import logo from '../assets/logo.png';

const MechanicLayout = ({ title, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="mechanic-fullpage-layout">
      <header className="mechanic-topbar">
        <div className="mechanic-topbar-left">
          <div className="mechanic-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src={logo} alt="Servixo" style={{ height: '30px', width: 'auto' }} />
            <span className="mechanic-brand-name">Servixo</span>
          </div>
          <span className="mechanic-topbar-title">{title}</span>
        </div>
        <div className="mechanic-topbar-right">
          <button className="mechanic-notif-btn" onClick={() => navigate('/mechanic/notifications')} aria-label="Notifications">
            <Bell size={20} />
          </button>
          <div className="mechanic-topbar-user" onClick={() => navigate('/mechanic/profile')} style={{ cursor: 'pointer' }}>
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
