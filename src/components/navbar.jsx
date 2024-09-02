import React, { useState } from "react";
import mallEz from "../assets/Mallez.svg";
import Button from "../components/button";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const navItems = [
    { title: "Events", link: "#" },
    { title: "Explore", link: "#", subItems: ["Malls", "Offers"] },
    { title: "About Us", link: "#" },
  ];

  const handleSubMenuToggle = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  return (
    <header className="w-full md:absolute md:z-20 md:flex md:flex-row py-4 bg-transparent">
      {/** Logo, Buttons, and Hamburger */}
      <div className="flex items-center justify-between md:justify-start md:flex-1">
        <img
          src={mallEz}
          alt="MallEz Logo"
          className="p-2 w-32 md:w-auto md:mr-4"
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
        <nav className="flex flex-col md:flex-row md:items-center md:space-x-12 mt-4 md:mt-0">
          {/** Buttons */}
          <div className="flex flex-col md:hidden gap-4 items-center">
            <Button text="Recharge" />
            <Button text="Navigate" />
          </div>

          {/** Navigation Items */}
          {navItems.map((item, index) => (
            <li
              key={item.title}
              className="relative flex-col  list-none md:font-semibold flex items-center justify-center my-2 md:my-0"
            >
              <a
                href={item.link}
                className="text-lg md:text-2xl"
                onClick={() => handleSubMenuToggle(index)}
                onMouseEnter={() => {
                  setHover(true);
                }}
                onMouseLeave={() => {
                  setHover(false);
                }}
              >
                {item.title}
              </a>

              {item.subItems && activeSubMenu === index && (
                <ul className="md:absolute flex mt-3 bg-white rounded-full py-2 px-4 gap-2 md:top-full md:mt-2 md:flex md:flex-row md:gap-10 md:bg-white md:shadow-lg md:px-5 md:py-2 md:rounded-full">
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
          <li className="flex items-center md:font-semibold justify-center gap-2 mt-2 md:pr-11 md:mt-0 md:text-2xl text-lg">
            <FaUser />
            <span>Suhas</span>
          </li>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
