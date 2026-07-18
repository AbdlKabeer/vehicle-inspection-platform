// src/components/auth/OnboardingForm.tsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const OnboardingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [signatureImage, setSignatureImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { completeOnboarding, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name , value )
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'logo' | 'signature') => {
    if (e.target.files && e.target.files[0]) {
      if (fileType === 'logo') {
        setCompanyLogo(e.target.files[0]);
      } else {
        setSignatureImage(e.target.files[0]);
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate phone number
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    
    // Validate address
    if (!formData.address) {
      newErrors.address = 'Address is required';
    }
    
    // Validate city
    if (!formData.city) {
      newErrors.city = 'City is required';
    }
    
    // Validate state
    if (!formData.state) {
      newErrors.state = 'State is required';
    }
    
    // Validate zip code
    if (!formData.zipCode) {
      newErrors.zipCode = 'ZIP code is required';
    }
    
    // Validate country
    if (!formData.country) {
      newErrors.country = 'Country is required';
    }
    
    // Validate company logo
    if (!companyLogo) {
      newErrors.companyLogo = 'Company logo is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await completeOnboarding({
        ...formData,
        companyLogo,
        signatureImage,
      });
      // navigate('/dashboard');
    } catch (err) {
      console.error('Onboarding failed:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <h3 className="text-lg font-medium mb-4">Company Information</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Logo <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <div className="flex-shrink-0 h-20 w-20 bg-gray-100 rounded-md overflow-hidden">
              {companyLogo ? (
                <img
                  src={URL.createObjectURL(companyLogo)}
                  alt="Company logo preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-400">
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
              )}
            </div>
            <div className="ml-5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('company-logo-input')?.click()}
              >
                Upload Logo
              </Button>
              <input
                id="company-logo-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, 'logo')}
              />
              <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 5MB</p>
              {errors.companyLogo && <p className="mt-1 text-sm text-red-600">{errors.companyLogo}</p>}
            </div>
          </div>
        </div>
        
        <Input
          id="phoneNumber"
          label="Phone Number"
          name='phoneNumber'
          value={formData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          required
        />
        
        <Input
          id="address"
          label="Address"
          name='address'
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
          required
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="city"
            label="City"
            name='city'
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
            required
          />
          
          <Input
            id="state"
            name="state"
            label="State/Province"
            value={formData.state}
            onChange={handleChange}
            error={errors.state}
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="zipCode"
            label="ZIP/Postal Code"
            name='zipCode'
            value={formData.zipCode}
            onChange={handleChange}
            error={errors.zipCode}
            required
          />
          
          <Input
            id="country"
            label="Country"
            name='country'
            value={formData.country}
            onChange={handleChange}
            error={errors.country}
            required
          />
        </div>
        
        {/* <h3 className="text */}
        <h3 className="text-lg font-medium mb-4 mt-6">Signature</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Digital Signature
          </label>
          <div className="flex items-center">
            <div className="flex-shrink-0 h-20 w-40 bg-gray-100 rounded-md overflow-hidden">
              {signatureImage ? (
                <img
                  src={URL.createObjectURL(signatureImage)}
                  alt="Signature preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-400">
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="ml-5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('signature-image-input')?.click()}
              >
                Upload Signature
              </Button>
              <input
                id="signature-image-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, 'signature')}
              />
              <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 5MB</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            Complete Setup
          </Button>
        </div>
      </form>
    </div>
  );
};