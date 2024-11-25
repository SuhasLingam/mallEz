import { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { seedTheaterData } from "../utils/seedTheaterData";

export const useTheaterData = (chainId, locationId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theaterData, setTheaterData] = useState(null);
  const [screens, setScreens] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [concessions, setConcessions] = useState([]);

  useEffect(() => {
    const fetchTheaterData = async () => {
      try {
        let currentChainId = chainId;
        let currentLocationId = locationId;

        // If no IDs provided, seed data and get the IDs
        if (!chainId || !locationId) {
          const { chainId: newChainId, locationId: newLocationId } =
            await seedTheaterData();
          currentChainId = newChainId;
          currentLocationId = newLocationId;
        }

        const locationRef = doc(
          db,
          "theaterChains",
          currentChainId,
          "locations",
          currentLocationId,
        );

        const locationSnap = await getDoc(locationRef);

        // If location doesn't exist, seed the data
        if (!locationSnap.exists()) {
          const { chainId: newChainId, locationId: newLocationId } =
            await seedTheaterData();
          currentChainId = newChainId;
          currentLocationId = newLocationId;

          // Fetch again after seeding
          const newLocationRef = doc(
            db,
            "theaterChains",
            currentChainId,
            "locations",
            currentLocationId,
          );
          const newLocationSnap = await getDoc(newLocationRef);
          setTheaterData(newLocationSnap.data());
        } else {
          setTheaterData(locationSnap.data());
        }

        // Fetch related collections
        const screensSnap = await getDocs(collection(locationRef, "screens"));
        setScreens(
          screensSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        );

        const moviesSnap = await getDocs(
          collection(locationRef, "currentMovies"),
        );
        setCurrentMovies(
          moviesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        );

        const concessionsSnap = await getDocs(
          collection(locationRef, "concessions"),
        );
        setConcessions(
          concessionsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        );

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTheaterData();
  }, [chainId, locationId]);

  return {
    loading,
    error,
    theaterData,
    screens,
    currentMovies,
    concessions,
  };
};
