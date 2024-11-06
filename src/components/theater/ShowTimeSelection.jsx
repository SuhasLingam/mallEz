import React from "react";

const ShowTimeSelection = ({ selectedShow, setSelectedShow }) => (
  <div className="mb-8">
    <label className="mb-4 block text-lg font-medium text-gray-700">
      Select Show Time
    </label>
    <div className="flex flex-wrap gap-3">
      {["10:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"].map((time) => (
        <button
          key={time}
          onClick={() => setSelectedShow({ time })}
          className={`group relative rounded-full px-6 py-2 transition-all duration-300 ${
            selectedShow?.time === time
              ? "bg-blue-500 text-white"
              : "border-2 border-gray-200 bg-white hover:border-blue-300"
          }`}
        >
          <span className="font-medium">{time}</span>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
            {time.includes("AM")
              ? "Morning Show"
              : time.includes("2:30")
                ? "Matinee"
                : time.includes("6:00")
                  ? "Evening Show"
                  : "Night Show"}
          </div>
        </button>
      ))}
    </div>
  </div>
);

export default ShowTimeSelection;
