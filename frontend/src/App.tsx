import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { InspectionProvider } from './contexts/InspectionContext';


// Auth related hooks
// import { useAuth } from './hooks/useAuth';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import NewInspectionPage from './pages/NewInspectionPage';
import InspectionHistoryPage from './pages/InspectionHistoryPage';
import ReportPreviewPage from './pages/ReportPreviewPage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import CompanyProfilePage from './pages/CompanyProfilePage';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import { useAuth } from './hooks/useAuth';

// Private Route Component
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="spinner h-10 w-10 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? (
    <>
      {children}
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

// Onboarding Check
const OnboardingCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="spinner h-10 w-10 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // If user exists but hasn't completed onboarding, redirect to onboarding
  if (user && !user.isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

// Layout wrapper for authenticated pages
const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

// App Component
const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <InspectionProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Onboarding (authenticated but needs setup) */}
            <Route 
              path="/onboarding" 
              element={
                <PrivateRoute>
                  <OnboardingPage />
                </PrivateRoute>
              } 
            />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <OnboardingCheck>
                    <AuthenticatedLayout>
                      <DashboardPage />
                    </AuthenticatedLayout>
                  </OnboardingCheck>
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/inspections/new" 
              element={
                <PrivateRoute>
                  <OnboardingCheck>
                    <AuthenticatedLayout>
                      <NewInspectionPage />
                    </AuthenticatedLayout>
                  </OnboardingCheck>
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/inspections/history" 
              element={
                <PrivateRoute>
                  <OnboardingCheck>
                    <AuthenticatedLayout>
                      <InspectionHistoryPage />
                    </AuthenticatedLayout>
                  </OnboardingCheck>
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/reports/:reportId" 
              element={
                <PrivateRoute>
                  <OnboardingCheck>
                    <AuthenticatedLayout>
                      <ReportPreviewPage />
                    </AuthenticatedLayout>
                  </OnboardingCheck>
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/account/settings" 
              element={
                <PrivateRoute>
                  <OnboardingCheck>
                    <AuthenticatedLayout>
                      <AccountSettingsPage />
                    </AuthenticatedLayout>
                  </OnboardingCheck>
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/account/company" 
              element={
                <PrivateRoute>
                  <OnboardingCheck>
                    <AuthenticatedLayout>
                      <CompanyProfilePage />
                    </AuthenticatedLayout>
                  </OnboardingCheck>
                </PrivateRoute>
              } 
            />
            
            {/* Redirect root to dashboard if authenticated, otherwise to login */}
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <Navigate to="/dashboard" replace />
                </PrivateRoute>
              } 
            />
            
            {/* Catch all route - 404 */}
            <Route 
              path="*" 
              element={
                <div className="flex h-screen items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800">404</h1>
                    <p className="mt-2 text-lg text-gray-600">Page not found</p>
                    <button
                      onClick={() => window.history.back()}
                      className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              } 
            />
          </Routes>
        </InspectionProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;