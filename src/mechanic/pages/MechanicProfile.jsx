import React, { useState, useEffect } from 'react';
import { useData } from '../../data/DataContext';
import { User, Mail, Phone, Wrench, Save, CheckCircle, AlertCircle, Edit2, X } from 'lucide-react';
import '../css/MechanicProfile.css';
import { useAuth } from '../../data/AuthContext';

const MechanicProfile = () => {
  const { users, updateMechanicProfile } = useData();
  const { user: authUser, updateUser: updateAuthUser } = useAuth();

  // Only show the logged-in mechanic, not the first mechanic in the DB
  const currentUser = users.find(u => u.id === authUser?.id) || authUser;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: ''
  });

  const [errors, setErrors] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        specialization: currentUser.specialization || ''
      });
    }
  }, [currentUser, isEditing]); 

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid phone number (min 10 digits)';
    }

    if (!formData.specialization.trim()) newErrors.specialization = 'Specialization is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    setSaveSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && currentUser) {
      updateMechanicProfile(currentUser.id, formData);
      updateAuthUser({ name: formData.name, phone: formData.phone, specialization: formData.specialization });
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setErrors({});
  };

  if (!currentUser) return <div className="p-6 text-center">Loading profile...</div>;

  return (
    <div className="mechanic-profile-container">
      {/* Banner Area */}
      <div className="profile-banner">
        <div className="profile-banner-content">
          <div className="profile-avatar-large">
            <User size={40} />
          </div>
          <div className="profile-banner-text">
            <h2>{currentUser.name}</h2>
            <p>{currentUser.specialization || 'Mechanic'}</p>
          </div>
        </div>
        {!isEditing && (
          <button className="btn profile-edit-btn" onClick={() => setIsEditing(true)}>
            <Edit2 size={16} /> Edit Profile
          </button>
        )}
      </div>

      {/* Main Card */}
      <div className="card profile-content-card">
        {saveSuccess && (
          <div className="profile-success-msg">
            <CheckCircle size={18} /> Profile updated successfully!
          </div>
        )}

        <div className="profile-card-header">
          <h3>Personal Information</h3>
          <p>Manage your contact details and specialization</p>
        </div>

        {!isEditing ? (
          /* ─── Static View Mode ─── */
          <div className="profile-static-grid">
            <div className="profile-info-item">
              <span className="info-label">Full Name</span>
              <div className="info-value">
                <User size={18} className="info-icon text-muted" />
                <span>{currentUser.name}</span>
              </div>
            </div>

            <div className="profile-info-item">
              <span className="info-label">Email Address</span>
              <div className="info-value">
                <Mail size={18} className="info-icon text-muted" />
                <span>{currentUser.email || 'Not provided'}</span>
              </div>
            </div>

            <div className="profile-info-item">
              <span className="info-label">Phone Number</span>
              <div className="info-value">
                <Phone size={18} className="info-icon text-muted" />
                <span>{currentUser.phone || 'Not provided'}</span>
              </div>
            </div>

            <div className="profile-info-item">
              <span className="info-label">Primary Specialization</span>
              <div className="info-value">
                <Wrench size={18} className="info-icon text-muted" />
                <span>{currentUser.specialization || 'Not provided'}</span>
              </div>
            </div>
          </div>
        ) : (
          /* ─── Edit Mode Form ─── */
          <form onSubmit={handleSubmit} className="profile-edit-form">
            <div className="form-group full-width">
              <label className="form-label">Full Name</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  name="name"
                  className={`form-input profile-input ${errors.name ? 'input-error' : ''}`}
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Alex Johnson"
                />
              </div>
              {errors.name && <span className="error-text"><AlertCircle size={14} /> {errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  name="email"
                  className={`form-input profile-input ${errors.email ? 'input-error' : ''}`}
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@servixo.com"
                />
              </div>
              {errors.email && <span className="error-text"><AlertCircle size={14} /> {errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div className="input-with-icon">
                <Phone size={18} className="input-icon" />
                <input
                  type="text"
                  name="phone"
                  className={`form-input profile-input ${errors.phone ? 'input-error' : ''}`}
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              {errors.phone && <span className="error-text"><AlertCircle size={14} /> {errors.phone}</span>}
            </div>

            <div className="form-group full-width">
              <label className="form-label">Primary Specialization</label>
              <div className="input-with-icon">
                <Wrench size={18} className="input-icon" />
                <input
                  type="text"
                  name="specialization"
                  className={`form-input profile-input ${errors.specialization ? 'input-error' : ''}`}
                  value={formData.specialization}
                  onChange={handleInputChange}
                  placeholder="e.g. Engine Diagnostics & Repair"
                />
              </div>
              {errors.specialization && <span className="error-text"><AlertCircle size={14} /> {errors.specialization}</span>}
            </div>

            <div className="profile-actions">
              <button type="button" className="btn btn-outline" onClick={handleCancelEditing}>
                <X size={18} /> Cancel
              </button>
              <button type="submit" className="btn btn-primary" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                <Save size={18} /> Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MechanicProfile;
