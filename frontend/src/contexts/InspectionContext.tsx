
import React, { createContext, useContext, useState } from 'react';
import { 
  InspectionContextType, 
  Inspection, 
  VehicleInfo, 
  ExteriorChecklist, 
  InteriorChecklist, 
  MechanicalChecklist,
  PhotoEntry 
} from '../types/inspection.types';


import { inspectionService } from '../services/inspection';
import { v4 as uuidv4 } from 'uuid';

export const InspectionContext = createContext<InspectionContextType | undefined>(undefined);

export const InspectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentInspection, setCurrentInspection] = useState<Partial<Inspection> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const initializeInspection = () => {
    setCurrentInspection({
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      photos: [],
      additionalNotes: '',
      recommendedActions: '',
      inspectorNotes: ''
    });
  };

  const updateVehicleInfo = (info: VehicleInfo) => {
    setCurrentInspection(prev => prev ? { ...prev, vehicleInfo: info } : null);
  };

  const updateExterior = (checklist: ExteriorChecklist) => {
    setCurrentInspection(prev => prev ? { ...prev, exterior: checklist } : null);
  };

  const updateInterior = (checklist: InteriorChecklist) => {
    setCurrentInspection(prev => prev ? { ...prev, interior: checklist } : null);
  };

  const updateMechanical = (checklist: MechanicalChecklist) => {
    setCurrentInspection(prev => prev ? { ...prev, mechanical: checklist } : null);
  };

  const addPhoto = (photo: PhotoEntry) => {
    setCurrentInspection(prev => 
      prev ? { 
        ...prev, 
        photos: [...(prev.photos || []), photo] 
      } : null
    );
  };

  const removePhoto = (photoId: string) => {
    setCurrentInspection(prev => 
      prev ? { 
        ...prev, 
        photos: (prev.photos || []).filter(p => p.id !== photoId) 
      } : null
    );
  };

  const updateAdditionalNotes = (notes: string) => {
    setCurrentInspection(prev => prev ? { ...prev, additionalNotes: notes } : null);
  };

  const updateRecommendedActions = (actions: string) => {
    setCurrentInspection(prev => prev ? { ...prev, recommendedActions: actions } : null);
  };

  const updateOverallCondition = (condition: 'excellent' | 'good' | 'fair' | 'poor') => {
    setCurrentInspection(prev => prev ? { ...prev, overallCondition: condition } : null);
  };

  const updateInspectorNotes = (notes: string) => {
    setCurrentInspection(prev => prev ? { ...prev, inspectorNotes: notes } : null);
  };

  const saveInspection = async (): Promise<string> => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!currentInspection) {
        throw new Error('No inspection data to save');
      }
      
      const updatedInspection = {
        ...currentInspection,
        updatedAt: new Date().toISOString()
      };
      
      const savedInspection = await inspectionService.createInspection(updatedInspection as Inspection);
      setCurrentInspection(savedInspection);
      return savedInspection.id;
    } catch (err) {
      setError('Failed to save inspection. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const generateReport = async (): Promise<string> => {
    // try {
    //   setIsLoading(true);
    //   setError(null);
      
    //   if (!currentInspection?.id) {
    //     throw new Error('No inspection ID');
    //   }
      
    //   const reportUrl = await apiGenerateReport(currentInspection.id);
    //   setCurrentInspection(prev => prev ? { ...prev, reportUrl } : null);
    //   return reportUrl;
    // } catch (err) {
    //   setError('Failed to generate report. Please try again.');
    //   throw err;
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const value = {
    currentInspection,
    isLoading,
    error,
    initializeInspection,
    updateVehicleInfo,
    updateExterior,
    updateInterior,
    updateMechanical,
    addPhoto,
    removePhoto,
    updateAdditionalNotes,
    updateRecommendedActions,
    updateOverallCondition,
    updateInspectorNotes,
    saveInspection,
    generateReport
  };

  return <InspectionContext.Provider value={value}>{children}</InspectionContext.Provider>;
};

export const useInspection = () => {
  const context = useContext(InspectionContext);
  if (context === undefined) {
    throw new Error('useInspection must be used within an InspectionProvider');
  }
  return context;
};