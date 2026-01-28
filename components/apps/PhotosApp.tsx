
import React, { useState } from 'react';
import { PROJECTS } from '../../constants';

const PhotosApp: React.FC = () => {
  const allPhotos = PROJECTS.flatMap(p => p.images.map(img => ({ url: img, project: p.name })));
  const [activePhoto, setActivePhoto] = useState<typeof allPhotos[0] | null>(null);

  return (
    <div className="h-full bg-black p-4">
      {activePhoto ? (
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 font-medium">{activePhoto.project}</span>
            <button onClick={() => setActivePhoto(null)} className="text-sm px-4 py-1 bg-white/10 hover:bg-white/20 rounded">Back to Gallery</button>
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <img src={activePhoto.url} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" alt="Preview" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto h-full content-start">
          {allPhotos.map((photo, i) => (
            <div 
              key={i} 
              className="aspect-square rounded-lg overflow-hidden border border-white/10 cursor-pointer group hover:ring-2 hover:ring-orange-500 transition-all"
              onClick={() => setActivePhoto(photo)}
            >
              <img src={photo.url} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt="Robotics Project" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotosApp;
