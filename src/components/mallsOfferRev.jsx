import React from "react";
import Button from "./button";

const MallOffersRev = ({
  title,
  description,
  image,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="container px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
      <div className="flex flex-col-reverse overflow-hidden rounded-xl border border-black border-opacity-10 bg-mainBackgroundColor shadow-md sm:flex-row">
        {/* Content Section */}
        <div className="flex w-full flex-col justify-between p-6 sm:w-1/2 lg:w-2/5">
          <div>
            <h3 className="mb-4 text-3xl font-bold leading-tight text-mainTextColor sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
            </h3>
            <p className="mb-6 text-lg font-semibold leading-relaxed sm:text-xl md:text-xl">
              {description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-gray-600 sm:text-2xl md:text-3xl">
              VR Chain
            </span>
            <Button text={buttonText} onClick={onButtonClick} />
          </div>
        </div>

        {/* Image Section */}
        <div className="h-56 w-full sm:h-auto sm:w-1/2 lg:w-3/5">
          <img
            className="h-full w-full object-cover"
            src={image}
            alt="mallsImage"
          />
        </div>
      </div>
    </div>
  );
};

export default MallOffersRev;
