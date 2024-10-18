import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useParams } from "react-router-dom";

const TopOffers = () => {
  const { mallId, locationId } = useParams();
  const [offers, setOffers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offersRef = collection(
          db,
          "mallChains",
          mallId,
          "locations",
          locationId,
          "MallOffers",
        );
        const offersSnapshot = await getDocs(offersRef);
        const offersData = offersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOffers(offersData);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    if (mallId && locationId) {
      fetchOffers();
    }
  }, [mallId, locationId]);

  const nextSlide = useCallback(() => {
    if (offers.length > 1) {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }
  }, [offers.length]);

  const prevSlide = useCallback(() => {
    if (offers.length > 1) {
      setDirection(-1);
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + offers.length) % offers.length,
      );
    }
  }, [offers.length]);

  useEffect(() => {
    if (offers.length > 1) {
      const interval = setInterval(() => {
        nextSlide();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [nextSlide, offers.length]);

  const getVisibleOffers = useCallback(() => {
    if (offers.length === 0) return [];
    if (offers.length === 1) return [{ ...offers[0], position: 0 }];
    return [-1, 0, 1].map((offset) => {
      const index = (currentIndex + offset + offers.length) % offers.length;
      return { ...offers[index], position: offset };
    });
  }, [currentIndex, offers]);

  if (offers.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      <div className="relative mx-auto max-w-xs overflow-hidden rounded-xl bg-gradient-to-r from-blue-100 to-blue-200 p-4 shadow-lg sm:max-w-md sm:p-6 md:max-w-2xl md:p-8 lg:max-w-4xl xl:max-w-5xl">
        <div className="flex items-center justify-center">
          {offers.length > 1 && (
            <button
              onClick={prevSlide}
              className="absolute left-2 z-10 text-2xl text-blue-900 transition-colors duration-200 hover:text-blue-700 focus:outline-none sm:left-4 sm:text-4xl"
              aria-label="Previous offer"
            >
              &#8249;
            </button>
          )}
          <div className="flex h-48 w-full items-center justify-center sm:h-64 md:h-80">
            <AnimatePresence initial={false} custom={direction}>
              {getVisibleOffers().map((offer) => (
                <OfferCard
                  key={`${offer.id}-${offer.position}`}
                  offer={offer}
                  position={offer.position}
                  direction={direction}
                />
              ))}
            </AnimatePresence>
          </div>
          {offers.length > 1 && (
            <button
              onClick={nextSlide}
              className="absolute right-2 z-10 text-2xl text-blue-900 transition-colors duration-200 hover:text-blue-700 focus:outline-none sm:right-4 sm:text-4xl"
              aria-label="Next offer"
            >
              &#8250;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const OfferCard = React.memo(({ offer, position, direction }) => {
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: `${position * 110}%`,
      opacity: position === 0 ? 1 : 0.7,
      scale: 1,
      zIndex: position === 0 ? 2 : 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <motion.div
      layout
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
        layout: { duration: 0.3 },
      }}
      className="absolute overflow-hidden rounded-lg p-0 shadow-lg"
      style={{
        width: "calc(100% - 2rem)",
        maxWidth: "256px",
        height: "calc(100% - 2rem)",
        maxHeight: "320px",
      }}
    >
      {offer.imageUrl ? (
        <img
          src={offer.imageUrl}
          alt="Offer"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700">
          <span className="text-lg font-semibold text-white">
            Offer {offer.id}
          </span>
        </div>
      )}
    </motion.div>
  );
});

export default TopOffers;
