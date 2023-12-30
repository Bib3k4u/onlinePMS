/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        bgColor:'#082949',
        // bgColor:'#526DD8',
        textColor :'#FDFDFF',
        cardColor:'#F4F4FE',
        hoverButton:'#6C7B88',
        button:'#082949'
      },
    },
  },
  corePlugins: {
    // ...
    variants: true,
  },
  plugins: [],
}

