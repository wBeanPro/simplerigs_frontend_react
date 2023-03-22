/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['montserrat'],
        'rajdhani' : ['rajdhani'],
        'Rajdhani' : ['rajdhani'],
      }
    },
  },
  plugins: [],
}
