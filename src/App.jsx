import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './home/pages/LandingPage';
import LoginPage from './authentication/pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import MechanicDashboard from './mechanic/pages/MechanicDashboard';
import CustomerDashboard from './customer/pages/CustomerDashboard';
import ManagerDashboard from './manager/pages/ManagerDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={
        <DashboardLayout role="admin" title="Dashboard" user={{name: 'Admin User', role: 'admin'}} />
      }>
        <Route index element={<AdminDashboard />} />
      </Route>

      {/* Mechanic Routes */}
      <Route path="/mechanic" element={
        <DashboardLayout role="mechanic" title="Job Update Workspace" user={{name: 'Alex Johnson', role: 'mechanic'}} />
      }>
        <Route index element={<MechanicDashboard />} />
      </Route>

      {/* Manager Routes */}
      <Route path="/manager" element={
        <DashboardLayout role="manager" title="Manager Area" user={{name: 'Manager User', role: 'manager'}} />
      }>
        <Route index element={<ManagerDashboard />} />
      </Route>

      {/* Customer Routes */}
      <Route path="/customer" element={
        <DashboardLayout role="customer" title="My Vehicles" user={{name: 'Sarah Connor', role: 'customer'}} />
      }>
        <Route index element={<CustomerDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
