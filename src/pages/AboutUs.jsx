import React, { useState, useEffect } from "react"; // Added useEffect import
import AboutBG from "../assets/aboutBG.svg";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  exit: { opacity: 0, y: 50, transition: { duration: 0.5 } },
};

const AboutUs = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="bg-mainBackgroundColor">
        <Navbar />
      </div>
      <div className="bg-mainBackgroundColor md:pt-[100px] font-poppins flex flex-col items-center justify-center h-full m-auto">
        {/** About Us */}
        <motion.span
          className="sm:text-5xl md:text-8xl sm:my-8 md:my-11 text-mainTextColor my-6 text-4xl font-bold"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: false, amount: 0.2 }}
        >
          About MallEZ
        </motion.span>
        <motion.div
          className="sm:space-y-8 md:space-y-11 sm:px-8 md:px-11 sm:text-xl md:text-2xl flex flex-col items-center justify-center px-4 space-y-6 text-lg text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: false, amount: 0.2 }}
        >
          <p>
            Welcome to <span className="px-2 font-bold">MallEZ©</span>, your
            ultimate digital guide to all the malls in your locality!
          </p>
          <p>
            At MallEZ, we believe that shopping should be an experience, not a
            hassle. That's why we've created a unified platform where you can
            explore all the malls around you, discover the best deals, navigate
            effortlessly, and make the most out of your visits.
          </p>
          <p>
            We want to profit with our members, not from them. That’s why MallEZ
            doesn’t rely on monthly service fees, or minimum balance
            requirements.
          </p>
        </motion.div>

        {/** Our Mission */}
        <motion.div
          className="sm:px-8 md:px-11 sm:py-8 md:py-11 sm:mt-8 md:mt-11 border-slate-400 border-y-2 sm:border-y-3 md:border-y-4 sm:space-y-8 md:space-y-10 sm:text-xl md:text-2xl flex flex-col items-center justify-center px-4 py-6 mt-6 space-y-6 text-lg text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: false, amount: 0.2 }}
        >
          <span className="sm:text-5xl md:text-8xl sm:mb-8 md:mb-7 text-mainTextColor mb-6 text-4xl font-bold">
            Our Mission
          </span>
          <div>
            <p>
              <span className="sm:px-2 px-1 font-bold">
                Our mission is simple:
              </span>{" "}
              to bring convenience, excitement, and savings to your shopping
              adventures. We aim to bridge the gap between shoppers and malls by
              offering a seamless interface where you can access detailed
              information about malls, shops, offers, and much more—{" "}
              <span className="px-1 font-bold">all in one place.</span>
            </p>
          </div>
        </motion.div>

        {/** What We Offer */}
        <motion.div
          className="sm:mt-8 md:mt-11 sm:px-8 md:px-11 sm:py-8 md:py-11 border-slate-400 sm:text-xl md:text-2xl sm:border-b-3 md:border-b-4 flex flex-col justify-center min-h-screen px-4 py-6 mt-6 text-lg bg-no-repeat bg-cover border-b-2"
          style={{
            backgroundImage: width < 768 ? "none" : `url(${AboutBG})`,
            backgroundSize: "cover",
          }}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: false, amount: 0.2 }}
        >
          <span className="sm:text-5xl md:text-8xl sm:mb-8 md:mb-7 text-mainTextColor sm:ml-8 md:ml-11 flex mb-6 ml-4 text-4xl font-bold text-left">
            What We Offer:
          </span>
          <div className="flex">
            <ul className="sm:ml-8 md:ml-11 sm:py-8 md:py-11 py-6 ml-4 list-disc">
              <li className="sm:py-3 md:py-4 py-2">
                <span className="sm:px-2 px-1 font-bold">
                  {" "}
                  All Malls in One Place:
                </span>{" "}
                Explore all the malls in your area with just a few clicks.
                Whether you're looking for the latest fashion trends, the best
                dining options, or the newest entertainment spots, MallEZ has
                got you covered.
              </li>
              <li className="sm:py-3 md:py-4 py-2">
                <span className="sm:px-2 px-1 font-bold">
                  Exclusive Offers and Coupons:
                </span>
                Never miss out on a deal! Get access to exclusive offers, redeem
                codes, and coupons that you can use on your favorite brands and
                stores.
              </li>
              <li className="sm:py-3 md:py-4 py-2">
                <span className="sm:px-2 px-1 font-bold">
                  In-Mall Navigation:
                </span>{" "}
                Lost inside a mall? Not anymore! Our in-mall navigation system
                ensures you find your way to your desired shop or facility
                without any hassle.
              </li>
              <li className="sm:py-3 md:py-4 py-2">
                <span className="sm:px-2 px-1 font-bold">
                  {" "}
                  Tokenized System for Purchases:
                </span>{" "}
                Experience the future of shopping with our tokenized purchase
                system, which makes transactions faster, easier, and more
                secure.
              </li>
              <li className="sm:py-3 md:py-4 py-2">
                <span className="sm:px-2 px-1 font-bold">
                  Automated Parking Management:
                </span>{" "}
                Say goodbye to parking headaches. With our automated parking
                system integrated with ANPR (Automatic Number Plate Recognition)
                cameras, managing parking payments has never been this smooth.
              </li>
            </ul>
          </div>
        </motion.div>

        {/** Why MallEZ */}
        <motion.div
          className="sm:px-8 md:px-11 sm:py-8 md:py-11 sm:mt-8 md:mt-11 border-slate-400 sm:space-y-8 md:space-y-10 sm:text-xl md:text-2xl sm:border-b-3 md:border-b-4 flex flex-col items-center justify-center px-4 py-6 mt-6 space-y-6 text-lg text-center border-b-2"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: false, amount: 0.2 }}
        >
          <span className="sm:text-5xl md:text-8xl sm:mb-8 md:mb-7 text-mainTextColor mb-6 text-4xl font-bold">
            Why MallEZ:
          </span>
          <p>
            We understand that today's shoppers demand more than just a place to
            buy goods, they want an experience that’s easy, efficient, and
            enjoyable. MallEZ is here to revolutionize the way you shop by
            bringing all your mall needs into one comprehensive platform. With a
            focus on customer convenience and innovative technology, we’re
            setting a new standard in the shopping industry.
          </p>
          <span className="sm:mb-8 md:mb-11 text-mainTextColor sm:text-xl md:text-2xl mb-6 text-lg font-bold">
            Join Us on Our Journey
          </span>
        </motion.div>

        {/** Join Us */}
        <motion.div
          className="sm:px-8 md:px-11 sm:py-8 md:py-11 sm:mt-8 md:mt-11 border-slate-400 sm:space-y-8 md:space-y-10 sm:text-xl md:text-2xl sm:border-b-3 md:border-b-4 flex flex-col items-center justify-center px-4 py-6 mt-6 space-y-6 text-lg text-center border-b-2"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: false, amount: 0.2 }}
        >
          <span className="sm:text-5xl md:text-8xl sm:mb-8 md:mb-7 text-mainTextColor mb-6 text-4xl font-bold">
            Join Us on Our Journey:
          </span>
          <p>
            MallEZ is more than just an app; it’s a community of shoppers who
            value convenience and innovation. We’re constantly evolving and
            adding new features to make your shopping experience even better.
            Join us on our journey to make shopping at malls easier and more
            enjoyable than ever before.
          </p>
          <span className="sm:mb-8 md:mb-11 text-mainTextColor sm:text-xl md:text-2xl mb-6 text-lg font-bold">
            Feel the Ease, Shop with MallEZ
          </span>
        </motion.div>
      </div>
    </>
  );
};

export default AboutUs;
