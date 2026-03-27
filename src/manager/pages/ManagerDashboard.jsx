import React from 'react';
import { useData } from '../../context/DataContext';
import { CheckCircle, Users, FileText, Clock } from 'lucide-react';

const ManagerDashboard = () => {
  const { jobs, users, generateCredentials, approveBill } = useData();

  const pendingMechanics = users.filter(u => u.role === 'mechanic' && !u.credentials);
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

      {/* Mechanic Credentials */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.1rem' }}>
          <Users size={20} /> Mechanic Credentials
        </h3>
        {pendingMechanics.length === 0 ? (
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>All mechanics have active credentials.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {pendingMechanics.map(mech => (
              <div
                key={mech.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              >
                <div>
                  <strong>{mech.name}</strong>
                  <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: '0.25rem 0 0' }}>Awaiting access</p>
                </div>
                <button className="btn btn-primary" onClick={() => generateCredentials(mech.id)}>
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
                  <span className="badge badge-inspection">Pending</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.75rem' }}>
                  Mechanic: <strong>{job.mechanic}</strong> &bull; Customer: {job.customer}
                </p>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Item</th>
                      <th style={{ textAlign: 'right', padding: '0.5rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {job.bill.items.map((item, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '0.6rem 0.75rem', fontSize: '0.9rem' }}>{item.desc}</td>
                        <td style={{ padding: '0.6rem 0.75rem', fontSize: '0.9rem', textAlign: 'right' }}>₹{item.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td style={{ padding: '0.75rem', fontWeight: 700, borderTop: '2px solid #e5e7eb' }}>Total</td>
                      <td style={{ padding: '0.75rem', fontWeight: 700, textAlign: 'right', borderTop: '2px solid #e5e7eb' }}>₹{job.bill.subtotal.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => approveBill(job.id)}>
                  <CheckCircle size={16} /> Approve & Issue Bill
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved Bills History */}
      {approvedBills.length > 0 && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.1rem' }}>
            <CheckCircle size={20} style={{ color: '#16a34a' }} /> Approved Bills
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {approvedBills.map(job => (
              <div
                key={job.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  border: '1px solid #e5e7eb',
                  borderLeft: '4px solid #16a34a',
                  borderRadius: '8px'
                }}
              >
                <div>
                  <strong>{job.vehicle}</strong>
                  <span style={{ marginLeft: '0.5rem', color: '#6b7280', fontSize: '0.8rem' }}>{job.id}</span>
                  <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: '0.25rem 0 0' }}>
                    {job.mechanic} &bull; {job.customer}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>₹{job.bill.subtotal.toFixed(2)}</div>
                  <span className="badge badge-ready" style={{ marginTop: '0.25rem' }}>Approved</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;
