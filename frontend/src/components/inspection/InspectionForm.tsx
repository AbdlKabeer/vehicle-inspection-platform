import React, { useState } from 'react';
import { useInspection } from '../../hooks/useInspection';
import VehicleInfoSection from './VehicleInfoSection';
import ExteriorSection from './ExteriorSection';
import InteriorSection from './InteriorSection';
import MechanicalSection from './MechanicalSection';
import PhotoCapture from './PhotoCapture';
import InspectionSummary from './InspectionSummary';
import {Button} from '../ui/Button';
import { InspectionFormData } from '../../types/inspection.types';

const InspectionForm: React.FC = () => {
  const { saveInspection, generateReport } = useInspection();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<InspectionFormData>({
    vehicleInfo: {
      make: '',
      model: '',
      year: '',
      vin: '',
      licensePlate: '',
      mileage: '',
      color: '',
      fuelType: '',
      transmission: '',
      engineSize: '',
      bodyType: ''
    },
    exterior: {
      bodyCondition: '',
      paintCondition: '',
      glassCondition: '',
      lightsCondition: '',
      tiresCondition: '',
      wheelsCondition: '',
      notes: ''
    },
    interior: {
      seatsCondition: '',
      dashboardCondition: '',
      carpetCondition: '',
      controlsCondition: '',
      acCondition: '',
      electronicsCondition: '',
      notes: ''
    },
    mechanical: {
      engineCondition: '',
      transmissionCondition: '',
      brakesCondition: '',
      suspensionCondition: '',
      steeringCondition: '',
      exhaustCondition: '',
      notes: ''
    },
    photos: [],
    additionalNotes: ''
  });

  const steps = [
    { title: 'Vehicle Information', component: VehicleInfoSection },
    { title: 'Exterior', component: ExteriorSection },
    { title: 'Interior', component: InteriorSection },
    { title: 'Mechanical', component: MechanicalSection },
    { title: 'Photos', component: PhotoCapture },
    { title: 'Summary', component: InspectionSummary }
  ];

  const updateFormData = (section: keyof InspectionFormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    await saveInspection(formData);
    // Redirect to dashboard or show success message
  };

  const handleGenerateReport = async () => {
    const reportUrl = await generateReport(formData);
    // Redirect to report preview page
    window.location.href = `/report-preview?id=${reportUrl}`;
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Vehicle Inspection</h1>
      
      {/* Step indicators */}
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`flex-1 text-center ${index === currentStep ? 'text-blue-600 font-bold' : 'text-gray-400'}`}
          >
            <div className="relative">
              <div className={`h-2 ${index <= currentStep ? 'bg-blue-600' : 'bg-gray-200'} ${index === 0 ? 'rounded-l' : ''} ${index === steps.length - 1 ? 'rounded-r' : ''}`}></div>
              <div className={`absolute top-0 left-0 right-0 flex items-center justify-center`}>
                <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {index + 1}
                </span>
              </div>
            </div>
            <span className="text-sm mt-2 block">{step.title}</span>
          </div>
        ))}
      </div>

      {/* Form section */}
      <div className="mb-6">
        <CurrentStepComponent 
          data={formData[steps[currentStep].title.toLowerCase() as keyof InspectionFormData]} 
          updateData={(data: any) => updateFormData(steps[currentStep].title.toLowerCase() as keyof InspectionFormData, data)} 
        />
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <Button 
          onClick={handlePrevious} 
          disabled={currentStep === 0}
          variant="secondary"
        >
          Previous
        </Button>
        
        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <div className="flex space-x-2">
            <Button onClick={handleSave} variant="secondary">Save</Button>
            <Button onClick={handleGenerateReport} variant="primary">Generate Report</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectionForm;