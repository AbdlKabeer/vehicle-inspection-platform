import React, { useState } from 'react';
import { InspectionFormData } from '../../types/inspection.types';
import Button from '../ui/Button';

interface InspectionSummaryProps {
  data: InspectionFormData;
  updateData: (data: Partial<InspectionFormData>) => void;
}

const InspectionSummary: React.FC<InspectionSummaryProps> = ({ data, updateData }) => {
  const [additionalNotes, setAdditionalNotes] = useState(data.additionalNotes || '');

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAdditionalNotes(e.target.value);
    updateData({ additionalNotes: e.target.value });
  };

  const getSectionSummary = (sectionName: string, sectionData: Record<string, string>) => {
    // Filter out the notes field which we'll display separately
    const fieldsToDisplay = Object.entries(sectionData).filter(([key]) => key !== 'notes');
    
    return (
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">{sectionName}</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          {fieldsToDisplay.map(([key, value]) => (
            <div key={key} className="flex justify-between py-1 border-b border-gray-200 last:border-b-0">
              <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <span className="font-medium capitalize">{value || 'Not specified'}</span>
            </div>
          ))}
          
          {sectionData.notes && (
            <div className="mt-2">
              <p className="text-gray-600">Notes:</p>
              <p className="text-sm mt-1">{sectionData.notes}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Inspection Summary</h2>
      
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
        <div className="flex items-start">
          <div className="mr-3 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-blue-800 font-medium">Review Summary</h3>
            <p className="text-blue-600 text-sm">Please review the inspection details below. You can add final notes before generating the report.</p>
          </div>
        </div>
      </div>
      
      {/* Vehicle Info Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
        <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          <div className="flex justify-between md:block">
            <span className="text-gray-600">Make:</span>
            <span className="font-medium md:ml-2">{data.vehicleInfo.make || 'Not specified'}</span>
          </div>
          <div className="flex justify-between md:block">
            <span className="text-gray-600">Model:</span>
            <span className="font-medium md:ml-2">{data.vehicleInfo.model || 'Not specified'}</span>
          </div>
          <div className="flex justify-between md:block">
            <span className="text-gray-600">Year:</span>
            <span className="font-medium md:ml-2">{data.vehicleInfo.year || 'Not specified'}</span>
          </div>
          <div className="flex justify-between md:block">
            <span className="text-gray-600">VIN:</span>
            <span className="font-medium md:ml-2">{data.vehicleInfo.vin || 'Not specified'}</span>
          </div>
          <div className="flex justify-between md:block">
            <span className="text-gray-600">License Plate:</span>
            <span className="font-medium md:ml-2">{data.vehicleInfo.licensePlate || 'Not specified'}</span>
          </div>
          <div className="flex justify-between md:block">
            <span className="text-gray-600">Mileage:</span>
            <span className="font-medium md:ml-2">{data.vehicleInfo.mileage || 'Not specified'}</span>
          </div>
          <div className="flex justify-between md:block">
            <span className="text-gray-600">Color:</span>
            <span className="font-medium md:ml-2">{data.vehicleInfo.color || 'Not specified'}</span>
          </div>
          <div className="flex justify-between md:block">
            <span className="text-gray-600">Fuel Type:</span>
            <span className="font-medium md:ml-2">{data.vehicleInfo.fuelType || 'Not specified'}</span>
          </div>
          <div className="flex justify-between md:block">
            <span className="text-gray-600">Transmission:</span>
            <span className="font-medium md:ml-2">{data.vehicleInfo.transmission || 'Not specified'}</span>
          </div>
          <div className="flex justify-between md:block">
            <span className="text-gray-600">Engine Size:</span>
            <span className="font-medium md:ml-2">{data.vehicleInfo.engineSize || 'Not specified'}</span>
          </div>
          <div className="flex justify-between md:block">
            <span className="text-gray-600">Body Type:</span>
            <span className="font-medium md:ml-2">{data.vehicleInfo.bodyType || 'Not specified'}</span>
          </div>
        </div>
      </div>
      
      {/* Exterior Summary */}
      {getSectionSummary('Exterior Condition', data.exterior)}
      
      {/* Interior Summary */}
      {getSectionSummary('Interior Condition', data.interior)}
      
      {/* Mechanical Summary */}
      {getSectionSummary('Mechanical Condition', data.mechanical)}
      
      {/* Photos Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Photos ({data.photos.length})</h3>
        {data.photos.length === 0 ? (
          <p className="italic text-gray-500">No photos captured</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {data.photos.slice(0, 8).map(photo => (
              <div key={photo.id} className="relative">
                <img 
                  src={photo.imageData} 
                  alt={photo.description || `Photo ${photo.id}`}
                  className="w-full h-20 object-cover rounded-md"
                />
              </div>
            ))}
            {data.photos.length > 8 && (
              <div className="flex items-center justify-center bg-gray-100 h-20 rounded-md">
                <span className="text-gray-600">+{data.photos.length - 8} more</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Additional Notes */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">
          Final Notes & Recommendations
        </label>
        <textarea
          value={additionalNotes}
          onChange={handleNotesChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
          placeholder="Add your final notes, observations, and recommendations for the customer"
        />
      </div>
    </div>
  );
};

export default InspectionSummary;