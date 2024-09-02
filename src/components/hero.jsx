import React, { useState, useEffect } from "react";
import HomeImage from "../assets/homeElement-1.svg";
import Button from "./button";
import homeBg from "../assets/homebg-1.svg";

const HeroSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

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

      // Adjust typing speed based on the typing state
      setTypingSpeed(isDeleting ? 10 : 80);

      // Check if the word is completely typed or deleted
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
    <div
      // style={{
      //   backgroundImage: `url(${homeBg})`,
      //   height: "100%",
      //   backgroundSize: "100%",
      // }}
      className="container pt-[60px] px-4 md:px-0"
    >
      <div className="flex flex-col md:flex-row h-screen md:justify-between relative">
        {/** Hero Text Section */}
        <div className="z-10 w-full md:w-[650px] text-center md:text-left capitalize flex flex-col items-center md:items-center space-y-6 font-bold font-poppins text-black text-[40px] md:text-[60px] md:absolute md:top-[120px] md:left-[100px]">
          <p>Feel The Ease,</p>

          {/* Fixed height container for the changing text */}
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
        </div>

        {/** Hero Image Section */}
        <div className="w-full mt-8 md:mt-0 md:w-[750px] md:mr-[120px] md:absolute right-0 flex justify-center ">
          <img
            src={HomeImage}
            alt="hero Image"
            className="w-[300px] md:w-auto "
          />
        </div>

        {/** Buttons Section */}
        <div className="mt-8 md:mt-0 flex justify-center space-x-4 md:absolute md:bottom-[110px] md:left-[240px]">
          <Button text={"Login"} redirectTo={"/login"} />
          <Button text={"SignUp"} redirectTo={"/signup"} />
        </div>
        <div className="md:absolute text-md px-3 absolute -bottom-[80px] mx-auto md:-bottom-[60px] md:text-2xl italic font-bold text-mainTextColor md:left-11">
          ○ Imagine effortlessly navigating the mall during the busy holiday
          season, with MallEZ guiding you directly to <br /> your favorite
          stores and securing a parking spot just as you arrive. That's the
          power of MallEZ.
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
