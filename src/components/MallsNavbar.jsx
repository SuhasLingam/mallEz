import React, { useState } from "react";
import mallEz from "../assets/Mallez.svg";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const MallsNavbar = () => {
  const navigate = useNavigate();
  const handleLogo = () => {
    navigate("/");
  };

  return (
    <header className="md:absolute md:z-20 md:flex md:flex-row w-full py-4 bg-transparent cursor-pointer">
      <div className=" md:flex-1 md:justify-between flex items-center justify-between">
        <img
          onClick={handleLogo}
          src={mallEz}
          alt="MallEz Logo"
          className="md:w-auto md:mr-4 w-32 p-2"
        />
        <div className="md:space-x-3 md:justify-center md:items-center flex items-center space-x-2">
          <FaUser size={28} />
          <span className="md:font-semibold md:pr-11 md:mt-0 md:text-2xl flex items-center justify-center pr-4 text-lg font-semibold">Suhas</span>
        </div>
      </div>
    </header>
  );
};

export default MallsNavbar;