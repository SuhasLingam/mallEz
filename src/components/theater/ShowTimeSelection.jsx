import React from "react";
import { useFirebaseImage } from "../../features/theater/hooks/useFirebaseImage";

const formatTo12Hour = (time24) => {
  try {
    // Parse the time string (assuming format is "HH:mm" or "HH:mm AM/PM")
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours);

    // Convert to 12-hour format
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;

    return `${hour12}:${minutes} ${period}`;
  } catch (error) {
    // If parsing fails, return the original time
    return time24;
  }
};

const MovieCard = ({ movie, selectedShow, setSelectedShow }) => {
  const { imageUrl, loading } = useFirebaseImage(movie.imageUrl, "movie");

  return (
    <div className="mb-8 overflow-hidden rounded-xl bg-white shadow-lg">
      <div className="relative h-64">
        {loading ? (
          <div className="h-full w-full animate-pulse bg-gray-200" />
        ) : (
          <img
            src={imageUrl}
            alt={movie.movieName}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white">{movie.movieName}</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {movie.showTimes.map((show, index) => (
            <button
              key={index}
              onClick={() => setSelectedShow(show)}
              className={`rounded-lg p-4 text-center transition-all ${
                selectedShow === show
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 hover:bg-blue-50"
              }`}
            >
              <p className="text-lg font-semibold">
                {formatTo12Hour(show.time)}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ShowTimeSelection = ({
  currentMovies,
  selectedShow,
  setSelectedShow,
}) => {
  if (!currentMovies?.length) {
    return (
      <div className="mt-8 flex h-48 items-center justify-center rounded-lg bg-gray-50">
        <p className="text-gray-500">No shows available at this time</p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Select Show Time</h3>
      {currentMovies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          selectedShow={selectedShow}
          setSelectedShow={setSelectedShow}
        />
      ))}
    </div>
  );
};

export default ShowTimeSelection;
