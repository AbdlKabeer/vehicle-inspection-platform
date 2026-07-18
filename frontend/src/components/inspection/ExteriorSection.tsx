import React from 'react';
import { ExteriorInfo } from '../../types/inspection.types';
import { RadioGroup } from '../ui/RadioGroup';

interface ExteriorSectionProps {
  data: ExteriorInfo;
  updateData: (data: Partial<ExteriorInfo>) => void;
}

const ExteriorSection: React.FC<ExteriorSectionProps> = ({ data, updateData }) => {
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
      <h2 className="text-xl font-semibold">Exterior Condition</h2>
      
      <RadioGroup
        // label="Body Condition"
        name="bodyCondition"
        value={data.bodyCondition}
        onChange={(value) => handleChange('bodyCondition', value)}
        options={conditionOptions}
      />
      
      <RadioGroup
        name="paintCondition"
        value={data.paintCondition}
        onChange={(value) => handleChange('paintCondition', value)}
        options={conditionOptions}
      />
      
      <RadioGroup
        // label="Glass Condition (Windows, Mirrors, etc.)"
        name="glassCondition"
        value={data.glassCondition}
        onChange={(value) => handleChange('glassCondition', value)}
        options={conditionOptions}
      />
      
      <RadioGroup
        // label="Lights Condition (Headlights, Taillights, etc.)"
        name="lightsCondition"
        value={data.lightsCondition}
        onChange={(value) => handleChange('lightsCondition', value)}
        options={conditionOptions}
      />
      
      <RadioGroup
        // label="Tires Condition"
        name="tiresCondition"
        value={data.tiresCondition}
        onChange={(value) => handleChange('tiresCondition', value)}
        options={conditionOptions}
      />
      
      <RadioGroup
        // label="Wheels Condition"
        name="wheelsCondition"
        value={data.wheelsCondition}
        onChange={(value) => handleChange('wheelsCondition', value)}
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
          placeholder="Enter any additional notes about the exterior condition"
        />
      </div>
    </div>
  );
};

export default ExteriorSection;
