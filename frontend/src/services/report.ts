import { api } from './api';
import { Report } from '../types/report.types';

export const reportService = {
//   Generate a PDF report from an inspection
  generateReport: async (inspectionId: string, options?: any) => {
    const response = await api.post<{ reportUrl: string }>(`/reports/generate/${inspectionId}`, options);
    return response.data.reportUrl;
  },
  
  // Get a report by ID
  getReport: async (reportId: string) => {
    const response = await api.get<{ report: Report }>(`/reports/${reportId}`);
    return response.data.report;
  },
  
  // Get all reports for the user
  getReports: async () => {
    const response = await api.get<{ reports: Report[] }>('/reports');
    return response.data.reports;
  },
  
  // Update a report (like editing comments)
  updateReport: async (reportId: string, data: Partial<Report>) => {
    const response = await api.put<{ report: Report }>(`/reports/${reportId}`, data);
    return response.data.report;
  },
  
  // Delete a report
  deleteReport: async (reportId: string) => {
    await api.delete(`/reports/${reportId}`);
    return true;
  },
  
  // Share a report via email
  shareReportViaEmail: async (reportId: string, email: string, message?: string) => {
    const response = await api.post(`/reports/${reportId}/share/email`, {
      email,
      message,
    });
    return response.data;
  },
  
  // Get shareable link for a report
  getShareableLink: async (reportId: string, expiresIn?: number) => {
    const response = await api.post<{ shareUrl: string }>(`/reports/${reportId}/share/link`, {
      expiresIn,
    });
    return response.data.shareUrl;
  },
  
  // Download report as PDF
  downloadReportPdf: async (reportId: string) => {
    const response = await api.get(`/reports/${reportId}/download`, {
      responseType: 'blob',
    });
    
    // Create a download link and trigger it
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `report-${reportId}.pdf`);
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return true;
  },
};

export default reportService;