import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DashboardLayout = ({ role, title, user }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar role={role} />
      <main className="main-content">
        <Header title={title} user={user} />
        <div className="dashboard-body">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
