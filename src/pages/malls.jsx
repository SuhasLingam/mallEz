import React from "react";
import MallOffers from "../components/mallOffers";
import MallOffersRev from "../components/mallsOfferRev";
import Footer from "../components/footer";

const malls = () => {
  return (
    <div className="bg-mainBackgroundColor h-max w-full">
      <MallOffers />
      <MallOffersRev />
      <Footer />
    </div>
  );
};

export default malls;
