import React from "react";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-blue-100 py-16">
      <div className="bg-white bg-opacity-30 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-800">
          NAVIGATE, SHOP AND PARK WITH EASE
        </h1>
      </div>
      <div className="mt-8 flex space-x-4">
        <button className="bg-white hover:bg-gray-100 text-blue-800 font-bold py-2 px-4 rounded-full shadow">
          LOGIN
        </button>
        <button className="bg-white hover:bg-gray-100 text-blue-800 font-bold py-2 px-4 rounded-full shadow">
          Sign Up
        </button>
      </div>
      <div className="mt-12">
        <img
          src="/path/to/your/mall-image.png"
          alt="Mall and Parking"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default HeroSection;
