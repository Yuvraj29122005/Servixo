import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MessageSquare, ExternalLink } from 'lucide-react';
import { useData } from '../../context/DataContext';
import '../css/ServiceWorkflow.css';

const WORKFLOW_COLUMNS = [
  { key: 'RECEIVED', label: 'RECEIVED', color: '#9ca3af' },
  { key: 'INSPECTION', label: 'INSPECTION', color: '#f59e0b' },
  { key: 'REPAIRING', label: 'REPAIRING', color: '#2563eb' },
  { key: 'QUALITY_CHECK', label: 'QUALITY CHECK', color: '#8b5cf6' },
  { key: 'READY', label: 'READY', color: '#16a34a' },
];

const ServiceWorkflow = () => {
  const { jobs } = useData();
  const navigate = useNavigate();

  const getColumnJobs = (statusKey) => jobs.filter(j => j.status === statusKey);

  return (
    <div className="sw-page">
      {/* Header */}
      <div className="sw-header">
        <h2 className="sw-title">Service Workflow</h2>
        <p className="sw-subtitle">Monitor all active services in the pipeline.</p>
      </div>

      {/* Kanban Board */}
      <div className="sw-board">
        {WORKFLOW_COLUMNS.map((col) => {
          const columnJobs = getColumnJobs(col.key);
          return (
            <div className="sw-column" key={col.key}>
              {/* Column Header */}
              <div className="sw-column-header">
                <span className="sw-column-title">{col.label}</span>
                <span
                  className="sw-column-count"
                  style={{
                    backgroundColor: columnJobs.length > 0 ? col.color : '#d1d5db',
                    color: '#fff',
                  }}
                >
                  {columnJobs.length}
                </span>
              </div>

              {/* Cards */}
              <div className="sw-column-body">
                {columnJobs.length === 0 ? (
                  <div className="sw-empty">No Jobs</div>
                ) : (
                  columnJobs.map((job) => (
                    <div className="sw-card" key={job.id} onClick={() => navigate(`/admin/workflow/${job.id}`)}>
                      <div className="sw-card-top">
                        <span className="sw-card-id">{job.id}</span>
                        <button className="sw-card-link" aria-label="Open job" onClick={(e) => { e.stopPropagation(); navigate(`/admin/workflow/${job.id}`); }}>
                          <ExternalLink size={14} />
                        </button>
                      </div>
                      <div className="sw-card-vehicle">{job.vehicle}</div>
                      <div className="sw-card-plate">{job.vehicleNumber || '—'}</div>
                      <div className="sw-card-footer">
                        <span className="sw-card-date">
                          <Clock size={13} />
                          {job.delivery || job.date}
                        </span>
                        <span className="sw-card-comments">
                          <MessageSquare size={13} />
                          {job.notes ? job.notes.length : 0}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceWorkflow;
