/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {
    fontFamily: {
      merriweather: ['Merriweather', 'serif'],
      robotoCondensed: ['Roboto Condensed', 'sans-serif'],
    },

  },
},
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}


