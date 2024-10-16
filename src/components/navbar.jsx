import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import mallEz from "../assets/Mallez.svg";
import Button from "../components/button";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const navItems = [
    { title: "Events", link: () => navigate("/") },
    {
      title: "Explore",
      subItems: [
        { title: "Malls", link: () => navigate("/malls") },
        { title: "Offers", link: () => navigate("/offers") },
      ],
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
    <header className="w-full cursor-pointer bg-transparent py-4 md:absolute md:z-20 md:flex md:flex-row">
      <div className="flex items-center justify-between md:flex-1 md:justify-start">
        <img
          onClick={handleLogo}
          src={mallEz}
          alt="MallEz Logo"
          className="w-32 p-2 md:mr-4 md:w-auto"
        />
        <div className="hidden md:ml-[80px] md:flex md:gap-9">
          <Button text="Recharge" />
          <Button text="Navigate" />
        </div>
        <div className="ml-auto mr-4 flex items-center md:hidden">
          <button
            className="text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={34} /> : <FaBars size={34} />}
          </button>
        </div>
      </div>
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } w-full flex-col items-center transition-all duration-300 ease-in-out md:flex md:w-auto md:flex-1 md:flex-row md:justify-end`}
      >
        <nav className="mt-4 flex flex-col md:mt-0 md:flex-row md:items-center md:space-x-12">
          <div className="flex flex-col items-center gap-4 md:hidden">
            <Button text="Recharge" />
            <Button text="Navigate" />
          </div>
          {navItems.map((item, index) => (
            <li
              key={item.title}
              className="relative my-2 flex list-none flex-col items-center justify-center md:my-0 md:font-semibold"
            >
              <a
                className="text-lg md:text-2xl"
                onClick={() => {
                  handleSubMenuToggle(index);
                  item.link();
                }}
              >
                {item.title}
              </a>
              {item.subItems && activeSubMenu === index && (
                <ul className="mt-3 flex gap-2 rounded-full bg-white px-4 py-2 md:absolute md:top-full md:mt-2 md:flex md:flex-row md:gap-5 md:rounded-full md:bg-white md:px-5 md:py-2 md:shadow-lg">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex} className="list-none">
                      <button
                        onClick={subItem.link}
                        className="rounded-full bg-mainBackgroundColor p-2 px-4 text-sm font-semibold text-mainTextColor shadow-inner drop-shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-b hover:from-[#08E3FF] hover:to-[#5799F7] hover:text-white md:p-1 md:px-6 md:text-xl"
                      >
                        {subItem.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          {/* User Dropdown */}
          {userName ? (
            <li className="relative mt-2 flex flex-col items-center justify-center gap-2 text-lg md:mt-0 md:pr-11 md:text-2xl md:font-semibold">
              <span
                className="flex cursor-pointer flex-row items-center justify-center gap-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FaUser /> {userName}
              </span>
              {isDropdownOpen && (
                <ul className="mt-3 flex gap-2 rounded-full bg-white px-4 py-2 md:absolute md:top-full md:mt-2 md:flex md:flex-row md:gap-3 md:rounded-full md:bg-white md:px-4 md:py-2 md:shadow-lg">
                  <li>
                    <button
                      onClick={() => navigate("/profile")}
                      className="rounded-full bg-mainBackgroundColor p-2 px-4 text-sm font-semibold text-mainTextColor shadow-inner drop-shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-b hover:from-[#08E3FF] hover:to-[#5799F7] hover:text-white md:p-1 md:px-6 md:text-xl"
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="rounded-full bg-mainBackgroundColor p-2 px-4 text-sm font-semibold text-mainTextColor shadow-inner drop-shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-b hover:from-[#08E3FF] hover:to-[#5799F7] hover:text-white md:p-1 md:px-6 md:text-xl"
                    >
                      SignOut
                    </button>
                  </li>
                </ul>
              )}
            </li>
          ) : null}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
