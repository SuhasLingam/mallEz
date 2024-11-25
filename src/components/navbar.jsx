import React, { useEffect, useState, useRef } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import Button from "../components/button";
import { FaUser, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import newLogo from "../assets/logo.png";

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
        { title: "Theaters", path: "/theaters" },
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
    <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-transparent backdrop-blur-lg">
      <div className="container mx-auto px-4 py-3 lg:py-3">
        <div className="flex flex-wrap items-center justify-between">
          {/* Logo Section */}
          <div className="mx-2 flex items-center space-x-10">
            <img
              onClick={handleLogo}
              src={newLogo}
              alt="clyoMall Logo"
              className="w-28 cursor-pointer pt-1 transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95 lg:w-28"
              tabIndex={0}
              onKeyPress={(e) => handleKeyPress(e, handleLogo)}
            />
            <div className="hidden space-x-3 lg:flex">
              <Button
                text="Recharge"
                redirectTo="/recharge"
                className="text-lg font-medium transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-blue-200 active:scale-95"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded-lg p-2 text-gray-600 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 active:scale-95 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>

          {/* Navigation Menu */}
          <nav
            ref={menuRef}
            className={`${
              isMenuOpen
                ? "absolute left-0 right-0 top-full block animate-slide-down bg-white shadow-lg"
                : "hidden"
            } w-full lg:static lg:block lg:w-auto lg:shadow-none`}
          >
            {/* Mobile-only buttons */}
            <div className="border-b border-gray-100 p-4 lg:hidden">
              <div className="flex flex-col space-y-3">
                <Button
                  text="Recharge"
                  redirectTo="/recharge"
                  className="w-full text-lg font-medium transition-all duration-300 hover:ring-2 hover:ring-blue-200 active:scale-95"
                />
              </div>
            </div>

            {/* Navigation Items */}
            <ul className="flex flex-col space-y-2 p-4 text-lg lg:flex-row lg:items-center lg:space-x-8 lg:space-y-0 lg:p-0">
              {navItems.map((item, index) => (
                <li key={item.title} className="group relative">
                  <button
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-gray-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 group-hover:translate-x-1 lg:inline-flex lg:w-auto lg:hover:bg-transparent lg:group-hover:translate-x-0"
                    onClick={() => {
                      handleSubMenuToggle(index);
                      if (!item.subItems) {
                        handleNavigation(item.path);
                      }
                    }}
                  >
                    <span className="text-lg font-medium">{item.title}</span>
                    {item.subItems && (
                      <FaChevronDown
                        className={`ml-2 h-5 w-5 transition-transform duration-300 ${
                          activeSubMenu === index ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Submenu */}
                  {item.subItems && activeSubMenu === index && (
                    <ul className="mt-2 space-y-2 rounded-lg bg-white p-2 lg:absolute lg:left-0 lg:mt-1 lg:min-w-[180px] lg:animate-slide-down lg:space-y-1 lg:shadow-lg">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.title}>
                          <button
                            onClick={() => handleNavigation(subItem.path)}
                            className="block w-full rounded-md px-4 py-2 text-left text-base text-gray-700 transition-all duration-300 hover:translate-x-1 hover:bg-blue-50 hover:text-blue-600"
                          >
                            {subItem.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}

              {/* User Menu */}
              {userName && (
                <li ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 active:scale-95 lg:w-auto"
                  >
                    <FaUser className="text-xl text-gray-600" />
                    <span className="text-lg font-medium">{userName}</span>
                    <FaChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* User Dropdown */}
                  {isDropdownOpen && (
                    <ul className="mt-2 space-y-1 rounded-lg bg-white p-2 lg:absolute lg:right-0 lg:mt-1 lg:min-w-[180px] lg:animate-slide-down lg:shadow-lg">
                      <li>
                        <button
                          onClick={() => navigate("/profile")}
                          className="block w-full rounded-md px-4 py-2 text-left text-base text-gray-700 transition-all duration-300 hover:translate-x-1 hover:bg-blue-50 hover:text-blue-600"
                        >
                          Profile
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleSignOut}
                          className="block w-full rounded-md px-4 py-2 text-left text-base text-gray-700 transition-all duration-300 hover:translate-x-1 hover:bg-red-50 hover:text-red-600"
                        >
                          Sign Out
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
