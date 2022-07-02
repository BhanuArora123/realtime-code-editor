/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/NavBar/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        themeColor : "#111635",
        themeColor2:"#282836"
      },
      spacing:{
        "nav":"60%"
      }
    },
  },
  plugins: [],
}
