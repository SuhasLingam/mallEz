import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-blue-300 to-white">
      <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-xl">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-red-100 p-3">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
        <h3 className="mb-2 text-center text-xl font-bold text-gray-800">
          Error
        </h3>
        <p className="text-center text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
