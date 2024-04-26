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

export default CategoryDetailsPage;