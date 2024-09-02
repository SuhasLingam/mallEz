import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-mainBackgroundColor border-t-2 border-slate-400 py-8">
      <div className="container mx-auto px-6 md:flex md:justify-between">
        {/* Footer Links */}
        <div className="flex flex-wrap justify-between md:space-x-12">
          <div className="mb-6 md:mb-0">
            <h5 className="font-bold text-lg mb-2 text-blue-900">Product</h5>
            <ul className="text-blue-900 space-y-1">
              <li>
                <a href="#">Solutions</a>
              </li>
              <li>
                <a href="#">Analytics</a>
              </li>
              <li>
                <a href="#">Tokens</a>
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h5 className="font-bold text-lg mb-2 text-blue-900">About Us</h5>
            <ul className="text-blue-900 space-y-1">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Malls</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h5 className="font-bold text-lg mb-2 text-blue-900">
              Help & Support
            </h5>
            <ul className="text-blue-900 space-y-1">
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Privacy and Terms</a>
              </li>
            </ul>
          </div>
        </div>

        {/* App Store Links */}
        <div className="flex flex-col space-y-4 items-start">
          <a href="#">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="w-36"
            />
          </a>
          <a href="#">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="Download on the App Store"
              className="w-36"
            />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto px-6 mt-8 flex justify-between items-center border-t-2 border-slate-400 pt-4">
        <p className="text-blue-900">© 2024 MallEZ</p>
        <div className="flex space-x-4">
          <a href="#" className="text-[#E4405F] text-2xl">
            <FaInstagram />
          </a>
          <a href="#" className="text-[#1DA1F2] text-2xl">
            <FaTwitter />
          </a>
          <a href="#" className="text-[#0077B5] text-2xl">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
