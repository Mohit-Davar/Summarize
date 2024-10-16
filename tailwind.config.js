const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{ejs,html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "Poppins": ['Poppins', 'sans-serif']
      },
      colors: {
        "themeOne": colors.gray[900]
      }
    },
  },
  plugins: [],
}