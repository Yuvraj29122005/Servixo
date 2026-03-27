import React, { useState } from 'react';
import { Briefcase, Calendar, MessageSquare, Wrench } from 'lucide-react';
import './MechanicDashboard.css';

const MechanicDashboard = () => {
  const [activeTab, setActiveTab] = useState('job-details');
  const [status, setStatus] = useState('INSPECTION');

  const stats = [
    { title: 'ACTIVE JOBS', value: '4', icon: <Briefcase size={24} className="icon-blue" /> },
    { title: 'DUE TODAY', value: '1', icon: <Calendar size={24} className="icon-orange" /> }
  ];

  const steps = [
    { id: 'RECEIVED', label: 'Received' },
    { id: 'INSPECTION', label: 'Inspection' },
    { id: 'REPAIRING', label: 'Repairing' },
    { id: 'QUALITY_CHECK', label: 'Quality Check' },
    { id: 'READY', label: 'Ready' }
  ];

  return (
    <div className="mechanic-dashboard">
      <div className="stats-grid mechanic-stats">
        {stats.map((stat, idx) => (
          <div className="stat-card flex items-center gap-4" key={idx} style={{ flexDirection: 'row', padding: '1.5rem' }}>
            <div className="stat-icon-wrapper" style={{ marginBottom: 0 }}>{stat.icon}</div>
            <div>
              <div className="stat-title">{stat.title}</div>
              <div className="stat-value" style={{ margin: 0 }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="job-workspace">
        <div className="workspace-header">
          <h3>Current Job: JOB-2024-002</h3>
          <span className="vehicle-tag">Ford Mustang 1969 • John Wick</span>
        </div>

        <div className="workspace-grid">
          {/* Left Side: Notes and Issues */}
          <div className="workspace-left">
            <div className="card reported-issue-card">
              <h4 className="flex items-center gap-2">
                <Wrench size={18} className="icon-blue" />
                Reported Issues
              </h4>
              <ul className="issue-list">
                <li>Engine making knocking sound</li>
                <li>Oil leak visible under the car</li>
                <li>Check engine light is ON</li>
              </ul>
            </div>

            <div className="card service-notes-card">
              <h4 className="flex items-center gap-2">
                <MessageSquare size={18} className="icon-orange" />
                Service Notes
              </h4>
              <div className="notes-list">
                <div className="note-bubble">
                  <strong>Alex Johnson (You)</strong> - 10:30 AM
                  <p>Initial inspection complete. Found a crack in the oil pan.</p>
                </div>
              </div>
              <div className="add-note-area">
                <textarea className="form-input" placeholder="Type a new update..." rows="3"></textarea>
                <button className="btn btn-primary w-full mt-2">Add Note</button>
              </div>
            </div>
          </div>

          {/* Right Side: Status Update */}
          <div className="workspace-right">
            <div className="card status-update-card">
              <h4>Update Progress</h4>
              <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                Select the current stage of the repair process
              </p>
              
              <div className="status-stepper-vertical">
                {steps.map((step, idx) => {
                  const isActive = step.id === status;
                  const isPast = steps.findIndex(s => s.id === status) > idx;

                  return (
                    <div 
                      key={step.id} 
                      className={`stepper-item ${isActive ? 'active' : ''} ${isPast ? 'completed' : ''}`}
                      onClick={() => setStatus(step.id)}
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

              <button className="btn btn-primary w-full" style={{ marginTop: '2rem' }}>
                Save Status Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MechanicDashboard;
