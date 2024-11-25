import React from "react";

const AuditoriumSelection = ({ screens, selectedAudi, setSelectedAudi }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Select Auditorium</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {screens.map((screen) => (
          <button
            key={screen.id}
            onClick={() => setSelectedAudi(screen)}
            className={`rounded-lg p-4 text-left transition-all ${
              selectedAudi?.id === screen.id
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-blue-50"
            }`}
          >
            <h4 className="text-lg font-semibold">{screen.name}</h4>
            <p className="text-sm">Capacity: {screen.capacity} seats</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {screen.features.map((feature) => (
                <span
                  key={feature}
                  className={`rounded-full px-2 py-1 text-xs ${
                    selectedAudi?.id === screen.id
                      ? "bg-blue-500"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {feature}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AuditoriumSelection;
