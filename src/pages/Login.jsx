import React, { useState } from "react";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import { pageTransition } from "../animation";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };
  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <motion.div
      key="login"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <div className="font-poppins bg-mainBackgroundColor flex flex-col items-center justify-center min-h-screen">
        <div className="bg-[#FFFFFF] bg-opacity-70 p-8 rounded-3xl shadow-lg w-full max-w-lg md:max-w-4xl flex flex-col md:flex-row">
          <div className="md:w-1/2 w-full">
            <h2 className="text-mainTextColor mb-6 text-2xl font-semibold text-center">
              Log in to your account
            </h2>
            <p className="mb-4 text-center text-gray-500">
              Don’t have an account?{" "}
              <a onClick={handleClick} className="text-blue-500 cursor-pointer">
                Sign up
              </a>
            </p>

            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address or Username
                </label>
                <input
                  type="text"
                  className="rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2 mt-1 border"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2 mt-1 border"
                />
                <a href="#" className="inline-block mt-1 text-sm text-blue-500">
                  Forgot Password?
                </a>
              </div>
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Remember Me
                </label>
              </div>
              <button
                type="submit"
                className="rounded-2xl hover:bg-blue-700 w-full p-2 text-white bg-blue-600"
              >
                LOG IN
              </button>
            </form>
          </div>

          <div className="flex items-center justify-center m-auto font-bold">
            OR
          </div>

          {/* Social Login Options */}
          <div className="md:mt-0 md:ml-0 md:w-1/3 flex flex-col items-center justify-center mt-6 space-y-2">
            <button className="rounded-2xl hover:bg-gray-50 flex items-center justify-center w-full py-2 text-gray-700 bg-white border border-gray-300">
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
                className="mr-2"
              />
              Log in with Google
            </button>
            <button className="rounded-2xl hover:bg-gray-800 flex items-center justify-center w-full py-2 text-white bg-black">
              <img
                src="https://img.icons8.com/ios-filled/16/ffffff/mac-os.png"
                alt="Apple"
                className="mr-2"
              />
              Log in with Apple
            </button>
            <button className="rounded-2xl hover:bg-blue-700 flex items-center justify-center w-full py-2 text-white bg-blue-600">
              <img
                src="https://img.icons8.com/color/16/000000/facebook-new.png"
                alt="Facebook"
                className="mr-2"
              />
              Log in with Facebook
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="md:flex-row flex flex-col items-center justify-between w-full max-w-lg mt-4 text-sm text-gray-600">
          <div className="relative">
            <select className="focus:outline-none text-gray-600 bg-transparent appearance-none">
              <option>English (United States)</option>
            </select>
            <span className="-right-6 absolute inset-y-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>
          <div className="md:mt-0 flex mt-4 space-x-4">
            <a href="#" className="hover:underline">
              Help
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Terms
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default LoginForm;
