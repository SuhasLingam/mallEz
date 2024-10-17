import React from "react";

const CategorySearch = ({ categories }) => {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-bold sm:text-2xl">
        Search by categories
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md"
          >
            <div className="mb-2 h-12 w-12 rounded-lg bg-gray-200 sm:h-16 sm:w-16"></div>
            <span className="text-center text-sm font-semibold sm:text-base">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySearch;
