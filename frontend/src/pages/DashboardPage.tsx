// DashboardPage.tsx
import React from 'react';
import Footer from '../components/layout/Footer';
import Dashboard from '../components/dashboard/Dashboard';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';

const DashboardPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          <Dashboard />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardPage;