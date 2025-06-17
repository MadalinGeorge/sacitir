/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
