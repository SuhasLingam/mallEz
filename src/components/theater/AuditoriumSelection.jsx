import React from "react";

const AuditoriumSelection = ({ selectedAudi, setSelectedAudi }) => (
  <div className="mb-8">
    <label className="mb-4 block text-lg font-medium text-gray-700">
      Select Auditorium
    </label>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {[1, 2, 3].map((audiNum) => (
        <div
          key={audiNum}
          onClick={() =>
            setSelectedAudi({
              id: audiNum,
              name: `Audi ${audiNum}`,
            })
          }
          className={`transform cursor-pointer rounded-xl p-4 transition-all duration-300 hover:scale-105 ${
            selectedAudi?.id === audiNum
              ? "bg-blue-500 text-white shadow-lg"
              : "border-2 border-gray-200 bg-white hover:border-blue-300"
          }`}
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold">Audi {audiNum}</h3>
            <p className="mt-1 text-sm opacity-80">
              {audiNum === 1
                ? "Dolby Atmos"
                : audiNum === 2
                  ? "4K Screen"
                  : "IMAX"}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AuditoriumSelection;
