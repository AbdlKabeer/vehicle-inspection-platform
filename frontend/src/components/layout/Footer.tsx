import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © {currentYear} Vehicle Inspection Platform. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="/terms" className="text-gray-600 hover:text-blue-600 text-sm">
              Terms of Service
            </a>
            <a href="/privacy" className="text-gray-600 hover:text-blue-600 text-sm">
              Privacy Policy
            </a>
            <a href="/contact" className="text-gray-600 hover:text-blue-600 text-sm">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
