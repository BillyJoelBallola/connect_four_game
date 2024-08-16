/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      keyframes: {
        fall: {
          "0%": { top: "0%" },
          "100%": { top: "100%" },
        },
      },
      gridTemplateColumns: {
        default: "repeat(7, minmax(0, 1fr))",
        medium: "repeat(6, minmax(0, 1fr))",
        small: "repeat(5, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
