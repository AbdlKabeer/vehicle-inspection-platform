import React from 'react';
import { RadioGroup } from '../ui/RadioGroup'; // Correct import for named export
import { MechanicalChecklist } from '../../types/inspection.types'; // Importing MechanicalChecklist

interface MechanicalSectionProps {
  data: MechanicalChecklist; // Using MechanicalChecklist here
  updateData: (data: Partial<MechanicalChecklist>) => void;
}

const MechanicalSection: React.FC<MechanicalSectionProps> = ({ data, updateData }) => {
  const handleChange = (name: string, value: string) => {
    updateData({ [name]: { ...data[name], status: value } }); // Update the status of the item in MechanicalChecklist
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateData({ notes: e.target.value }); // Update notes
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
      <h2 className="text-xl font-semibold">Mechanical Condition</h2>
      
      {/* Handling each item from MechanicalChecklist */}
      <RadioGroup
        // label="Engine Condition"
        name="engine"
        value={data.engine.status} // Using the status from MechanicalChecklist
        onChange={(value) => handleChange('engine', value)}
        options={conditionOptions}
      />
      
      <RadioGroup
        // label="Transmission Condition"
        name="transmission"
        value={data.transmission.status}
        onChange={(value) => handleChange('transmission', value)}
        options={conditionOptions}
      />
      
      <RadioGroup
        // label="Brakes Condition"
        name="brakes"
        value={data.brakes.status}
        onChange={(value) => handleChange('brakes', value)}
        options={conditionOptions}
      />
      
      <RadioGroup
        // label="Suspension Condition"
        name="suspension"
        value={data.suspension.status}
        onChange={(value) => handleChange('suspension', value)}
        options={conditionOptions}
      />
      
      <RadioGroup
        // label="Steering Condition"
        name="steering"
        value={data.steering.status}
        onChange={(value) => handleChange('steering', value)}
        options={conditionOptions}
      />
      
      <RadioGroup
        // label="Exhaust System Condition"
        name="exhaust"
        value={data.exhaust.status}
        onChange={(value) => handleChange('exhaust', value)}
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
          placeholder="Enter any additional notes about the mechanical condition"
        />
      </div>
    </div>
  );
};

export default MechanicalSection;
