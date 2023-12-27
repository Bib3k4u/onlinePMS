/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        color1: '#6699CC',
        

      },
    },
  },
  corePlugins: {
    // ...
    variants: true,
  },
  plugins: [],
}

