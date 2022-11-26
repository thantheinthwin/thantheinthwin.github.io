/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs' : '375px',
      },
      colors: {
        'light-theme-background': '#DEF5E5',
        'light-theme-text': '#395B64',
        'light-theme-title': '#29444B',
        'light-theme-green': '#8AB19F',
        'dark-theme-background': '#2C3333',
        'dark-theme-text': '#E7F6F2',
        'dark-theme-title': '#A5C9CA',
      },
      fontFamily: {
        body : ['Inria Sans'],
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}