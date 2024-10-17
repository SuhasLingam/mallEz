import React from "react";

const CityImage = ({ cityName, imageUrl }) => {
  return (
    <div className="relative mb-8">
      <div className="h-64 overflow-hidden sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Image of ${cityName}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-blue-200">
            <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Image of the city
            </h1>
          </div>
        )}
      </div>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <div className="flex flex-col items-center rounded-full bg-white shadow-md sm:flex-row">
          <span className="px-4 py-2 text-sm font-semibold sm:text-base md:text-lg">
            {cityName}
          </span>
          <input
            type="text"
            placeholder="SEARCH STORE"
            className="w-full rounded-full px-4 py-2 text-sm focus:outline-none sm:w-auto sm:text-base md:text-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default CityImage;
