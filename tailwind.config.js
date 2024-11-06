/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        inner: "inset 0 0 3px rgba(0, 0, 0, 0.9)",
      },
      backgroundImage: {
        home2bg: "./assets/homebg-2.svg",
      },
      colors: {
        mainBackgroundColor: "#CBECFC",
        mainTextColor: "#000D49",
        "navy-blue": "#000080", // Adjust this value to match your desired navy blue
        "light-blue": "#E6F3FF", // Adjust this value to match the background in the image
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },

      keyframes: {
        slideDown: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-10px)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-down": "slideDown 0.3s ease-out forwards",
        "slide-up": "slideUp 0.3s ease-in forwards",
        "fade-in": "fadeIn 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
