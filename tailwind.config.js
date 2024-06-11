/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2fe",
        secondaryDark: "#0d1117",
        secondary: "#161B22",
        textWhite: "#E6EDF3",
        borderWhite: "#292E35",
      },
    },
  },
  plugins: [],
};
