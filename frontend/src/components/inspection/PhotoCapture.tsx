import React, { useRef, useState } from 'react';
import {Button} from '../ui/Button';
import { PhotoData } from '../../types/inspection.types';

interface PhotoCaptureProps {
  data: PhotoData[];
  updateData: (data: PhotoData[]) => void;
}

type PhotoCategory = 'exterior' | 'interior' | 'mechanical' | 'damage' | 'other';

const PhotoCapture: React.FC<PhotoCaptureProps> = ({ data, updateData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<PhotoCategory>('exterior');
  const [description, setDescription] = useState('');

  const handleCaptureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Process each file
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto: PhotoData = {
          id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
          imageData: e.target?.result as string,
          category,
          description
        };
        updateData([...data, newPhoto]);
        setDescription('');
      };
      reader.readAsDataURL(file);
    });

    // Clear the input
    e.target.value = '';
  };

  const handleDeletePhoto = (id: string) => {
    updateData(data.filter(photo => photo.id !== id));
  };

  const categoryOptions: { value: PhotoCategory; label: string }[] = [
    { value: 'exterior', label: 'Exterior' },
    { value: 'interior', label: 'Interior' },
    { value: 'mechanical', label: 'Mechanical' },
    { value: 'damage', label: 'Damage' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Vehicle Photos</h2>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as PhotoCategory)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categoryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the photo"
            />
          </div>
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          capture="environment"
          multiple
          className="hidden"
        />
        
        <Button
          onClick={handleCaptureClick}
          variant="primary"
          className="w-full md:w-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          Take Photo
        </Button>
      </div>
      
      {/* Photo Gallery */}
      <div>
        <h3 className="text-lg font-medium mb-2">Captured Photos ({data.length})</h3>
        {data.length === 0 ? (
          <p className="text-gray-500 italic">No photos captured yet</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map(photo => (
              <div key={photo.id} className="relative group">
                <img 
                  src={photo.imageData} 
                  alt={photo.description || `Photo ${photo.id}`}
                  className="w-full h-32 object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="bg-red-600 text-white p-1 rounded-full"
                    title="Delete photo"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="mt-1 text-xs">
                  <span className="font-medium">{categoryOptions.find(c => c.value === photo.category)?.label}</span>
                  {photo.description && <p className="truncate">{photo.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoCapture;