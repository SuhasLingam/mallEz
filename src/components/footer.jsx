import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  exit: { opacity: 0, y: 50, transition: { duration: 0.5 } },
};

const Footer = () => {
  return (
    <footer className="bg-mainBackgroundColor border-slate-400 py-8 border-t-2">
      <div className="md:flex md:justify-around container px-6 mx-auto">
        {/* Footer Links */}
        <motion.div
          className="md:space-x-12 flex flex-wrap justify-between"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: false, amount: 0.2 }}
        >
          <div className="md:mb-0 mb-6">
            <h5 className="mb-2 text-lg font-bold text-blue-900">Product</h5>
            <ul className="space-y-1 text-blue-900">
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
          <div className="md:mb-0 mb-6">
            <h5 className="mb-2 text-lg font-bold text-blue-900">About Us</h5>
            <ul className="space-y-1 text-blue-900">
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
          <div className="md:mb-0 mb-6">
            <h5 className="mb-2 text-lg font-bold text-blue-900">
              Help & Support
            </h5>
            <ul className="space-y-1 text-blue-900">
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
        </motion.div>

        {/* App Store Links */}
        <motion.div
          className="flex flex-col items-start space-y-4"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: false, amount: 0.2 }}
        >
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
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <motion.div
        className="border-slate-400 container flex items-center justify-between px-6 pt-4 mx-auto mt-8 border-t-2"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.2 }}
      >
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
      </motion.div>
    </footer>
  );
};

export default Footer;
