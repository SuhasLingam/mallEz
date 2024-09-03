import React from "react";
import Navbar from "../components/navbar";
import HeroSection from "../components/hero";
import Footer from "../components/footer";
import HeroTwo from "../components/hero-2";

const Home = () => {
  return (
    <div className="bg-mainBackgroundColor w-full h-full overflow-hidden">
      <Navbar />
      <HeroSection />
      <HeroTwo />
      <Footer />
    </div>
  );
};

export default Home;
