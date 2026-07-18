// CompanyProfilePage.tsx
import React from 'react';
import Footer from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';

const CompanyProfilePage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Company Profile</h1>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 flex items-start">
                {user?.companyLogo && (
                  <img 
                    src={user.companyLogo} 
                    alt="Company Logo" 
                    className="h-24 w-24 object-contain mr-6" 
                  />
                )}
                <div>
                  <h2 className="text-xl font-bold mb-2">{user?.companyName}</h2>
                  <p className="text-gray-600 whitespace-pre-line mb-4">{user?.companyAddress}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p>{user?.companyPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p>{user?.companyEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 border-t">
                <h3 className="font-medium mb-4">Your Report Watermark</h3>
                <div className="bg-white border rounded-lg p-6 flex items-center justify-center">
                  {user?.companyWatermark ? (
                    <img 
                      src={user.companyWatermark} 
                      alt="Report Watermark" 
                      className="h-32 opacity-30" 
                    />
                  ) : (
                    <p className="text-gray-500">No watermark set</p>
                  )}
                </div>
              </div>
              
              <div className="p-6 border-t flex justify-end">
                <a 
                  href="/settings" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit Company Profile
                </a>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CompanyProfilePage;