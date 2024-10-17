import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // Make sure this path is correct
import MallOffers from "../components/mallOffers";
import MallOffersRev from "../components/mallsOfferRev";
import Footer from "../components/footer";
import mallVector from "../assets/mallVector.svg";
import Navbar from "../components/navbar";

const Malls = () => {
  const [mallChains, setMallChains] = useState([]);

  useEffect(() => {
    const fetchMallChainsFromFirestore = async () => {
      const mallChainsCollection = collection(db, "mallChains");

      try {
        const querySnapshot = await getDocs(mallChainsCollection);
        const fetchedMallChains = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          redirectDirectory: doc.data().redirectDirectory || "", // Add this line
        }));
        setMallChains(fetchedMallChains);
      } catch (error) {
        console.error("Error fetching mall chains: ", error);
      }
    };

    fetchMallChainsFromFirestore();
  }, []);

  const content = mallChains.map((mallChain, index) => ({
    ...mallChain,
    Component: index % 2 === 0 ? MallOffers : MallOffersRev,
    image: mallVector,
    buttonText: "EXPLORE",
  }));

  return (
    <div className="h-max bg-mainBackgroundColor w-full">
      <div className="">
        <Navbar />
      </div>
      {content.map(
        (
          {
            Component,
            title,
            description,
            image,
            buttonText,
            redirectDirectory,
          },
          index,
        ) => (
          <div key={index}>
            <Component
              title={title}
              description={description}
              image={image}
              buttonText={buttonText}
              redirectDirectory={redirectDirectory}
            />
          </div>
        ),
      )}
      <Footer />
    </div>
  );
};

export default Malls;
