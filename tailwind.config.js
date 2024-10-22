const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{ejs,html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "Poppins": ['Poppins', 'sans-serif'],
        "Spicy": ['Spicy Rice', 'sans-serif'],
        "Lobster": ['Lobster', 'sans-serif'],
      },
      colors: {
        "primary-theme-one": "#f2f4db",
        "primary-theme-two": "#3a4ccf",
        "secondary-theme-one": "#f1c50d",
        "secondary-theme-two": "#c9df23",
        "secondary-theme-three": "#c2ba26",
        "primary-textTheme-one": "#774e8d",
        "primary-textTheme-two": "#e882d6"
      }
    },
  },
  plugins: [],
}