import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Send, Shield, CheckCircle2, Clock, MapPin, Phone, Mail, ChevronRight, Activity, Zap, User, Wrench, FileText, CreditCard, Download, CalendarDays, Car, AlertCircle, CheckCircle } from 'lucide-react';
import '../css/LandingPage.css';
import logo from '../../assets/logo.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const [trackingMode, setTrackingMode] = useState(false);
  const [jobId, setJobId] = useState('');
  const [mobile, setMobile] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

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

  const handleTrack = (e) => {
    e.preventDefault();
    if (jobId) {
      setTrackingMode(true);
    }
  };

  const autofillDemo = () => {
    setJobId('JOB-2024-001');
    setMobile('555-0101');
  };

  const resetTracker = () => {
    setTrackingMode(false);
    setJobId('');
    setMobile('');
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

  const steps = [
    { id: 'RECEIVED', label: 'Received', completed: true },
    { id: 'INSPECTION', label: 'Inspection', completed: true },
    { id: 'REPAIRING', label: 'Repairing', completed: true },
    { id: 'QUALITY_CHECK', label: 'Quality Check', completed: true },
    { id: 'READY', label: 'Ready', completed: true, current: true },
    { id: 'PAYMENT', label: 'Payment', completed: false },
    { id: 'DELIVERED', label: 'Delivered', completed: false }
  ];

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

                <div className="cf-demo-bar">
                  <span className="cf-demo-label"><strong>Demo:</strong> Try job <strong>JOB-2024-001</strong> with mobile <strong>555-0101</strong></span>
                  <button type="button" className="btn btn-outline cf-autofill-btn" onClick={autofillDemo}>Auto-fill</button>
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
                      <label className="form-label">Mobile Number (Optional)</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. 555-0101"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                    <div className="cf-form-btn-wrapper">
                      <button type="submit" className="btn btn-primary cf-track-submit-btn">
                        <Search size={18} />
                        Track Status
                      </button>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <div className="cf-results">
                {/* Vehicle Header */}
                <div className="cf-results-header">
                  <div>
                    <h3 className="cf-vehicle-name">Toyota Camry 2021</h3>
                    <p className="text-muted text-sm">{jobId} • yuvraj dhadhal</p>
                  </div>
                  <span className="badge badge-ready">READY</span>
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
                      <span className="cf-info-value">May 12, 5:00 PM</span>
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
                        <span className="cf-mechanic-name">prince viradiya</span>
                        <span className="badge badge-ready" style={{ fontSize: '0.7rem' }}>CERTIFIED</span>
                      </div>
                      <span className="text-muted text-sm">Senior Mechanic • 8 years experience</span>
                      <div className="cf-mechanic-meta">
                        <span><Phone size={13} /> +1 (555) 234-5678</span>
                        <span><Mail size={13} /> alex.j@servixo.com</span>
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
                  <div className="cf-bill-table-wrapper">
                    <table className="cf-bill-table">
                      <thead>
                        <tr>
                          <th>Service Item</th>
                          <th>Qty</th>
                          <th>Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {billItems.map((item, i) => (
                          <tr key={i}>
                            <td>{item.name}</td>
                            <td>{item.qty}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>${(item.price * item.qty).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="cf-bill-summary">
                    <div className="cf-bill-row">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="cf-bill-row">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="cf-bill-row cf-bill-total">
                      <span>Total Amount</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="cf-payment-actions">
                    <button className="btn btn-outline cf-download-btn">
                      <Download size={16} />
                      Download Bill PDF
                    </button>
                    <button className="btn btn-primary cf-pay-btn">
                      <CreditCard size={16} />
                      Pay ${total.toFixed(2)}
                    </button>
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
              <div className="cf-footer-logo-bg"><img src={logo} alt="Servixo" /></div>
              <span className="cf-footer-name">Servixo</span>
            </div>
            <p className="cf-footer-desc">
              The smartest way to manage your service center and keep customers happy with real-time tracking.
            </p>
          </div>
          <div className="cf-footer-cols">
            <div className="cf-footer-col">
              <h5 className="cf-footer-heading">Contact Us</h5>
              <div className="cf-footer-item"><Phone size={14} /><span>+1 (800) 123-4567</span></div>
              <div className="cf-footer-item"><Mail size={14} /><span>support@servixo.com</span></div>
              <div className="cf-footer-item"><MapPin size={14} /><span>123 Service Road, Tech District, NY 10001</span></div>
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
