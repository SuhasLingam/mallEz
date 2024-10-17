import React, { useEffect, useState, useRef } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import mallEz from "../assets/Mallez.svg";
import Button from "../components/button";
import { FaUser, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || "User");
      } else {
        setUserName("");
      }
    });

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
    { title: "Events", path: "/" },
    {
      title: "Explore",
      subItems: [
        { title: "Malls", path: "/malls" },
        { title: "Offers", path: "/offers" },
      ],
    },
    { title: "About Us", path: "/about" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleSubMenuToggle = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  const handleLogo = () => {
    navigate("/");
  };

  const handleKeyPress = (event, action) => {
    if (event.key === "Enter" || event.key === " ") {
      action();
    }
  };

  return (
    <header className="lg:static lg:left-0 lg:right-0 lg:top-0 lg:z-30 lg:pb-11 lg:pt-5 w-full py-4 bg-transparent">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <img
              onClick={handleLogo}
              src={mallEz}
              alt="MallEz Logo"
              className="w-28 lg:w-36 p-2 cursor-pointer"
              tabIndex={0}
              onKeyPress={(e) => handleKeyPress(e, handleLogo)}
            />
            <div className="lg:flex lg:gap-4 hidden ml-4">
              <Button text="Recharge" />
              <Button text="Navigate" />
            </div>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              className="text-3xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <FaTimes size={32} /> : <FaBars size={32} />}
            </button>
          </div>

          <nav
            ref={menuRef}
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } w-full flex-col items-center transition-all duration-300 ease-in-out lg:flex lg:w-auto lg:flex-row lg:items-center`}
          >
            <div className="lg:hidden flex flex-col items-center gap-4 my-4">
              <Button text="Recharge" />
              <Button text="Navigate" />
            </div>
            <ul className="lg:flex-row lg:space-x-8 lg:space-y-0 flex flex-col items-center space-y-4">
              {navItems.map((item, index) => (
                <li
                  key={item.title}
                  className="lg:my-0 relative flex flex-col items-center justify-center"
                >
                  <a
                    className="lg:text-xl flex items-center text-lg font-medium cursor-pointer"
                    onClick={() => {
                      handleSubMenuToggle(index);
                      if (!item.subItems) {
                        handleNavigation(item.path);
                      }
                    }}
                    tabIndex={0}
                    onKeyPress={(e) =>
                      handleKeyPress(e, () => {
                        handleSubMenuToggle(index);
                        if (!item.subItems) {
                          handleNavigation(item.path);
                        }
                      })
                    }
                  >
                    {item.title}
                    {item.subItems && (
                      <FaChevronDown
                        className={`ml-1 transition-transform duration-300 ${
                          activeSubMenu === index ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </a>
                  {item.subItems && activeSubMenu === index && (
                    <ul className="lg:absolute lg:top-full lg:mt-1 lg:flex-row lg:gap-4 lg:rounded-full lg:shadow-lg flex flex-col gap-2 px-4 py-2 mt-2 bg-white rounded-lg">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <button
                            onClick={() => handleNavigation(subItem.path)}
                            className="rounded-full bg-mainBackgroundColor p-2 px-4 text-base font-semibold text-mainTextColor shadow-inner drop-shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-b hover:from-[#08E3FF] hover:to-[#5799F7] hover:text-white"
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
              {userName && (
                <li
                  ref={dropdownRef}
                  className="lg:text-xl relative flex flex-col items-center justify-center gap-2 text-lg font-medium"
                >
                  <span
                    className="flex flex-row items-center justify-center gap-2 cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    tabIndex={0}
                    onKeyPress={(e) =>
                      handleKeyPress(e, () =>
                        setIsDropdownOpen(!isDropdownOpen),
                      )
                    }
                  >
                    <FaUser /> {userName}
                    <FaChevronDown
                      className={`transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                  {isDropdownOpen && (
                    <ul className="lg:absolute lg:right-0 lg:top-full lg:mt-1 lg:flex-row lg:gap-3 lg:rounded-full lg:shadow-lg flex flex-col gap-2 px-4 py-2 mt-2 bg-white rounded-lg">
                      <li>
                        <button
                          onClick={() => navigate("/profile")}
                          className="rounded-full bg-mainBackgroundColor p-2 px-4 text-base font-semibold text-mainTextColor shadow-inner drop-shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-b hover:from-[#08E3FF] hover:to-[#5799F7] hover:text-white"
                        >
                          Profile
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleSignOut}
                          className="rounded-full bg-mainBackgroundColor p-2 px-4 text-base font-semibold text-mainTextColor shadow-inner drop-shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-b hover:from-[#08E3FF] hover:to-[#5799F7] hover:text-white"
                        >
                          SignOut
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
