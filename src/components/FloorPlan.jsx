import React from "react";

const FloorPlan = ({ floors }) => {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {floors.map((floor, index) => (
        <div
          key={index}
          className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md"
        >
          <div className="mb-2 h-16 w-16 rounded-lg bg-gray-200"></div>
          <h3 className="text-base font-semibold sm:text-lg">{floor.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default FloorPlan;
