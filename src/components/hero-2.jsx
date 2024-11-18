import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
//import herobgtwo from "../assets/homebg-2.svg";
import homeImageTwo from "../assets/homeElement-2.svg";

const fadeInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  exit: { opacity: 0, x: -100, transition: { duration: 0.5, ease: "easeIn" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  exit: { opacity: 0, x: 100, transition: { duration: 0.5, ease: "easeIn" } },
};

const HeroTwo = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <div
      ref={ref}
      className="relative min-h-screen w-full bg-transparent p-4 sm:p-6 md:p-8 lg:p-12"
      style={
        {
          //  backgroundImage: width < 768 ? "none" : `url(${herobgtwo})`,
          //  backgroundSize: "cover",
        }
      }
    >
      <div className="container mx-auto flex flex-col items-center lg:flex-row lg:items-center lg:justify-between">
        <motion.div
          className="mb-8 w-full lg:mb-0 lg:w-1/2 lg:pr-8"
          variants={fadeInLeft}
          initial="hidden"
          animate={controls}
        >
          <img
            src={homeImageTwo}
            alt="Mall Features"
            className="mx-auto w-full max-w-md lg:max-w-full"
          />
        </motion.div>

        <motion.div
          className="w-full rounded-3xl bg-transparent bg-opacity-80 p-8 shadow-lg backdrop-blur-md sm:p-10 lg:w-1/2"
          variants={fadeInRight}
          initial="hidden"
          animate={controls}
        >
          <p className="text-justify font-poppins text-xl font-semibold text-mainTextColor sm:text-xl md:text-2xl lg:text-3xl">
            CyloMall is your all-in-one shopping companion that revolutionizes
            the way you navigate, shop, and park at your favorite malls. With
            features like smart mall navigation, personalized shopping
            experiences, and automated parking solutions, CyloMall simplifies
            and enhances your mall visits.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroTwo;
