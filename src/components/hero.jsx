import React from "react";
import HomeImage from "../assets/homeElement-1.svg";
import Button from "./button";

const HeroSection = () => {
  return (
    <div className="md:container pt-[60px] ">
      <div className="md:flex  h-screen md:justify-between md:relative">
        {/** Hero Text Section */}
        <div className="md:z-10 md:w-[650px] md:justify-center md:space-y-6 md:bg-transparent md:shadow-2xl md:font-semibold md:font-inter md:text-mainTextColor md:items-center md:flex md:flex-col md:text-[60px] md:h-[350px] md:absolute md:top-[120px] md:left-[100px] md:backdrop-blur-[7px] md:rounded-3xl">
          <p>NAVIGATE, SHOP</p>
          <p>AND</p>
          <p>PARK WITH EASE</p>
        </div>

        {/** Hero Image Section */}
        <div className="md:w-[750px] md:mr-[120px] md:right-0 md:absolute">
          <img src={HomeImage} alt="hero Image" />
        </div>

        {/** Buttons Section */}
        <div className="md:absolute md:bottom-[110px] md:left-[240px] md:space-x-6 flex justify-center">
          <Button text={"Login"} />
          <Button text={"SignUp"} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
