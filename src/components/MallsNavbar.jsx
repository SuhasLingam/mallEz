import React, { useState, useEffect } from "react";
import mallEz from "../assets/Mallez.svg";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const MallsNavbar = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const handleLogo = () => {
    navigate("/");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || "User");
      } else {
        setUserName("");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="w-full cursor-pointer bg-transparent py-4 md:absolute md:z-20 md:flex md:flex-row">
      <div className="flex items-center justify-between md:flex-1 md:justify-between">
        <img
          onClick={handleLogo}
          src={mallEz}
          alt="MallEz Logo"
          className="w-32 p-2 md:mr-4 md:w-auto"
        />
        <div className="flex items-center space-x-2 md:items-center md:justify-center md:space-x-3">
          <FaUser size={28} />
          <span className="flex items-center justify-center pr-4 text-lg font-semibold md:mt-0 md:pr-11 md:text-2xl md:font-semibold">
            {userName || "Guest"}
          </span>
        </div>
      </div>
    </header>
  );
};

export default MallsNavbar;
