import React from 'react';
import { VehicleInfo } from '../../types/inspection.types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface VehicleInfoSectionProps {
  data: VehicleInfo;
  updateData: (data: Partial<VehicleInfo>) => void;
}

const VehicleInfoSection: React.FC<VehicleInfoSectionProps> = ({ data, updateData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());
  
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Other'];
  const transmissions = ['Automatic', 'Manual', 'CVT', 'Semi-Automatic'];
  const bodyTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Van', 'Truck', 'Other'];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Vehicle Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Make"
          id="make"
          value={data.make}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Model"
          id="model"
          value={data.model}
          onChange={handleChange}
          required
        />
        
        <Select
          label="Year"
          id="year"
          value={data.year}
          onChange={handleChange}
          options={years.map(year => ({ value: year, label: year }))}
          required
        />
        
        <Input
          label="VIN"
          id="vin"
          value={data.vin}
          onChange={handleChange}
          required
        />
        
        <Input
          label="License Plate"
          id="licensePlate"
          value={data.licensePlate}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Mileage"
          id="mileage"
          type="number"
          value={data.mileage}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Color"
          id="color"
          value={data.color}
          onChange={handleChange}
          required
        />
        
        <Select
          label="Fuel Type"
          id="fuelType"
          value={data.fuelType}
          onChange={handleChange}
          options={fuelTypes.map(type => ({ value: type, label: type }))}
          required
        />
        
        <Select
          label="Transmission"
          id="transmission"
          value={data.transmission}
          onChange={handleChange}
          options={transmissions.map(type => ({ value: type, label: type }))}
          required
        />
        
        <Input
          label="Engine Size"
          id="engineSize"
          value={data.engineSize}
          onChange={handleChange}
          placeholder="e.g. 2.0L"
          required
        />
        
        <Select
          label="Body Type"
          id="bodyType"
          value={data.bodyType}
          onChange={handleChange}
          options={bodyTypes.map(type => ({ value: type, label: type }))}
          required
        />
      </div>
    </div>
  );
};

export default VehicleInfoSection;