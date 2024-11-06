import React from "react";

const SeatInput = ({
  selectedSeats,
  setSelectedSeats,
  tempSeat,
  setTempSeat,
  validateSeatNumber,
}) => (
  <div className="mb-8">
    <label className="mb-4 block text-lg font-medium text-gray-700">
      Enter Seat Numbers
    </label>
    <div className="space-y-4">
      <div className="relative">
        <div className="mb-2 flex flex-wrap gap-2">
          {selectedSeats.map((seat, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm"
            >
              {seat}
              <button
                onClick={() =>
                  setSelectedSeats(selectedSeats.filter((_, i) => i !== index))
                }
                className="ml-2 text-gray-500 hover:text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g., A12, B5, C8"
            className={`flex-1 rounded-lg border-2 p-3 text-lg transition-all ${
              selectedSeats.length > 0
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            } focus:outline-none`}
            value={tempSeat}
            onChange={(e) => setTempSeat(e.target.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === "Enter" && tempSeat) {
                e.preventDefault();
                if (validateSeatNumber(tempSeat)) {
                  if (selectedSeats.length >= 10) {
                    alert("Maximum 10 seats allowed");
                    return;
                  }
                  if (!selectedSeats.includes(tempSeat)) {
                    setSelectedSeats([...selectedSeats, tempSeat]);
                    setTempSeat("");
                  }
                }
              }
            }}
            maxLength={3}
          />
          <button
            onClick={() => {
              if (validateSeatNumber(tempSeat)) {
                if (selectedSeats.length >= 10) {
                  alert("Maximum 10 seats allowed");
                  return;
                }
                if (!selectedSeats.includes(tempSeat)) {
                  setSelectedSeats([...selectedSeats, tempSeat]);
                  setTempSeat("");
                }
              }
            }}
            disabled={!tempSeat || selectedSeats.length >= 10}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-300"
          >
            Add Seat
          </button>
        </div>

        <div className="mt-2 text-sm">
          <div className="flex items-center text-gray-500">
            <svg
              className="mr-1 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Enter row (A-F) followed by seat number (1-30). Maximum 10 seats
            allowed.
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SeatInput;
