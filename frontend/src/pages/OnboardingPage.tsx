// OnboardingPage.tsx
import React from 'react';
import { OnboardingForm } from '../components/auth/OnboardingForm';

const OnboardingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Complete Your Profile</h1>
          <p className="text-gray-600">We need a few more details to set up your inspection platform</p>
        </div>
        <OnboardingForm />
      </div>
    </div>
  );
};

export default OnboardingPage;