const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/@nextui-org/react/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'desktop': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'barber-bg': '#e0dedb',
        'barber-primary': '#ad8c47',
        'barber-secondary': '#262626',
        'dark-mode-bg': '#1c1c1c',
        'dark-mode-bg2': '#2d2d2d',
        'dark-mode-text': '#f5f5f5',
      },
      fontFamily: {
        barber: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [nextui()],
  darkMode: 'class',
};
