

// StatCard.tsx
import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  isPositive: boolean;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 font-medium">{title}</h3>
        <div className="bg-gray-100 p-2 rounded-full">
          <span className="text-gray-600">{icon}</span>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold">{value}</p>
        <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          <span>{isPositive ? '↑' : '↓'}</span>
          <span className="ml-1">{Math.abs(change)}%</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;