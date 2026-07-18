// NewInspectionPage.tsx
import React from 'react';
import Footer from '../components/layout/Footer';
import InspectionForm from '../components/inspection/InspectionForm';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';

const NewInspectionPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">New Vehicle Inspection</h1>
            <InspectionForm />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default NewInspectionPage;