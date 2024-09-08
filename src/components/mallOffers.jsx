import React from "react";
import Button from "./button";
import mallVector from "../assets/mallVector.svg";

const mallOffers = () => {
  return (
    <div className=" container pb-[150px]">
      <div className="bg-mainBackgroundColor rounded-3xl border-opacity-10 relative flex flex-col w-full h-full m-auto border-2 border-black shadow-xl">
        <div className="w-max top-[5rem] left-[65px] absolute flex flex-row gap-10">
          <p className="w-max ml-[80px] p-4 px-[100px] text-3xl font-bold shadow-inner text-mainTextColor bg-white bg-opacity-50 stroke-black  rounded-full">
            VR Chain
          </p>
          <Button text={"EXPLORE"} redirectTo={"/"} />
        </div>

        <div className=" flex items-center justify-end w-auto">
          <img src={mallVector} alt="mallsImage" />
        </div>

        <div className="absolute -bottom-[60px] left-[70px] h-[350px] w-[700px] rounded-[100px] flex items-center justify-center p-11 ring-4 ring-black ring-opacity-5 drop-shadow-2xl bg-mainBackgroundColor  shadow-3xl">
          <p className="font-inter text-2xl text-center">
            VR Malls are redefining the shopping and entertainment landscape
            across India, offering a seamless blend of luxury, convenience, and
            culture. With six iconic locations—Bengaluru, Chennai, Surat,
            Punjab, Nagpur, and Amritsar—each VR Mall provides a unique
            experience while maintaining the high standards that the VR brand is
            known for.
          </p>
        </div>
      </div>
    </div>
  );
};

export default mallOffers;
