import React from "react";
import { useFirebaseImage } from "../../features/theater/hooks/useFirebaseImage";

const TheaterHero = ({ theaterData }) => {
  const { imageUrl, loading } = useFirebaseImage(
    theaterData?.imageUrl,
    "theater",
  );

  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      {loading ? (
        <div className="h-full w-full animate-pulse bg-gray-200" />
      ) : (
        <img
          src={imageUrl}
          alt={theaterData?.name}
          className="brightness-40 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
        <h1 className="mb-4 text-5xl font-bold text-white md:text-7xl">
          {theaterData?.name}
        </h1>
        <p className="text-xl text-gray-200">{theaterData?.address}</p>
      </div>
    </div>
  );
};

export default TheaterHero;
