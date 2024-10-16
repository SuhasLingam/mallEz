import React, { useState } from "react";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import { pageTransition } from "../animation";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import Navbar from "../components/navbar";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState(""); // Add state for email
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("Error logging in with email and password", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.error("Error logging in with Google", error);
    }
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
      <div className="bg-mainBackgroundColor">
        {" "}
        <Navbar />
      </div>
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-mainBackgroundColor font-poppins md:pt-[80px]">
        <div className="flex w-full max-w-lg flex-col rounded-3xl bg-[#FFFFFF] bg-opacity-70 p-8 shadow-lg md:max-w-4xl md:flex-row">
          <div className="w-full md:w-1/2">
            <h2 className="mb-6 text-center text-2xl font-semibold text-mainTextColor">
              Log in to your account
            </h2>
            <p className="mb-4 text-center text-gray-500">
              Don't have an account?{" "}
              <a onClick={handleClick} className="cursor-pointer text-blue-500">
                Sign up
              </a>
            </p>

            <form onSubmit={handleEmailLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address or Username
                </label>
                <input
                  type="text"
                  value={email} // Bind input to email state
                  onChange={handleEmailChange} // Handle email change
                  className="mt-1 w-full rounded-2xl border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="mt-1 w-full rounded-2xl border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Link
                  to="/forgot-password"
                  className="mt-1 inline-block text-sm text-blue-500"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600"
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
                className="w-full rounded-2xl bg-blue-600 p-2 text-white hover:bg-blue-700"
              >
                LOG IN
              </button>
            </form>
          </div>

          <div className="m-auto flex items-center justify-center font-bold">
            OR
          </div>

          {/* Social Login Options */}
          <div className="mt-6 flex flex-col items-center justify-center space-y-2 md:ml-0 md:mt-0 md:w-1/3">
            <button
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center rounded-2xl border border-gray-300 bg-white py-2 text-gray-700 hover:bg-gray-50"
            >
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
                className="mr-2"
              />
              Log in with Google
            </button>
            <button className="flex w-full items-center justify-center rounded-2xl bg-black py-2 text-white hover:bg-gray-800">
              <img
                src="https://img.icons8.com/ios-filled/16/ffffff/mac-os.png"
                alt="Apple"
                className="mr-2"
              />
              Log in with Apple
            </button>
            <button className="flex w-full items-center justify-center rounded-2xl bg-blue-600 py-2 text-white hover:bg-blue-700">
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
        <div className="mt-4 flex w-full max-w-lg flex-col items-center justify-between text-sm text-gray-600 md:flex-row">
          <div className="relative">
            <select className="appearance-none bg-transparent text-gray-600 focus:outline-none">
              <option>English (United States)</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 -right-6 flex items-center pr-2">
              <svg
                className="h-4 w-4 text-gray-600"
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
          <div className="mt-4 flex space-x-4 md:mt-0">
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
