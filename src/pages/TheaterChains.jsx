import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheaterChains } from "../features/theater/hooks/useTheaterChains";
import Navbar from "../components/navbar";

const LocationCard = ({ location, chainId }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className="overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
  >
    <div className="relative h-48">
      <img
        src={location.imageUrl}
        alt={location.name}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-2xl font-bold text-white">{location.name}</h3>
      </div>
    </div>
    <div className="p-6">
      <p className="mb-4 text-gray-600">{location.address}</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {location.features?.map((feature) => (
          <span
            key={feature}
            className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
          >
            {feature}
          </span>
        ))}
      </div>
      <Link
        to={`/theater/${chainId}/${location.id}`}
        className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-all hover:bg-blue-700"
      >
        Book Now
      </Link>
    </div>
  </motion.div>
);

const TheaterChainSection = ({ chain }) => (
  <div className="mb-12">
    <div className="mb-6">
      <h2 className="text-3xl font-bold text-gray-800">{chain.title}</h2>
      <p className="text-gray-600">{chain.description}</p>
    </div>
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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

const Theaters = () => {
  const { loading, error, theaterChains } = useTheaterChains();
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return (
      <div className="min-h-screen pt-16">
        <Navbar />
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-gray-600">Loading theaters...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-16">
        <Navbar />
        <div className="flex h-96 items-center justify-center">
          <div className="rounded-lg bg-red-50 p-6 text-center text-red-600">
            <p className="mb-2 text-lg font-semibold">Error loading theaters</p>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const filteredChains =
    searchTerm && theaterChains
      ? theaterChains.filter((chain) => {
          const searchLower = searchTerm.toLowerCase();
          return (
            chain?.title?.toLowerCase().includes(searchLower) ||
            chain?.locations?.some(
              (location) =>
                location?.name?.toLowerCase().includes(searchLower) ||
                location?.address?.toLowerCase().includes(searchLower),
            )
          );
        })
      : theaterChains || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-300 to-white pt-16">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3"
          alt="Theaters"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
          <h1 className="mb-4 text-5xl font-bold text-white">Movie Theaters</h1>
          <p className="text-xl text-gray-200">Choose your favorite theater</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 rounded-xl bg-white p-4 shadow-lg">
          <input
            type="text"
            placeholder="Search theaters by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-200 p-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Theater Chains Sections */}
        {filteredChains.length > 0 ? (
          filteredChains.map((chain) => (
            <TheaterChainSection key={chain.id} chain={chain} />
          ))
        ) : (
          <div className="flex h-48 items-center justify-center rounded-xl bg-gray-50">
            <p className="text-gray-500">
              {searchTerm
                ? "No theaters found matching your search."
                : "No theaters available."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Theaters;
