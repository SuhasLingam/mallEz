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
    { name: "Elon Musk", title: "Chai Sutta Shop Owner" },
    { name: "Bill Gates", title: "GateKeper" },
  ];

  return (
    <section className="bg-mainBackgroundColor min-h-screen py-10">
      <motion.h2
        className="sm:text-5xl md:text-8xl sm:mb-8 md:mb-7 text-mainTextColor my-11 flex items-center justify-center mb-6 text-4xl font-bold"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.2 }}
      >
        Meet Our Leadership
      </motion.h2>
      <div className="md:grid-cols-2 mt-[120px] lg:grid-cols-3 grid grid-cols-1 gap-8 px-4">
        {leaders.map((leader, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center m-auto"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            viewport={{ once: false, amount: 0.2 }}
          >
            <div className="w-80 h-80 md:mx-11 -rotate-12 mb-4 bg-gray-300 rounded-lg"></div>
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
