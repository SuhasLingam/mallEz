import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import { auth } from "../firebase/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { getUserData } from "../firebaseOperations";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // Check if the user exists in our new collection structure
      const userSnapshot = await getUserData("user", email);

      if (userSnapshot) {
        // User exists, send password reset email
        await sendPasswordResetEmail(auth, email);
        setMessage(
          "A password reset link has been sent to your email. Please check your inbox.",
        );
      } else {
        // User doesn't exist
        setMessage("No account found with this email address.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.code === "auth/invalid-email") {
        setMessage("Invalid email address. Please enter a valid email.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-mainBackgroundColor">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Enter your email"
                required
              />
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isLoading ? "Processing..." : "Reset Password"}
          </button>
        </form>
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm"
            style={{ color: message.includes("error") ? "red" : "green" }}
          >
            {message}
          </motion.p>
        )}
        <div className="mt-4 text-center">
          <a
            href="#"
            onClick={() => navigate("/login")}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Back to Login
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
