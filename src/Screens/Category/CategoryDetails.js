
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CategoryDetails() {
  const { categoryName } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://localhost:5180/api/Categories?name=${categoryName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch category');
        }
        const data = await response.json();
        const foundCategory = data.find(cat => cat.name === categoryName);
        setCategory(foundCategory);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCategory();
  }, [categoryName]);

  if (!category) {
    return <div>Loading...</div>; 
  }
    

  return (
    <div className="container mx-auto py-8">
       <div className="bg-cover bg-center h-64 flex items-center justify-center" style={{ backgroundImage: `url(${category.imageUrl})` }}>
          <div className="text-white">
          <h1 className="text-4xl font-semibold">{category.name}</h1>
          <p className="text-lg">{category.shortDescription}</p>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Contents</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Render video cards here if category.videos is defined */}
          {category.videos && category.videos.map(video => (
            <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  title={video.title}
                  src={video.embedUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
                <p className="text-gray-600">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryDetails;
