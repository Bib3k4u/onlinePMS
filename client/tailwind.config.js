/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        bgBlue: '#054bb4',
        bgBlueDark: '#2e5caf',
        textColor1: '#FFFFFF',
        cardColor: '#c8d2e0',
        textGray: '#5d6169',
        button: '#2e5caf',
        hoverButton: '#5d6169',
        textColor:'#FFFFFF'
      },
    },
  },
  corePlugins: {
    // ...
    variants: {},
  },
  plugins: [],
};
