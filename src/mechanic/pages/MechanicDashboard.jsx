import React, { useState } from 'react';
import { Car, Wrench, FileText, CheckCircle, Truck } from 'lucide-react';
import { useData } from '../../data/DataContext';
import { useAuth } from '../../data/AuthContext';
import '../css/MechanicDashboard.css';

const MechanicDashboard = () => {
  const { jobs, updateJobStatus, submitBill, markDelivered } = useData();
  const { user } = useAuth();

  const mechanicName = user?.name || 'Unknown';

  const myJobs = jobs.filter(j => j.mechanic === mechanicName);

  const [activeJobId, setActiveJobId] = useState(myJobs.length > 0 ? myJobs[0].id : null);
  const activeJob = myJobs.find(j => j.id === activeJobId);

  const [billItems, setBillItems] = useState([]);
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const steps = [
    { id: 'RECEIVED', label: 'Received', description: 'Vehicle received at garage' },
    { id: 'INSPECTION', label: 'Inspection', description: 'Checking reported issues' },
    { id: 'REPAIRING', label: 'Repairing', description: 'Repair work in progress' },
    { id: 'QUALITY_CHECK', label: 'Quality Check', description: 'Testing repaired parts' },
    { id: 'READY', label: 'Ready', description: 'Washed and ready for delivery' },
    { id: 'DELIVERED', label: 'Delivered', description: 'Vehicle returned to customer' }
  ];

  const currentStepIndex = activeJob ? steps.findIndex(s => s.id === activeJob.status) : -1;

  const handleAdvanceStatus = () => {
    if (activeJob && currentStepIndex < steps.length - 1) {
      const nextStatus = steps[currentStepIndex + 1].id;
      updateJobStatus(activeJob.id, nextStatus);
    }
  };

  const handleBacktrackStatus = (targetIndex) => {
    if (activeJob && targetIndex < currentStepIndex) {
      const prevStatus = steps[targetIndex].id;
      // If moving back from READY, we might want to clear or mark bill as "needed again"
      // For now, let's just update the status. 
      // If the backend/context allowed it, we might set bill to null if targetIndex < 4
      updateJobStatus(activeJob.id, prevStatus);
    }
  };



  const handleAddBillItem = () => {
    if (newItemDesc.trim() && newItemPrice) {
      setBillItems([...billItems, { desc: newItemDesc.trim(), price: parseFloat(newItemPrice) }]);
      setNewItemDesc('');
      setNewItemPrice('');
    }
  };

  const handleRemoveBillItem = (index) => {
    setBillItems(billItems.filter((_, i) => i !== index));
  };

  const handleSubmitBill = () => {
    if (activeJob && billItems.length > 0) {
      const subtotal = billItems.reduce((acc, item) => acc + item.price, 0);
      submitBill(activeJob.id, { items: billItems, subtotal });
      setBillItems([]);
    }
  };

  const handleMarkDelivered = () => {
    if (activeJob) {
      markDelivered(activeJob.id);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'RECEIVED': return 'badge-received';
      case 'INSPECTION': return 'badge-inspection';
      case 'REPAIRING': return 'badge-repairing';
      case 'QUALITY_CHECK': return 'badge-quality';
      case 'READY': return 'badge-ready';
      case 'DELIVERED': return 'badge-delivered';
      default: return '';
    }
  };

  /* ─── No active jobs state ─── */
  if (myJobs.length === 0) {
    return (
      <div className="mechanic-dashboard">
        <div className="mechanic-empty-state">
          <Car size={48} />
          <h3>No Active Jobs</h3>
          <p>You don't have any assigned jobs at the moment. Check back later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mechanic-dashboard">
      <div className="mechanic-layout">

        {/* ─── LEFT: Assigned Cars ─── */}
        <aside className="assigned-cars-panel">
          <div className="panel-header">
            <Car size={20} />
            <h3>Assigned Cars</h3>
            <span className="job-count">{myJobs.length}</span>
          </div>

          <div className="car-list">
            {myJobs.map(job => (
              <div
                key={job.id}
                className={`car-card ${activeJobId === job.id ? 'car-card-active' : ''}`}
                onClick={() => { setActiveJobId(job.id); setBillItems([]); }}
              >
                <div className="car-card-top">
                  <strong className="car-name">{job.vehicle}</strong>
                  <span className={`badge ${getStatusBadgeClass(job.status)}`}>
                    {job.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="car-card-meta">
                  <span>{job.customer}</span>
                  <span>{job.id}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* ─── RIGHT: Workspace ─── */}
        <main className="workspace-panel">
          {!activeJob ? (
            <div className="mechanic-empty-state">
              <Wrench size={40} />
              <h3>Select a Job</h3>
              <p>Click any car from the left panel to view its workspace.</p>
            </div>
          ) : (
            <>
              {/* Job header */}
              <div className="workspace-job-header">
                <div>
                  <h2>{activeJob.vehicle}</h2>
                  <span className="workspace-meta">
                    {activeJob.id} &bull; {activeJob.customer} &bull; Est. Delivery: {activeJob.delivery}
                  </span>
                </div>
                <span className={`badge ${getStatusBadgeClass(activeJob.status)}`}>
                  {activeJob.status.replace('_', ' ')}
                </span>
              </div>

              {/* Reported Issues */}
              <div className="card workspace-card">
                <h4><Wrench size={18} className="icon-blue" /> Reported Issues</h4>
                <ul className="issue-list">
                  {activeJob.issues.map((issue, i) => (
                    <li key={i}>{issue}</li>
                  ))}
                </ul>
              </div>

              {/* Status Stepper */}
              <div className="card workspace-card">
                <h4><CheckCircle size={18} className="icon-green" /> Update Progress</h4>
                <div className="status-stepper-horizontal">
                    {steps.map((step, idx) => {
                      const isCompleted = currentStepIndex > idx;
                      const isActive = currentStepIndex === idx;
                      const canBacktrack = idx < currentStepIndex && currentStepIndex < 5;
                      return (
                        <div
                          key={step.id}
                          className={`h-step ${isCompleted ? 'h-step-done' : ''} ${isActive ? 'h-step-active' : ''} ${canBacktrack ? 'h-step-backtrackable' : ''}`}
                          onClick={() => {
                            // Don't allow clicking the DELIVERED step to advance manually
                            if (idx === 5) return;
                            canBacktrack && handleBacktrackStatus(idx);
                          }}
                          title={canBacktrack ? `Click to backtrack to ${step.label}` : ''}
                          style={{ cursor: canBacktrack ? 'pointer' : 'default' }}
                        >
                          <div className="h-step-circle">
                            {isCompleted ? '✓' : idx + 1}
                          </div>
                          <div className="h-step-label">{step.label}</div>
                        </div>
                      );
                    })}
                </div>

                  <div className="stepper-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    {currentStepIndex < 4 && (
                      <button className="btn btn-primary advance-btn" style={{ flex: 1 }} onClick={handleAdvanceStatus}>
                        Advance to "{steps[currentStepIndex + 1].label}"
                      </button>
                    )}
                    {currentStepIndex > 1 && currentStepIndex < 5 && ( // Allowing backtrack to Inspection or higher (usually don't revert to "Received" unless error)
                      <button 
                        className="btn btn-outline backtrack-btn" 
                        style={{ border: '1px solid #ef4444', color: '#ef4444' }}
                        onClick={() => handleBacktrackStatus(currentStepIndex - 1)}
                      >
                        Backtrack for Re-Repair
                      </button>
                    )}
                  </div>

                {currentStepIndex === 4 && !activeJob.bill && (
                  <div className="step-complete-msg">
                    <CheckCircle size={18} /> Vehicle is ready. Please generate the bill below.
                  </div>
                )}
                {currentStepIndex === 5 && (
                  <div className="step-complete-msg" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
                    <Truck size={18} /> Vehicle has been delivered to the customer.
                  </div>
                )}
              </div>

              {/* ─── Billing Section (only when READY or DELIVERED) ─── */}
              {(activeJob.status === 'READY' || activeJob.status === 'DELIVERED') && (
                <div className="card workspace-card billing-card">
                  <h4><FileText size={18} className="icon-orange" /> Billing</h4>

                  {activeJob.bill ? (
                    <div className="bill-submitted-view">
                      <div className={`bill-status-banner ${activeJob.bill.approved ? 'bill-approved' : 'bill-pending'}`}>
                        {activeJob.bill.approved
                          ? '✓ Bill Approved by Manager'
                          : '⏳ Bill Sent — Waiting for Manager Approval'}
                      </div>
                      <table className="bill-table">
                        <thead>
                          <tr><th>Item</th><th>Cost</th></tr>
                        </thead>
                        <tbody>
                          {activeJob.bill.items.map((item, i) => (
                            <tr key={i}><td>{item.desc}</td><td>₹{item.price.toFixed(2)}</td></tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr><td><strong>Total</strong></td><td><strong>₹{activeJob.bill.subtotal.toFixed(2)}</strong></td></tr>
                        </tfoot>
                      </table>
                    </div>
                  ) : (
                    <div className="bill-form">
                      <p className="bill-hint">Add parts and labour costs. Manager will review and approve.</p>

                      {billItems.length > 0 && (
                        <table className="bill-table">
                          <thead>
                            <tr><th>Item</th><th>Cost</th><th></th></tr>
                          </thead>
                          <tbody>
                            {billItems.map((item, i) => (
                              <tr key={i}>
                                <td>{item.desc}</td>
                                <td>₹{item.price.toFixed(2)}</td>
                                <td>
                                  <button className="remove-item-btn" onClick={() => handleRemoveBillItem(i)}>×</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td><strong>Total</strong></td>
                              <td colSpan="2"><strong>₹{billItems.reduce((a, b) => a + b.price, 0).toFixed(2)}</strong></td>
                            </tr>
                          </tfoot>
                        </table>
                      )}

                      <div className="bill-input-row">
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Item description"
                          value={newItemDesc}
                          onChange={e => setNewItemDesc(e.target.value)}
                        />
                        <input
                          type="number"
                          className="form-input bill-price-input"
                          placeholder="Price"
                          value={newItemPrice}
                          onChange={e => setNewItemPrice(e.target.value)}
                          onKeyPress={e => e.key === 'Enter' && handleAddBillItem()}
                        />
                        <button className="btn btn-outline" onClick={handleAddBillItem}>Add</button>
                      </div>

                      <button
                        className="btn btn-primary submit-bill-btn"
                        onClick={handleSubmitBill}
                        disabled={billItems.length === 0}
                      >
                        Submit Bill to Manager
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ─── Deliver Button (only when bill approved) ─── */}
              {activeJob.status === 'READY' && activeJob.bill && activeJob.bill.approved && (
                <div className="card workspace-card deliver-card">
                  <div className="deliver-content">
                    <div>
                      <h4><Truck size={18} className="icon-green" /> Ready for Delivery</h4>
                      <p>Bill approved. Hand over the vehicle and mark as delivered.</p>
                    </div>
                    <button className="btn btn-deliver" onClick={handleMarkDelivered}>
                      <Truck size={18} /> Mark as Delivered
                    </button>
                  </div>
                </div>
              )}


            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default MechanicDashboard;
