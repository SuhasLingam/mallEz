import React from "react";
import Button from "./button";

const MallOffers = ({
  title,
  description,
  image,
  buttonText,
  redirectDirectory,
}) => {
  return (
    <div className="sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12 container px-4 py-6">
      <div className="rounded-xl border-opacity-10 bg-mainBackgroundColor sm:flex-row flex flex-col overflow-hidden border border-black shadow-md">
        {/* Image Section */}
        <div className="sm:h-auto sm:w-1/2 lg:w-3/5 w-full h-56">
          <img
            className="object-cover w-full h-full"
            src={image}
            alt="mallsImage"
          />
        </div>

        {/* Content Section */}
        <div className="sm:w-1/2 lg:w-2/5 flex flex-col justify-between w-full p-6">
          <div>
            <h3 className="text-mainTextColor sm:text-4xl md:text-5xl lg:text-6xl mb-4 text-3xl font-bold leading-tight">
              {title}
            </h3>
            <p className="sm:text-xl md:text-xl mb-6 text-lg font-semibold leading-relaxed">
              {description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="sm:text-2xl md:text-3xl text-xl font-semibold text-gray-600">
              VR Chain
            </span>
            <Button text={buttonText} redirectTo={redirectDirectory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MallOffers;
