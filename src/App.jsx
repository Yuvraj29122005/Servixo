import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './home/pages/LandingPage';
import LoginPage from './authentication/pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import MechanicLayout from './layouts/MechanicLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import JobCards from './admin/pages/JobCards';
import ServiceWorkflow from './admin/pages/ServiceWorkflow';
import JobDetail from './admin/pages/JobDetail';
import Mechanics from './admin/pages/Mechanics';
import BillManagement from './admin/pages/BillManagement';
import Reports from './admin/pages/Reports';
import Settings from './admin/pages/Settings';
import MechanicDashboard from './mechanic/pages/MechanicDashboard';
import MechanicNotifications from './mechanic/pages/MechanicNotifications';
import MechanicProfile from './mechanic/pages/MechanicProfile';
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
        <Route path="jobs" element={<JobCards />} />
        <Route path="workflow" element={<ServiceWorkflow />} />
        <Route path="workflow/:jobId" element={<JobDetail />} />
        <Route path="mechanics" element={<Mechanics />} />
        <Route path="bills" element={<BillManagement />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Mechanic Routes — Full-page layout, no sidebar */}
      <Route path="/mechanic" element={
        <MechanicLayout title="Job Update Workspace" user={{name: 'Alex Johnson', role: 'mechanic'}} />
      }>
        <Route index element={<MechanicDashboard />} />
        <Route path="notifications" element={<MechanicNotifications />} />
        <Route path="profile" element={<MechanicProfile />} />
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
