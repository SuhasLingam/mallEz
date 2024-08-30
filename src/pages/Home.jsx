import React from "react";
import Navbar from "../components/navbar";
import HeroSection from "../components/hero";

const Home = () => {
  return (
    <div className="w-full h-full overflow-hidden">
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default Home;
