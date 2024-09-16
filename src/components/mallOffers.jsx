import React from "react";
import Button from "./button";

const MallOffers = ({ title, description, image, buttonText }) => {
  return (
    <div className="container pb-[50px] md:pb-[150px]">
      <div className="bg-mainBackgroundColor rounded-3xl border-opacity-10 relative flex flex-col w-full h-auto p-6 m-auto border-2 border-black shadow-xl">
        
        {/* Title and Button */}
        <div className="absolute top-6 md:top-[5rem] left-6 md:left-[150px] flex flex-col md:flex-row gap-5 md:gap-10 items-center z-10">
          <p className="p-3 md:p-4 px-4 md:px-[80px] text-lg md:text-3xl font-bold shadow-inner text-mainTextColor bg-white bg-opacity-50 stroke-black rounded-full">
            {title}
          </p>
          <Button text={buttonText} redirectTo={"/"} />
        </div>

        {/* Image Section */}
       <div className="md:justify-end flex items-center justify-start w-auto">
          <img className="" src={image} alt="mallsImage" />
        </div>

        {/* Description */}
        <div className="absolute bottom-[-30px] md:bottom-[-60px] left-4 md:left-[70px] w-[90%] md:w-[700px] h-auto rounded-[30px] md:rounded-[100px] flex items-center justify-center p-5 md:p-[70px] ring-4 ring-black ring-opacity-5 drop-shadow-2xl bg-mainBackgroundColor shadow-3xl">
          <p className="font-inter md:text-2xl text-sm text-center">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MallOffers;
