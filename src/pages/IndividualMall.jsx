import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Navbar from "../components/navbar";
import CityImage from "../components/CityImage";
import FloorPlan from "../components/FloorPlan";
import TopOffers from "../components/TopOffers";
import CategorySearch from "../components/CategorySearch";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-300 to-white">
      <Navbar />
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <CityImage
          cityName={mallData.location?.name}
          imageUrl={mallData.location?.imageUrl}
        />
        <FloorPlan floors={mallData.location?.floors || []} />
        <TopOffers offers={mallData.location?.topOffers || []} />
        <CategorySearch categories={mallData.location?.categories || []} />
      </div>
    </div>
  );
};

export default IndividualMall;
