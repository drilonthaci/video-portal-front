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
      <div className="bg-main py-10 sm:py-5">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto mt-10 grid max-w-lg grid-cols-5 sm:max-w-xl sm:grid-cols-5 sm:gap-x-6 lg:mx-0 lg:max-w-none lg:grid-cols-5 gap-x-4 gap-y-6">
      <div className="col-span-1 flex justify-center items-center">
        <img src="/images/aNet.webp" alt="aNet Image" className="h-5" />
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <img src="/images/gjirafa.webp" alt="/images/gjirafa.webp" className="h-5" />
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <img src="/images/gjirafa50.webp" alt="/images/gjirafa50.webp" className="h-5" />
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <img src="/images/gjirafapikbiz.webp" alt="/images/gjirafapikbiz.webp" className="h-5" />
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <img src="/images/lab.webp" alt="lab.webp" className="h-5" />
      </div>
    </div>
  </div>
</div>
      <Footer /> 
    </div>
  );
};

export default CategoryListPage;
