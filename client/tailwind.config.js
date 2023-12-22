/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        color1: '#6699CC',
        color2:'#2A2A2A',
        color3:'gray',
        color4:'#E98074',
        color5:'#E85A4F',

      },
    },
  },
  corePlugins: {
    // ...
    variants: true,
  },
  plugins: [],
}

