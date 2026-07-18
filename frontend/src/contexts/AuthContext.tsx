import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AuthContextType, 
  User, 
  LoginCredentials, 
  RegisterCredentials, 
  OnboardingData 
} from '../types/auth.types';
import { authService } from '../services/auth';

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (err) {
        // User is not logged in, that's okay
        console.log('User not authenticated');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const userData = await authService.login(credentials);
      setUser(userData);
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const userData = await authService.register(credentials);
      setUser(userData);
    } catch (err) {
      setError('Registration failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async (info: OnboardingData) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedUser = await authService.completeOnboarding(info);
      setUser(updatedUser);
    } catch (err) {
      setError('Failed to complete onboarding. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
    } catch (err) {
      setError('Failed to logout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Call your authService's update user API endpoint
      const updatedUser = await authService.updateProfile(userData);
      
      setUser(updatedUser); // Update user in context with the response from the API
    } catch (err) {
      setError('Failed to update user. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    completeOnboarding,
    logout,
    error,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
