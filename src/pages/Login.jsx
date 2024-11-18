import React, { useState, useEffect } from "react";
import Footer from "../components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { pageTransition } from "../animation";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaEnvelope,
  FaGoogle,
  FaLock,
  FaFacebook,
  FaApple,
} from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { FacebookAuthProvider, OAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { getUserData, createUser, updateUser } from "../firebaseOperations";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRememberMeChange = () => setRememberMe(!rememberMe);

  const ensureUserRole = async (user) => {
    try {
      let userData = await getUserData("user", user.uid);

      if (!userData) {
        // If the user document doesn't exist, create it with the role
        await createUser("user", user.uid, {
          email: user.email,
          role: "user",
        });
      } else if (!userData.role) {
        // If the user document exists but doesn't have a role, add it
        await updateUser("user", user.uid, { role: "user" });
      }
    } catch (error) {
      console.error("Error ensuring user role:", error);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await ensureUserRole(userCredential.user);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Error logging in with email and password", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await ensureUserRole(result.user);
      toast.success("Google login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Google login failed. Please try again.");
      console.error("Error logging in with Google", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setIsLoading(true);
    try {
      const provider = new OAuthProvider("apple.com");
      const result = await signInWithPopup(auth, provider);
      await ensureUserRole(result.user);
      toast.success("Apple login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Apple login failed. Please try again.");
      console.error("Error logging in with Apple", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      key="login"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="bg-mainBackgroundColor font-poppins flex flex-col min-h-screen pt-20"
    >
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="md:py-16 flex flex-col items-center justify-center flex-grow px-4 py-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-opacity-90 md:max-w-2xl md:p-8 w-full max-w-md p-6 bg-white shadow-2xl"
        >
          <h2 className="text-mainTextColor mb-6 text-3xl font-bold text-center">
            Welcome Back
          </h2>

          {/* Add this new section */}
          <p className="mb-6 text-center text-gray-600">
            New here?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="hover:underline text-blue-500 cursor-pointer"
            >
              Create an account
            </span>
          </p>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="relative">
              <FaEnvelope className="left-3 top-3 absolute text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full p-2 pl-10 border rounded-full"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="relative">
              <FaLock className="left-3 top-3 absolute text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full p-2 pl-10 border rounded-full"
                placeholder="Password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  className="focus:ring-blue-500 w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 text-sm text-gray-700"
                >
                  Remember Me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="hover:underline text-sm text-blue-600"
              >
                Forgot Password?
              </Link>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full p-2 text-white transition duration-300 ease-in-out bg-blue-500 rounded-full"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "LOG IN"}
            </motion.button>
          </form>

          <div className="flex items-center justify-center my-6">
            <span className="lg:w-1/4 w-1/5 border-b border-gray-300"></span>
            <span className="px-2 text-xs text-center text-gray-500 uppercase">
              or
            </span>
            <span className="lg:w-1/4 w-1/5 border-b border-gray-300"></span>
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoogleLogin}
              className="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center w-full py-2 text-gray-700 transition duration-300 ease-in-out bg-white border border-gray-300 rounded-full"
              disabled={isLoading}
            >
              <FaGoogle className="mr-2" />
              Log in with Google
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAppleLogin}
              className="hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center w-full py-2 text-white transition duration-300 ease-in-out bg-black rounded-full"
              disabled={isLoading}
            >
              <FaApple className="mr-2" />
              Log in with Apple
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="md:flex-row md:space-y-0 flex flex-col items-center justify-between w-full max-w-md mt-8 space-y-4 text-sm text-black"
        >
          <div className="relative">
            <select className="focus:outline-none pb-1 text-black bg-transparent border-b border-black appearance-none">
              <option>English (United States)</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-black"
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
          <div className="flex space-x-4">
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
        </motion.div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default LoginForm;
