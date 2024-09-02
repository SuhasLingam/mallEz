import React, { useState } from "react";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import { pageTransition } from "../animation";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <motion.div
      key="login"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <div className="flex flex-col justify-center items-center font-poppins min-h-screen bg-mainBackgroundColor">
        <div className="bg-[#FFFFFF] bg-opacity-70 p-8 rounded-3xl shadow-lg w-full max-w-lg md:max-w-4xl flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-6 text-center text-mainTextColor">
              Log in to your account
            </h2>
            <p className="text-center text-gray-500 mb-4">
              Don’t have an account?{" "}
              <a href="/signup" className="text-blue-500">
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
                  className="mt-1 p-2 w-full border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="mt-1 p-2 w-full border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <a href="#" className="text-blue-500 text-sm mt-1 inline-block">
                  Forgot Password?
                </a>
              </div>
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember Me
                </label>
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700"
              >
                LOG IN
              </button>
            </form>
          </div>

          <div className="items-center justify-center flex m-auto font-bold">
            OR
          </div>

          {/* Social Login Options */}
          <div className="flex flex-col items-center justify-center mt-6 space-y-2 md:mt-0 md:ml-0 md:w-1/3">
            <button className="flex items-center justify-center w-full py-2 bg-white border border-gray-300 rounded-2xl text-gray-700 hover:bg-gray-50">
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
                className="mr-2"
              />
              Log in with Google
            </button>
            <button className="flex items-center justify-center w-full py-2 bg-black text-white rounded-2xl hover:bg-gray-800">
              <img
                src="https://img.icons8.com/ios-filled/16/ffffff/mac-os.png"
                alt="Apple"
                className="mr-2"
              />
              Log in with Apple
            </button>
            <button className="flex items-center justify-center w-full py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700">
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
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-lg mt-4 text-sm text-gray-600">
          <div className="relative">
            <select className="appearance-none bg-transparent text-gray-600 focus:outline-none">
              <option>English (United States)</option>
            </select>
            <span className="absolute inset-y-0 -right-6 flex items-center pr-2 pointer-events-none">
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
          <div className="flex space-x-4 mt-4 md:mt-0">
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
