import React from "react";
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

const fadeImage = {
  hidden: { opacity: 0, x: 400 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  exit: { opacity: 0, x: 400, transition: { duration: 0.5 } },
};

const HeroTwo = () => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat p-4 md:p-8"
      style={{ backgroundImage: `url(${herobgtwo})` }}
    >
      <div className="container mx-auto flex flex-col-reverse items-center lg:flex-row lg:justify-between">
        <motion.div
          className="mt-8 w-full lg:mt-0 lg:w-1/2"
          variants={fadeInleft}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.2 }}
        >
          <img
            src={homeImageTwo}
            alt="Mall Features"
            className="mx-auto w-full max-w-md lg:max-w-full"
          />
        </motion.div>

        <motion.div
          className="w-full rounded-3xl bg-white bg-opacity-80 p-6 shadow-lg backdrop-blur-md lg:w-1/2"
          variants={fadeImage}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="text-center text-lg font-medium text-gray-800 sm:text-xl md:text-2xl">
            MallEZ is your all-in-one shopping companion that revolutionizes the
            way you navigate, shop, and park at your favorite malls. With
            features like smart mall navigation, personalized shopping
            experiences, and automated parking solutions, MallEZ simplifies and
            enhances your mall visits.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroTwo;
