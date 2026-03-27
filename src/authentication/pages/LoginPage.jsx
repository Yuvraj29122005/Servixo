import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Wrench, ArrowLeft, X } from 'lucide-react';
import '../css/LoginPage.css';
import logo from '../../assets/logo.png';

const LoginPage = () => {
  const [role, setRole] = useState('admin'); // 'admin' or 'mechanic'
  const navigate = useNavigate();

  // Forgot Password State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if(role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/mechanic');
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setShowForgotModal(false);
      setResetEmail('');
    }, 2500);
  };

  return (
    <div className="login-page">
      <div className="login-card card">
        <div className="login-header">
          <div className="login-logo-container mb-4" style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={logo} alt="Servixo" style={{ height: '48px', width: 'auto' }} />
          </div>
          <h2>Welcome Back</h2>
          <p className="text-muted text-sm">Sign in to your Servixo account</p>
        </div>

        <div className="role-tabs">
          <button 
            className={`tab-btn ${role === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
            type="button"
          >
            Manager
          </button>
          <button 
            className={`tab-btn ${role === 'mechanic' ? 'active' : ''}`}
            onClick={() => setRole('mechanic')}
            type="button"
          >
            Mechanic
          </button>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group mb-4">
            <label className="form-label">Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon text-muted" />
              <input 
                type="email" 
                className="form-input w-full" 
                placeholder={role === 'admin' ? "manager@servixo.com" : "mechanic@servixo.com"} 
                defaultValue={role === 'admin' ? "manager@servixo.com" : "mechanic@servixo.com"}
                required 
              />
            </div>
          </div>

          <div className="form-group mb-6">
            <div className="flex justify-between items-center w-full">
              <label className="form-label">Password</label>
              {/* Only show Forgot Password for admin/manager, not mechanic */}
              {role === 'admin' && (
                <button type="button" className="forgot-link text-sm w-auto" onClick={() => setShowForgotModal(true)}>
                  Forgot password?
                </button>
              )}
            </div>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon text-muted" />
              <input 
                type="password" 
                className="form-input w-full" 
                placeholder="••••••••" 
                defaultValue="password123"
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full" style={{ padding: '0.875rem' }}>
            Sign In as {role === 'admin' ? 'Manager' : 'Mechanic'}
          </button>
        </form>
        
        <div className="login-footer">
          <p className="text-sm text-muted text-center mt-6">
            <span style={{cursor: 'pointer'}} onClick={() => navigate('/')}>← Back to Home</span>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="forgot-modal-overlay" onClick={() => { setShowForgotModal(false); setResetSent(false); setResetEmail(''); }}>
          <div className="forgot-modal" onClick={e => e.stopPropagation()}>
            <div className="forgot-modal-header">
              <h3>Reset Password</h3>
              <button className="forgot-modal-close" onClick={() => { setShowForgotModal(false); setResetSent(false); setResetEmail(''); }}>
                <X size={20} />
              </button>
            </div>
            {resetSent ? (
              <div className="forgot-modal-body" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📧</div>
                <h4 style={{ marginBottom: '0.5rem' }}>Check your email</h4>
                <p className="text-muted text-sm">
                  A password reset link has been sent to <strong>{resetEmail}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="forgot-modal-body">
                <p className="text-muted text-sm" style={{ marginBottom: '1rem' }}>
                  Enter your email address and we'll send you a password reset link.
                </p>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="input-with-icon">
                    <Mail size={18} className="input-icon text-muted" />
                    <input
                      type="email"
                      className="form-input w-full"
                      placeholder="manager@servixo.com"
                      value={resetEmail}
                      onChange={e => setResetEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="forgot-modal-actions">
                  <button type="button" className="btn btn-outline" onClick={() => { setShowForgotModal(false); setResetEmail(''); }}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Send Reset Link</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
