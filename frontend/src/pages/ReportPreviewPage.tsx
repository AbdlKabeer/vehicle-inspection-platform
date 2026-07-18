import React from 'react';
import Footer from '../components/layout/Footer';
import ReportPreview from '../components/report/ReportPreview';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';

const ReportPreviewPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          <ReportPreview />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ReportPreviewPage;