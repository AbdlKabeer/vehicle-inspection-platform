// src/types/auth.types.ts

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  companyLogo?: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isOnboarded: boolean;
  createdAt: string;
  companyEmail: string;
  companyWatermark: string;
  companyPhone: string;
  companyAddress: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  companyName: string;
};

export type OnboardingInfo = {
  companyLogo: File | null;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  signatureImage: File | null;
};






export interface Company {
  id: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  phone?: string;
  website?: string;
  logoUrl?: string;
  signatureUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface OnboardingData {
  companyName: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  phone?: string;
  website?: string;
  logo?: File;
  signature?: File;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  completeOnboarding: (data: OnboardingData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  updateCompanyProfile: (companyData: any) => Promise<void>;
  updateUser: (companyData: any) => Promise<void>;
  clearError: () => void;
}