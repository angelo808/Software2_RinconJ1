/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        home: "calc(100vh - 8rem)",
      },
      colors: {
        customColor: "#e3d5ca",
      },
      backgroundImage: {
        firstImg:
          "linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url('./assets/imgHome.jpeg')",
      },
    },
  },
  plugins: [],
};



