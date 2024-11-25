import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

export const useTheaterChains = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theaterChains, setTheaterChains] = useState([]);

  useEffect(() => {
    const fetchTheaterChains = async () => {
      try {
        // Get all theater chains
        const chainsRef = collection(db, "theaterChains");
        const chainsSnapshot = await getDocs(chainsRef);

        // Process each chain and get its locations
        const chainsWithLocations = await Promise.all(
          chainsSnapshot.docs.map(async (chainDoc) => {
            const chainData = chainDoc.data();
            const locationsRef = collection(chainDoc.ref, "locations");
            const locationsSnapshot = await getDocs(locationsRef);

            const locations = locationsSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            return {
              id: chainDoc.id,
              ...chainData,
              locations,
            };
          }),
        );

        setTheaterChains(chainsWithLocations);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching theater chains:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTheaterChains();
  }, []);

  return { loading, error, theaterChains };
};
