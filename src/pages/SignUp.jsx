import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import { pageTransition } from "../animation";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
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
      <div className="font-poppins bg-mainBackgroundColor flex flex-col items-center justify-center min-h-screen">
        <div className="bg-[#FFFFFF] bg-opacity-70 p-8 rounded-3xl shadow-lg w-full max-w-lg md:max-w-4xl flex flex-col md:flex-row">
          <div className="md:w-1/2 w-full">
            <h2 className="text-mainTextColor mb-6 text-2xl font-semibold text-center">
              Create an account
            </h2>
            <p className="mb-4 text-center text-gray-500">
              Already have an account?{" "}
              <a onClick={handleClick} className="text-blue-500 cursor-pointer">
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
                    className="rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2 mt-1 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2 mt-1 border"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2 mt-1 border"
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
                    className="rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2 mt-1 border"
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
                    className="rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2 mt-1 border"
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
                        className="rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2 border"
                      />
                      {index === vehicleNumbers.length - 1 && (
                        <button
                          type="button"
                          onClick={handleAddVehicle}
                          className="hover:bg-blue-600 p-2 ml-2 text-white bg-blue-500 rounded-md"
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
                    className="rounded-2xl hover:bg-blue-700 w-full p-2 text-white bg-blue-600"
                  >
                    CREATE ACCOUNT
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center m-auto font-bold">
            OR
          </div>
          {/* Social Sign-Up Options */}
          <div className="md:mt-0 md:ml-0 md:w-1/3 flex flex-col items-center justify-center mt-6 space-y-2">
            <button className="rounded-2xl hover:bg-gray-50 flex items-center justify-center w-full py-2 text-gray-700 bg-white border border-gray-300">
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
                className="mr-2"
              />
              Signup with Google
            </button>
            <button className="rounded-2xl hover:bg-gray-800 flex items-center justify-center w-full py-2 text-white bg-black">
              <img
                src="https://img.icons8.com/ios-filled/16/ffffff/mac-os.png"
                alt="Apple"
                className="mr-2"
              />
              Signup with Apple
            </button>
            <button className="rounded-2xl hover:bg-blue-700 flex items-center justify-center w-full py-2 text-white bg-blue-600">
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

export default AccountForm;
