import { api } from './api';
import { 
  Inspection, 
  InspectionFormData,
  InspectionPhoto,
  InspectionFilters
} from '../types/inspection.types';

export const inspectionService = {
  // Create a new inspection
  createInspection: async (inspectionData: InspectionFormData) => {
    const response = await api.post<{ inspection: Inspection }>('/inspections', inspectionData);
    return response.data.inspection;
  },
  
  // Get inspection by ID
  getInspection: async (inspectionId: string) => {
    const response = await api.get<{ inspection: Inspection }>(`/inspections/${inspectionId}`);
    return response.data.inspection;
  },
  
  // Get all inspections with optional filters
  getInspections: async (filters?: InspectionFilters) => {
    const response = await api.get<{ inspections: Inspection[], total: number }>('/inspections', {
      params: filters,
    });
    return response.data;
  },
  
  // Update an inspection
  updateInspection: async (inspectionId: string, data: Partial<InspectionFormData>) => {
    const response = await api.put<{ inspection: Inspection }>(`/inspections/${inspectionId}`, data);
    return response.data.inspection;
  },
  
  // Delete an inspection
  deleteInspection: async (inspectionId: string) => {
    await api.delete(`/inspections/${inspectionId}`);
    return true;
  },
  
  // Upload inspection photo
  uploadInspectionPhoto: async (inspectionId: string, photo: File, category: string, description: string) => {
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('category', category);
    formData.append('description', description);
    
    const response = await api.post<{ photo: InspectionPhoto }>(`/inspections/${inspectionId}/photos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.photo;
  },
  
  // Delete inspection photo
  deleteInspectionPhoto: async (inspectionId: string, photoId: string) => {
    await api.delete(`/inspections/${inspectionId}/photos/${photoId}`);
    return true;
  },
  
  // Get dashboard stats
  getDashboardStats: async () => {
    const response = await api.get('/inspections/stats');
    return response.data;
  },
};

export default inspectionService;