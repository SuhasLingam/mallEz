import React from "react";

const FloorButtons = ({ floors }) => {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {floors.map((floor) => (
        <button
          key={floor.id}
          className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-4 shadow-md transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-lg"
        >
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white bg-opacity-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <span className="text-sm font-medium text-white">{floor.name}</span>
        </button>
      ))}
    </div>
  );
};

export default FloorButtons;
