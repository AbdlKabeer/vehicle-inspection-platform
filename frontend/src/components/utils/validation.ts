export const validation = {
    // Email validation
    isValidEmail: (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    
    // Password validation (min 8 chars, at least 1 number, 1 uppercase, 1 lowercase)
    isValidPassword: (password: string): boolean => {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return passwordRegex.test(password);
    },
    
    // Phone number validation
    isValidPhone: (phone: string): boolean => {
      const phoneRegex = /^\+?[0-9]{10,15}$/;
      return phoneRegex.test(phone);
    },
    
    // Required field validation
    isRequired: (value: any): boolean => {
      if (typeof value === 'string') {
        return value.trim().length > 0;
      }
      return value !== null && value !== undefined;
    },
    
    // VIN (Vehicle Identification Number) validation
    isValidVIN: (vin: string): boolean => {
      // VIN is alphanumeric and typically 17 characters
      const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
      return vinRegex.test(vin);
    },
    
    // License plate validation (basic)
    isValidLicensePlate: (plate: string): boolean => {
      return plate.trim().length >= 2 && plate.trim().length <= 12;
    },
    
    // Year validation (for vehicle year)
    isValidYear: (year: number): boolean => {
      const currentYear = new Date().getFullYear();
      return year >= 1900 && year <= currentYear + 1; // Allow next year's models
    },
    
    // Mileage validation
    isValidMileage: (mileage: number): boolean => {
      return mileage >= 0 && mileage <= 10000000; // Reasonable upper limit
    },
    
    // URL validation
    isValidUrl: (url: string): boolean => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    },
    
    // Company name validation
    isValidCompanyName: (name: string): boolean => {
      return name.trim().length >= 2 && name.trim().length <= 100;
    },
    
    // File size validation (in MB)
    isValidFileSize: (file: File, maxSizeMB: number): boolean => {
      return file.size <= maxSizeMB * 1024 * 1024;
    },
    
    // File type validation
    isValidFileType: (file: File, allowedTypes: string[]): boolean => {
      return allowedTypes.includes(file.type);
    },
    
    // Form validation helper that returns errors object
    validateForm: (values: Record<string, any>, rules: Record<string, (value: any) => boolean>) => {
      const errors: Record<string, string> = {};
      
      Object.entries(rules).forEach(([field, rule]) => {
        if (values[field] !== undefined && !rule(values[field])) {
          errors[field] = `Invalid ${field}`;
        }
      });
      
      return errors;
    }
  };
  
  export default validation;