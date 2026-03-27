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
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './data/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout
              role="admin"
              title="Dashboard"
              user={user || { name: 'Admin User', role: 'admin' }}
            />
          </ProtectedRoute>
        }
      >
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
      <Route
        path="/mechanic"
        element={
          <ProtectedRoute allowedRoles={['mechanic']}>
            <MechanicLayout
              title="Job Update Workspace"
              user={user || { name: 'Mechanic User', role: 'mechanic' }}
            />
          </ProtectedRoute>
        }
      >
        <Route index element={<MechanicDashboard />} />
        <Route path="notifications" element={<MechanicNotifications />} />
        <Route path="profile" element={<MechanicProfile />} />
      </Route>


    </Routes>
  );
}

export default App;
