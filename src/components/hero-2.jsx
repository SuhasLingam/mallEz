import React, { useEffect, useState } from "react";
import herobgtwo from "../assets/homebg-2.svg";
import homeImageTwo from "../assets/homeElement-2.svg";

const HeroTwo = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="h-screen w-full"
      style={{
        backgroundImage: width < 768 ? "none" : `url(${herobgtwo})`,
        height: "100%",
        backgroundSize: "cover",
      }}
    >
      <div className="container pt-[80px] px-2 md:px-0">
        <div className="flex flex-col md:flex-row h-screen md:justify-between relative">
          {/** Hero Image Section */}
          <div className="w-full mt-9 md:mt-0 md:-bottom-10 md:w-[750px] md:ml-[120px] md:absolute left-0 flex justify-center">
            <img
              src={homeImageTwo}
              alt="hero Image"
              className="w-[300px] md:w-auto"
            />
          </div>
          {/** Hero Text Section */}
          <div className="z-10 px-4 absolute bottom-[100px] p-4 m-auto rounded-3xl md:backdrop-blur-[10px] font-poppins md:shadow-2xl md:p-6 md:rounded-3xl md:bg-transparent w-full md:w-[650px] text-center md:text-center flex flex-col items-center md:items-center space-y-6 font-medium text-black text-[20px] md:text-[30px] md:absolute md:top-[120px] md:right-[100px]">
            <p className="m-auto">
              MallEZ is your all-in-one shopping companion that revolutionizes
              the way you navigate, shop, and park at your favorite malls. With
              features like smart mall navigation, personalized shopping
              experiences, and automated parking solutions, MallEZ simplifies
              and enhances your mall visits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTwo;
