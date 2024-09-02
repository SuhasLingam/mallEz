import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import { pageTransition } from "../animation";

const AccountForm = () => {
  const [vehicleNumbers, setVehicleNumbers] = useState([""]);
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
  });

  const handleAddVehicle = () => {
    setVehicleNumbers([...vehicleNumbers, ""]);
  };

  const handleVehicleChange = (index, value) => {
    const newVehicleNumbers = [...vehicleNumbers];
    newVehicleNumbers[index] = value;
    setVehicleNumbers(newVehicleNumbers);
  };

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

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const result = zxcvbn(newPassword);
    setPasswordStrength({
      score: result.score,
      feedback: result.feedback.suggestions.join(" "),
    });
  };

  return (
    <motion.div
      key="signup"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <div className="flex  flex-col justify-center items-center font-poppins min-h-screen bg-mainBackgroundColor">
        <div className="bg-[#FFFFFF] bg-opacity-70 p-8 rounded-3xl shadow-lg w-full max-w-lg md:max-w-4xl flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-6 text-center text-mainTextColor">
              Create an account
            </h2>
            <p className="text-center text-gray-500 mb-4">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500">
                Log In
              </a>
            </p>

            <form>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 p-2 w-full border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 p-2 w-full border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="mt-1 p-2 w-full border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="mt-1 p-2 w-full border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="mt-2">
                    <div
                      className={`h-2 w-full ${getStrengthColor(
                        passwordStrength.score
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
                    className="mt-1 p-2 w-full border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Vehicle Number
                  </label>
                  {vehicleNumbers.map((vehicle, index) => (
                    <div key={index} className="flex mt-1">
                      <input
                        type="text"
                        value={vehicle}
                        onChange={(e) =>
                          handleVehicleChange(index, e.target.value)
                        }
                        className="p-2 w-full border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {index === vehicleNumbers.length - 1 && (
                        <button
                          type="button"
                          onClick={handleAddVehicle}
                          className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
                    className="w-full p-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700"
                  >
                    CREATE ACCOUNT
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="items-center justify-center flex m-auto font-bold">
            OR
          </div>
          {/* Social Sign-Up Options */}
          <div className="flex flex-col items-center justify-center mt-6 space-y-2 md:mt-0 md:ml-0 md:w-1/3">
            <button className="flex items-center justify-center w-full py-2 bg-white border border-gray-300 rounded-2xl text-gray-700 hover:bg-gray-50">
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
                className="mr-2"
              />
              Signup with Google
            </button>
            <button className="flex items-center justify-center w-full py-2 bg-black text-white rounded-2xl hover:bg-gray-800">
              <img
                src="https://img.icons8.com/ios-filled/16/ffffff/mac-os.png"
                alt="Apple"
                className="mr-2"
              />
              Signup with Apple
            </button>
            <button className="flex items-center justify-center w-full py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700">
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

export default AccountForm;
