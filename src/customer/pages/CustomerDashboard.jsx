import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Car, FileText, Send, CheckCircle, Download, Clock } from 'lucide-react';

const CustomerDashboard = () => {
  const { jobs, sendMessage, makePayment } = useData();
  
  // Mock logged in customer
  const customerName = 'Sarah Connor';
  
  const myJobs = jobs.filter(j => j.customer === customerName);
  
  const [activeJobId, setActiveJobId] = useState(myJobs.length > 0 ? myJobs[0].id : null);
  const activeJob = myJobs.find(j => j.id === activeJobId);

  const [noteText, setNoteText] = useState('');

  const steps = [
    { id: 'RECEIVED', label: 'Received' },
    { id: 'INSPECTION', label: 'Inspection' },
    { id: 'REPAIRING', label: 'Repairing' },
    { id: 'QUALITY_CHECK', label: 'Quality Check' },
    { id: 'READY', label: 'Ready for Pickup' },
    { id: 'DELIVERED', label: 'Delivered' }
  ];

  const handleAddNote = () => {
    if (noteText.trim() && activeJob) {
      sendMessage(activeJob.id, {
        sender: customerName,
        text: noteText,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      });
      setNoteText('');
    }
  };

  const handlePayment = () => {
    if (activeJob) {
      makePayment(activeJob.id);
      alert('Payment successful!');
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  if (!activeJob) {
    return (
      <div className="customer-dashboard p-6">
        <h2 className="text-xl font-bold mb-4">My Vehicles</h2>
        <p>You have no active or past service records.</p>
      </div>
    );
  }

  const isReadyForPayment = activeJob.status === 'READY' && activeJob.bill && activeJob.bill.approved && !activeJob.bill.paid;
  const isPaid = activeJob.bill && activeJob.bill.paid;

  return (
    <div className="customer-dashboard p-6 pb-20">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>My Vehicles</h2>

      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
        {myJobs.map(job => (
          <button 
            key={job.id} 
            className={`btn ${activeJobId === job.id ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveJobId(job.id)}
          >
            {job.vehicle}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        
        {/* Left Column: Progress & Chat */}
        <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Progress Tracker */}
          <div className="card">
            <h3 className="flex items-center gap-2 mb-4" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Car size={20} className="icon-blue" /> Service Progress
            </h3>
            <div className="status-stepper-vertical">
                {steps.map((step, idx) => {
                  const isActive = step.id === activeJob.status;
                  const isPast = steps.findIndex(s => s.id === activeJob.status) > idx;

                  return (
                    <div 
                      key={step.id} 
                      className={`stepper-item ${isActive ? 'active' : ''} ${isPast ? 'completed' : ''}`}
                    >
                      <div className="stepper-circle">
                        {isPast ? '✓' : idx + 1}
                      </div>
                      <div className="stepper-content">
                        <strong>{step.label}</strong>
                        {isActive && <span className="stepper-subtext text-primary">Current Stage</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
          </div>

          {/* Chat with Mechanic */}
          <div className="card">
            <h3 className="flex items-center gap-2 mb-4" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Send size={20} className="icon-orange" /> Messages
            </h3>
            <div className="notes-list" style={{ maxHeight: '250px', overflowY: 'auto', marginBottom: '1rem' }}>
              {activeJob.notes.map((note, i) => (
                <div key={i} className="note-bubble" style={{ 
                  backgroundColor: note.sender === customerName ? '#eff6ff' : '#f3f4f6',
                  marginLeft: note.sender === customerName ? 'auto' : '0',
                  marginRight: note.sender === customerName ? '0' : 'auto',
                  width: '85%'
                }}>
                  <strong>{note.sender} {note.sender === customerName ? '(You)' : ''}</strong> - {note.time}
                  <p>{note.text}</p>
                </div>
              ))}
              {activeJob.notes.length === 0 && <p className="text-muted">No messages yet.</p>}
            </div>
            <div className="add-note-area" style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Send a message to mechanic..." 
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleAddNote()}
                style={{ flex: 1 }}
              />
              <button className="btn btn-primary" onClick={handleAddNote}>Send</button>
            </div>
          </div>
        </div>

        {/* Right Column: Billing */}
        <div>
          <div className="card no-print" id="bill-section">
            <h3 className="flex items-center gap-2 mb-4" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} className="icon-green" /> Invoice & Payment
            </h3>

            {!activeJob.bill || !activeJob.bill.approved ? (
              <div className="text-center p-6 bg-gray-50 rounded" style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <Clock size={32} className="mx-auto text-gray-400 mb-2" style={{ margin: '0 auto', marginBottom: '0.5rem', color: '#9ca3af' }} />
                <p className="text-gray-600">Your bill is being prepared.</p>
              </div>
            ) : (
              <div>
                {/* Invoice Content (will be printed) */}
                <div className="invoice-content print-only">
                  <div className="mb-4 pb-4 border-b" style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <h4 className="font-bold text-lg">Servixo Auto Care</h4>
                    <p className="text-sm text-gray-500">Invoice #{activeJob.id}</p>
                    <p className="text-sm text-gray-500">Vehicle: {activeJob.vehicle}</p>
                  </div>
                  
                  {(!isPaid) ? (
                    <div className="mb-4 p-3 bg-yellow-50 text-yellow-800 rounded border border-yellow-200" style={{ backgroundColor: '#fefce8', color: '#854d0e', padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #fef08a', marginBottom: '1rem' }}>
                      Items will be revealed after payment is complete.
                      <br/><strong>Total Due: ₹{activeJob.bill.subtotal.toFixed(2)}</strong>
                    </div>
                  ) : (
                    <div className="space-y-2 mb-4">
                      {activeJob.bill.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span>{item.desc}</span>
                          <span>₹{item.price.toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-bold pt-2 border-t mt-2" style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e5e7eb', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                        <span>Paid Amount:</span>
                        <span>₹{activeJob.bill.subtotal.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions (no-print) */}
                <div className="mt-6 flex flex-col gap-3" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
                  {isReadyForPayment && (
                    <button className="btn btn-primary w-full flex justify-center items-center gap-2" onClick={handlePayment}>
                      Pay ₹{activeJob.bill.subtotal.toFixed(2)} Securely
                    </button>
                  )}
                  
                  {isPaid && (
                    <>
                      <div className="flex items-center justify-center gap-2 text-green-600 font-semibold mb-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#16a34a', fontWeight: 'bold' }}>
                        <CheckCircle size={20} /> Payment Completed
                      </div>
                      <button className="btn btn-outline w-full flex justify-center items-center gap-2" onClick={handleDownloadPDF}>
                        <Download size={18} /> Download / Print PDF
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
