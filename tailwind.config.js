/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#1A1A1A",
        darkText: "#292929",
        lightDark: "#292929",       
        darkPrice: "#141414",
        grayLink: "#525252",
        grayDes: "#7A7A7A",
        grayCheckout: "#333333",
        grayLight: "#F2F2F2",
        grayprimary: "#A3A3A3",
        graysecondary: "#8F8F8F",
        grayPrice: "#666666",
        orange: "#FFA439",
        blackRate: "#0B0F0E",
        rating: "#818B9C",
      },
      fontFamily: {
        clash: ['"Clash Grotesk"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
