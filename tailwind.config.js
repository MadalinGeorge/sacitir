/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mainRed: '#E30613',
        secondaryBlack: '#191923',
        secondaryPlatinium: '#E0E0E2',
        textWhite: '#FBFFFE',
      },
    },
  },
  plugins: [],
}
