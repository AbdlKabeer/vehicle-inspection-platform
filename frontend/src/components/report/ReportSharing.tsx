
// ReportSharing.tsx
import React, { useState } from 'react';
import { useInspection } from '../../hooks/useInspection';

const ReportSharing: React.FC = () => {
  const { currentInspection } = useInspection();
  const [shareMethod, setShareMethod] = useState<'email' | 'whatsapp'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [isShared, setIsShared] = useState(false);
  
  if (!currentInspection) {
    return <div className="text-center py-12">No inspection selected</div>;
  }
  
  const handleShare = async () => {
    setIsSharing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSharing(false);
    setIsShared(true);
    setTimeout(() => setIsShared(false), 3000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow my-6 mx-auto max-w-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Share Inspection Report</h2>
      
      <div className="mb-6">
        <p className="text-gray-700 mb-2">Share report for:</p>
        <p className="font-medium">{currentInspection.vehicleInfo.year} {currentInspection.vehicleInfo.make} {currentInspection.vehicleInfo.model}</p>
        <p className="text-sm text-gray-500">VIN: {currentInspection.vehicleInfo.vin}</p>
      </div>
      
      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          <button 
            className={`px-4 py-2 rounded-lg ${shareMethod === 'email' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setShareMethod('email')}
          >
            Email
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${shareMethod === 'whatsapp' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setShareMethod('whatsapp')}
          >
            WhatsApp
          </button>
        </div>
        
        {shareMethod === 'email' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg p-2 text-gray-700"
                placeholder="client@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-32 border rounded-lg p-2 text-gray-700"
                placeholder="Add a personal message..."
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-lg p-2 text-gray-700"
                placeholder="+1234567890"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-32 border rounded-lg p-2 text-gray-700"
                placeholder="Add a personal message..."
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <button 
          onClick={handleShare}
          disabled={isSharing || (shareMethod === 'email' && !email) || (shareMethod === 'whatsapp' && !phone)}
          className={`px-4 py-2 rounded-lg ${isSharing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
        >
          {isSharing ? 'Sending...' : isShared ? 'Sent Successfully!' : 'Share Report'}
        </button>
      </div>
    </div>
  );
};

export default ReportSharing;