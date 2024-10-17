import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const offers = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

const TopOffers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + offers.length) % offers.length,
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const getVisibleOffers = useCallback(() => {
    return [-1, 0, 1].map((offset) => {
      const index = (currentIndex + offset + offers.length) % offers.length;
      return { ...offers[index], position: offset };
    });
  }, [currentIndex]);

  return (
    <div className="my-8">
      <div className="relative mx-auto max-w-xs overflow-hidden rounded-xl bg-gradient-to-r from-blue-100 to-blue-200 p-4 shadow-lg sm:max-w-md sm:p-6 md:max-w-2xl md:p-8 lg:max-w-4xl xl:max-w-5xl">
        <div className="flex items-center justify-center">
          <button
            onClick={prevSlide}
            className="absolute left-2 z-10 text-2xl text-blue-900 transition-colors duration-200 hover:text-blue-700 focus:outline-none sm:left-4 sm:text-4xl"
            aria-label="Previous offer"
          >
            &#8249;
          </button>
          <div className="flex h-48 w-full items-center justify-center sm:h-64 md:h-80">
            <AnimatePresence initial={false} custom={direction}>
              {getVisibleOffers().map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  position={offer.position}
                  direction={direction}
                />
              ))}
            </AnimatePresence>
          </div>
          <button
            onClick={nextSlide}
            className="absolute right-2 z-10 text-2xl text-blue-900 transition-colors duration-200 hover:text-blue-700 focus:outline-none sm:right-4 sm:text-4xl"
            aria-label="Next offer"
          >
            &#8250;
          </button>
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
      className="absolute rounded-lg bg-gradient-to-br from-blue-900 to-blue-700 p-3 text-white shadow-lg sm:p-4"
      style={{
        width: "calc(100% - 2rem)",
        maxWidth: "256px",
        height: "calc(100% - 2rem)",
        maxHeight: "320px",
      }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.2 }}
        className="flex h-full flex-col justify-between"
      >
        {/* Placeholder elements instead of text */}
        <div className="h-4 w-3/4 rounded bg-white bg-opacity-20"></div>
        <div className="h-4 w-1/2 rounded bg-white bg-opacity-20"></div>
      </motion.div>
    </motion.div>
  );
});

export default TopOffers;
