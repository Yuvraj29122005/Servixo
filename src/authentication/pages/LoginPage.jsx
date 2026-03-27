import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Wrench, ArrowLeft, X } from 'lucide-react';
import '../css/LoginPage.css';
import logo from '../../assets/logo.png';
import { useAuth } from '../../data/AuthContext';

const LoginPage = () => {
  const [role, setRole] = useState('admin'); // 'admin' or 'mechanic'
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');



  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password, role: role === 'admin' ? 'admin' : 'mechanic' });
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/mechanic');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    }
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
            <label className="form-label">Email/Username</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon text-muted" />
              <input
                type="email"
                className="form-input w-full"
                placeholder={role === 'admin' ? "admin@servixo.com" : "mechanic@servixo.com"}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group mb-6">
            <div className="flex justify-between items-center w-full">
              <label className="form-label">Password</label>
            </div>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon text-muted" />
              <input
                type="password"
                className="form-input w-full"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <p className="text-sm" style={{ color: 'red', marginBottom: '0.75rem' }}>{error}</p>}
          <button type="submit" className="btn btn-primary w-full" style={{ padding: '0.875rem' }}>
            Sign In as {role === 'admin' ? 'Manager' : 'Mechanic'}
          </button>
        </form>

        <div className="login-footer">
          <p className="text-sm text-muted text-center mt-6">
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>← Back to Home</span>
          </p>
        </div>
      </div>


    </div>
  );
};

export default LoginPage;
