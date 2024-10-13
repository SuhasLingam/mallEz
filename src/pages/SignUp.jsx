import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import { pageTransition } from "../animation";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

// Define the getStrengthColor function
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

const AccountForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleNumbers, setVehicleNumbers] = useState([""]);
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
  });

  const navigate = useNavigate();

  const handleAddVehicle = () => {
    setVehicleNumbers([...vehicleNumbers, ""]);
  };

  const handleVehicleChange = (index, value) => {
    const newVehicleNumbers = [...vehicleNumbers];
    newVehicleNumbers[index] = value;
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

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: firstName, // Set the display name to the first name
      });

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        vehicleNumbers,
      });

      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already in use. Please log in instead.");
        navigate("/login");
      } else {
        console.error("Error signing up with email and password", error);
      }
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: user.displayName.split(" ")[0],
        lastName: user.displayName.split(" ")[1],
        email: user.email,
        vehicleNumbers: [],
      });

      navigate("/");
    } catch (error) {
      console.error("Error signing up with Google", error);
    }
  };

  return (
    <motion.div
      key="signup"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <div className="bg-mainBackgroundColor">
        <Navbar />
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center bg-mainBackgroundColor font-poppins md:pb-[80px] md:pt-[130px]">
        <div className="flex w-full max-w-lg flex-col rounded-3xl bg-[#FFFFFF] bg-opacity-70 p-8 shadow-lg md:max-w-4xl md:flex-row">
          <div className="w-full md:w-1/2">
            <h2 className="mb-6 text-center text-2xl font-semibold text-mainTextColor">
              Create an account
            </h2>
            <p className="mb-4 text-center text-gray-500">
              Already have an account?{" "}
              <a
                onClick={() => navigate("/login")}
                className="cursor-pointer text-blue-500"
              >
                Log In
              </a>
            </p>

            <form onSubmit={handleEmailSignUp}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 w-full rounded-2xl border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 w-full rounded-2xl border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-2xl border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="mt-1 w-full rounded-2xl border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="mt-2">
                    <div
                      className={`h-2 w-full ${getStrengthColor(
                        passwordStrength.score,
                      )} rounded`}
                      style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                    />
                    <p className="mt-1 text-sm text-gray-600">
                      {passwordStrength.feedback || "Enter a stronger password"}
                    </p>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="mt-1 w-full rounded-2xl border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Vehicle Number
                  </label>
                  {vehicleNumbers.map((vehicle, index) => (
                    <div key={index} className="mt-1 flex">
                      <input
                        type="text"
                        value={vehicle}
                        onChange={(e) =>
                          handleVehicleChange(index, e.target.value)
                        }
                        className="w-full rounded-2xl border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {index === vehicleNumbers.length - 1 && (
                        <button
                          type="button"
                          onClick={handleAddVehicle}
                          className="ml-2 rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
                        >
                          +
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="col-span-2">
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-blue-600 p-2 text-white hover:bg-blue-700"
                  >
                    CREATE ACCOUNT
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="m-auto flex items-center justify-center font-bold">
            OR
          </div>
          {/* Social Sign-Up Options */}
          <div className="mt-6 flex flex-col items-center justify-center space-y-2 md:ml-0 md:mt-0 md:w-1/3">
            <button
              onClick={handleGoogleSignUp}
              className="flex w-full items-center justify-center rounded-2xl border border-gray-300 bg-white py-2 text-gray-700 hover:bg-gray-50"
            >
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
                className="mr-2"
              />
              Signup with Google
            </button>
            <button className="flex w-full items-center justify-center rounded-2xl bg-black py-2 text-white hover:bg-gray-800">
              <img
                src="https://img.icons8.com/ios-filled/16/ffffff/mac-os.png"
                alt="Apple"
                className="mr-2"
              />
              Signup with Apple
            </button>
            <button className="flex w-full items-center justify-center rounded-2xl bg-blue-600 py-2 text-white hover:bg-blue-700">
              <img
                src="https://img.icons8.com/color/16/000000/facebook-new.png"
                alt="Facebook"
                className="mr-2"
              />
              Signup with Facebook
            </button>
          </div>
        </div>

        {/* Language Selection and Footer Links */}
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

export default AccountForm;
