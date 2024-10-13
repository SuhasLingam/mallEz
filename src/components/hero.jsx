import React, { useState, useEffect } from "react";
import HomeImage from "../assets/homeElement-1.svg";
import Button from "./button";
import { motion } from "framer-motion";
import homeBg from "../assets/homebg-1.svg";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleResize = () => setView(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
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
    <div className="container px-4 pt-[20px] md:px-0">
      <div className="relative flex h-screen w-full flex-col md:flex-row md:justify-between">
        <motion.div
          className="z-10 flex w-full flex-col items-center space-y-5 text-center font-poppins text-[40px] font-bold capitalize text-black md:absolute md:inset-x-1 md:top-[90px] md:w-[650px] md:items-center md:text-left md:text-[60px]"
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

          {!isLoggedIn && view >= 768 && (
            <div className="md:flex md:gap-11">
              <Button text={"LOGIN"} redirectTo={"/login"} />
              <Button text={"SIGNUP"} redirectTo={"/signup"} />
            </div>
          )}
        </motion.div>

        {view < 768 ? (
          <div></div>
        ) : (
          <div>
            <motion.div
              className="font-poppins font-semibold italic text-mainTextColor md:absolute md:bottom-[2rem] md:w-1/2 md:px-[60px] md:text-center md:text-2xl"
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
          className="right-1 top-[60px] mt-8 flex w-full justify-center md:absolute md:m-auto md:mt-0 md:w-1/2"
          variants={view < 768 ? fadeInUp : fadeImage}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: false, amount: 0.2 }}
        >
          <img
            src={HomeImage}
            alt="hero Image"
            className="w-[320px] md:m-auto md:w-auto"
          />
        </motion.div>
        {view < 768 && !isLoggedIn && (
          <motion.div
            className="mt-8 flex justify-center space-x-4 md:absolute md:bottom-[110px] md:left-[240px] md:mt-0"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            viewport={{ once: false, amount: 0.2 }}
          >
            <Button text={"LOGIN"} redirectTo={"/login"} />
            <Button text={"SIGNUP"} redirectTo={"/signup"} />
          </motion.div>
        )}

        {view < 768 ? (
          <motion.div
            className="text-md absolute -bottom-[50px] mx-auto px-3 text-center font-bold italic text-mainTextColor md:absolute md:-bottom-[60px] md:left-11 md:text-2xl"
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
