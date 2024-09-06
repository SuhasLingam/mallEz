import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import herobgtwo from "../assets/homebg-2.svg";
import homeImageTwo from "../assets/homeElement-2.svg";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  exit: { opacity: 0, y: 50, transition: { duration: 0.5 } },
};
const fadeInleft = {
  hidden: { opacity: 0, x: -400 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  exit: { opacity: 0, x: -400, transition: { duration: 0.5 } },
};

const fadeText = {
  hidden: { opacity: 0, x: 400 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  exit: { opacity: 0, x: 400, transition: { duration: 0.5 } },
};

const HeroTwo = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className=" w-full h-full"
      style={{
        backgroundImage: width < 768 ? "none" : `url(${herobgtwo})`,
        height: "100%",
        backgroundSize: "cover",
      }}
    >
      <div className="container pt-[20px] px-2 md:px-0">
        <div className="md:flex-row md:justify-between relative flex flex-col h-screen">
          {/* Hero Image Section */}
          <motion.div
            className="w-full mt-9 md:mt-0 md:-bottom-10 md:w-[750px] md:ml-[120px] md:absolute left-0 flex justify-center"
            variants={width < 768 ? fadeInUp : fadeInleft}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            viewport={{ once: false, amount: 0.2 }}
          >
            <img
              src={homeImageTwo}
              alt="hero Image"
              className="w-[320px] md:w-auto"
            />
          </motion.div>

          {/* Hero Text Section */}
          <motion.div
            className="z-10 px-4 absolute bottom-[80px] p-4 m-auto rounded-3xl md:backdrop-blur-[10px] font-poppins md:shadow-2xl md:p-6 md:rounded-3xl md:bg-transparent w-full md:w-[650px] text-center md:text-center flex flex-col items-center md:items-center space-y-6 font-medium text-black text-[20px] md:text-[30px] md:absolute md:top-[120px] md:right-[100px]"
            variants={width < 768 ? fadeInUp : fadeText}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            viewport={{ once: false, amount: 0.2 }}
          >
            <p className="m-auto">
              MallEZ is your all-in-one shopping companion that revolutionizes
              the way you navigate, shop, and park at your favorite malls. With
              features like smart mall navigation, personalized shopping
              experiences, and automated parking solutions, MallEZ simplifies
              and enhances your mall visits.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroTwo;
