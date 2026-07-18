// Dashboard.tsx
import React from 'react';
import StatCard from './StatCard';
import { useAuth } from '../../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome back, {user?.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total Inspections" 
          value={124} 
          change={8} 
          isPositive={true} 
          icon="clipboard-list"
        />
        <StatCard 
          title="This Month" 
          value={28} 
          change={12} 
          isPositive={true} 
          icon="calendar"
        />
        <StatCard 
          title="Shared Reports" 
          value={98} 
          change={-3} 
          isPositive={false} 
          icon="share"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Inspections</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">Toyota Camry 2020</p>
                  <p className="text-sm text-gray-500">VIN: JT2BF22K1W0139456</p>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-600 text-sm font-medium">View all inspections</button>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 rounded-lg p-4 transition">
              <span className="text-blue-600 text-lg mb-2">+</span>
              <span className="text-sm font-medium">New Inspection</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-green-50 hover:bg-green-100 rounded-lg p-4 transition">
              <span className="text-green-600 text-lg mb-2">↗</span>
              <span className="text-sm font-medium">Share Report</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg p-4 transition">
              <span className="text-purple-600 text-lg mb-2">📊</span>
              <span className="text-sm font-medium">Analytics</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-orange-50 hover:bg-orange-100 rounded-lg p-4 transition">
              <span className="text-orange-600 text-lg mb-2">⚙️</span>
              <span className="text-sm font-medium">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
