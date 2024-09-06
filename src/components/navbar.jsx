import React, { useState } from "react";
import mallEz from "../assets/Mallez.svg";
import Button from "../components/button";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const navItems = [
    { title: "Events", link: () => navigate("/") },
    {
      title: "Explore",
      link: () => navigate("/"),
      subItems: ["Malls", "Offers"],
    },
    { title: "About Us", link: () => navigate("/about") },
  ];

  const handleSubMenuToggle = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  const handleLogo = () => {
    navigate("/");
  };

  return (
    <header className="md:absolute md:z-20 md:flex md:flex-row w-full py-4 bg-transparent cursor-pointer">
      {/** Logo, Buttons, and Hamburger */}
      <div className="md:justify-start md:flex-1 flex items-center justify-between">
        <img
          onClick={handleLogo}
          src={mallEz}
          alt="MallEz Logo"
          className="md:w-auto md:mr-4 w-32 p-2"
        />

        {/** Buttons */}
        <div className="hidden md:ml-[80px] md:flex md:gap-9">
          <Button text="Recharge" />
          <Button text="Navigate" />
        </div>

        {/** Hamburger Icon */}
        <div className="md:hidden flex items-center ml-auto mr-4">
          <button
            className="text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={34} /> : <FaBars size={34} />}
          </button>
        </div>
      </div>

      {/** Navigation, Buttons (in hamburger), and User Info */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex flex-col md:flex-row md:flex-1 md:justify-end items-center w-full md:w-auto transition-all duration-300 ease-in-out`}
      >
        <nav className="md:flex-row md:items-center md:space-x-12 md:mt-0 flex flex-col mt-4">
          {/** Buttons */}
          <div className="md:hidden flex flex-col items-center gap-4">
            <Button text="Recharge" />
            <Button text="Navigate" />
          </div>

          {/** Navigation Items */}
          {navItems.map((item, index) => (
            <li
              key={item.title}
              className="md:font-semibold md:my-0 relative flex flex-col items-center justify-center my-2 list-none"
            >
              <a
                className="md:text-2xl text-lg"
                onClick={() => {
                  handleSubMenuToggle(index);
                  item.link();
                }}
              >
                {item.title}
              </a>

              {item.subItems && activeSubMenu === index && (
                <ul className="md:absolute md:top-full md:mt-2 md:flex md:flex-row md:gap-10 md:bg-white md:shadow-lg md:px-5 md:py-2 md:rounded-full flex gap-2 px-4 py-2 mt-3 bg-white rounded-full">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex} className="list-none">
                      <button className="bg-mainBackgroundColor shadow-inner drop-shadow-md text-sm md:text-xl font-semibold hover:text-white hover:bg-gradient-to-b hover:from-[#08E3FF] hover:to-[#5799F7] text-mainTextColor p-2 md:p-1 px-4 md:px-6 rounded-full  transition-all duration-300 ease-in-out">
                        {subItem}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className="md:font-semibold md:pr-11 md:mt-0 md:text-2xl flex items-center justify-center gap-2 mt-2 text-lg">
            <FaUser />
            <span>Suhas</span>
          </li>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
