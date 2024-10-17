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
import Footer from "../components/footer";

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
        <div className="mb-8 rounded-lg bg-white p-4 shadow-lg sm:p-6">
          <h1 className="mb-8 text-center text-3xl font-bold text-mainTextColor sm:text-4xl">
            <span className="border-b-4 border-blue-500 pb-2">
              {mallData.location?.name || "VR CHENNAI"}
            </span>
          </h1>
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search for stores, brands, or items"
              className="w-full rounded-full border-2 border-blue-500 bg-gray-100 px-4 py-2 pr-10 text-base focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 sm:px-6 sm:py-3 sm:text-lg"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600 sm:right-4">
              <FaSearch className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
          <FloorButtons floors={floors} />
          <TopOffers />
        </div>
        <div className="rounded-lg bg-sky-50 p-4 shadow-lg sm:p-8">
          <CategorySearch />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IndividualMall;
