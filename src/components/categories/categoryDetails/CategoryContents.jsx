import React from 'react';
import { Link } from 'react-router-dom';

const CategoryContents = ({ filteredVideoPosts, category }) => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-end mb-4">
        {/* Search input and button can be moved here */}
      </div>
      <h3 className="text-2xl font-semibold mb-4 tracking-wide">Contents</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-7">
        {filteredVideoPosts.map(video => (
          <Link key={video.id} to={`/video/${video.id}`}>
            <div className="rounded-lg overflow-hidden h-full">
              <img src={video.imageUrl} alt={video.title} className="w-full h-40 object-cover" />
              <div className="p-2">
                <h2 className="text-l font-semibold mb-2 text-gray-800">{video.title}</h2>
                <p className="text-gray-600 text-lg">{video.shortDescription}</p>
              </div>
            </div>

          
          </Link>

          
        ))}
      </div>
      
      <div className="text-gray-800 mt-8">
        <p>{category.description}</p>
        
      </div>

      
    </div>

    
  );
};

export default CategoryContents;
