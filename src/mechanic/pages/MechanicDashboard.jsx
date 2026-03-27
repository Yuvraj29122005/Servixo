import React, { useState } from 'react';
import { Briefcase, Calendar, MessageSquare, Wrench, FileText, Send } from 'lucide-react';
import { useData } from '../../context/DataContext';
import '../css/MechanicDashboard.css';

const MechanicDashboard = () => {
  const { jobs, updateJobStatus, sendMessage, submitBill } = useData();
  
  // We mock the currently logged-in mechanic's name for this view
  const mechanicName = 'Alex Johnson';
  
  const myJobs = jobs.filter(j => j.mechanic === mechanicName && j.status !== 'DELIVERED');
  
  const [activeJobId, setActiveJobId] = useState(myJobs.length > 0 ? myJobs[0].id : null);
  const activeJob = myJobs.find(j => j.id === activeJobId);

  const [noteText, setNoteText] = useState('');
  const [billItems, setBillItems] = useState([]);
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const steps = [
    { id: 'RECEIVED', label: 'Received' },
    { id: 'INSPECTION', label: 'Inspection' },
    { id: 'REPAIRING', label: 'Repairing' },
    { id: 'QUALITY_CHECK', label: 'Quality Check' },
    { id: 'READY', label: 'Ready (Washing Done)' }
  ];

  const handleStatusUpdate = (newStatus) => {
    if (activeJob) {
      updateJobStatus(activeJob.id, newStatus);
    }
  };

  const handleAddNote = () => {
    if (noteText.trim() && activeJob) {
      sendMessage(activeJob.id, {
        sender: mechanicName,
        text: noteText,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      });
      setNoteText('');
    }
  };

  const handleAddBillItem = () => {
    if (newItemDesc && newItemPrice) {
      setBillItems([...billItems, { desc: newItemDesc, price: parseFloat(newItemPrice) }]);
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
      submitBill(activeJob.id, {
        items: billItems,
        subtotal
      });
      setBillItems([]);
      alert("Bill items submitted to Manager for approval!");
    }
  };

  if (!activeJob) {
    return (
      <div className="mechanic-dashboard p-6">
        <h2 className="text-xl font-bold mb-4">Mechanic Workspace</h2>
        <p>No active jobs assigned to you at the moment.</p>
        <div style={{ marginTop: '2rem' }}>
          <h3>Your Assigned Jobs</h3>
          <div className="stats-grid mechanic-stats">
            {myJobs.map(job => (
              <div key={job.id} className="card p-4 cursor-pointer" onClick={() => setActiveJobId(job.id)}>
                <strong>{job.vehicle}</strong>
                <p>{job.id}</p>
                <span className="badge mt-2 block">{job.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mechanic-dashboard">
      <div className="flex justify-between items-center mb-6" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {myJobs.map(job => (
            <button 
              key={job.id} 
              className={`btn ${activeJobId === job.id ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => { setActiveJobId(job.id); setBillItems([]); }}
            >
              {job.id} - {job.vehicle}
            </button>
          ))}
        </div>
      </div>

      <div className="job-workspace">
        <div className="workspace-header">
          <h3>Current Job: {activeJob.id}</h3>
          <span className="vehicle-tag">{activeJob.vehicle} • {activeJob.customer}</span>
        </div>

        <div className="workspace-grid">
          {/* Left Side: Notes, Issues, Billing */}
          <div className="workspace-left">
            <div className="card reported-issue-card">
              <h4 className="flex items-center gap-2">
                <Wrench size={18} className="icon-blue" />
                Reported Issues
              </h4>
              <ul className="issue-list">
                {activeJob.issues.map((iss, i) => (
                  <li key={i}>{iss}</li>
                ))}
              </ul>
            </div>

            <div className="card service-notes-card">
              <h4 className="flex items-center gap-2">
                <MessageSquare size={18} className="icon-orange" />
                Chat / Service Notes
              </h4>
              <div className="notes-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {activeJob.notes.map((note, i) => (
                  <div key={i} className="note-bubble" style={{ 
                    backgroundColor: note.sender === mechanicName ? '#eff6ff' : '#f3f4f6',
                    marginLeft: note.sender === mechanicName ? 'auto' : '0',
                    marginRight: note.sender === mechanicName ? '0' : 'auto',
                    width: '85%'
                  }}>
                    <strong>{note.sender} {note.sender === mechanicName ? '(You)' : ''}</strong> - {note.time}
                    <p>{note.text}</p>
                  </div>
                ))}
                {activeJob.notes.length === 0 && <p className="text-muted">No messages yet.</p>}
              </div>
              <div className="add-note-area" style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Message customer..." 
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleAddNote()}
                  style={{ flex: 1 }}
                />
                <button className="btn btn-primary" onClick={handleAddNote}>
                  <Send size={18} />
                </button>
              </div>
            </div>

            {/* Billing Module */}
            <div className="card service-notes-card">
              <h4 className="flex items-center gap-2">
                <FileText size={18} className="icon-green" />
                Generate Bill Items
              </h4>
              
              {activeJob.bill ? (
                <div>
                  <div className="badge badge-ready mb-4 text-center w-full block">
                    Bill Submitted {activeJob.bill.approved ? '(Approved)' : '(Pending Approval)'}
                  </div>
                  <ul className="issue-list">
                    {activeJob.bill.items.map((item, i) => (
                      <li key={i} className="flex justify-between" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{item.desc}</span>
                        <strong>${item.price.toFixed(2)}</strong>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-right">
                    <strong>Subtotal: ${activeJob.bill.subtotal.toFixed(2)}</strong>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-muted text-sm mb-4">Add parts and labor. Manager will approve.</p>
                  <ul className="issue-list mb-4">
                    {billItems.map((item, i) => (
                      <li key={i} className="flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{item.desc} - ${item.price.toFixed(2)}</span>
                        <button onClick={() => handleRemoveBillItem(i)} className="text-red-500" style={{ color: 'red', cursor: 'pointer', background: 'none', border: 'none' }}>×</button>
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <input type="text" className="form-input" placeholder="Item description" value={newItemDesc} onChange={e => setNewItemDesc(e.target.value)} style={{ flex: 2 }} />
                    <input type="number" className="form-input" placeholder="Price" value={newItemPrice} onChange={e => setNewItemPrice(e.target.value)} style={{ flex: 1 }} />
                    <button className="btn btn-outline" onClick={handleAddBillItem}>Add</button>
                  </div>
                  <button className="btn btn-primary w-full" onClick={handleSubmitBill} disabled={billItems.length === 0}>
                    Submit to Manager
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Side: Status Update */}
          <div className="workspace-right">
            <div className="card status-update-card">
              <h4>Update Progress</h4>
              <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                Select any stage to update immediately. You can skip steps if needed.
              </p>
              
              <div className="status-stepper-vertical">
                {steps.map((step, idx) => {
                  const isActive = step.id === activeJob.status;
                  const isPast = steps.findIndex(s => s.id === activeJob.status) > idx;

                  return (
                    <div 
                      key={step.id} 
                      className={`stepper-item ${isActive ? 'active' : ''} ${isPast ? 'completed' : ''}`}
                      onClick={() => handleStatusUpdate(step.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="stepper-circle">
                        {isPast ? '✓' : idx + 1}
                      </div>
                      <div className="stepper-content">
                        <strong>{step.label}</strong>
                        {isActive && <span className="stepper-subtext">Current Stage</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MechanicDashboard;
