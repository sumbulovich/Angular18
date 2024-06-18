/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6750A4',
        'secondary': '#625B71',
        'tertiary': '#7D5260'
      },
    },
  },
  plugins: [],
}

