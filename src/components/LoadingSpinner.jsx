import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-blue-300 to-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
