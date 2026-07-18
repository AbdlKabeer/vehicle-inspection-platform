

// ReportEditor.tsx
import React, { useState } from 'react';
import { useInspection } from '../../hooks/useInspection';

const ReportEditor: React.FC = () => {
  const { currentInspection, updateInspection } = useInspection();
  const [editedInspection, setEditedInspection] = useState(currentInspection);
  
  if (!currentInspection) {
    return <div className="text-center py-12">No inspection selected</div>;
  }
  
  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedInspection({
      ...editedInspection,
      summary: e.target.value
    });
  };
  
  const handlePhotoChange = (index: number, caption: string) => {
    const updatedPhotos = [...editedInspection.photos];
    updatedPhotos[index] = {
      ...updatedPhotos[index],
      caption
    };
    
    setEditedInspection({
      ...editedInspection,
      photos: updatedPhotos
    });
  };
  
  const handleSave = () => {
    updateInspection(editedInspection);
  };
  
  return (
    <div className="bg-white rounded-lg shadow my-6 mx-auto max-w-4xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Edit Report</h2>
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
      
      {/* Summary Editor */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-2">Summary & Recommendations</h3>
        <textarea
          value={editedInspection.summary}
          onChange={handleSummaryChange}
          className="w-full h-40 border rounded-lg p-3 text-gray-700"
          placeholder="Enter summary and recommendations..."
        />
      </div>
      
      {/* Photo Captions Editor */}
      // ReportEditor.tsx (continued)
      {/* Photo Captions Editor */}
      <div>
        <h3 className="font-bold text-lg mb-4">Photo Captions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {editedInspection.photos.map((photo, index) => (
            <div key={index} className="flex items-start">
              <div className="w-24 h-24 flex-shrink-0 mr-4">
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="h-full w-full object-cover rounded-lg" 
                />
              </div>
              <div className="flex-grow">
                <input
                  type="text"
                  value={photo.caption}
                  onChange={(e) => handlePhotoChange(index, e.target.value)}
                  className="w-full border rounded-lg p-2 text-gray-700"
                  placeholder="Add caption..."
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportEditor;