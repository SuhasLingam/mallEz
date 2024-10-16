import React, { useState, useEffect } from "react";
import HomeImage from "../assets/homeElement-1.svg";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import Button from "./button";

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

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  exit: { opacity: 0, y: 50, transition: { duration: 0.5, ease: "easeIn" } },
};

const HeroSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

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

      setTypingSpeed(isDeleting ? 20 : 70);

      if (!isDeleting && fullText === currentWord) {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
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
    <div
      ref={ref}
      className="relative min-h-screen bg-mainBackgroundColor p-4 md:p-8"
    >
      <div className="container mx-auto flex flex-col items-center lg:flex-row lg:justify-between">
        <motion.div
          className="mb-8 text-center lg:mb-0 lg:w-1/2 lg:text-center"
          variants={fadeInLeft}
          initial="hidden"
          animate={controls}
        >
          <h1 className="mb-4 text-5xl font-bold sm:text-6xl lg:text-7xl">
            Feel The Ease,
          </h1>
          <h2
            className="mb-4 text-5xl font-bold sm:text-6xl lg:text-7xl"
            style={{ color: colors[currentWordIndex], minHeight: "1.2em" }}
          >
            {displayedText}
          </h2>
          <h1 className="mb-8 text-5xl font-bold sm:text-6xl lg:text-7xl">
            With MallEZ
          </h1>

          {!isLoggedIn && (
            <motion.div
              className="flex justify-center gap-4 lg:justify-center"
              variants={fadeInUp}
              initial="hidden"
              animate={controls}
            >
              <Button text="LOGIN" redirectTo="/login" />
              <Button text="SIGNUP" redirectTo="/signup" />
            </motion.div>
          )}

          <motion.p
            className="mt-8 font-poppins text-base font-semibold italic text-mainTextColor sm:text-lg lg:text-2xl"
            variants={fadeInUp}
            initial="hidden"
            animate={controls}
          >
            Imagine effortlessly navigating the mall during the busy holiday
            season, with MallEZ guiding you directly to your favorite stores and
            securing a parking spot just as you arrive. That's the power of
            MallEZ.
          </motion.p>
        </motion.div>

        <motion.div
          className="lg:w-1/2"
          variants={fadeInRight}
          initial="hidden"
          animate={controls}
        >
          <img src={HomeImage} alt="Mall Illustration" className="w-full" />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
