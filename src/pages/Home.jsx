import React from "react";
import Navbar from "../components/navbar";
import HeroSection from "../components/hero";
import homeBg from "../assets/homebg-1.svg";
import Footer from "../components/footer";

const Home = () => {
  return (
    <div
      className="w-full h-full bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${homeBg})`,
        height: "100%",
        backgroundSize: "120%",
      }}
    >
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Home;
