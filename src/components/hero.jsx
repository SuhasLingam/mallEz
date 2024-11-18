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
    <div ref={ref} className="md:p-8 relative min-h-screen p-4 bg-transparent">
      <div className="lg:flex-row lg:justify-between container flex flex-col items-center mx-auto">
        <motion.div
          className="lg:mb-0 lg:w-1/2 lg:text-center mb-8 text-center"
          variants={fadeInLeft}
          initial="hidden"
          animate={controls}
        >
          <h1 className="sm:text-6xl lg:text-7xl mb-4 text-5xl font-bold">
            Feel The Ease,
          </h1>
          <h2
            className="sm:text-6xl lg:text-7xl mb-4 text-5xl font-bold"
            style={{ color: colors[currentWordIndex], minHeight: "1.2em" }}
          >
            {displayedText}
          </h2>
          <h1 className="sm:text-6xl lg:text-7xl mb-8 text-5xl font-bold">
            With CyloMall
          </h1>

          <motion.div
            className="lg:hidden mb-8"
            variants={fadeInUp}
            initial="hidden"
            animate={controls}
          >
            <img src={HomeImage} alt="Mall Illustration" className="w-full" />
          </motion.div>

          {!isLoggedIn && (
            <motion.div
              className="lg:justify-center flex justify-center gap-4"
              variants={fadeInUp}
              initial="hidden"
              animate={controls}
            >
              <Button text="LOGIN" redirectTo="/login" />
              <Button text="SIGNUP" redirectTo="/signup" />
            </motion.div>
          )}

          <motion.p
            className="font-poppins text-mainTextColor sm:text-lg lg:text-2xl mt-8 text-base italic font-semibold"
            variants={fadeInUp}
            initial="hidden"
            animate={controls}
          >
            Imagine effortlessly navigating the mall during the busy holiday
            season, with CyloMall guiding you directly to your favorite stores
            and securing a parking spot just as you arrive. That's the power of
            CyloMall.
          </motion.p>
        </motion.div>

        <motion.div
          className="lg:block lg:w-1/2 hidden"
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
