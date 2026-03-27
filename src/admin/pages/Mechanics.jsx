import React, { useState } from 'react';
import { Phone, Building, Plus, X, Mail, Lock, Clock, ChevronDown, ChevronUp, Key, Trash2 } from 'lucide-react';
import { useData } from '../../data/DataContext';
import '../css/Mechanics.css';

const Mechanics = () => {
  const { users, jobs, addMechanic, removeMechanic, updateMechanicProfile } = useData();
  const mechanics = users.filter(u => u.role === 'mechanic');

  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // View History State
  const [expandedMech, setExpandedMech] = useState(null);

  // Password Modal State
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [selectedMech, setSelectedMech] = useState(null);
  const [updatePassword, setUpdatePassword] = useState('');

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getActiveJobs = (mechanicName) => {
    return jobs.filter(j => j.mechanic === mechanicName && j.status !== 'READY' && j.status !== 'DELIVERED');
  };

  const getAllJobs = (mechanicName) => {
    return jobs.filter(j => j.mechanic === mechanicName);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const id = `mech-${Date.now()}`;
    addMechanic({
      id,
      name: newName,
      role: 'mechanic',
      credentials: true,
      phone: newPhone,
      email: newEmail,
      password: newPassword,
      mechanicId: `m${mechanics.length + 1}`
    });
    setNewName('');
    setNewPhone('');
    setNewEmail('');
    setNewPassword('');
    setShowForm(false);
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this mechanic?")) {
      removeMechanic(id);
    }
  };

  const openPasswordModal = (mech) => {
    setSelectedMech(mech);
    setUpdatePassword('');
    setShowPasswordForm(true);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (selectedMech) {
      updateMechanicProfile(selectedMech.id, { password: updatePassword });
      setShowPasswordForm(false);
      setSelectedMech(null);
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      RECEIVED: { bg: '#e5e7eb', color: '#374151' },
      INSPECTION: { bg: '#fef3c7', color: '#92400e' },
      REPAIRING: { bg: '#dbeafe', color: '#1e40af' },
      QUALITY_CHECK: { bg: '#ede9fe', color: '#6d28d9' },
      READY: { bg: '#d1fae5', color: '#065f46' },
      DELIVERED: { bg: '#dbeafe', color: '#1e40af' },
    };
    const s = map[status] || { bg: '#e5e7eb', color: '#374151' };
    return <span className="mech-job-badge" style={{ backgroundColor: s.bg, color: s.color }}>{status.replace('_', ' ')}</span>;
  };

  return (
    <div className="mech-page">
      <div className="mech-page-header">
        <div>
          <h2 className="mech-page-title">Mechanics Management</h2>
          <p className="mech-page-subtitle">Manage your service center mechanics and their workload.</p>
        </div>
        <button className="btn btn-primary mech-add-btn" onClick={() => setShowForm(true)}>
          <Plus size={18} />
          Add Mechanic
        </button>
      </div>

      {/* Add Mechanic Modal */}
      {showForm && (
        <div className="mech-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="mech-modal" onClick={e => e.stopPropagation()}>
            <div className="mech-modal-header">
              <h3>Add New Mechanic</h3>
              <button className="mech-modal-close" onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAdd} className="mech-modal-body">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. John Smith" required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="tel" className="form-input" value={newPhone} onChange={e => setNewPhone(e.target.value)} placeholder="e.g. +1234567890" required />
              </div>
              <div className="form-group">
                <label className="form-label">Username</label>
                <div className="mech-input-icon-wrap">
                  {/* <Mail size={16} className="mech-input-icon" /> */}
                  <input type="email" className="form-input mech-input-padded" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="e.g. john@servixo.com" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Login Password</label>
                <div className="mech-input-icon-wrap">
                  {/* <Lock size={16} className="mech-input-icon" /> */}
                  <input type="password" className="form-input mech-input-padded" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Min 8 characters" minLength={8} required />
                </div>
              </div>
              <div className="mech-modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Mechanic</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordForm && (
        <div className="mech-modal-overlay" onClick={() => setShowPasswordForm(false)}>
          <div className="mech-modal" onClick={e => e.stopPropagation()}>
            <div className="mech-modal-header">
              <h3>Change Password for {selectedMech?.name}</h3>
              <button type="button" className="mech-modal-close" onClick={() => setShowPasswordForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handlePasswordSubmit} className="mech-modal-body">
              <div className="form-group">
                <label className="form-label">New Password</label>
                <div className="mech-input-icon-wrap">
                  <Lock size={16} className="mech-input-icon" />
                  <input type="password" className="form-input mech-input-padded" value={updatePassword} onChange={e => setUpdatePassword(e.target.value)} placeholder="Min 8 characters" minLength={8} required />
                </div>
              </div>
              <div className="mech-modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowPasswordForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Update Password</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mechanic Cards Grid */}
      <div className="mech-grid">
        {mechanics.map((mech) => {
          const activeJobs = getActiveJobs(mech.name);
          const allJobs = getAllJobs(mech.name);
          const isAvailable = activeJobs.length === 0;
          const isExpanded = expandedMech === mech.id;
          return (
            <div className="mech-card card" key={mech.id}>
              <div className="mech-card-top">
                <div className="mech-avatar">{getInitials(mech.name)}</div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span className={`mech-status-tag ${isAvailable ? 'available' : 'active'}`}>
                    {isAvailable ? 'Available' : `${activeJobs.length} Active Job${activeJobs.length > 1 ? 's' : ''}`}
                  </span>
                  <button type="button" onClick={() => openPasswordModal(mech)} title="Change Password" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 0 }}><Key size={16} /></button>
                  <button type="button" onClick={() => handleRemove(mech.id)} title="Remove Mechanic" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 0 }}><Trash2 size={16} /></button>
                </div>
              </div>
              <h3 className="mech-name">{mech.name}</h3>
              <div className="mech-detail">
                <Phone size={14} />
                <span>{mech.phone || '—'}</span>
              </div>
              {mech.email && (
                <div className="mech-detail">
                  <Mail size={14} />
                  <span>{mech.email}</span>
                </div>
              )}
              <div className="mech-card-footer">
                <div className="mech-id">
                  <Building size={14} />
                  <span>ID: {mech.mechanicId || mech.id}</span>
                </div>
                <button
                  className="mech-history-link"
                  onClick={() => setExpandedMech(isExpanded ? null : mech.id)}
                >
                  {isExpanded ? 'Hide History' : 'View History'}
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              {/* Job History Panel */}
              {isExpanded && (
                <div className="mech-history-panel">
                  <div className="mech-history-title">
                    <Clock size={14} />
                    <span>Job History ({allJobs.length})</span>
                  </div>
                  {allJobs.length === 0 ? (
                    <p className="mech-history-empty">No jobs assigned yet.</p>
                  ) : (
                    <div className="mech-history-list">
                      {allJobs.map(job => (
                        <div className="mech-history-item" key={job.id}>
                          <div className="mech-history-item-top">
                            <span className="mech-history-job-id">{job.id}</span>
                            {getStatusBadge(job.status)}
                          </div>
                          <span className="mech-history-vehicle">{job.vehicle}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mechanics;
