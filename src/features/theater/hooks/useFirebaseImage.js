import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/firebaseConfig";

const DEFAULT_IMAGES = {
  theater: "/images/theater-placeholder.jpg",
  concession: "/images/food-placeholder.jpg",
  movie: "/images/movie-placeholder.jpg",
};

export const useFirebaseImage = (path, type = "concession") => {
  const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGES[type]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (!path) {
          throw new Error("No image path provided");
        }

        // If the path is already a full URL, use it directly
        if (path.startsWith("http")) {
          setImageUrl(path);
          setLoading(false);
          return;
        }

        // Otherwise, fetch from Firebase Storage
        const imageRef = ref(storage, path);
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
        setLoading(false);
      } catch (err) {
        console.error("Error loading image:", err);
        setError(err);
        setLoading(false);
        // Use type-specific fallback image
        setImageUrl(DEFAULT_IMAGES[type]);
      }
    };

    fetchImage();
  }, [path, type]);

  return { imageUrl, loading, error };
};
