import React from 'react';
import { Settings, CheckCircle, Clock, Package } from 'lucide-react';
import '../css/AdminDashboard.css';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'TOTAL VEHICLES',
      value: '3',
      subtitle: '+12% from last week',
      subtitleColor: 'green',
      icon: <Settings size={24} className="icon-blue" />,
    },
    {
      title: 'ACTIVE JOBS',
      value: '2',
      subtitle: '4 urgent',
      subtitleColor: 'gray',
      icon: <Clock size={24} className="icon-orange" />,
    },
    {
      title: 'COMPLETED JOBS',
      value: '1',
      subtitle: '+5% from last week',
      subtitleColor: 'green',
      icon: <CheckCircle size={24} className="icon-green" />,
    },
    {
      title: 'PENDING DELIVERIES',
      value: '1',
      subtitle: 'Ready for pickup',
      subtitleColor: 'gray',
      icon: <Package size={24} className="icon-purple" />,
    },
  ];

  const recentActivity = [
    {
      id: 'JOB-2024-001',
      vehicle: 'Toyota Camry 2021',
      customer: 'Sarah Connor',
      mechanic: 'Alex Johnson',
      status: 'REPAIRING',
      date: 'May 10',
      time: '2:30 PM',
      delivery: 'May 12'
    },
    {
      id: 'JOB-2024-002',
      vehicle: 'Ford Mustang 1969',
      customer: 'John Wick',
      mechanic: 'Marcus Smith',
      status: 'INSPECTION',
      date: 'May 11',
      time: '1:45 PM',
      delivery: 'May 15'
    },
    {
      id: 'JOB-2024-003',
      vehicle: 'Honda CR-V',
      customer: 'Ellen Ripley',
      mechanic: 'Alex Johnson',
      status: 'READY',
      date: 'May 9',
      time: '3:30 PM',
      delivery: 'May 11'
    }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'REPAIRING':
        return <span className="badge badge-repairing">REPAIRING</span>;
      case 'INSPECTION':
        return <span className="badge badge-inspection">INSPECTION</span>;
      case 'READY':
        return <span className="badge badge-ready">READY</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'REPAIRING': return 'var(--primary-blue)';
      case 'INSPECTION': return '#f59e0b';
      case 'READY': return 'var(--primary-green)';
      default: return '#6b7280';
    }
  };

  return (
    <div className="admin-dashboard">
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

      <div className="activity-section card">
        <div className="activity-header">
          <h3>Recent Activity</h3>
          <a href="#" className="view-all">View All ↗</a>
        </div>
        
        <div className="activity-list">
          {recentActivity.map((activity, idx) => (
            <div className="activity-item" key={idx}>
              <div className="activity-indicator" style={{ backgroundColor: getStatusColor(activity.status) }}></div>
              <div className="activity-details">
                <div className="activity-main">
                  <span className="vehicle-name">{activity.vehicle}</span>
                  {getStatusBadge(activity.status)}
                </div>
                <div className="activity-meta">
                  {activity.id} • {activity.customer} • Assigned to {activity.mechanic}
                </div>
              </div>
              <div className="activity-dates">
                <div className="activity-date-primary">{activity.date}, {activity.time}</div>
                <div className="activity-date-secondary">Est. Delivery: {activity.delivery}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
