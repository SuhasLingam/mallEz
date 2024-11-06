import React from "react";

const StepIndicator = ({ currentStep, steps }) => (
  <div className="mb-8 flex justify-center">
    <div className="flex w-full max-w-3xl items-center">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div
            className={`flex flex-col items-center ${
              index <= currentStep ? "text-blue-500" : "text-gray-400"
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                index <= currentStep ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {index + 1}
            </div>
            <span className="mt-2 text-sm">{step}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-1 flex-1 ${
                index < currentStep ? "bg-blue-500" : "bg-gray-200"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default StepIndicator;
