import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { variables } from '../../Variables';
import CategoryContents from '../../components/categories/categoryDetails/CategoryContents';
import CategoryDetailsHeader from '../../components/categories/categoryDetails/CategoryDetailsHeader';
import Footer from '../../components/layout/footer/Footer';

const CategoryDetailsPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [filteredVideoPosts, setFilteredVideoPosts] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${variables.API_URL}/Categories/${categoryId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch category (${response.status} ${response.statusText})`);
        }
        const categoryData = await response.json();
        setCategory(categoryData);
        setFilteredVideoPosts(categoryData.videoPosts); 
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
          <CategoryDetailsHeader category={category} />
          <CategoryContents filteredVideoPosts={filteredVideoPosts} category={category} />
        </>
      )}
      <Footer />
    </div>
  );
};

export default CategoryDetailsPage;