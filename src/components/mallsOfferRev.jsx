import React from "react";
import Button from "./button";
import mallVector from "../assets/mallVector.svg";

const mallOffersRev = () => {
  return (
    <div className="container  pb-[150px]">
      <div className="bg-mainBackgroundColor rounded-3xl border-opacity-10 relative flex flex-col w-full h-full m-auto border-2 border-black shadow-xl">
        {/* Image on the left now */}
        <div className="flex items-center justify-start w-auto">
          <img className="scale-x-[-1]" src={mallVector} alt="mallsImage" />
        </div>

        {/* Text block and button on the right */}
        <div className="w-max top-[5rem] right-[120px] mr-11 absolute flex flex-row gap-10">
          <p className="w-max p-4 px-[80px] text-3xl font-bold shadow-inner text-mainTextColor bg-white bg-opacity-50 stroke-black  rounded-full">
            FORUM Chain
          </p>
          <Button text={"EXPLORE"} redirectTo={"/"} />
        </div>

        {/* Bottom text block */}
        <div className="absolute -bottom-[60px]  right-[70px] h-[350px] w-[700px] rounded-[100px] flex items-center justify-center p-11 ring-4 ring-black ring-opacity-5 drop-shadow-2xl bg-mainBackgroundColor shadow-3xl">
          <p className="font-inter text-2xl text-center">
            Forum Malls are vibrant spaces where fashion, food, and fun come
            together in perfect harmony. Spanning multiple cities across India,
            each Forum Mall offers a distinctive yet consistently exceptional
            experience, making it a beloved spot for shoppers and visitors
            alike.
          </p>
        </div>
      </div>
    </div>
  );
};

export default mallOffersRev;
