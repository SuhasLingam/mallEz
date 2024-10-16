import React from "react";
import { FaEdit, FaSave, FaTrash, FaKey } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import the regex pattern at the top of the file
const vehicleNumberPattern =
  /\b[A-Z]{2}[-.\s]?\d{2}[-.\s]?[A-Z]{1,2}[-.\s]?\d{4}\b/;

const ProfileComponent = ({
  userData,
  editField,
  onEdit,
  onUpdate,
  vehicleNumbers,
  onRemoveVehicle,
  newVehicle,
  setNewVehicle,
  onAddVehicle,
  message,
  onChangePassword,
}) => {
  const handleAddVehicle = () => {
    if (!newVehicle) {
      toast.error("Please enter a vehicle number.");
      return;
    }
    if (!vehicleNumberPattern.test(newVehicle)) {
      toast.error("Please enter a valid vehicle number (e.g., MH-12-AB-1234).");
      return;
    }
    onAddVehicle();
    toast.success("Vehicle number added successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg bg-white p-6 shadow-lg"
    >
      <ToastContainer position="top-center" autoClose={5000} />
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Personal Information
      </h2>
      {Object.entries(userData).map(([field, value]) => (
        <motion.div
          key={field}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1 * Object.keys(userData).indexOf(field),
          }}
          className="mb-6"
        >
          <label className="block text-sm font-medium text-gray-700">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            {editField === field ? (
              <input
                type={field === "email" ? "email" : "text"}
                value={value}
                onChange={(e) => onEdit(field, e.target.value)}
                className="flex-grow rounded-l-md border-gray-300 px-3 py-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            ) : (
              <span className="flex-grow rounded-l-md bg-gray-50 px-3 py-2">
                {value}
              </span>
            )}
            <button
              type="button"
              onClick={() =>
                editField === field ? onUpdate(field) : onEdit(field, value)
              }
              className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {editField === field ? (
                <FaSave className="text-green-600" />
              ) : (
                <FaEdit className="text-blue-600" />
              )}
            </button>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8"
      >
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Vehicle Numbers
        </h2>
        <ul className="mb-4 space-y-2">
          {vehicleNumbers.map((vehicle, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex items-center justify-between rounded-md bg-gray-50 p-3 shadow-sm"
            >
              <span
                className={`font-medium ${vehicleNumberPattern.test(vehicle) ? "text-gray-700" : "text-red-500"}`}
              >
                {vehicle}
              </span>
              <button
                type="button"
                onClick={() => onRemoveVehicle(vehicle)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <FaTrash />
              </button>
            </motion.li>
          ))}
        </ul>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <input
            type="text"
            value={newVehicle}
            onChange={(e) => setNewVehicle(e.target.value.toUpperCase())}
            placeholder="Add new vehicle number (e.g., MH-12-AB-1234)"
            className="flex-grow rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <button
            type="button"
            onClick={handleAddVehicle}
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Vehicle
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-8"
      >
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Security</h2>
        <button
          onClick={onChangePassword}
          className="inline-flex items-center rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
        >
          <FaKey className="mr-2" />
          Change Password
        </button>
      </motion.div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 rounded-md bg-green-50 p-4"
        >
          <p className="text-center text-green-800">{message}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProfileComponent;
