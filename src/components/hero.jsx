import React, { useState, useEffect } from "react";
import HomeImage from "../assets/homeElement-1.svg";
import Button from "./button";
import { motion } from "framer-motion";
import homeBg from "../assets/homebg-1.svg";

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

const HeroSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [view, setView] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setView(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const words = ["SHOP", "NAVIGATE", "PARK"];
  const colors = ["#000D49", "#02BD08", "#9502AF"];

  useEffect(() => {
    let timeout;

    const type = () => {
      const currentWord = words[currentWordIndex];
      const fullText = isDeleting
        ? currentWord.substring(0, displayedText.length - 1)
        : currentWord.substring(0, displayedText.length + 1);

      setDisplayedText(fullText);

      setTypingSpeed(isDeleting ? 10 : 80);

      if (!isDeleting && fullText === currentWord) {
        timeout = setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && fullText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      } else {
        timeout = setTimeout(type, typingSpeed);
      }
    };

    timeout = setTimeout(type, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, typingSpeed, currentWordIndex]);

  return (
    <div className="container pt-[20px] px-4 md:px-0">
      <div className="md:flex-row md:justify-between relative flex flex-col w-full h-screen">
        <motion.div
          className="z-10 w-full md:w-[650px] text-center md:text-left capitalize flex flex-col items-center md:items-center space-y-5 font-bold font-poppins text-black text-[40px] md:text-[60px] md:absolute md:top-[90px] md:inset-x-1"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: false, amount: 0.2 }}
        >
          <p>Feel The Ease,</p>

          <div
            style={{
              color: colors[currentWordIndex],
              height: "56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {displayedText}
          </div>

          <p>With MallEZ</p>

          {view < 768 ? (
            <div></div>
          ) : (
            <div>
              {" "}
              <div className="md:gap-11 md:flex">
                {" "}
                <Button text={"LOGIN"} redirectTo={"/login"} />
                <Button text={"SIGNUP"} redirectTo={"/signup"} />
              </div>
            </div>
          )}
        </motion.div>

        {view < 768 ? (
          <div></div>
        ) : (
          <div>
            <motion.div
              className="text-mainTextColor md:absolute md:text-center md:bottom-[2rem] md:w-1/2 md:px-[60px] md:text-2xl font-poppins font-semibold italic"
              variants={view < 768 ? fadeInUp : fadeInleft}
              initial="hidden"
              whileInView="visible"
              exit="hidden"
              viewport={{ once: false, amount: 0.2 }}
            >
              Imagine effortlessly navigating the mall during the busy holiday
              season, with MallEZ guiding you directly to your favorite stores
              and securing a parking spot just as you arrive. That's the power
              of MallEZ.
            </motion.div>
          </div>
        )}

        <motion.div
          className="w-full mt-8 top-[60px] md:mt-0 md:w-1/2 md:m-auto md:absolute right-1 flex justify-center"
          variants={view < 768 ? fadeInUp : fadeImage}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: false, amount: 0.2 }}
        >
          <img
            src={HomeImage}
            alt="hero Image"
            className="w-[320px] md:w-auto md:m-auto"
          />
        </motion.div>
        {view < 768 ? (
          <motion.div
            className="mt-8 md:mt-0 flex justify-center space-x-4 md:absolute md:bottom-[110px] md:left-[240px]"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            viewport={{ once: false, amount: 0.2 }}
          >
            <Button text={"LOGIN"} redirectTo={"/login"} />
            <Button text={"SIGNUP"} redirectTo={"/signup"} />
          </motion.div>
        ) : (
          <div></div>
        )}

        {view < 768 ? (
          <motion.div
            className="md:absolute text-md px-3 absolute text-center -bottom-[50px] mx-auto md:-bottom-[60px] md:text-2xl italic font-bold text-mainTextColor md:left-11"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            viewport={{ once: false, amount: 0.2 }}
          >
            Imagine effortlessly navigating the mall during the busy holiday
            season, with MallEZ guiding you directly to <br /> your favorite
            stores and securing a parking spot just as you arrive. That's the
            power of MallEZ.
          </motion.div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
