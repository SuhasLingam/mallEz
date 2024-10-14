import React from "react";
import MallOffers from "../components/mallOffers";
import MallOffersRev from "../components/mallsOfferRev";
import Footer from "../components/footer";
import mallVector from "../assets/mallVector.svg";
import Navbar from "../components/navbar";

const malls = () => {
  // Dynamic data for the components
  const content = [
    {
      Component: MallOffers,
      title: "VR Chain",
      description:
        "VR Malls are redefining the shopping and entertainment landscape across India, offering a seamless blend of luxury, convenience, and culture. With six iconic locations—Bengaluru, Chennai, Surat, Punjab, Nagpur, and Amritsar—each VR Mall provides a unique experience while maintaining the high standards that the VR brand is known for.",
      image: mallVector,
      buttonText: "EXPLORE",
    },
    {
      Component: MallOffersRev,
      title: "FORUM Chain",
      description:
        "Forum Malls are vibrant spaces where fashion, food, and fun come together in perfect harmony. Spanning multiple cities across India, each Forum Mall offers a distinctive yet consistently exceptional experience, making it a beloved spot for shoppers and visitors alike.",
      image: mallVector,
      buttonText: "EXPLORE",
    },

    {
      Component: MallOffers,
      title: "VR Chain",
      description:
        "VR Malls are redefining the shopping and entertainment landscape across India, offering a seamless blend of luxury, convenience, and culture. With six iconic locations—Bengaluru, Chennai, Surat, Punjab, Nagpur, and Amritsar—each VR Mall provides a unique experience while maintaining the high standards that the VR brand is known for.",
      image: mallVector,
      buttonText: "EXPLORE",
    },
  ];

  return (
    <div className="h-max w-full bg-mainBackgroundColor">
      <div className="md:pb-[120px]">
        <Navbar />
      </div>
      {content.map(
        ({ Component, title, description, image, buttonText }, index) => (
          <div key={index}>
            <Component
              title={title}
              description={description}
              image={image}
              buttonText={buttonText}
            />
          </div>
        ),
      )}
      <Footer />
    </div>
  );
};

export default malls;
