import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <div key={category.id}>
      <Link to={`/category/${encodeURIComponent(category.id)}`} className="block relative transition-transform duration-300 transform hover:scale-95">
        <div className="absolute inset-0 bg-gray-900 opacity-50" />
        <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 pb-2 text-center">
          <h2 className="text-lg font-semibold text-white">{category.name}</h2>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
