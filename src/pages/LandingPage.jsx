import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrench, ShieldCheck, Clock, Search, Smartphone } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [trackingMode, setTrackingMode] = useState(false);
  const [jobId, setJobId] = useState('');

  const handleTrack = (e) => {
    e.preventDefault();
    if(jobId) {
      setTrackingMode(true);
    }
  };

  const steps = [
    { id: 'RECEIVED', label: 'Received', completed: true },
    { id: 'INSPECTION', label: 'Inspection', completed: true },
    { id: 'REPAIRING', label: 'Repairing', completed: true, current: true },
    { id: 'QUALITY_CHECK', label: 'Quality Check', completed: false },
    { id: 'READY', label: 'Ready', completed: false },
    { id: 'DELIVERED', label: 'Delivered', completed: false }
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar container">
        <div className="nav-logo" style={{ cursor: 'pointer' }} onClick={() => {setTrackingMode(false); setJobId('')}}>
          <span className="logo-icon"><Wrench /></span> Servixo
        </div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
        </div>
        <div className="nav-actions">
          <button className="btn btn-outline" onClick={() => navigate('/login')}>Staff Login</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero-section container">
        <div className="hero-content">
          <div className="tagline">v2.0 Beta Release</div>
          <h1 className="hero-title">Smart Vehicle Service Management System</h1>
          <p className="hero-description">
            Experience seamless, transparent, and efficient vehicle servicing. Track your car's repair status in real-time, right from your phone.
          </p>
        </div>

        <div className="hero-tracking-widget card">
          {!trackingMode ? (
            <form onSubmit={handleTrack} className="tracking-form">
              <h3>Track Your Vehicle</h3>
              <p className="text-muted">Enter your Job Card Number and Mobile Number to fetch the real-time status.</p>
              
              <div className="form-group mt-4">
                <label className="form-label flex items-center gap-2">
                  <Search size={16} /> Job Card Number
                </label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. JOB-2024-001" 
                  value={jobId}
                  onChange={(e) => setJobId(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-4">
                <label className="form-label flex items-center gap-2">
                  <Smartphone size={16} /> Mobile Number (Optional)
                </label>
                <input type="text" className="form-input" placeholder="+1 (555) 000-0000" />
              </div>

              <button type="submit" className="btn btn-primary w-full">Track Status</button>
            </form>
          ) : (
            <div className="tracking-results">
              <div className="tracking-header flex justify-between items-center mb-4">
                <div>
                  <h3 style={{ margin: 0 }}>Toyota Camry 2021</h3>
                  <p className="text-muted text-sm">{jobId} • Sarah Connor</p>
                </div>
                <span className="badge badge-repairing">REPAIRING</span>
              </div>

              <div className="horizontal-stepper">
                {steps.map((step, idx) => (
                  <div key={idx} className={`h-step ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''}`}>
                    <div className="h-step-line"></div>
                    <div className="h-step-circle">
                      {step.completed && !step.current ? '✓' : idx + 1}
                    </div>
                    <div className="h-step-label">{step.label}</div>
                  </div>
                ))}
              </div>

              <div className="tracking-details">
                <div className="detail-item">
                  <strong>Assigned Mechanic:</strong> Alex Johnson
                </div>
                <div className="detail-item">
                  <strong>Last Update:</strong> Today, 10:30 AM
                </div>
                <div className="detail-item">
                  <strong>Estimated Delivery:</strong> May 12, 5:00 PM
                </div>
              </div>

              <button className="btn btn-outline w-full mt-4" onClick={() => setTrackingMode(false)}>
                Track Another Vehicle
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Features Section */}
      <section className="features-section container">
        <h2 className="text-center section-title">Why Choose Servixo?</h2>
        <div className="features-grid">
          <div className="feature-card card">
            <Clock size={32} className="icon-blue mb-4" />
            <h4>Real-time Tracking</h4>
            <p className="text-muted text-sm">Monitor your vehicle's service progress live from your smartphone.</p>
          </div>
          <div className="feature-card card">
            <ShieldCheck size={32} className="icon-green mb-4" />
            <h4>Transparent Flow</h4>
            <p className="text-muted text-sm">Every step of the process is logged and shared to build absolute trust.</p>
          </div>
          <div className="feature-card card">
            <Wrench size={32} className="icon-orange mb-4" />
            <h4>Expert Mechanics</h4>
            <p className="text-muted text-sm">Certified professionals ensuring highest quality repairs.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
