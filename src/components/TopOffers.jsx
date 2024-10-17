import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TopOffers = ({ offers = [] }) => {
  return (
    <div className="mb-8 rounded-lg bg-white p-4 shadow-md sm:p-6">
      <h2 className="mb-4 text-xl font-bold sm:text-2xl">TOP OFFERS</h2>
      <div className="relative flex items-center justify-center">
        <button className="absolute left-0 rounded-full bg-white p-1 shadow-md sm:p-2">
          <FaChevronLeft className="text-sm sm:text-base" />
        </button>
        <div className="flex space-x-2 sm:space-x-4">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="h-36 w-24 rounded-lg bg-blue-900 sm:h-48 sm:w-32"
            ></div>
          ))}
        </div>
        <button className="absolute right-0 rounded-full bg-white p-1 shadow-md sm:p-2">
          <FaChevronRight className="text-sm sm:text-base" />
        </button>
      </div>
    </div>
  );
};

export default TopOffers;
