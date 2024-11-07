import React from "react";
import { motion } from "framer-motion";

const StepIndicator = ({ currentStep, steps }) => (
  <div className="mb-12 flex justify-center">
    <div className="flex w-full max-w-3xl items-center">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col items-center ${
              index <= currentStep ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                index <= currentStep
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-200 bg-white"
              }`}
            >
              {index + 1}
            </div>
            <span className="mt-2 text-sm font-medium">{step}</span>
          </motion.div>
          {index < steps.length - 1 && (
            <div
              className={`h-1 flex-1 transition-all duration-500 ${
                index < currentStep ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default StepIndicator;
