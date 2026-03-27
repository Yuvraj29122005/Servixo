import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, User, Car, Wrench, FileText, CheckCircle, Package, Truck } from 'lucide-react';
import { useData } from '../../data/DataContext';
import '../css/JobDetail.css';

const STATUSES = [
  { key: 'RECEIVED', label: 'Received', icon: <Package size={20} /> },
  { key: 'INSPECTION', label: 'Inspection', icon: <FileText size={20} /> },
  { key: 'REPAIRING', label: 'Repairing', icon: <Wrench size={20} /> },
  { key: 'QUALITY_CHECK', label: 'Quality Check', icon: <CheckCircle size={20} /> },
  { key: 'READY', label: 'Ready for Pickup', icon: <Car size={20} /> },
  { key: 'DELIVERED', label: 'Delivered', icon: <Truck size={20} /> },
];

const STATUS_ORDER = STATUSES.map(s => s.key);

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { jobs, users } = useData();

  const job = jobs.find(j => j.id === jobId);
  const mechanics = users.filter(u => u.role === 'mechanic');

  if (!job) {
    return (
      <div className="jd-page">
        <div className="jd-not-found">
          <h2>Job not found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/admin/jobs')}>Back to Job Cards</button>
        </div>
      </div>
    );
  }

  const currentIdx = STATUS_ORDER.indexOf(job.status);

  const getStatusBadge = (status) => {
    const map = {
      RECEIVED: { className: 'jd-badge-received', label: 'RECEIVED' },
      INSPECTION: { className: 'jd-badge-inspection', label: 'INSPECTION' },
      REPAIRING: { className: 'jd-badge-repairing', label: 'REPAIRING' },
      QUALITY_CHECK: { className: 'jd-badge-quality', label: 'QUALITY CHECK' },
      READY: { className: 'jd-badge-ready', label: 'READY' },
      DELIVERED: { className: 'jd-badge-delivered', label: 'DELIVERED' },
    };
    const s = map[status] || { className: '', label: status };
    return <span className={`jd-badge ${s.className}`}>{s.label}</span>;
  };

  return (
    <div className="jd-page">
      {/* Top Bar */}
      <div className="jd-topbar">
        <div className="jd-topbar-left">
          <button className="jd-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="jd-topbar-title">
              <h2>{job.id}</h2>
              {getStatusBadge(job.status)}
            </div>
            <p className="jd-topbar-subtitle">View service progress and details.</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="jd-content">
        {/* Left Panel */}
        <div className="jd-left">
          {/* Customer Details */}
          <div className="jd-info-card card">
            <div className="jd-info-card-title">
              <User size={18} />
              <h3>Customer Details</h3>
            </div>
            <div className="jd-info-row">
              <span className="jd-info-label">Name</span>
              <span className="jd-info-value">{job.customer}</span>
            </div>
            <div className="jd-info-row">
              <span className="jd-info-label">Contact</span>
              <span className="jd-info-value">{job.customerPhone || '—'}</span>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="jd-info-card card">
            <div className="jd-info-card-title">
              <Car size={18} />
              <h3>Vehicle Details</h3>
            </div>
            <div className="jd-info-row">
              <span className="jd-info-label">Model</span>
              <span className="jd-info-value">{job.vehicle}</span>
            </div>
            <div className="jd-info-row">
              <span className="jd-info-label">Registration Number</span>
              <span className="jd-info-value">{job.vehicleNumber || '—'}</span>
            </div>
            <div className="jd-info-row">
              <span className="jd-info-label">Problem Reported</span>
              <span className="jd-info-value">{job.issues?.join(', ') || '—'}</span>
            </div>
            <div className="jd-info-row">
              <span className="jd-info-label">Service Type</span>
              <span className="jd-info-value-badge">{job.serviceType || 'General'}</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="jd-right">
          {/* Service Progress Tracker (VIEW ONLY) */}
          <div className="jd-progress-card card">
            <div className="jd-progress-header">
              <h3>Service Progress Tracker</h3>
              <span className="jd-est-date">
                <Clock size={14} />
                Est: {job.delivery ? `May ${job.delivery.split(' ')[1]}, 2024` : '—'}
              </span>
            </div>

            {/* Stepper */}
            <div className="jd-stepper">
              {STATUSES.map((s, i) => {
                const isCompleted = i <= currentIdx;
                const isCurrent = i === currentIdx;
                return (
                  <React.Fragment key={s.key}>
                    <div className={`jd-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                      <div className="jd-step-circle">
                        {isCompleted ? <CheckCircle size={16} /> : <span>{i + 1}</span>}
                      </div>
                      <span className="jd-step-label">{s.label.toUpperCase()}</span>
                    </div>
                    {i < STATUSES.length - 1 && (
                      <div className={`jd-step-line ${i < currentIdx ? 'completed' : ''}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Status Display Grid (Read-only) */}
            <div className="jd-status-grid">
              {STATUSES.map((s) => (
                <div
                  key={s.key}
                  className={`jd-status-btn readonly ${job.status === s.key ? 'selected' : ''}`}
                >
                  {s.icon}
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Mechanic (Read-only) */}
          <div className="jd-mechanic-card card">
            <div className="jd-mechanic-header">
              <div className="jd-mechanic-icon">
                <Wrench size={20} />
              </div>
              <div>
                <span className="jd-mechanic-label">Assigned Mechanic</span>
                <span className="jd-mechanic-name">{job.mechanic}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
