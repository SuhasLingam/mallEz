import React from "react";
import { motion } from "framer-motion";
import { FaTimesCircle } from "react-icons/fa";

const MallOverlay = ({ mall, onClose }) => {
  console.log("Rendering MallOverlay with mall:", mall);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-h-[90vh] w-full max-w-[95vw] overflow-y-auto rounded-3xl bg-gradient-to-br from-white via-blue-300 to-white p-4 shadow-xl sm:max-w-xl sm:p-6 md:max-w-2xl md:p-8 lg:max-w-4xl xl:max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-600 hover:text-gray-800 sm:right-4 sm:top-4"
        >
          <FaTimesCircle size={24} className="sm:h-8 sm:w-8" />
        </button>
        <h2 className="mb-4 text-center text-2xl font-bold sm:mb-6 sm:text-3xl md:mb-8 md:text-4xl">
          {mall.title} Locations
        </h2>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
          {mall.locations.map((location) => (
            <div key={location.id} className="flex flex-col items-center">
              <div className="mb-2 flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-md sm:mb-4 sm:h-32 sm:w-32 md:h-40 md:w-40">
                <div className="h-20 w-20 rounded-lg bg-gray-200 sm:h-24 sm:w-24 md:h-32 md:w-32"></div>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-center text-sm font-semibold sm:px-4 sm:py-2 sm:text-base md:px-6 md:py-2 md:text-lg">
                {location.name}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MallOverlay;
