// ReportPreview.tsx
import React from 'react';
import { useInspection } from '../../hooks/useInspection';
import { useAuth } from '../../hooks/useAuth';

const ReportPreview: React.FC = () => {
  const { currentInspection } = useInspection();
  const { user } = useAuth();
  
  if (!currentInspection) {
    return <div className="text-center py-12">No inspection selected</div>;
  }
  
  return (
    <div className="bg-white rounded-lg shadow my-6 mx-auto max-w-4xl">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Vehicle Inspection Report</h2>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Download PDF
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Share Report
            </button>
          </div>
        </div>
      </div>
      
      {/* Company Header */}
      <div className="p-6 border-b flex items-center">
        {user?.companyLogo && (
          <img 
            src={user.companyLogo} 
            alt="Company Logo" 
            className="h-16 w-16 object-contain mr-4" 
          />
        )}
        <div>
          <h3 className="font-bold text-lg">{user?.companyName}</h3>
          <p className="text-gray-600">{user?.companyAddress}</p>
          <p className="text-gray-600">{user?.companyPhone} • {user?.companyEmail}</p>
        </div>
      </div>
      
      {/* Vehicle Information */}
      <div className="p-6 border-b">
        <h3 className="font-bold text-lg mb-4">Vehicle Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Make & Model</p>
            <p className="font-medium">{currentInspection.vehicleInfo.make} {currentInspection.vehicleInfo.model}</p>
          </div>
          <div>
            <p className="text-gray-600">Year</p>
            <p className="font-medium">{currentInspection.vehicleInfo.year}</p>
          </div>
          <div>
            <p className="text-gray-600">VIN</p>
            <p className="font-medium">{currentInspection.vehicleInfo.vin}</p>
          </div>
          <div>
            <p className="text-gray-600">License Plate</p>
            <p className="font-medium">{currentInspection.vehicleInfo.licensePlate}</p>
          </div>
          <div>
            <p className="text-gray-600">Odometer</p>
            <p className="font-medium">{currentInspection.vehicleInfo.odometer} km</p>
          </div>
          <div>
            <p className="text-gray-600">Inspection Date</p>
            <p className="font-medium">{new Date(currentInspection.date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      
      {/* Exterior Section */}
      <div className="p-6 border-b">
        <h3 className="font-bold text-lg mb-4">Exterior Condition</h3>
        <div className="space-y-4">
          {Object.entries(currentInspection.exterior).map(([key, value]) => (
            <div key={key} className="flex items-start">
              <div className={`h-5 w-5 rounded-full mt-1 ${value.condition === 'good' ? 'bg-green-500' : value.condition === 'fair' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              <div className="ml-3">
                <p className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                <p className="text-gray-600 text-sm">{value.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Interior Section */}
      <div className="p-6 border-b">
        <h3 className="font-bold text-lg mb-4">Interior Condition</h3>
        <div className="space-y-4">
          {Object.entries(currentInspection.interior).map(([key, value]) => (
            <div key={key} className="flex items-start">
              <div className={`h-5 w-5 rounded-full mt-1 ${value.condition === 'good' ? 'bg-green-500' : value.condition === 'fair' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              <div className="ml-3">
                <p className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                <p className="text-gray-600 text-sm">{value.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mechanical Section */}
      <div className="p-6 border-b">
        <h3 className="font-bold text-lg mb-4">Mechanical Condition</h3>
        <div className="space-y-4">
          {Object.entries(currentInspection.mechanical).map(([key, value]) => (
            <div key={key} className="flex items-start">
              <div className={`h-5 w-5 rounded-full mt-1 ${value.condition === 'good' ? 'bg-green-500' : value.condition === 'fair' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              <div className="ml-3">
                <p className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                <p className="text-gray-600 text-sm">{value.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Photos */}
      <div className="p-6 border-b">
        <h3 className="font-bold text-lg mb-4">Photos</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {currentInspection.photos.map((photo, index) => (
            <div key={index} className="relative aspect-square">
              <img 
                src={photo.url} 
                alt={photo.caption} 
                className="absolute inset-0 h-full w-full object-cover rounded-lg" 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm rounded-b-lg">
                {photo.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Summary */}
      <div className="p-6">
        <h3 className="font-bold text-lg mb-4">Summary & Recommendations</h3>
        <p className="text-gray-700 whitespace-pre-line">{currentInspection.summary}</p>
      </div>
    </div>
  );
};

export default ReportPreview;