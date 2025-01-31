/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pre:'rgb(74, 144, 226)',
        bluecolor: {
          500: '#4A90E2B2', // Overwriting the default violet[500] color
        },
        bluecolortwo: {
          500: '#4A8FE033', // Overwriting the default violet[500] color
        },
        bluecolorthree: {
          500: '#4A90E2', // Overwriting the default violet[500] color
        },
      },
    },
  },
  plugins: [],
}

