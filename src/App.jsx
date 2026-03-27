import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './home/pages/LandingPage';
import LoginPage from './authentication/pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import MechanicDashboard from './mechanic/pages/MechanicDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={
        <DashboardLayout role="admin" title="Dashboard" user={{name: 'Manager User', role: 'admin'}} />
      }>
        <Route index element={<AdminDashboard />} />
      </Route>

      {/* Mechanic Routes */}
      <Route path="/mechanic" element={
        <DashboardLayout role="mechanic" title="Job Update Workspace" user={{name: 'Alex Johnson', role: 'mechanic'}} />
      }>
        <Route index element={<MechanicDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
