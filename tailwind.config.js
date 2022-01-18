const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.gray,
      back: '#1a1a1a',
      white: colors.white,
      black: colors.black,
      red: colors.red,
      pink: colors.fuchsia,
      yellow: colors.yellow,
      green: "#79c142",
      lightGreen: "#a5ef6e",
    },
    screens: {
      'xs': {'max': '480px'},
      'sm': {'min': '481px', 'max': '767px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '768px', 'max': '1023px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '2024px'}
      // => @media (min-width: 1024px and max-width: 1279px) { ... }
    },
    extend: {
     
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  prefix: 'tw-',
}
