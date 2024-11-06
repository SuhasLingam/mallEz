import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  exit: { opacity: 0, y: 50, transition: { duration: 0.5 } },
};

const Team = () => {
  const leaders = [
    { name: "Dattathreya K. S", title: "Founder & CEO" },
    { name: "Aryan Naidu", title: "Co-Founder & COO" },
    { name: "Suhas Lingam", title: "Chief Technical Officer" },
    { name: "Aryan Reddy", title: "Chief Design Officer" },
    { name: "NA", title: "NA" },
    { name: "NA", title: "NA" },
  ];

  return (
    <section className="min-h-screen bg-mainBackgroundColor py-10">
      <motion.h2
        className="my-11 mb-6 flex items-center justify-center text-4xl font-bold text-mainTextColor sm:mb-8 sm:text-5xl md:mb-7 md:text-8xl"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.2 }}
      >
        Meet Our Leadership
      </motion.h2>
      <div className="mt-[120px] grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
        {leaders.map((leader, index) => (
          <motion.div
            key={index}
            className="m-auto flex flex-col items-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            viewport={{ once: false, amount: 0.2 }}
          >
            <div className="mb-4 h-80 w-80 -rotate-12 rounded-lg bg-gray-300 md:mx-11"></div>
            <div className="my-11">
              <h3 className="text-xl font-semibold text-blue-900">
                {leader.name}
              </h3>
              <p className="text-gray-600">{leader.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Team;
