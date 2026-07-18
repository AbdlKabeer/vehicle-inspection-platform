import { api } from './api';
import { User, LoginCredentials, RegisterData, OnboardingData } from '../types/auth.types';

export const authService = {
  // Login with email and password
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<{ user: User; token: string }>('/login/', credentials);
    localStorage.setItem('auth_token', response.data.token);
    return response.data;
  },
  
  // Register a new user
  register: async (userData: RegisterData) => {
    const response = await api.post<{ user: User; token: string }>('/auth/register', userData);
    localStorage.setItem('auth_token', response.data.token);
    return response.data;
  },
  
  // Complete onboarding (company details, logo, etc.)
  completeOnboarding: async (onboardingData: OnboardingData) => {
    const formData = new FormData();
    
    // Add text fields
    Object.entries(onboardingData).forEach(([key, value]) => {
      if (key !== 'logo' && key !== 'signature') {
        formData.append(key, value as string);
      }
    });
    
    // Add logo file if provided
    if (onboardingData.logo instanceof File) {
      formData.append('logo', onboardingData.logo);
    }
    
    // Add signature file if provided
    if (onboardingData.signature instanceof File) {
      formData.append('signature', onboardingData.signature);
    }
    
    const response = await api.post<{ user: User }>('/auth/onboarding', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },
  
  // Get current user profile
  getCurrentUser: async () => {
    const response = await api.get<{ user: User }>('/auth/me');
    return response.data.user;
  },
  
  // Update user profile
  updateProfile: async (userData: Partial<User>) => {
    const response = await api.put<{ user: User }>('/auth/profile', userData);
    return response.data.user;
  },
  
  // Update company profile
  updateCompanyProfile: async (companyData: any) => {
    const formData = new FormData();
    
    // Add text fields
    Object.entries(companyData).forEach(([key, value]) => {
      if (key !== 'logo' && key !== 'signature') {
        formData.append(key, value as string);
      }
    });
    
    // Add logo file if provided
    if (companyData.logo instanceof File) {
      formData.append('logo', companyData.logo);
    }
    
    // Add signature file if provided
    if (companyData.signature instanceof File) {
      formData.append('signature', companyData.signature);
    }
    
    const response = await api.put<{ user: User }>('/auth/company', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.user;
  },
  
  // Logout user
  logout: () => {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  },
};

export default authService;