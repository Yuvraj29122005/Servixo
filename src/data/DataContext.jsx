import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const API_BASE = 'http://localhost:4000/api';
  const { token } = useAuth();

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Load initial data from backend
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [jobsRes, usersRes, notifRes] = await Promise.all([
          fetch(`${API_BASE}/jobs`),
          fetch(`${API_BASE}/users`),
          fetch(`${API_BASE}/notifications`)
        ]);

        const [jobsData, usersData, notifData] = await Promise.all([
          jobsRes.json(),
          usersRes.json(),
          notifRes.json()
        ]);

        const safeJobs = Array.isArray(jobsData) ? jobsData.filter(j => j && j.id) : [];
        const safeUsers = Array.isArray(usersData) ? usersData.filter(u => u && u.id) : [];
        const safeNotifs = Array.isArray(notifData) ? notifData : [];

        setJobs(safeJobs);
        setUsers(safeUsers);
        setNotifications(safeNotifs);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load initial data from API, falling back to empty state', error);
      }
    };

    fetchAll();
  }, []);

  const addNotification = async (notification) => {
    try {
      const res = await fetch(`${API_BASE}/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify(notification)
      });
      const created = await res.json();
      setNotifications(prev => [created, ...prev]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to add notification', error);
    }
  };

  const markNotificationRead = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/notifications/${id}/read`, {
        method: 'PATCH'
      });
      const updated = await res.json();
      setNotifications(prev => prev.map(n => n._id === updated._id ? updated : n));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to mark notification read', error);
    }
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addJob = async (job) => {
    try {
      const res = await fetch(`${API_BASE}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify(job)
      });
      const created = await res.json();
      if (!res.ok) {
        throw new Error(created?.error || created?.message || 'Failed to create job');
      }
      setJobs(prev => [...prev, created]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to add job', error);
      alert('Error creating job: ' + error.message);
    }
  };

  const updateJob = async (jobId, updates) => {
    try {
      const res = await fetch(`${API_BASE}/jobs/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify(updates)
      });
      const updated = await res.json();
      if (!res.ok) {
        throw new Error(updated?.message || 'Failed to update job');
      }
      setJobs(prev => prev.map(j => j.id === updated.id ? updated : j));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to update job', error);
      alert(error.message);
    }
  };

  const deleteJob = async (jobId) => {
    try {
      const res = await fetch(`${API_BASE}/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { ...authHeaders }
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.message || 'Failed to delete job');
      }
      setJobs(prev => prev.filter(j => j.id !== jobId));
    } catch (error) {
      console.error('Failed to delete job', error);
      alert('Error deleting job: ' + error.message);
    }
  };

  const updateJobStatus = (id, newStatus) => {
    return updateJob(id, { status: newStatus });
  };

  const addMechanic = async (mechanic) => {
    try {
      const res = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify(mechanic)
      });
      const created = await res.json();
      if (!res.ok) {
        throw new Error(created?.message || 'Failed to create mechanic');
      }
      setUsers(prev => [...prev, created]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to add mechanic', error);
      alert(error.message);
    }
  };

  const generateCredentials = async (mechanicId) => {
    try {
      const res = await fetch(`${API_BASE}/users/${mechanicId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify({ credentials: true })
      });
      const updated = await res.json();
      if (!res.ok) {
        throw new Error(updated?.message || 'Failed to update mechanic');
      }
      setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to generate credentials', error);
      alert(error.message);
    }
  };

  const sendMessage = async (jobId, message) => {
    const job = jobs.find(j => j.id === jobId);
    const notes = job ? [...(job.notes || []), message] : [message];
    await updateJob(jobId, { notes });
  };

  const submitBill = async (jobId, billData) => {
    await updateJob(jobId, { bill: { ...billData, approved: false, paid: false } });
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

  const approveBill = async (jobId) => {
    await updateJob(jobId, { 'bill.approved': true });
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

  const makePayment = async (jobId) => {
    await updateJob(jobId, { 'bill.paid': true });
  };

  const markDelivered = async (jobId) => {
    await updateJob(jobId, { status: 'DELIVERED' });
  };

  const updateMechanicProfile = async (userId, newProfileData) => {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify(newProfileData)
      });
      const updated = await res.json();
      setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to update mechanic profile', error);
    }
  };

  const removeMechanic = (mechanicId) => {
    setUsers(users.filter(u => u.id !== mechanicId));
  };

  return (
    <DataContext.Provider value={{
      jobs, users, notifications,
      addJob, deleteJob, updateJobStatus, addMechanic, generateCredentials,
      sendMessage, submitBill, approveBill, makePayment, markDelivered,
      updateMechanicProfile, removeMechanic,
      addNotification, markNotificationRead, markAllNotificationsRead
    }}>
      {children}
    </DataContext.Provider>
  );
};
