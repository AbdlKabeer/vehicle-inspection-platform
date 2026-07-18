import React from 'react';
import { RadioGroup } from '../ui/RadioGroup'; // Correct import for named export
import { InteriorChecklist } from '../../types/inspection.types'; // Updated import

interface InteriorSectionProps {
  data: InteriorChecklist; // Updated to InteriorChecklist
  updateData: (data: Partial<InteriorChecklist>) => void;
}

const InteriorSection: React.FC<InteriorSectionProps> = ({ data, updateData }) => {
  const handleChange = (name: string, value: string) => {
    updateData({ [name]: value });
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateData({ notes: e.target.value });
  };

  const conditionOptions = [
    { id: 'excellent', value: 'excellent', label: 'Excellent' },
    { id: 'good', value: 'good', label: 'Good' },
    { id: 'fair', value: 'fair', label: 'Fair' },
    { id: 'poor', value: 'poor', label: 'Poor' },
    { id: 'damaged', value: 'damaged', label: 'Damaged' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Interior Condition</h2>
      
      <RadioGroup
        name="seatsCondition"
        value={data.seats.value} // Make sure data.seats is structured correctly
        onChange={(value) => handleChange('seats', value)}
        options={conditionOptions}
      />
      
      <RadioGroup
        name="dashboardCondition"
        value={data.dashboard.value} // Similarly for dashboard
        onChange={(value) => handleChange('dashboard', value)}
        options={conditionOptions}
      />
      
      <RadioGroup
        name="carpetCondition"
        value={data.carpet.value} // Similarly for carpet
        onChange={(value) => handleChange('carpet', value)}
        options={conditionOptions}
      />
      
      <RadioGroup
        name="controlsCondition"
        value={data.controls.value} // Similarly for controls
        onChange={(value) => handleChange('controls', value)}
        options={conditionOptions}
      />
      
      <RadioGroup
        name="acCondition"
        value={data.ac.value} // Similarly for ac
        onChange={(value) => handleChange('ac', value)}
        options={conditionOptions}
      />
      
      <RadioGroup
        name="electronicsCondition"
        value={data.electronics.value} // Similarly for electronics
        onChange={(value) => handleChange('electronics', value)}
        options={conditionOptions}
      />
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional Notes
        </label>
        <textarea
          name="notes"
          value={data.notes}
          onChange={handleNotesChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Enter any additional notes about the interior condition"
        />
      </div>
    </div>
  );
};

export default InteriorSection;
