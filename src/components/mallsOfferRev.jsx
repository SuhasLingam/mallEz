import React from "react";
import Button from "./button";

const MallOffersRev = ({ title, description, image, buttonText }) => {
  return (
    <div className="container pb-[50px] md:pb-[150px]">
      <div className="bg-mainBackgroundColor rounded-3xl border-opacity-10 relative flex flex-col w-full h-full m-auto border-2 border-black shadow-xl">
        <div className="flex items-center justify-start w-auto">
          <img className="scale-x-[-1]" src={image} alt="mallsImage" />
        </div>

        {/* Title and Button */}
        <div className="absolute top-11 right-4 md:right-[120px] mr-4 md:mr-11 flex md:flex-row flex-col gap-5 md:gap-10 items-center z-10">
          <p className="p-3 px-4 text-lg font-bold shadow-inner text-mainTextColor bg-white bg-opacity-50 stroke-black rounded-full md:p-4 md:px-[80px] md:text-3xl">
            {title}
          </p>
          <Button text={buttonText} redirectTo={"/"} />
        </div>

        {/* Description */}
        <div className="absolute bottom-[-30px] md:bottom-[-60px] right-4 md:right-[70px] h-auto md:h-[350px] w-[90%] md:w-[700px] rounded-[30px] md:rounded-[100px] flex items-center justify-center p-5 md:p-11 ring-4 ring-black ring-opacity-5 drop-shadow-2xl bg-mainBackgroundColor shadow-3xl">
          <p className="font-inter md:text-2xl text-sm text-center">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MallOffersRev;
