import React, { useState, useEffect } from 'react';
import { Save, Settings as SettingsIcon, Bell, Shield, User } from 'lucide-react';
import '../css/Settings.css';
import { useAuth } from '../../data/AuthContext';

const TABS = [
  { key: 'security', label: 'Security', icon: <Shield size={18} /> },
  { key: 'profile', label: 'Profile', icon: <User size={18} /> },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState('security');
  const [saved, setSaved] = useState(false);
  const { user, token, updateUser } = useAuth();

  const API_BASE = 'http://localhost:4000/api';

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE}/settings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) return;
        setEmailNotifications(Boolean(data.emailNotifications));
        setCenterName(data.centerName || 'Servixo Main Branch');
        setSupportContact(data.supportContact || '');
        setJobUpdates(Boolean(data.jobUpdates));
        setMechanicAlerts(Boolean(data.mechanicAlerts));
        setCustomerMessages(Boolean(data.customerMessages));
        setDailyReport(Boolean(data.dailyReport));
        setSessionTimeout(data.sessionTimeout || '30');
      } catch {
        // ignore
      }
    };
    load();
  }, [token]);

  // General Settings State (loaded from backend, fallback defaults)
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [centerName, setCenterName] = useState('Servixo Main Branch');
  const [supportContact, setSupportContact] = useState('');

  // Notifications State
  const [jobUpdates, setJobUpdates] = useState(true);
  const [mechanicAlerts, setMechanicAlerts] = useState(true);
  const [customerMessages, setCustomerMessages] = useState(false);
  const [dailyReport, setDailyReport] = useState(true);

  // Security State
  const [sessionTimeout, setSessionTimeout] = useState('30');

  // Profile State
  const [displayName, setDisplayName] = useState(user?.name || 'Admin User');
  const [email, setEmail] = useState(user?.email || 'admin@servixo.com');
  const [role, setRole] = useState('Administrator');

  const handleSave = async () => {
    try {
      // Save settings doc (admin only)
      await fetch(`${API_BASE}/settings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          emailNotifications,
          centerName,
          supportContact,
          jobUpdates,
          mechanicAlerts,
          customerMessages,
          dailyReport,
          sessionTimeout
        })
      });

      // Save admin display name (updates navbar)
      if (user?.id && displayName && displayName !== user.name) {
        const res = await fetch(`${API_BASE}/users/${user.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ name: displayName })
        });
        const updated = await res.json();
        if (res.ok) {
          updateUser({ name: updated.name });
        }
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // ignore
    }
  };

  const renderGeneral = () => (
    <>
      <div className="set-section">
        <h3 className="set-section-title">General Preferences</h3>
        <div className="set-toggle-row">
          <div>
            <span className="set-toggle-label">Email Notifications</span>
            <span className="set-toggle-desc">Receive daily summary reports via email.</span>
          </div>
          <button
            className={`set-toggle ${emailNotifications ? 'active' : ''}`}
            onClick={() => setEmailNotifications(!emailNotifications)}
          >
            <span className="set-toggle-knob" />
          </button>
        </div>
      </div>
      <div className="set-section">
        <h3 className="set-section-title">Business Information</h3>
        <div className="set-field">
          <label className="set-field-label">Center Name</label>
          <input type="text" className="form-input" value={centerName} onChange={e => setCenterName(e.target.value)} />
        </div>
        <div className="set-field">
          <label className="set-field-label">Support Contact</label>
          <input type="text" className="form-input" value={supportContact} onChange={e => setSupportContact(e.target.value)} />
        </div>
      </div>
    </>
  );

  const renderNotifications = () => (
    <div className="set-section">
      <h3 className="set-section-title">Notification Preferences</h3>
      {[
        { label: 'Job Status Updates', desc: 'Get notified when a job status changes.', val: jobUpdates, set: setJobUpdates },
        { label: 'Mechanic Alerts', desc: 'Receive alerts about mechanic availability.', val: mechanicAlerts, set: setMechanicAlerts },
        { label: 'Customer Messages', desc: 'Notify when customers send messages.', val: customerMessages, set: setCustomerMessages },
        { label: 'Daily Summary Report', desc: 'Receive a daily email with performance summary.', val: dailyReport, set: setDailyReport },
      ].map((item, i) => (
        <div className="set-toggle-row" key={i}>
          <div>
            <span className="set-toggle-label">{item.label}</span>
            <span className="set-toggle-desc">{item.desc}</span>
          </div>
          <button className={`set-toggle ${item.val ? 'active' : ''}`} onClick={() => item.set(!item.val)}>
            <span className="set-toggle-knob" />
          </button>
        </div>
      ))}
    </div>
  );

  const renderSecurity = () => (
    <div className="set-section">
      <h3 className="set-section-title">Security Settings</h3>
      <div className="set-field">
        <label className="set-field-label">Password</label>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <input type="password" className="form-input" value="••••••••" readOnly style={{ flex: 1 }} />
          <button className="btn btn-outline" style={{ whiteSpace: 'nowrap' }}>Change Password</button>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="set-section">
      <h3 className="set-section-title">Profile Information</h3>
      <div className="set-field">
        <label className="set-field-label">Display Name</label>
        <input type="text" className="form-input" value={displayName} onChange={e => setDisplayName(e.target.value)} />
      </div>
      <div className="set-field">
        <label className="set-field-label">Email Address</label>
        <input type="email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="set-field">
        <label className="set-field-label">Role</label>
        <input type="text" className="form-input" value={role} readOnly style={{ color: 'var(--text-muted)' }} />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneral();
      case 'notifications': return renderNotifications();
      case 'security': return renderSecurity();
      case 'profile': return renderProfile();
      default: return renderSecurity();
    }
  };

  return (
    <div className="set-page">
      <div className="set-page-header">
        <div>
          <h2 className="set-page-title">System Settings</h2>
          <p className="set-page-subtitle">Manage your service center configurations.</p>
        </div>
        <button className={`btn btn-primary set-save-btn ${saved ? 'saved' : ''}`} onClick={handleSave}>
          <Save size={18} />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="set-layout">
        {/* Sidebar Tabs */}
        <nav className="set-tabs">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`set-tab ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="set-content card">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
