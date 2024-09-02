import React from "react";
import herobgtwo from "../assets/homebg-2.svg";
import homeImageTwo from "../assets/homeElement-2.svg";

const HeroTwo = () => {
  return (
    <div
      className="h-screen w-full"
      style={{
        backgroundImage: `url(${herobgtwo})`,
        height: "100%",
        backgroundSize: "100%",
      }}
    >
      <div className="container pt-[30px] px-2 md:px-0">
        <div className="flex flex-col md:flex-row h-screen md:justify-between relative">
          {/** Hero Image Section */}
          <div className="w-full  mt-0 md:mt-0 md:w-[750px] md:ml-[120px] md:absolute left-0 flex justify-center ">
            <img
              src={homeImageTwo}
              alt="hero Image"
              className="w-[300px] md:w-auto "
            />
          </div>
          {/** Hero Text Section */}
          <div className="z-10 px-4 absolute top-[150px] backdrop-blur-[10px] shadow-2xl bg-transparent p-4 m-auto rounded-3xl md:backdrop-blur-[10px] font-poppins md:shadow-2xl  md:p-6 md:rounded-3xl md:bg-transparent w-full md:w-[650px] text-center md:text-justify flex flex-col items-center md:items-center space-y-6 font-medium text-black text-[20px] md:text-[30px] md:absolute md:top-[120px] md:right-[100px]">
            <p>
              MallEZ is your all-in-one shopping companion that revolutionizes
              the way you navigate, shop, and park at your favorite malls. With
              features like smart mall navigation, personalized shopping
              experiences, and automated parking solutions, MallEZ simplifies
              and enhances your mall visits.
            </p>
          </div>
          <div className="md:absolute text-md px-3 absolute bottom-11 mx-auto md:bottom-4 md:text-xl italic text-mainTextColor md:left-11">
            ○ Imagine effortlessly navigating the mall during the busy holiday
            season, with MallEZ guiding you directly to <br /> your favorite
            stores and securing a parking spot just as you arrive. That's the
            power of MallEZ.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTwo;
