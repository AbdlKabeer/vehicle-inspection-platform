export type VehicleInfo = {
  engineSize: string | undefined;
  mileage: string | undefined;
  make: string;
  model: string;
  year: string;
  vin: string;
  licensePlate: string;
  odometer: string;
  fuelType: string;
  transmission: string;
  color: string;
  bodyType: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
};

export type CheckItem = {
  name: string;
  status: 'good' | 'fair' | 'poor' | 'n/a';
  notes: string;
};

export type ExteriorChecklist = {
  bodyCondition: CheckItem;
  paint: CheckItem;
  glass: CheckItem;
  lights: CheckItem;
  tires: CheckItem;
  wheels: CheckItem;
  mirrors: CheckItem;
  bumpers: CheckItem;
  doors: CheckItem;
  trunk: CheckItem;
  hood: CheckItem;
  undercarriage: CheckItem;
};

export type InteriorChecklist = {
  notes: string | number | readonly string[] | undefined;
  electronics: any;
  ac: any;
  carpet: any;
  seats: CheckItem;
  carpets: CheckItem;
  dashboard: CheckItem;
  headliner: CheckItem;
  instruments: CheckItem;
  controls: CheckItem;
  airConditioning: CheckItem;
  heater: CheckItem;
  stereo: CheckItem;
  powerWindows: CheckItem;
  powerLocks: CheckItem;
  seatBelts: CheckItem;
};

export type MechanicalChecklist = {
  notes: string | number | readonly string[] | undefined;
  engine: CheckItem;
  transmission: CheckItem;
  brakes: CheckItem;
  suspension: CheckItem;
  steering: CheckItem;
  exhaust: CheckItem;
  battery: CheckItem;
  electrical: CheckItem;
  fluidLevels: CheckItem;
  leaks: CheckItem;
  cooling: CheckItem;
  startupOperation: CheckItem;
};

export type PhotoEntry = {
  id: string;
  label: string;
  url: string;
  description: string;
};

export type Inspection = {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  vehicleInfo: VehicleInfo;
  exterior: ExteriorChecklist;
  interior: InteriorChecklist;
  mechanical: MechanicalChecklist;
  photos: PhotoEntry[];
  additionalNotes: string;
  recommendedActions: string;
  overallCondition: 'excellent' | 'good' | 'fair' | 'poor';
  inspectorNotes: string;
  reportUrl?: string;
};

export type InspectionContextType = {
  currentInspection: Partial<Inspection> | null;
  isLoading: boolean;
  error: string | null;
  initializeInspection: () => void;
  updateVehicleInfo: (info: VehicleInfo) => void;
  updateExterior: (checklist: ExteriorChecklist) => void;
  updateInterior: (checklist: InteriorChecklist) => void;
  updateMechanical: (checklist: MechanicalChecklist) => void;
  addPhoto: (photo: PhotoEntry) => void;
  removePhoto: (photoId: string) => void;
  updateAdditionalNotes: (notes: string) => void;
  updateRecommendedActions: (actions: string) => void;
  updateOverallCondition: (condition: 'excellent' | 'good' | 'fair' | 'poor') => void;
  updateInspectorNotes: (notes: string) => void;
  saveInspection: () => Promise<string>;
  generateReport: () => Promise<string>;
};

// Add the missing types here
export type InspectionFilters = {
  vehicleInfo?: Partial<VehicleInfo>;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  status?: 'active' | 'completed';
};

export type InspectionPhoto = {
  id: string;
  url: string;
  label: string;
  description: string;
};

export type InspectionFormData = {
  vehicleInfo: VehicleInfo;
  exterior: ExteriorChecklist;
  interior: InteriorChecklist;
  mechanical: MechanicalChecklist;
  photos: PhotoEntry[];
  additionalNotes: string;
  recommendedActions: string;
  overallCondition: 'excellent' | 'good' | 'fair' | 'poor';
  inspectorNotes: string;
};


export type ExteriorInfo = {
  bodyCondition: 'excellent' | 'good' | 'fair' | 'poor' | 'damaged';
  paintCondition: 'excellent' | 'good' | 'fair' | 'poor' | 'damaged';
  glassCondition: 'excellent' | 'good' | 'fair' | 'poor' | 'damaged';
  lightsCondition: 'excellent' | 'good' | 'fair' | 'poor' | 'damaged';
  tiresCondition: 'excellent' | 'good' | 'fair' | 'poor' | 'damaged';
  wheelsCondition: 'excellent' | 'good' | 'fair' | 'poor' | 'damaged';
  notes: string;
};


// inspection.types.ts

export type PhotoData = {
  id: string;
  imageData: string; // Base64 or image URL
  category: 'exterior' | 'interior' | 'mechanical' | 'damage' | 'other';
  description: string;
};
