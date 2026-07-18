// src/types/report.types.ts

import { Inspection } from './inspection.types';

export type ReportTemplate = {
  id: string;
  name: string;
  isDefault: boolean;
  sections: ReportSection[];
};

export type ReportSection = {
  id: string;
  title: string;
  isVisible: boolean;
  order: number;
};

export type ReportStyle = {
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  logoPosition: 'left' | 'center' | 'right';
  watermarkOpacity: number;
};

export type ReportMetadata = {
  reportNumber: string;
  generatedDate: string;
  inspectionDate: string;
  inspectorName: string;
};

export type Report = {
  id: string;
  inspectionId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  template: ReportTemplate;
  style: ReportStyle;
  metadata: ReportMetadata;
  pdfUrl: string;
  shareUrl: string;
  sharedWith: string[];
  inspection: Inspection;
};

export type ReportShareOptions = {
  email?: string;
  phone?: string;
  message?: string;
  expiresAt?: string;
};