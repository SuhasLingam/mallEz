import React from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { motion } from "framer-motion";

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
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg bg-white p-4 shadow-md sm:p-6"
    >
      {Object.entries(userData).map(([field, value]) => (
        <motion.div
          key={field}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1 * Object.keys(userData).indexOf(field),
          }}
          className="mb-4"
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
                className="flex-grow rounded-l-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            ) : (
              <span className="flex-grow py-2">{value}</span>
            )}
            <button
              type="button"
              onClick={() =>
                editField === field ? onUpdate(field) : onEdit(field, value)
              }
              className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500 hover:bg-gray-100"
            >
              {editField === field ? <FaSave /> : <FaEdit />}
            </button>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-6"
      >
        <h2 className="mb-2 text-xl font-semibold text-gray-800">
          Vehicle Numbers
        </h2>
        <ul className="mt-1 space-y-2">
          {vehicleNumbers.map((vehicle, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex items-center justify-between rounded bg-gray-100 p-2"
            >
              <span>{vehicle}</span>
              <button
                type="button"
                onClick={() => onRemoveVehicle(vehicle)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </motion.li>
          ))}
        </ul>
        <div className="mt-2 flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <input
            type="text"
            value={newVehicle}
            onChange={(e) => setNewVehicle(e.target.value)}
            placeholder="Add new vehicle number"
            className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <button
            type="button"
            onClick={onAddVehicle}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add
          </button>
        </div>
      </motion.div>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 rounded border border-green-400 bg-green-100 p-2 text-green-700"
        >
          {message}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProfileComponent;
