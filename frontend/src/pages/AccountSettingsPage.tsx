
// AccountSettingsPage.tsx
import React, { useState } from 'react';
import Footer from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';

const AccountSettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'company' | 'security'>('profile');
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
    companyName: user?.companyName || '',
    companyAddress: user?.companyAddress || '',
    companyPhone: user?.companyPhone || '',
    companyEmail: user?.companyEmail || '',
    companyLogo: user?.companyLogo || '',
    companyWatermark: user?.companyWatermark || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'companyLogo' | 'companyWatermark') => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setFormData(prev => ({ ...prev, [fieldName]: event.target?.result }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission based on active tab
    if (activeTab === 'profile') {
      updateUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone
      });
    } else if (activeTab === 'company') {
      updateUser({
        companyName: formData.companyName,
        companyAddress: formData.companyAddress,
        companyPhone: formData.companyPhone,
        companyEmail: formData.companyEmail,
        companyLogo: formData.companyLogo,
        companyWatermark: formData.companyWatermark
      });
    } else if (activeTab === 'security' && formData.newPassword === formData.confirmPassword) {
      // Handle password change
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex border-b">
                <button
                  className={`px-4 py-3 font-medium ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('profile')}
                >
                  My Profile
                </button>
                <button
                  className={`px-4 py-3 font-medium ${activeTab === 'company' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('company')}
                >
                  Company Information
                </button>
                <button
                  className={`px-4 py-3 font-medium ${activeTab === 'security' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('security')}
                >
                  Security
                </button>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  {activeTab === 'profile' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg p-2 text-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg p-2 text-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg p-2 text-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg p-2 text-gray-700"
                        />
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'company' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg p-2 text-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Address
                        </label>
                        <textarea
                          name="companyAddress"
                          value={formData.companyAddress}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg p-2 text-gray-700"
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Phone
                          </label>
                          <input
                            // AccountSettingsPage.tsx (continued)
                            type="tel"
                            name="companyPhone"
                            value={formData.companyPhone}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-2 text-gray-700"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Email
                          </label>
                          <input
                            type="email"
                            name="companyEmail"
                            value={formData.companyEmail}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-2 text-gray-700"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Logo
                        </label>
                        <div className="flex items-center space-x-4">
                          {formData.companyLogo && (
                            <img 
                              src={formData.companyLogo} 
                              alt="Company Logo" 
                              className="h-16 w-16 object-contain" 
                            />
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'companyLogo')}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Report Watermark
                        </label>
                        <div className="flex items-center space-x-4">
                          {formData.companyWatermark && (
                            <img 
                              src={formData.companyWatermark} 
                              alt="Watermark" 
                              className="h-16 w-16 object-contain opacity-50" 
                            />
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'companyWatermark')}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'security' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg p-2 text-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg p-2 text-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg p-2 text-gray-700"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AccountSettingsPage;

