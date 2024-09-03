import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ text, redirectTo }) => {
  const [lastColor, setLastColor] = useState("#08E3FF");
  const [currentColor, setCurrentColor] = useState("#5799F7");
  const navigate = useNavigate();

  const handleClick = (e) => {
    const ripple = document.createElement("span");
    const rect = e.target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.style.background = `linear-gradient(135deg, ${lastColor}, ${currentColor})`;
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple-animation 0.6s linear";
    ripple.style.pointerEvents = "none";
    e.target.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
      if (redirectTo) {
        navigate(redirectTo);
      }
    }, 600);

    setLastColor(currentColor);
    setCurrentColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  };

  return (
    <button
      onClick={handleClick}
      className="relative overflow-hidden bg-white text-lg md:text-2xl font-semibold text-mainTextColor p-2 md:p-4 px-4 md:px-10 rounded-full shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:text-white hover:bg-gradient-to-b hover:from-[#08E3FF] hover:to-[#5799F7] focus:outline-none"
    >
      {text}
      <style>{`
        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
};

export default Button;
