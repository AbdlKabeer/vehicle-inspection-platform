// InspectionHistoryPage.tsx (continued)
import React, { useState } from 'react';
import Footer from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';

const InspectionHistoryPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'recent' | 'shared'>('all');
  
  // Sample data - in a real application, this would come from an API
  const inspections = [
    {
      id: '1',
      vehicleMake: 'Toyota',
      vehicleModel: 'Camry',
      vehicleYear: '2020',
      date: '2025-03-10',
      clientName: 'John Doe',
      status: 'completed',
      shared: true
    },
    {
      id: '2',
      vehicleMake: 'Honda',
      vehicleModel: 'Accord',
      vehicleYear: '2019',
      date: '2025-03-08',
      clientName: 'Jane Smith',
      status: 'completed',
      shared: true
    },
    {
      id: '3',
      vehicleMake: 'Ford',
      vehicleModel: 'Mustang',
      vehicleYear: '2018',
      date: '2025-03-05',
      clientName: 'Michael Johnson',
      status: 'completed',
      shared: false
    },
    {
      id: '4',
      vehicleMake: 'Chevrolet',
      vehicleModel: 'Malibu',
      vehicleYear: '2021',
      date: '2025-03-01',
      clientName: 'Sarah Williams',
      status: 'completed',
      shared: false
    }
  ];
  
  const filteredInspections = inspections.filter(inspection => {
    if (selectedTab === 'recent') {
      // Filter for inspections in the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return new Date(inspection.date) >= sevenDaysAgo;
    } else if (selectedTab === 'shared') {
      return inspection.shared;
    }
    return true; // 'all' tab
  });
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Inspection History</h1>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                New Inspection
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex border-b">
                <button
                  className={`px-4 py-3 font-medium ${selectedTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                  onClick={() => setSelectedTab('all')}
                >
                  All Inspections
                </button>
                <button
                  className={`px-4 py-3 font-medium ${selectedTab === 'recent' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                  onClick={() => setSelectedTab('recent')}
                >
                  Recent
                </button>
                <button
                  className={`px-4 py-3 font-medium ${selectedTab === 'shared' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                  onClick={() => setSelectedTab('shared')}
                >
                  Shared Reports
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vehicle
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInspections.map((inspection) => (
                      <tr key={inspection.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {inspection.vehicleYear} {inspection.vehicleMake} {inspection.vehicleModel}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(inspection.date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{inspection.clientName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {inspection.status}
                          </span>
                          {inspection.shared && (
                            <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              shared
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href={`/report/${inspection.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                            View
                          </a>
                          <a href={`/report/${inspection.id}/edit`} className="text-gray-600 hover:text-gray-900 mr-4">
                            Edit
                          </a>
                          <a href={`/report/${inspection.id}/share`} className="text-green-600 hover:text-green-900">
                            Share
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default InspectionHistoryPage;


