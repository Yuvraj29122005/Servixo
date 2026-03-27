import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [jobs, setJobs] = useState([
    {
      id: 'JOB-2024-001',
      vehicle: 'Toyota Camry 2021',
      customer: 'yuvraj dhadhal',
      mechanic: 'prince viradiya',
      status: 'REPAIRING',
      date: 'May 10',
      time: '2:30 PM',
      delivery: 'May 12',
      issues: ['Brake pads worn', 'Oil change needed'],
      notes: [{ sender: 'Alex Johnson', text: 'Started working on brakes', time: '10:30 AM' }],
      bill: null
    },
    {
      id: 'JOB-2024-002',
      vehicle: 'Ford Mustang 1969',
      customer: 'John Wick',
      mechanic: 'Marcus Smith',
      status: 'INSPECTION',
      date: 'May 11',
      time: '1:45 PM',
      delivery: 'May 15',
      issues: ['Engine making knocking sound', 'Oil leak', 'Check engine light'],
      notes: [],
      bill: null
    },
    {
      id: 'JOB-2024-003',
      vehicle: 'Honda CR-V',
      customer: 'Ellen Ripley',
      mechanic: 'Alex Johnson',
      status: 'READY',
      date: 'May 9',
      time: '3:30 PM',
      delivery: 'May 11',
      issues: ['Routine service'],
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

  const addJob = (job) => setJobs([...jobs, job]);
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
      jobs, users, addJob, updateJobStatus, addMechanic, generateCredentials,
      sendMessage, submitBill, approveBill, makePayment
    }}>
      {children}
    </DataContext.Provider>
  );
};
