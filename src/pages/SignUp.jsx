import React, { useState, useEffect } from "react";
import zxcvbn from "zxcvbn";
import Footer from "../components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { pageTransition } from "../animation";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signInWithCredential,
} from "firebase/auth";
import { auth, googleProvider, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaLock, FaGoogle, FaApple, FaCar } from "react-icons/fa";
import { OAuthProvider } from "firebase/auth";
import { createUser } from "../firebaseOperations";

const vehicleNumberPattern =
  /\b[A-Z]{2}[-.\s]?\d{2}[-.\s]?[A-Z]{1,2}[-.\s]?\d{4}\b/;

const getStrengthColor = (score) => {
  switch (score) {
    case 0:
      return "bg-red-600";
    case 1:
      return "bg-orange-600";
    case 2:
      return "bg-yellow-600";
    case 3:
      return "bg-blue-600";
    case 4:
      return "bg-green-600";
    default:
      return "bg-gray-600";
  }
};

// Add this helper function near the top of your file, after the imports
const formatPhoneNumber = (phoneNumber) => {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, "");

  // Check if the number starts with a country code
  if (cleaned.startsWith("1")) {
    return `+${cleaned}`;
  } else {
    // If no country code, assume US and add +1
    return `+1${cleaned}`;
  }
};

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleNumbers, setVehicleNumbers] = useState([""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleAddVehicle = () => {
    setVehicleNumbers([...vehicleNumbers, ""]);
  };

  const handleVehicleChange = (index, value) => {
    const newVehicleNumbers = [...vehicleNumbers];
    newVehicleNumbers[index] = value.toUpperCase();
    setVehicleNumbers(newVehicleNumbers);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const result = zxcvbn(newPassword);
    setPasswordStrength({
      score: result.score,
      feedback: result.feedback.suggestions.join(" "),
    });
  };

  const validateVehicleNumbers = () => {
    return vehicleNumbers.every(
      (number) => number === "" || vehicleNumberPattern.test(number),
    );
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    if (!validateVehicleNumbers()) {
      toast.error("Please enter a valid vehicle number (e.g., MH-12-AB-1234).");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: firstName });

      // Use the new createUser function from firebaseOperations
      await createUser("user", user.uid, {
        firstName,
        lastName,
        email,
        vehicleNumbers,
        role: "user",
      });

      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already in use. Please log in instead.");
        navigate("/login");
      } else {
        toast.error("Error signing up. Please try again.");
        console.error("Error signing up with email and password", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Use the new createUser function from firebaseOperations
      await createUser("user", user.uid, {
        firstName: user.displayName.split(" ")[0],
        lastName: user.displayName.split(" ")[1],
        email: user.email,
        vehicleNumbers: [],
        role: "user",
      });

      toast.success("Account created successfully with Google!");
      navigate("/");
    } catch (error) {
      toast.error("Error signing up with Google. Please try again.");
      console.error("Error signing up with Google", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignUp = async () => {
    setIsLoading(true);
    try {
      const provider = new OAuthProvider("apple.com");
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Use the new createUser function from firebaseOperations
      await createUser("user", user.uid, {
        firstName: user.displayName ? user.displayName.split(" ")[0] : "",
        lastName: user.displayName ? user.displayName.split(" ")[1] : "",
        email: user.email,
        vehicleNumbers: [],
        role: "user",
      });

      toast.success("Account created successfully with Apple!");
      navigate("/");
    } catch (error) {
      toast.error("Error signing up with Apple. Please try again.");
      console.error("Error signing up with Apple", error);
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
      key="signup"
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
            Create an account
          </h2>
          <p className="mb-6 text-center text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 cursor-pointer"
            >
              Log In
            </span>
          </p>
          <AnimatePresence mode="wait">
            <motion.form
              key="email-signup"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleEmailSignUp}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <FaEnvelope className="left-3 top-3 absolute text-gray-400" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full p-2 pl-10 border rounded-full"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="relative">
                  <FaEnvelope className="left-3 top-3 absolute text-gray-400" />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full p-2 pl-10 border rounded-full"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
              <div className="relative">
                <FaEnvelope className="left-3 top-3 absolute text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <div className="mt-2">
                <div
                  className={`h-2 w-full ${getStrengthColor(passwordStrength.score)} rounded`}
                  style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                />
                <p className="mt-1 text-sm text-gray-600">
                  {passwordStrength.feedback || "Enter a stronger password"}
                </p>
              </div>
              <div className="relative">
                <FaLock className="left-3 top-3 absolute text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full p-2 pl-10 border rounded-full"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              {vehicleNumbers.map((vehicle, index) => (
                <div key={index} className="relative flex">
                  <FaCar className="left-3 top-3 absolute text-gray-400" />
                  <input
                    type="text"
                    value={vehicle}
                    onChange={(e) => handleVehicleChange(index, e.target.value)}
                    className={`w-full rounded-full border p-2 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                      vehicle && !vehicleNumberPattern.test(vehicle)
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="Vehicle Number (e.g., MH-12-AB-1234)"
                  />
                  {index === vehicleNumbers.length - 1 && (
                    <button
                      type="button"
                      onClick={handleAddVehicle}
                      className="hover:bg-blue-600 p-2 ml-2 text-white bg-blue-500 rounded-full"
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full p-2 text-white transition duration-300 ease-in-out bg-blue-500 rounded-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "CREATE ACCOUNT"}
              </motion.button>
            </motion.form>
          </AnimatePresence>

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
              onClick={handleGoogleSignUp}
              className="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center w-full py-2 text-gray-700 transition duration-300 ease-in-out bg-white border border-gray-300 rounded-full"
              disabled={isLoading}
            >
              <FaGoogle className="mr-2" />
              Sign up with Google
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAppleSignUp}
              className="hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center w-full py-2 text-white transition duration-300 ease-in-out bg-black rounded-full"
              disabled={isLoading}
            >
              <FaApple className="mr-2" />
              Sign up with Apple
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

export default SignUpForm;
