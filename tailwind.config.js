/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        night: "#151515",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.caret-transparent': {
          caretColor: 'transparent',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover', 'focus', 'active']);
    }
  ],
};
