import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Calendar, Plus, ChevronRight, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import '../css/JobCards.css';

const STATUS_OPTIONS = ['ALL', 'RECEIVED', 'INSPECTION', 'REPAIRING', 'QUALITY_CHECK', 'READY'];

const JobCards = () => {
  const { jobs, users, addJob } = useData();
  const navigate = useNavigate();
  const mechanics = users.filter(u => u.role === 'mechanic');

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest');
  const [showDateMenu, setShowDateMenu] = useState(false);

  // Create Job Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState('');
  const [newVehicleNumber, setNewVehicleNumber] = useState('');
  const [newCustomer, setNewCustomer] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newMechanic, setNewMechanic] = useState('');
  const [newIssues, setNewIssues] = useState('');
  const [newDelivery, setNewDelivery] = useState('');

  const filteredJobs = jobs
    .filter(job => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        job.id.toLowerCase().includes(q) ||
        job.customer.toLowerCase().includes(q) ||
        job.vehicle.toLowerCase().includes(q) ||
        (job.vehicleNumber && job.vehicleNumber.toLowerCase().includes(q));
      const matchesStatus = statusFilter === 'ALL' || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') return (b.dateCreated || '').localeCompare(a.dateCreated || '');
      return (a.dateCreated || '').localeCompare(b.dateCreated || '');
    });

  const handleCreateJob = (e) => {
    e.preventDefault();
    const newJob = {
      id: `JOB-${new Date().getFullYear()}-${String(jobs.length + 1).padStart(3, '0')}`,
      vehicle: newVehicle,
      vehicleNumber: newVehicleNumber,
      customer: newCustomer,
      customerPhone: newCustomerPhone,
      mechanic: newMechanic || 'Unassigned',
      status: 'RECEIVED',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      dateCreated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      delivery: newDelivery,
      issues: newIssues.split(',').map(i => i.trim()).filter(Boolean),
      serviceType: 'General',
      notes: [],
      bill: null
    };
    addJob(newJob);
    setShowCreateModal(false);
    setNewVehicle(''); setNewVehicleNumber(''); setNewCustomer(''); setNewCustomerPhone('');
    setNewMechanic(''); setNewIssues(''); setNewDelivery('');
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      RECEIVED: { className: 'jc-badge-received', label: 'RECEIVED' },
      INSPECTION: { className: 'jc-badge-inspection', label: 'INSPECTION' },
      REPAIRING: { className: 'jc-badge-repairing', label: 'REPAIRING' },
      QUALITY_CHECK: { className: 'jc-badge-quality', label: 'QUALITY CHECK' },
      READY: { className: 'jc-badge-ready', label: 'READY' },
    };
    const s = statusMap[status] || { className: '', label: status };
    return <span className={`jc-badge ${s.className}`}>{s.label}</span>;
  };

  return (
    <div className="jobcards-page">
      {/* Page Header */}
      <div className="jc-page-header">
        <div>
          <h2 className="jc-page-title">Job Cards</h2>
          <p className="jc-page-subtitle">Manage and track all vehicle service requests.</p>
        </div>
        <button className="btn btn-primary jc-create-btn" onClick={() => setShowCreateModal(true)}>
          <Plus size={18} />
          Create New Job Card
        </button>
      </div>

      {/* Search & Filters */}
      <div className="jc-toolbar">
        <div className="jc-search-wrapper">
          <Search size={18} className="jc-search-icon" />
          <input
            type="text"
            className="jc-search-input"
            placeholder="Search by Job ID, Customer Name, or Vehicle Number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="jc-filter-group">
          {/* Filter Dropdown */}
          <div className="jc-dropdown-wrapper">
            <button
              className={`btn btn-outline jc-filter-btn ${statusFilter !== 'ALL' ? 'active-filter' : ''}`}
              onClick={() => { setShowFilterMenu(!showFilterMenu); setShowDateMenu(false); }}
            >
              <SlidersHorizontal size={16} />
              Filter {statusFilter !== 'ALL' && `(${statusFilter})`}
            </button>
            {showFilterMenu && (
              <div className="jc-dropdown-menu">
                {STATUS_OPTIONS.map(s => (
                  <button
                    key={s}
                    className={`jc-dropdown-item ${statusFilter === s ? 'selected' : ''}`}
                    onClick={() => { setStatusFilter(s); setShowFilterMenu(false); }}
                  >
                    {s === 'ALL' ? 'All Statuses' : s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Date Sort Dropdown */}
          <div className="jc-dropdown-wrapper">
            <button
              className="btn btn-outline jc-filter-btn"
              onClick={() => { setShowDateMenu(!showDateMenu); setShowFilterMenu(false); }}
            >
              <Calendar size={16} />
              Date
            </button>
            {showDateMenu && (
              <div className="jc-dropdown-menu">
                <button
                  className={`jc-dropdown-item ${sortOrder === 'newest' ? 'selected' : ''}`}
                  onClick={() => { setSortOrder('newest'); setShowDateMenu(false); }}
                >
                  Newest First
                </button>
                <button
                  className={`jc-dropdown-item ${sortOrder === 'oldest' ? 'selected' : ''}`}
                  onClick={() => { setSortOrder('oldest'); setShowDateMenu(false); }}
                >
                  Oldest First
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="jc-table-wrapper card">
        <table className="jc-table">
          <thead>
            <tr>
              <th>JOB ID</th>
              <th>CUSTOMER</th>
              <th>VEHICLE</th>
              <th>STATUS</th>
              <th>MECHANIC</th>
              <th>DATE CREATED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job.id} className="jc-table-row">
                <td>
                  <span className="jc-job-id" onClick={() => navigate(`/admin/workflow/${job.id}`)}>{job.id}</span>
                </td>
                <td>
                  <div className="jc-customer-cell">
                    <span className="jc-customer-name">{job.customer}</span>
                    <span className="jc-customer-phone">{job.customerPhone || '—'}</span>
                  </div>
                </td>
                <td>
                  <div className="jc-vehicle-cell">
                    <span className="jc-vehicle-name">{job.vehicle}</span>
                    <span className="jc-vehicle-number">{job.vehicleNumber || '—'}</span>
                  </div>
                </td>
                <td>{getStatusBadge(job.status)}</td>
                <td className="jc-mechanic-cell">{job.mechanic}</td>
                <td className="jc-date-cell">{job.dateCreated || job.date}</td>
                <td>
                  <button className="jc-action-btn" aria-label="View details" onClick={() => navigate(`/admin/workflow/${job.id}`)}>
                    <ChevronRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredJobs.length === 0 && (
              <tr>
                <td colSpan="7" className="jc-empty">No job cards found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="jc-modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="jc-modal" onClick={e => e.stopPropagation()}>
            <div className="jc-modal-header">
              <h3>Create New Job Card</h3>
              <button className="jc-modal-close" onClick={() => setShowCreateModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateJob} className="jc-modal-body">
              <div className="jc-form-grid">
                <div className="form-group">
                  <label className="form-label">Vehicle Model / Year</label>
                  <input type="text" className="form-input" value={newVehicle} onChange={e => setNewVehicle(e.target.value)} placeholder="e.g. Toyota Camry 2021" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Vehicle Number</label>
                  <input type="text" className="form-input" value={newVehicleNumber} onChange={e => setNewVehicleNumber(e.target.value)} placeholder="e.g. ABC-1234" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Customer Name</label>
                  <input type="text" className="form-input" value={newCustomer} onChange={e => setNewCustomer(e.target.value)} placeholder="e.g. John Doe" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Customer Phone</label>
                  <input type="tel" className="form-input" value={newCustomerPhone} onChange={e => setNewCustomerPhone(e.target.value)} placeholder="e.g. 555-1234" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Assign Mechanic</label>
                  <select className="form-input" value={newMechanic} onChange={e => setNewMechanic(e.target.value)} required>
                    <option value="">Select a Mechanic</option>
                    {mechanics.map(m => (
                      <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Estimated Delivery</label>
                  <input type="text" className="form-input" value={newDelivery} onChange={e => setNewDelivery(e.target.value)} placeholder="e.g. May 20" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Reported Issues (comma separated)</label>
                <textarea className="form-input" value={newIssues} onChange={e => setNewIssues(e.target.value)} rows="3" placeholder="e.g. Brake pads worn, Oil change needed" required></textarea>
              </div>
              <div className="jc-modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Job</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCards;
