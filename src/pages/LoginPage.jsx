import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Wrench } from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
  const [role, setRole] = useState('admin'); // 'admin' or 'mechanic'
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if(role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/mechanic');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card card">
        <div className="login-header">
          <div className="logo-icon mb-4 justify-center" style={{ fontSize: '2rem' }}>
            <Wrench size={32} />
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
              <a href="#" className="forgot-link text-sm w-auto">Forgot password?</a>
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
    </div>
  );
};

export default LoginPage;
