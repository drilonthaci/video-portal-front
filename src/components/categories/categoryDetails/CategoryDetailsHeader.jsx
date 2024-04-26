import React from 'react';

const CategoryDetailsHeader = ({ category }) => {
  return (
    <div className="bg-cover bg-center h-96 flex items-center" style={{ backgroundImage: `url(${category.imageUrl})` }}>
      <div className="text-white mx-auto w-4/5">
        <div className="w-3/5">
          <h1 className="text-4xl font-semibold text-white">{category.name}</h1>
          <p className="text-lg mt-2 text-white">{category.shortDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailsHeader;
