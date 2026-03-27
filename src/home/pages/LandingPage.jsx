import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Send, Shield, CheckCircle2, Clock, MapPin, Phone, Mail, ChevronRight, ChevronDown, Activity, Zap, User, Wrench, FileText, CreditCard, CalendarDays, Car, AlertCircle, CheckCircle } from 'lucide-react';
import '../css/LandingPage.css';
import logo from '../../assets/logo.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const [trackingMode, setTrackingMode] = useState(false);
  const [jobId, setJobId] = useState('');
  const [mobile, setMobile] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [trackLoading, setTrackLoading] = useState(false);
  const [trackError, setTrackError] = useState('');
  const [trackedJob, setTrackedJob] = useState(null);
  const [billOpen, setBillOpen] = useState(false);

  // Appointment form state
  const [apptForm, setApptForm] = useState({
    fullName: '', email: '', phone: '', vehicleMake: '', vehicleModel: '', vehicleYear: '',
    licensePlate: '', serviceType: '', preferredDate: '', preferredTime: '', description: ''
  });
  const [apptErrors, setApptErrors] = useState({});
  const [apptTouched, setApptTouched] = useState({});
  const [apptSubmitted, setApptSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // home tracking uses manual input only (no job dropdown)

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!jobId.trim() || !mobile.trim()) return;
    setTrackLoading(true);
    setTrackError('');
    setTrackedJob(null);
    try {
      const params = new URLSearchParams();
      params.set('phone', mobile.trim());
      const res = await fetch(
        `http://localhost:4000/api/jobs/track/${encodeURIComponent(jobId.trim())}?${params.toString()}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Tracking failed');
      setTrackedJob(data);
      setTrackingMode(true);
    } catch (err) {
      setTrackError(err.message || 'Tracking failed');
    } finally {
      setTrackLoading(false);
    }
  };

  const resetTracker = () => {
    setTrackingMode(false);
    setJobId('');
    setMobile('');
    setTrackedJob(null);
    setTrackError('');
  };


  // --- Appointment validation ---
  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 3) return 'Name must be at least 3 characters';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'Name can only contain letters and spaces';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Enter a valid email address';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^[\d\s\-+()]{7,15}$/.test(value.trim())) return 'Enter a valid phone number (7-15 digits)';
        return '';
      case 'vehicleMake':
        if (!value.trim()) return 'Vehicle make/brand is required';
        return '';
      case 'vehicleModel':
        if (!value.trim()) return 'Vehicle model is required';
        return '';
      case 'vehicleYear':
        if (!value.trim()) return 'Vehicle year is required';
        const year = parseInt(value);
        if (isNaN(year) || year < 1980 || year > 2026) return 'Enter a valid year (1980-2026)';
        return '';
      case 'licensePlate':
        if (!value.trim()) return 'License plate number is required';
        if (value.trim().length < 2) return 'Enter a valid license plate';
        return '';
      case 'serviceType':
        if (!value) return 'Please select a service type';
        return '';
      case 'preferredDate':
        if (!value) return 'Select a preferred date';
        const selected = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) return 'Date must be today or later';
        return '';
      case 'preferredTime':
        if (!value) return 'Select a preferred time slot';
        return '';
      case 'description':
        return '';
      default:
        return '';
    }
  };

  const validateAllFields = () => {
    const errors = {};
    Object.keys(apptForm).forEach(key => {
      const error = validateField(key, apptForm[key]);
      if (error) errors[key] = error;
    });
    return errors;
  };

  const handleApptChange = (e) => {
    const { name, value } = e.target;
    setApptForm(prev => ({ ...prev, [name]: value }));
    if (apptTouched[name]) {
      setApptErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleApptBlur = (e) => {
    const { name, value } = e.target;
    setApptTouched(prev => ({ ...prev, [name]: true }));
    setApptErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleApptSubmit = (e) => {
    e.preventDefault();
    const allTouched = {};
    Object.keys(apptForm).forEach(k => { allTouched[k] = true; });
    setApptTouched(allTouched);

    const errors = validateAllFields();
    setApptErrors(errors);

    if (Object.keys(errors).length === 0) {
      setApptSubmitted(true);
    }
  };

  const resetApptForm = () => {
    setApptForm({ fullName: '', email: '', phone: '', vehicleMake: '', vehicleModel: '', vehicleYear: '', licensePlate: '', serviceType: '', preferredDate: '', preferredTime: '', description: '' });
    setApptErrors({});
    setApptTouched({});
    setApptSubmitted(false);
  };

  // Today's date in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  const baseSteps = [
    { id: 'RECEIVED', label: 'Received' },
    { id: 'INSPECTION', label: 'Inspection' },
    { id: 'REPAIRING', label: 'Repairing' },
    { id: 'QUALITY_CHECK', label: 'Quality Check' },
    { id: 'READY', label: 'Ready' },
    { id: 'PAYMENT', label: 'Payment' },
    { id: 'DELIVERED', label: 'Delivered' }
  ];

  const computeSteps = () => {
    const status = trackedJob?.status;
    const isPaid = Boolean(trackedJob?.bill?.paid);
    const currentId =
      status === 'DELIVERED' ? 'DELIVERED'
        : (status === 'READY' && !isPaid) ? 'PAYMENT'
          : status || 'RECEIVED';

    const currentIndex = baseSteps.findIndex(s => s.id === currentId);
    return baseSteps.map((s, idx) => ({
      ...s,
      completed: currentIndex > idx,
      current: currentIndex === idx
    }));
  };

  const steps = computeSteps();

  const billItems = [
    { name: 'Engine Oil Change', qty: 1, price: 45.00 },
    { name: 'Oil Filter Replacement', qty: 1, price: 18.00 },
    { name: 'Brake Pad Replacement (Front)', qty: 2, price: 65.00 },
    { name: 'Labor Charges', qty: 1, price: 120.00 },
  ];

  const subtotal = billItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  // Helper for input class
  const inputClass = (name) => {
    let cls = 'form-input';
    if (apptTouched[name] && apptErrors[name]) cls += ' input-error';
    if (apptTouched[name] && !apptErrors[name] && apptForm[name]) cls += ' input-success';
    return cls;
  };

  return (
    <div className="landing-page-light">
      {/* Navbar */}
      <nav className={`cf-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="cf-nav-bar-inner">
          <div className="cf-nav-left" onClick={resetTracker} style={{ cursor: 'pointer' }}>
            <img src={logo} alt="Servixo" className="nav-logo-icon" />
          </div>

          <div className="cf-nav-center" onClick={resetTracker} style={{ cursor: 'pointer' }}>
            <h1 className="cf-brand-text">Servixo</h1>
          </div>

          <div className="cf-nav-right">
            <button className="btn btn-primary staff-login-btn" onClick={() => navigate('/login')}>
              Staff Login
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="cf-hero">
        <div className="container cf-hero-inner">
          <div className="cf-hero-text">
            <div className="cf-badge">
              <Zap size={14} />
              <span>THE #1 SERVICE CENTER MANAGER</span>
            </div>
            <h1 className="cf-hero-title">
              Smart Vehicle Service<br />
              <span className="text-blue">Management System</span>
            </h1>
            <p className="cf-hero-subtitle">
              Track your vehicle service in real-time, get instant updates, and experience a transparent repair workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Tracking Widget */}
      <section className="cf-tracking-section">
        <div className="container">
          <div className="card cf-tracking-card">
            {!trackingMode ? (
              <>
                <div className="cf-widget-header">
                  <div className="cf-icon-box">
                    <Activity size={22} />
                  </div>
                  <div>
                    <h3>Live Tracking</h3>
                    <p className="text-muted text-sm">Enter your details to see real-time repair progress.</p>
                  </div>
                </div>

                <form onSubmit={handleTrack} className="cf-form">
                  <div className="cf-form-row">
                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                      <label className="form-label">Job Card Number</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. JOB-2024-001"
                        value={jobId}
                        onChange={(e) => setJobId(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                      <label className="form-label">Mobile Number</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. 9876543210"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                      />
                    </div>
                    <div className="cf-form-btn-wrapper">
                      <button type="submit" className="btn btn-primary cf-track-submit-btn" disabled={trackLoading}>
                        <Search size={18} />
                        {trackLoading ? 'Tracking...' : 'Track Status'}
                      </button>
                    </div>
                  </div>
                  {trackError && (
                    <div className="cf-demo-bar" style={{ marginTop: '0.75rem', background: '#fef2f2', borderColor: '#fecaca' }}>
                      <span className="cf-demo-label" style={{ color: '#b91c1c' }}>{trackError}</span>
                    </div>
                  )}
                </form>
              </>
            ) : (
              <div className="cf-results">
                {/* Vehicle Header */}
                <div className="cf-results-header">
                  <div>
                    <h3 className="cf-vehicle-name">{trackedJob?.vehicle || '—'}</h3>
                    <p className="text-muted text-sm">{trackedJob?.id || jobId} • {trackedJob?.customer || '—'}</p>
                  </div>
                  <span className="badge badge-ready">{(trackedJob?.status || '—').toString().replace('_', ' ')}</span>
                </div>

                {/* Status Stepper */}
                <div className="cf-stepper">
                  {steps.map((step, idx) => (
                    <div key={idx} className={`cf-step ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''}`}>
                      <div className="cf-step-line"></div>
                      <div className="cf-step-circle">
                        {step.completed && !step.current ? '✓' : idx + 1}
                      </div>
                      <div className="cf-step-label">{step.label}</div>
                    </div>
                  ))}
                </div>

                {/* Info Cards Row */}
                <div className="cf-info-grid">
                  <div className="cf-info-card">
                    <div className="cf-info-icon-box blue"><Clock size={18} /></div>
                    <div>
                      <span className="cf-info-label">Last Update</span>
                      <span className="cf-info-value text-blue">Today, 10:30 AM</span>
                    </div>
                  </div>
                  <div className="cf-info-card">
                    <div className="cf-info-icon-box green"><CheckCircle2 size={18} /></div>
                    <div>
                      <span className="cf-info-label">Estimated Delivery</span>
                      <span className="cf-info-value">{trackedJob?.delivery || '—'}</span>
                    </div>
                  </div>
                </div>

                {/* Mechanic Details Section */}
                <div className="cf-mechanic-section">
                  <h4 className="cf-section-label">
                    <Wrench size={18} />
                    Assigned Mechanic Details
                  </h4>
                  <div className="cf-mechanic-card">
                    <div className="cf-mechanic-avatar">
                      <User size={28} />
                    </div>
                    <div className="cf-mechanic-info">
                      <div className="cf-mechanic-row">
                        <span className="cf-mechanic-name">{trackedJob?.mechanic || 'Unassigned'}</span>
                        {trackedJob?.mechanic && trackedJob?.mechanic !== 'Unassigned' && (
                          <span className="badge badge-ready" style={{ fontSize: '0.7rem' }}>CERTIFIED</span>
                        )}
                      </div>
                      <div className="cf-mechanic-meta" style={{ marginTop: '0.5rem' }}>
                        <span><Phone size={13} /> {trackedJob?.mechanicPhone || 'No phone available'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment & Bill Section */}
                <div className="cf-payment-section">
                  <h4 className="cf-section-label">
                    <CreditCard size={18} />
                    Payment & Bill Summary
                  </h4>
                  <div className="card cf-bill-card">
                    {!trackedJob?.bill ? (
                      <div className="cf-bill-empty">
                        <p className="text-muted text-sm">Bill not generated yet.</p>
                      </div>
                    ) : (
                      <>
                        {/* Total always visible */}
                        <div className="cf-bill-total-banner">
                          <div className="cf-bill-total-left">
                            <span className="cf-bill-total-label">Total Amount</span>
                            <span className="cf-bill-total-amount">₹{(Number(trackedJob.bill.subtotal || 0) * 1.18).toFixed(2)}</span>
                          </div>
                          <span className="cf-bill-items-count">
                            {trackedJob.bill.items?.length || 1} service{(trackedJob.bill.items?.length || 1) > 1 ? 's' : ''}
                          </span>
                        </div>

                        {/* Dropdown toggle */}
                        <button className="cf-bill-dropdown-btn" onClick={() => setBillOpen(!billOpen)}>
                          <FileText size={16} />
                          <span>View Itemized Bill</span>
                          <ChevronDown size={18} className={`cf-bill-chevron ${billOpen ? 'open' : ''}`} />
                        </button>

                        {/* Collapsible items */}
                        <div className={`cf-bill-dropdown-body ${billOpen ? 'open' : ''}`}>
                          <div className="cf-bill-dropdown-inner">
                            {/* Items List */}
                            <div className="cf-bill-items-list">
                              <div className="cf-bill-items-header">
                                <span>Service Description</span>
                                <span>Price</span>
                              </div>
                              {trackedJob.bill.items && trackedJob.bill.items.length > 0 ? (
                                trackedJob.bill.items.map((item, idx) => (
                                  <div key={idx} className="cf-bill-item-row">
                                    <div className="cf-bill-item-info">
                                      <span className="cf-bill-item-num">{idx + 1}.</span>
                                      <span className="cf-bill-item-name">{item.desc}</span>
                                    </div>
                                    <span className="cf-bill-item-price">₹{Number(item.price || 0).toFixed(2)}</span>
                                  </div>
                                ))
                              ) : (
                                <div className="cf-bill-item-row">
                                  <div className="cf-bill-item-info">
                                    <span className="cf-bill-item-num">1.</span>
                                    <span className="cf-bill-item-name">Vehicle Service Charges</span>
                                  </div>
                                  <span className="cf-bill-item-price">₹{Number(trackedJob.bill.subtotal || 0).toFixed(2)}</span>
                                </div>
                              )}
                            </div>

                            {/* Totals */}
                            <div className="cf-bill-totals">
                              <div className="cf-bill-row">
                                <span>Subtotal</span>
                                <strong>₹{Number(trackedJob.bill.subtotal || 0).toFixed(2)}</strong>
                              </div>
                              <div className="cf-bill-row">
                                <span>GST (18%)</span>
                                <strong>₹{(Number(trackedJob.bill.subtotal || 0) * 0.18).toFixed(2)}</strong>
                              </div>
                              <div className="cf-bill-row cf-bill-grand-row">
                                <span>Grand Total</span>
                                <strong>₹{(Number(trackedJob.bill.subtotal || 0) * 1.18).toFixed(2)}</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <button className="btn btn-outline w-full cf-track-another" onClick={resetTracker}>
                  Track Another Vehicle
                </button>
              </div>
            )}
          </div>
        </div>
      </section>



      {/* Features Section */}
      <section className="cf-features-section">
        <div className="container">
          <div className="cf-section-header">
            <h2 className="cf-section-title">Why Choose <span className="text-blue">Servixo?</span></h2>
            <p className="text-muted cf-section-subtitle">
              Experience the next generation of vehicle service management. We bring transparency and efficiency to every single repair.
            </p>
          </div>

          <div className="cf-features-grid">
            <div className="card cf-feature-card">
              <div className="cf-feat-icon i-blue"><Send size={22} /></div>
              <h4>Real-time Tracking</h4>
              <p className="text-muted text-sm">Monitor your vehicle's repair journey live from your smartphone.</p>
            </div>
            <div className="card cf-feature-card">
              <div className="cf-feat-icon i-green"><Shield size={22} /></div>
              <h4>Transparent Flow</h4>
              <p className="text-muted text-sm">No hidden steps. See exactly what is being done and when.</p>
            </div>
            <div className="card cf-feature-card">
              <div className="cf-feat-icon i-purple"><CheckCircle2 size={22} /></div>
              <h4>Expert Mechanics</h4>
              <p className="text-muted text-sm">Your vehicle is assigned to the best certified professionals.</p>
            </div>
            <div className="card cf-feature-card">
              <div className="cf-feat-icon i-orange"><Clock size={22} /></div>
              <h4>Digital Job Card</h4>
              <p className="text-muted text-sm">Paperless records accessible anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact-footer" className="cf-footer">
        <div className="container cf-footer-inner">
          <div className="cf-footer-brand">
            <div className="cf-footer-logo-row">

              <span className="cf-footer-name">Servixo</span>
            </div>
            <p className="cf-footer-desc">
              The smartest way to manage your service center and keep customers happy with real-time tracking.
            </p>
          </div>
          <div className="cf-footer-cols">
            <div className="cf-footer-col">
              <h5 className="cf-footer-heading">Contact Us</h5>
              <div className="cf-footer-item"><Phone size={14} /><span>+91 8140351044</span></div>
              <div className="cf-footer-item"><Mail size={14} /><span>yuvrajdhadhal988@gmail.com</span></div>
              <div className="cf-footer-item"><MapPin size={14} /><span>Rk university,rajkot</span></div>
            </div>
            <div className="cf-footer-col">
              <h5 className="cf-footer-heading">Legal</h5>
              <a href="#" className="cf-footer-link">Privacy Policy</a>
              <a href="#" className="cf-footer-link">Terms of Service</a>
              <a href="#" className="cf-footer-link">Cookie Policy</a>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="cf-footer-bottom">
            <p>&copy; 2026 Servixo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
