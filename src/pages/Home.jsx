import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import HeroSection from "../components/hero";
import Footer from "../components/footer";
import HeroTwo from "../components/hero-2";

const Home = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const percentage = (currentScroll / scrollHeight) * 100;
      setScrollPercentage(percentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen pt-10 overflow-hidden bg-white"
      style={{
        backgroundColor: `rgb(${255 - scrollPercentage * 0.5}, ${255 - scrollPercentage * 0.2}, ${255 - scrollPercentage * 0.05})`,
      }}
    >
      <div className="w-full">
        <Navbar />
        <HeroSection />
        <HeroTwo />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
