/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f65426",
        secondary: "#6E0000",

        // background colors
        background: {
          main: "#181C1F",          
          accent: "#26272B"
        },

        // link color
        link: "#9747FF"
      }
    },
  },
  plugins: [],
};
