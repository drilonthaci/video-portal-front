import React, { useState, useEffect } from 'react';
import CategoryGrid from '../../components/categories/categoriesList/CategoryGrid';
import Footer from '../../components/layout/footer/Footer';
import { variables } from '../../Variables';

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch(`${variables.API_URL}/Categories`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto mt-8 flex-grow">
        <CategoryGrid categories={categories} />
      </div>
      <Footer /> 
    </div>
  );
};

export default CategoryListPage;
