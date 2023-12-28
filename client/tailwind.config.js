/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        bgColor:'#5955B3',
        textColor :'#FDFDFF',
        cardColor:'#F4F4FE',
        hoverButton:'#807EE3',
        button:'#5854B3'
      },
    },
  },
  corePlugins: {
    // ...
    variants: true,
  },
  plugins: [],
}

