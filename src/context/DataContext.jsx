import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [jobs, setJobs] = useState([
    {
      id: 'JOB-2024-001',
      vehicle: 'Toyota Camry 2021',
      vehicleNumber: 'ABC-1234',
      customer: 'Sarah Connor',
      customerPhone: '555-0101',
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
    { id: '2', name: 'Alex Johnson', role: 'mechanic', credentials: true, phone: '+1234567890', mechanicId: 'm1' },
    { id: '3', name: 'Marcus Smith', role: 'mechanic', credentials: true, phone: '+1987654321', mechanicId: 'm2' },
    { id: '4', name: 'David Lee', role: 'mechanic', credentials: true, phone: '+1122334455', mechanicId: 'm3' },
    { id: '5', name: 'John Wick', role: 'customer' },
    { id: '6', name: 'Sarah Connor', role: 'customer' },
    { id: '7', name: 'Ellen Ripley', role: 'customer' },
    { id: '8', name: 'Manager User', role: 'manager' }
  ]);

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
  };

  const approveBill = (jobId) => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, bill: { ...j.bill, approved: true } } : j));
  };

  const makePayment = (jobId) => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, bill: { ...j.bill, paid: true } } : j));
  };

  return (
    <DataContext.Provider value={{
      jobs, users, addJob, updateJob, updateJobStatus, addMechanic, generateCredentials,
      sendMessage, submitBill, approveBill, makePayment
    }}>
      {children}
    </DataContext.Provider>
  );
};
