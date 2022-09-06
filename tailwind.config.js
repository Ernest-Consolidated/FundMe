const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
