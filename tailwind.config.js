/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      animation: {
        text: "text 5s ease infinite",
        fadeIn: "fadeIn 2s ease-in forwards",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      colors: {
        primary: "#AA530E",
        secondry: "#DF8931",
        light_gold: "#F5C16C",
        whishper: "#F3EDED",
        blue: "#0047AB",
      },
      fontFamily: {
        roboto_bold: ["Roboto-Bold"],
        roboto_black: ["Roboto-Black"],
        roboto_medium: ["Roboto-Medium"],
        roboto_regular: ["Roboto-Regular"],
        roboto_italic: ["Roboto-Italic"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
});

// kaushikhirapara12
// Password
