
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
    <div>
      <p>Category Name: {category.name}</p>
      <p>Description: {category.shortDescription}</p>
      {category.imageUrl && (
        <img src={category.imageUrl} alt={category.name} style={{ maxWidth: '100%' }} />
      )}
    </div>
  );
}

export default CategoryDetails;
