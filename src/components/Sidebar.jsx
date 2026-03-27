import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Wrench, FileText, Settings, LogOut, FileBadge, Car, CreditCard } from 'lucide-react';
import './Sidebar.css';
import logo from '../assets/logo.png';

const Sidebar = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Job Cards', path: '/admin/jobs', icon: <FileBadge size={20} /> },
    { name: 'Service Workflow', path: '/admin/workflow', icon: <Wrench size={20} /> },
    { name: 'Mechanics', path: '/admin/mechanics', icon: <Users size={20} /> },
    { name: 'Reports / Analytics', path: '/admin/reports', icon: <FileText size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  const mechanicLinks = [
    { name: 'Dashboard', path: '/mechanic', icon: <LayoutDashboard size={20} /> },
    { name: 'My Jobs', path: '/mechanic/jobs', icon: <Wrench size={20} /> },
  ];

  const managerLinks = [
    { name: 'Manager Area', path: '/manager', icon: <LayoutDashboard size={20} /> },
    { name: 'Bill Approvals', path: '/manager/bills', icon: <FileText size={20} /> },
    { name: 'Credentials', path: '/manager/credentials', icon: <Users size={20} /> },
  ];

  const customerLinks = [
    { name: 'My Vehicles', path: '/customer', icon: <Car size={20} /> },
    { name: 'Payments', path: '/customer/payments', icon: <CreditCard size={20} /> },
  ];

  const getLinksByRole = () => {
    switch (role) {
      case 'admin': return adminLinks;
      case 'mechanic': return mechanicLinks;
      case 'manager': return managerLinks;
      case 'customer': return customerLinks;
      default: return [];
    }
  };

  const links = getLinksByRole();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Servixo" className="sidebar-logo-img" />
        <span className="sidebar-brand-text">Servixo</span>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            end={link.path === '/admin' || link.path === '/mechanic' || link.path === '/manager' || link.path === '/customer'}
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="sidebar-link w-full" style={{ border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', padding: '0.75rem 1rem' }}>
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
