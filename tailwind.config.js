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
        'tertiary': '#7D5260',
        'error': '#BA1A1A',
        'primary-dark': '#D0BCFF',
        'secondary-dark': '#CCC2DC',
        'tertiary-dark': '#EFB8C8',
        'error-dark': '#F2B8B5',
        'success': '#15803D',
        'success-dark': '#22C55E'
      },
    },
  },
  plugins: [],
  darkMode: ['selector', '[dark-theme]'],
}

