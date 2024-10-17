import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Navbar from "../components/navbar";
import CityImage from "../components/CityImage";
import FloorButtons from "../components/FloorButtons";
import TopOffers from "../components/TopOffers";
import { CategorySearch } from "../components/CategorySearch";
import { FaSearch } from "react-icons/fa";

const IndividualMall = () => {
  const { mallId, locationId } = useParams();
  const [mallData, setMallData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMallData = async () => {
      setLoading(true);
      try {
        const mallRef = doc(db, "mallChains", mallId);
        const mallSnap = await getDoc(mallRef);

        if (mallSnap.exists()) {
          const mallData = { id: mallSnap.id, ...mallSnap.data() };
          const locationRef = doc(
            db,
            "mallChains",
            mallId,
            "locations",
            locationId,
          );
          const locationSnap = await getDoc(locationRef);

          if (locationSnap.exists()) {
            const locationData = {
              id: locationSnap.id,
              ...locationSnap.data(),
            };
            setMallData({ ...mallData, location: locationData });
          } else {
            setError("Location not found");
          }
        } else {
          setError("Mall not found");
        }
      } catch (error) {
        console.error("Error fetching mall data:", error);
        setError("Failed to fetch mall data");
      } finally {
        setLoading(false);
      }
    };

    fetchMallData();
  }, [mallId, locationId]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex h-screen items-center justify-center">
        Error: {error}
      </div>
    );
  if (!mallData)
    return (
      <div className="flex h-screen items-center justify-center">
        No data available
      </div>
    );

  const floors = ["GROUND FLOOR", "FLOOR 1", "FLOOR 2", "FLOOR 3"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-300 to-white">
      <Navbar />
      <CityImage
        cityName={mallData.location?.name || "VR CHENNAI"}
        imageUrl={mallData.location?.imageUrl}
      />
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-6 text-3xl font-bold text-gray-800">
            {mallData.location?.name || "VR CHENNAI"}
          </h1>
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search for stores, brands, or items"
              className="w-full rounded-full border-2 border-blue-500 bg-gray-100 px-6 py-3 pr-12 text-lg focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600">
              <FaSearch className="h-5 w-5" />
            </button>
          </div>
          <FloorButtons floors={floors} />
          <TopOffers />
        </div>
        {/* You can add other components like CategorySearch here if needed */}
      </div>
    </div>
  );
};

export default IndividualMall;
