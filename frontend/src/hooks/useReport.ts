// useReport.ts
import { useState, useEffect } from 'react';
import { reportService } from '../services/report';
import { Report } from '../types/report.types';

export const useReport = (inspectionId?: string) => {
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!inspectionId) return;
    
    const fetchReport = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const reportData = await reportService.getReport(inspectionId);
        setReport(reportData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load report');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReport();
  }, [inspectionId]);
  
  const generateReport = async (inspectionId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const generatedReport = await reportService.generateReport(inspectionId);
      setReport(generatedReport);
      return generatedReport;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate report');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fixing the call to `shareReportViaEmail`
  const shareReport = async (reportId: string, email: string, message?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await reportService.shareReportViaEmail(reportId, email, message); // Corrected here
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to share report');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    report,
    isLoading,
    error,
    generateReport,
    shareReport // No change here
  };
};
