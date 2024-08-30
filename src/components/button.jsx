import React from "react";

const Button = ({ text }) => {
  return (
    <button className="bg-white text-lg md:text-2xl font-semibold hover:text-white hover:bg-gradient-to-b hover:from-[#08E3FF] hover:to-[#5799F7] text-mainTextColor p-2 md:p-4 px-4 md:px-10 rounded-full shadow-md transition-all duration-300 ease-in-out">
      {text}
    </button>
  );
};

export default Button;
