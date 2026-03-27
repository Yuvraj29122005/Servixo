import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [jobs, setJobs] = useState([
    {
      id: 'JOB-2024-001',
      vehicle: 'Toyota Camry 2021',
      customer: 'Sarah Connor',
      mechanic: 'Alex Johnson',
      status: 'REPAIRING',
      date: 'May 10',
      time: '2:30 PM',
      dateCreated: 'May 10, 2024',
      delivery: 'May 12',
      issues: ['Brake pads worn', 'Oil change needed'],
      serviceType: 'Maintenance',
      notes: [{ sender: 'Alex Johnson', text: 'Started working on brakes', time: '10:30 AM' }],
      bill: null
    },
    {
      id: 'JOB-2024-002',
      vehicle: 'Ford Mustang 1969',
      vehicleNumber: 'JW-007',
      customer: 'John Wick',
      customerPhone: '555-0202',
      mechanic: 'Marcus Smith',
      status: 'INSPECTION',
      date: 'May 11',
      time: '1:45 PM',
      dateCreated: 'May 11, 2024',
      delivery: 'May 15',
      issues: ['Engine making knocking sound', 'Oil leak', 'Check engine light'],
      serviceType: 'Repair',
      notes: [],
      bill: null
    },
    {
      id: 'JOB-2024-003',
      vehicle: 'Honda CR-V',
      vehicleNumber: 'XYZ-9876',
      customer: 'Ellen Ripley',
      customerPhone: '555-0303',
      mechanic: 'Alex Johnson',
      status: 'READY',
      date: 'May 9',
      time: '3:30 PM',
      dateCreated: 'May 9, 2024',
      delivery: 'May 11',
      issues: ['Routine service'],
      serviceType: 'Routine Service',
      notes: [],
      bill: {
        items: [{ desc: 'Oil filter', price: 20 }, { desc: 'Labor', price: 100 }],
        subtotal: 120,
        approved: true,
        paid: false
      }
    }
  ]);

  const [users, setUsers] = useState([
    { id: '1', name: 'Admin User', role: 'admin' },
    { id: '2', name: 'prince viradiya', role: 'mechanic', credentials: true },
    { id: '3', name: 'Marcus Smith', role: 'mechanic', credentials: true },
    { id: '4', name: 'John Wick', role: 'customer' },
    { id: '5', name: 'Sarah Connor', role: 'customer' },
    { id: '6', name: 'Ellen Ripley', role: 'customer' },
    { id: '7', name: 'Manager User', role: 'manager' }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      type: 'info',
      title: 'New Job Assigned',
      message: 'Toyota Camry 2021 (JOB-2024-001) has been assigned to you by Admin.',
      target: 'Alex Johnson',
      read: false,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'n2',
      type: 'success',
      title: 'Bill Approved — Honda CR-V',
      message: 'Manager approved the bill for JOB-2024-003. You can now mark it as delivered.',
      target: 'Alex Johnson',
      read: false,
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    },
    {
      id: 'n3',
      type: 'warning',
      title: 'Delivery Overdue',
      message: 'Honda CR-V (JOB-2024-003) delivery date was May 11. Please update the customer.',
      target: 'Alex Johnson',
      read: true,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'n4',
      type: 'info',
      title: 'Customer Message',
      message: 'Sarah Connor sent a message on JOB-2024-001.',
      target: 'Alex Johnson',
      read: true,
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
    }
  ]);

  const addNotification = (notification) => {
    setNotifications(prev => [
      { ...notification, id: `n-${Date.now()}`, read: false, timestamp: new Date().toISOString() },
      ...prev
    ]);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addJob = (job) => setJobs([...jobs, job]);

  const updateJob = (jobId, updates) => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, ...updates } : j));
  };

  const updateJobStatus = (id, newStatus) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status: newStatus } : j));
  };

  const addMechanic = (mechanic) => setUsers([...users, mechanic]);

  const generateCredentials = (mechanicId) => {
    setUsers(users.map(u => u.id === mechanicId ? { ...u, credentials: true } : u));
  };

  const sendMessage = (jobId, message) => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, notes: [...j.notes, message] } : j));
  };

  const submitBill = (jobId, billData) => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, bill: { ...billData, approved: false, paid: false } } : j));
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      addNotification({
        type: 'info',
        title: `Bill Submitted — ${job.vehicle}`,
        message: `Mechanic ${job.mechanic} submitted a bill for ${jobId}. Awaiting admin approval.`,
        target: 'all'
      });
    }
  };

  const approveBill = (jobId) => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, bill: { ...j.bill, approved: true } } : j));
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      addNotification({
        type: 'success',
        title: `Bill Approved — ${job.vehicle}`,
        message: `Manager approved the bill for ${jobId}. You can now mark it as delivered.`,
        target: job.mechanic
      });
    }
  };

  const makePayment = (jobId) => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, bill: { ...j.bill, paid: true } } : j));
  };

  const markDelivered = (jobId) => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, status: 'DELIVERED' } : j));
  };

  const updateMechanicProfile = (userId, newProfileData) => {
    setUsers(users.map(u => u.id === userId ? { ...u, ...newProfileData } : u));
  };

  const removeMechanic = (mechanicId) => {
    setUsers(users.filter(u => u.id !== mechanicId));
  };

  return (
    <DataContext.Provider value={{
      jobs, users, notifications,
      addJob, updateJobStatus, addMechanic, generateCredentials,
      sendMessage, submitBill, approveBill, makePayment,
      updateMechanicProfile, removeMechanic,
      addNotification, markNotificationRead, markAllNotificationsRead
    }}>
      {children}
    </DataContext.Provider>
  );
};
