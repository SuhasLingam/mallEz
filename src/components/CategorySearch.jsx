import React from "react";

export function CategorySearch() {
  const categories = ["FOOD", "PLAY", "MOVIES", "SHOP"];

  return (
    <div className="mt-8">
      <h2 className="mb-8 text-center text-3xl font-bold text-mainTextColor sm:text-4xl">
        <span className="border-b-4 border-blue-500 pb-2">
          Search by Categories
        </span>
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-between rounded-3xl bg-white p-4 shadow-md transition-all hover:shadow-lg"
            style={{ aspectRatio: "9 / 16" }}
          >
            <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-lg bg-gray-200 sm:h-20 sm:w-20 md:h-24 md:w-24">
              <svg
                className="h-8 w-8 text-gray-400 sm:h-10 sm:w-10 md:h-12 md:w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <span className="text-sm font-semibold text-navy-blue sm:text-base">
              {category}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
