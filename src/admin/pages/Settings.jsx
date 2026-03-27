import React, { useState } from 'react';
import { Save, Settings as SettingsIcon, Bell, Shield, User } from 'lucide-react';
import '../css/Settings.css';

const TABS = [
  { key: 'general', label: 'General Settings', icon: <SettingsIcon size={18} /> },
  { key: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
  { key: 'security', label: 'Security', icon: <Shield size={18} /> },
  { key: 'profile', label: 'Profile', icon: <User size={18} /> },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);

  // General Settings State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [centerName, setCenterName] = useState('Servixo Main Branch');
  const [supportContact, setSupportContact] = useState('+1 (800) 123-4567');

  // Notifications State
  const [jobUpdates, setJobUpdates] = useState(true);
  const [mechanicAlerts, setMechanicAlerts] = useState(true);
  const [customerMessages, setCustomerMessages] = useState(false);
  const [dailyReport, setDailyReport] = useState(true);

  // Security State
  const [sessionTimeout, setSessionTimeout] = useState('30');

  // Profile State
  const [displayName, setDisplayName] = useState('Admin User');
  const [email, setEmail] = useState('admin@servixo.com');
  const [role, setRole] = useState('Administrator');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
        <label className="set-field-label">Session Timeout (minutes)</label>
        <select className="form-input" value={sessionTimeout} onChange={e => setSessionTimeout(e.target.value)}>
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">1 hour</option>
          <option value="120">2 hours</option>
        </select>
      </div>
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
      default: return renderGeneral();
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
