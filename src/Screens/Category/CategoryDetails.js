import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CategoryDetails() {
  const { categoryId } = useParams(); 
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://localhost:5180/api/Categories/${categoryId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch category (${response.status} ${response.statusText})`);
        }
        const categoryData = await response.json();
        setCategory(categoryData);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCategory();
  }, [categoryId]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {category && (
        <>
          <div className="bg-cover bg-center h-96 flex items-center" style={{ backgroundImage: `url(${category.imageUrl})` }}>
            <div className="text-white mx-auto w-4/5">
              <div className="w-3/5">
                <h1 className="text-4xl font-semibold text-white-800">{category.name}</h1>
                <p className="text-lg mt-2 text-white-800">{category.shortDescription}</p>
              </div>
            </div>
          </div>
          <div className="container mx-auto py-8">
            <h3 className="text-2xl font-semibold mb-4 tracking-wide">Contents</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-7">
              {category.videoPosts.map(video => (
                <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={video.imageUrl} alt={video.title} className="w-full h-96 object-cover" />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">{video.title}</h2>
                    <p className="text-gray-600 text-lg">{video.shortDescription}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-gray-800 mt-8">
              <p>{category.description}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CategoryDetails;
