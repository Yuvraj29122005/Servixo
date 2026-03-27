import React from 'react';
import { useData } from '../../context/DataContext';
import { CheckCircle, Users, FileText, Clock } from 'lucide-react';

const ManagerDashboard = () => {
  const { jobs, users, generateCredentials, approveBill } = useData();

  const pendingMechanics = users.filter(u => u.role === 'mechanic' && !u.credentials);
  
  // Jobs that have bills pending approval
  const pendingBills = jobs.filter(j => j.bill && !j.bill.approved);
  const approvedBills = jobs.filter(j => j.bill && j.bill.approved);

  const stats = [
    { title: 'PENDING CREDENTIALS', value: pendingMechanics.length, icon: <Users size={22} className="icon-blue" /> },
    { title: 'BILLS TO APPROVE', value: pendingBills.length, icon: <Clock size={22} className="icon-orange" /> },
    { title: 'APPROVED BILLS', value: approvedBills.length, icon: <CheckCircle size={22} className="icon-green" /> }
  ];

  return (
    <div className="manager-dashboard" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="card"
            style={{
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#6b7280', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {stat.title}
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Credentials Generation */}
        <div className="card">
          <h3 className="mb-4 text-lg font-semibold flex items-center gap-2" style={{ marginBottom: '1rem' }}>
            <Users size={20} /> Mechanic Credentials
          </h3>
          {pendingMechanics.length === 0 ? (
            <p className="text-muted">All mechanics have active credentials.</p>
          ) : (
            <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pendingMechanics.map(mech => (
                <div key={mech.id} className="flex justify-between items-center p-3 border rounded" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
                  <div>
                    <strong>{mech.name}</strong>
                    <p className="text-sm text-gray-500 text-muted">Awaiting access</p>
                  </div>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => generateCredentials(mech.id)}
                  >
                    Generate Credentials
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      {/* Pending Bill Approvals */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.1rem' }}>
          <FileText size={20} /> Pending Bill Approvals
        </h3>
        {pendingBills.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
            <CheckCircle size={32} style={{ marginBottom: '0.5rem', opacity: 0.4 }} />
            <p>No pending bills to approve.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {pendingBills.map(job => (
              <div
                key={job.id}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  borderLeft: '4px solid #f59e0b',
                  padding: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div>
                    <strong style={{ fontSize: '1rem' }}>{job.vehicle}</strong>
                    <span style={{ marginLeft: '0.75rem', fontSize: '0.8rem', color: '#6b7280' }}>{job.id}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 text-muted">Mechanic: {job.mechanic}</p>
                  <div className="bg-gray-50 p-2 rounded mb-3" style={{ backgroundColor: '#f9fafb', padding: '0.5rem', borderRadius: '0.25rem', marginBottom: '0.75rem' }}>
                    <ul className="text-sm list-disc list-inside">
                      {job.bill.items.map((item, i) => (
                        <li key={i} className="flex justify-between" style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{item.desc}</span>
                          <span>${item.price.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-right font-bold mt-2 pt-2 border-t" style={{ borderTop: '1px solid #e5e7eb', marginTop: '0.5rem', paddingTop: '0.5rem', textAlign: 'right' }}>
                      Total: ${job.bill.subtotal.toFixed(2)}
                    </div>
                  </div>
                  <button 
                    className="btn btn-primary w-full"
                    onClick={() => approveBill(job.id)}
                  >
                    Approve & Issue Final Bill
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
