import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheaterChains } from "../features/theater/hooks/useTheaterChains";
import Navbar from "../components/navbar";

const LocationCard = ({ location, chainId }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
    className="group relative overflow-hidden rounded-2xl bg-white"
  >
    <div className="aspect-video overflow-hidden">
      <img
        src={location.imageUrl}
        alt={location.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
      <h3 className="text-2xl font-bold">{location.name}</h3>
      <p className="mt-2 text-sm text-gray-300">{location.address}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {location.features?.map((feature) => (
          <span
            key={feature}
            className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm"
          >
            {feature}
          </span>
        ))}
      </div>
      <Link
        to={`/theater/${chainId}/${location.id}`}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/10 px-6 py-2 backdrop-blur-sm transition-colors hover:bg-white/20"
      >
        Book Now
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  </motion.div>
);

const TheaterChainCard = ({ chain }) => (
  <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 shadow-xl">
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-white">{chain.title}</h2>
      <p className="mt-2 text-blue-200">{chain.description}</p>
    </div>
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {chain.locations.map((location) => (
        <LocationCard
          key={location.id}
          location={location}
          chainId={chain.id}
        />
      ))}
    </div>
  </div>
);

const TheaterChains = () => {
  const { loading, error, theaterChains } = useTheaterChains();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");

  const cities = [
    "All",
    "Bangalore",
    "Mumbai",
    "Delhi",
    "Chennai",
    "Hyderabad",
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <Navbar />
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <div className="text-center">
            <div className="relative mx-auto mb-4 h-16 w-16">
              <div className="absolute h-16 w-16 animate-ping rounded-full bg-blue-400 opacity-75"></div>
              <div className="relative h-16 w-16 animate-spin rounded-full border-b-2 border-blue-600"></div>
            </div>
            <p className="text-lg text-gray-600">Loading theaters...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <Navbar />
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center p-4">
          <div className="max-w-md rounded-xl bg-red-50 p-8 text-center">
            <svg
              className="mx-auto mb-4 h-12 w-12 text-red-500"
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
            <p className="mb-2 text-lg font-semibold text-red-800">
              Error loading theaters
            </p>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const filteredChains = theaterChains?.filter((chain) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      chain?.title?.toLowerCase().includes(searchLower) ||
      chain?.locations?.some(
        (location) =>
          location?.name?.toLowerCase().includes(searchLower) ||
          location?.address?.toLowerCase().includes(searchLower),
      );

    const matchesCity =
      selectedCity === "All" ||
      chain?.locations?.some((location) =>
        location?.address?.includes(selectedCity),
      );

    return matchesSearch && matchesCity;
  });

  return (
    <div className="min-h-screen bg-mainBackgroundColor pt-16">
      <Navbar />

      {/* Hero Section with Fixed Background */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3"
            alt="Theaters"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-4 text-5xl font-bold text-white md:text-7xl"
          >
            Movie Theaters
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xl text-gray-200"
          >
            Experience cinema at its finest
          </motion.p>
        </div>
      </div>

      {/* Updated Search and Filter Section */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-12 rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search theaters by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 pl-12 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* City Filter
            <div className="md:w-64 w-full">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="rounded-xl bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 w-full p-4 text-gray-900 border border-gray-200"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select> 
            </div>*/}
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedCity !== "All") && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              {searchTerm && (
                <span className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                  Search: {searchTerm}
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-1 rounded-full hover:text-blue-600"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCity !== "All" && (
                <span className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                  City: {selectedCity}
                  <button
                    onClick={() => setSelectedCity("All")}
                    className="ml-1 rounded-full hover:text-blue-600"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCity("All");
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Theater Chains Section */}
        <div className="mt-8 space-y-12">
          <AnimatePresence>
            {filteredChains?.length > 0 ? (
              filteredChains.map((chain) => (
                <motion.div
                  key={chain.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <TheaterChainCard chain={chain} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex h-48 items-center justify-center rounded-2xl bg-white text-center shadow-lg"
              >
                <div>
                  <p className="text-lg font-medium text-gray-600">
                    {searchTerm || selectedCity !== "All"
                      ? "No theaters found matching your search criteria."
                      : "No theaters available."}
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCity("All");
                    }}
                    className="mt-4 text-blue-600 hover:text-blue-700"
                  >
                    Clear filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TheaterChains;
