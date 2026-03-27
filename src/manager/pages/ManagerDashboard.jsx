import React from 'react';
import { useData } from '../../context/DataContext';
import { CheckCircle, Users, FileText } from 'lucide-react';

const ManagerDashboard = () => {
  const { jobs, users, generateCredentials, approveBill } = useData();

  // Mechanics that need credentials
  const pendingMechanics = users.filter(u => u.role === 'mechanic' && !u.credentials);
  
  // Jobs that have bills pending approval
  const pendingBills = jobs.filter(j => j.bill && !j.bill.approved);
  const approvedBills = jobs.filter(j => j.bill && j.bill.approved);

  const stats = [
    { title: 'PENDING CREDENTIALS', value: pendingMechanics.length.toString(), icon: <Users size={24} className="icon-blue" /> },
    { title: 'BILLS TO APPROVE', value: pendingBills.length.toString(), icon: <FileText size={24} className="icon-orange" /> },
    { title: 'APPROVED BILLS', value: approvedBills.length.toString(), icon: <CheckCircle size={24} className="icon-green" /> }
  ];

  return (
    <div className="manager-dashboard p-6">
      <div className="flex justify-between items-center mb-6" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Manager Area</h2>
      </div>

      <div className="stats-grid mb-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map((stat, idx) => (
          <div className="card p-4 flex items-center gap-4" key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
            <div className="p-3 bg-gray-100 rounded-full" style={{ backgroundColor: '#f3f4f6', padding: '0.75rem', borderRadius: '50%' }}>
              {stat.icon}
            </div>
            <div>
              <div className="text-gray-500 text-sm font-semibold">{stat.title}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
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

        {/* Bill Approvals */}
        <div className="card">
          <h3 className="mb-4 text-lg font-semibold flex items-center gap-2" style={{ marginBottom: '1rem' }}>
            <FileText size={20} /> Pending Bill Approvals
          </h3>
          {pendingBills.length === 0 ? (
            <p className="text-muted">No pending bills to approve.</p>
          ) : (
            <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pendingBills.map(job => (
                <div key={job.id} className="p-4 border rounded" style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
                  <div className="flex justify-between mb-2" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong>{job.id} - {job.vehicle}</strong>
                    <span className="badge badge-inspection">Pending</span>
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
