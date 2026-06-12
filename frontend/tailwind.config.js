/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#121212",
          surface: "#1E1E1E",
          text: "#F8F8F8",
          textSecondary: "#B0B0B0",
          border: "#2C2C2C",
        },
      },
    },
  },
  plugins: [],
};
