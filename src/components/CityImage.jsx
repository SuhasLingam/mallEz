import React from "react";

const CityImage = ({ cityName, imageUrl }) => {
  return (
    <div className="relative mx-auto mb-8 max-w-7xl px-4">
      <div className="h-64 overflow-hidden rounded-2xl shadow-lg sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Image of ${cityName}`}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
            <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              {cityName}
            </h1>
          </div>
        )}
      </div>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <div className="rounded-full bg-white bg-opacity-80 px-6 py-3 shadow-md backdrop-blur-sm">
          <span className="text-sm font-semibold text-gray-800 sm:text-base md:text-lg">
            {cityName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CityImage;
