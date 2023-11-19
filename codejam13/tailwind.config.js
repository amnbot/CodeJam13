/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { colors: {
      'bleu-special': '#02b2af',
      'gris-cool': 'rgb(30 41 59)'
    },},
   
  },
  plugins: [],
}

