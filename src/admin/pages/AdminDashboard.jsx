import React, { useState } from 'react';
import { Settings, CheckCircle, Clock, Package, Plus, UserPlus } from 'lucide-react';
import { useData } from '../../context/DataContext';
import '../css/AdminDashboard.css';

const AdminDashboard = () => {
  const { jobs, users, addJob, addMechanic } = useData();

  const [showJobForm, setShowJobForm] = useState(false);
  const [showMechanicForm, setShowMechanicForm] = useState(false);

  // Job Form State
  const [vehicle, setVehicle] = useState('');
  const [customer, setCustomer] = useState('');
  const [mechanicId, setMechanicId] = useState('');
  const [issues, setIssues] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  // Mechanic Form State
  const [mechanicName, setMechanicName] = useState('');

  const mechanics = users.filter(u => u.role === 'mechanic');
  const customers = users.filter(u => u.role === 'customer');

  const activeJobs = jobs.filter(j => j.status !== 'READY' && j.status !== 'DELIVERED').length;
  const completedJobs = jobs.filter(j => j.status === 'READY').length;

  const stats = [
    {
      title: 'TOTAL VEHICLES',
      value: jobs.length.toString(),
      subtitle: '+12% from last week',
      subtitleColor: 'green',
      icon: <Settings size={24} className="icon-blue" />,
    },
    {
      title: 'ACTIVE JOBS',
      value: activeJobs.toString(),
      subtitle: `${activeJobs} urgent`,
      subtitleColor: 'gray',
      icon: <Clock size={24} className="icon-orange" />,
    },
    {
      title: 'COMPLETED JOBS',
      value: completedJobs.toString(),
      subtitle: '+5% from last week',
      subtitleColor: 'green',
      icon: <CheckCircle size={24} className="icon-green" />,
    },
    {
      title: 'MECHANICS',
      value: mechanics.length.toString(),
      subtitle: 'Active staff',
      subtitleColor: 'gray',
      icon: <Package size={24} className="icon-purple" />,
    },
  ];

  const handleAddJob = (e) => {
    e.preventDefault();
    const assignedMechanic = users.find(u => u.id === mechanicId)?.name || 'Unassigned';
    const newJob = {
      id: `JOB-${new Date().getFullYear()}-00${jobs.length + 1}`,
      vehicle,
      customer,
      mechanic: assignedMechanic,
      status: 'RECEIVED',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      delivery: deliveryDate,
      issues: issues.split(',').map(i => i.trim()),
      notes: [],
      bill: null
    };
    addJob(newJob);
    setShowJobForm(false);
    // Reset form
    setVehicle(''); setCustomer(''); setMechanicId(''); setIssues(''); setDeliveryDate('');
  };

  const handleAddMechanic = (e) => {
    e.preventDefault();
    const newMech = {
      id: `mech-${Date.now()}`,
      name: mechanicName,
      role: 'mechanic',
      credentials: false // Pending manager approval
    };
    addMechanic(newMech);
    setShowMechanicForm(false);
    setMechanicName('');
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'RECEIVED':
        return <span className="badge" style={{backgroundColor: '#e5e7eb', color: '#374151'}}>RECEIVED</span>;
      case 'REPAIRING':
        return <span className="badge badge-repairing">REPAIRING</span>;
      case 'INSPECTION':
        return <span className="badge badge-inspection">INSPECTION</span>;
      case 'QUALITY_CHECK':
        return <span className="badge" style={{backgroundColor: '#ede9fe', color: '#6d28d9'}}>QUALITY CHECK</span>;
      case 'READY':
        return <span className="badge badge-ready">READY</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'RECEIVED': return '#9ca3af';
      case 'REPAIRING': return 'var(--primary-blue)';
      case 'INSPECTION': return '#f59e0b';
      case 'QUALITY_CHECK': return '#8b5cf6';
      case 'READY': return 'var(--primary-green)';
      default: return '#6b7280';
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="flex justify-between items-center mb-6" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Overview</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary flex items-center gap-2" onClick={() => setShowMechanicForm(true)}>
            <UserPlus size={18} /> Add Mechanic
          </button>
          <button className="btn btn-primary flex items-center gap-2" onClick={() => setShowJobForm(true)}>
            <Plus size={18} /> Create Jobcard
          </button>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div className="stat-card" key={idx}>
            <div className="stat-icon-wrapper">
              {stat.icon}
            </div>
            <div className="stat-title">{stat.title}</div>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-subtitle text-${stat.subtitleColor}`}>
              <span className="arrow-up">↗</span> {stat.subtitle}
            </div>
          </div>
        ))}
      </div>

      {showJobForm && (
        <div className="card mb-6" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Create New Jobcard</h3>
          <form onSubmit={handleAddJob} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label>Vehicle Model/Year</label>
              <input type="text" className="form-input" value={vehicle} onChange={e => setVehicle(e.target.value)} required />
            </div>
            <div>
              <label>Customer Name</label>
              <input type="text" className="form-input" value={customer} onChange={e => setCustomer(e.target.value)} required />
              {/* Could be a dropdown from actual customers if needed */}
            </div>
            <div>
              <label>Assign Mechanic</label>
              <select className="form-input" value={mechanicId} onChange={e => setMechanicId(e.target.value)} required>
                <option value="">Select a Mechanic</option>
                {mechanics.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Estimated Delivery Date</label>
              <input type="text" placeholder="e.g. May 20" className="form-input" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} required />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label>Reported Issues (comma separated)</label>
              <textarea className="form-input" value={issues} onChange={e => setIssues(e.target.value)} required></textarea>
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-outline" onClick={() => setShowJobForm(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Create Job</button>
            </div>
          </form>
        </div>
      )}

      {showMechanicForm && (
        <div className="card mb-6" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Add New Mechanic</h3>
          <form onSubmit={handleAddMechanic} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label>Mechanic Full Name</label>
              <input type="text" className="form-input" value={mechanicName} onChange={e => setMechanicName(e.target.value)} required />
            </div>
            <button type="button" className="btn btn-outline" onClick={() => setShowMechanicForm(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Mechanic</button>
          </form>
        </div>
      )}

      <div className="activity-section card">
        <div className="activity-header">
          <h3>Recent Jobs Pipeline</h3>
        </div>
        
        <div className="activity-list">
          {jobs.slice().reverse().map((activity, idx) => (
            <div className="activity-item" key={idx}>
              <div className="activity-indicator" style={{ backgroundColor: getStatusColor(activity.status) }}></div>
              <div className="activity-details">
                <div className="activity-main">
                  <span className="vehicle-name">{activity.vehicle}</span>
                  {getStatusBadge(activity.status)}
                </div>
                <div className="activity-meta">
                  {activity.id} • {activity.customer} • Assigned to: <strong>{activity.mechanic}</strong>
                </div>
              </div>
              <div className="activity-dates">
                <div className="activity-date-primary">{activity.date}, {activity.time}</div>
                <div className="activity-date-secondary">Est. Delivery: {activity.delivery}</div>
              </div>
            </div>
          ))}
          {jobs.length === 0 && <p className="text-muted" style={{ padding: '1rem' }}>No jobs found.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
