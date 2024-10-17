import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import MallOffers from "../components/mallOffers";
import MallOffersRev from "../components/mallsOfferRev";
import Footer from "../components/footer";
import mallVector from "../assets/mallVector.svg";
import Navbar from "../components/navbar";
import MallOverlay from "../components/MallOverlay";
import { AnimatePresence } from "framer-motion";

const Malls = () => {
  const [mallChains, setMallChains] = useState([]);
  const [selectedMall, setSelectedMall] = useState(null);

  useEffect(() => {
    const fetchMallChainsFromFirestore = async () => {
      const mallChainsCollection = collection(db, "mallChains");

      try {
        const querySnapshot = await getDocs(mallChainsCollection);
        const fetchedMallChains = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const mallChainData = doc.data();
            const locationsSnapshot = await getDocs(
              collection(db, "mallChains", doc.id, "locations"),
            );
            const locations = locationsSnapshot.docs.map((locDoc) => ({
              id: locDoc.id,
              ...locDoc.data(),
            }));
            return {
              id: doc.id,
              ...mallChainData,
              locations: locations,
            };
          }),
        );
        setMallChains(fetchedMallChains);
        console.log("Fetched mall chains:", fetchedMallChains);
      } catch (error) {
        console.error("Error fetching mall chains: ", error);
      }
    };

    fetchMallChainsFromFirestore();

    return () => {
      console.log("Malls component unmounting");
    };
  }, []);

  const handleExplore = (mall) => {
    console.log("Explore clicked for mall:", mall);
    setSelectedMall(mall);
  };

  const content = mallChains.map((mallChain, index) => ({
    ...mallChain,
    Component: index % 2 === 0 ? MallOffers : MallOffersRev,
    image: mallVector,
    buttonText: "EXPLORE",
  }));

  return (
    <div className="h-max w-full bg-mainBackgroundColor">
      <Navbar />
      {content.map((item, index) => (
        <div key={index}>
          <item.Component
            title={item.title}
            description={item.description}
            image={item.image}
            buttonText={item.buttonText}
            onButtonClick={() => {
              console.log("Button clicked for:", item.title);
              handleExplore(item);
            }}
          />
        </div>
      ))}
      <AnimatePresence>
        {selectedMall && (
          <MallOverlay
            mall={selectedMall}
            onClose={() => {
              console.log("Closing overlay");
              setSelectedMall(null);
            }}
          />
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Malls;
