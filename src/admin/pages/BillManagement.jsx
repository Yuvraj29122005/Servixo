import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Receipt, CheckCircle, Clock } from 'lucide-react';
import '../css/AdminDashboard.css';

const BillManagement = () => {
  const { jobs, approveBill } = useData();
  const [activeTab, setActiveTab] = useState('pending');

  const jobsWithBills = jobs.filter(j => j.bill !== null);
  const pendingBills = jobsWithBills.filter(j => !j.bill.approved);
  const approvedBills = jobsWithBills.filter(j => j.bill.approved);

  const displayBills = activeTab === 'pending' ? pendingBills : approvedBills;

  return (
    <div className="admin-dashboard">
      <div className="flex justify-between items-center mb-6" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Bill Management</h2>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
        <button 
          style={{ 
            background: 'none', 
            border: 'none', 
            padding: '0.5rem 1rem', 
            cursor: 'pointer', 
            fontWeight: activeTab === 'pending' ? 'bold' : 'normal',
            color: activeTab === 'pending' ? '#2563eb' : '#6b7280',
            borderBottom: activeTab === 'pending' ? '2px solid #2563eb' : 'none'
          }}
          onClick={() => setActiveTab('pending')}
        >
          Pending Approvals ({pendingBills.length})
        </button>
        <button 
          style={{ 
            background: 'none', 
            border: 'none', 
            padding: '0.5rem 1rem', 
            cursor: 'pointer',
            fontWeight: activeTab === 'approved' ? 'bold' : 'normal',
            color: activeTab === 'approved' ? '#16a34a' : '#6b7280',
            borderBottom: activeTab === 'approved' ? '2px solid #16a34a' : 'none'
          }}
          onClick={() => setActiveTab('approved')}
        >
          Approved History ({approvedBills.length})
        </button>
      </div>

      <div className="activity-list">
        {displayBills.length === 0 ? (
          <div className="card" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
            No {activeTab} bills found.
          </div>
        ) : (
          displayBills.map(job => (
            <div key={job.id} className="card" style={{ marginBottom: '1rem', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Receipt size={20} color={activeTab === 'pending' ? '#d97706' : '#16a34a'} />
                  <h3 style={{ margin: 0 }}>{job.vehicle}</h3>
                  <span className="badge" style={{ backgroundColor: '#f3f4f6', color: '#374151', fontSize: '12px' }}>{job.id}</span>
                </div>
                <div style={{ color: '#4b5563', fontSize: '14px', marginBottom: '0.75rem' }}>
                  <strong>Mechanic:</strong> {job.mechanic} &nbsp;|&nbsp; <strong>Customer:</strong> {job.customer}
                </div>
                <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '8px', fontSize: '14px', minWidth: '300px' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '14px' }}>Bill Items:</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#374151' }}>
                    {job.bill.items.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: '0.25rem' }}>
                        {item.desc}: <strong>${item.price.toFixed(2)}</strong>
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: '0.75rem', fontWeight: 'bold', paddingTop: '0.75rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Total Amount:</span>
                    <span style={{ color: '#111827' }}>${job.bill.subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', height: '100%', paddingTop: '0.5rem' }}>
                {activeTab === 'pending' ? (
                  <button 
                    className="btn btn-primary" 
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} 
                    onClick={() => approveBill(job.id)}
                  >
                    <CheckCircle size={18} />
                    Approve Bill
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', fontWeight: '600', padding: '0.5rem 1rem', background: '#dcfce7', borderRadius: '0.5rem' }}>
                    <CheckCircle size={20} />
                    Approved
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BillManagement;
