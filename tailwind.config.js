/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        Av_bg: "url('/public/images/background.png')",
        Sign_bg: "url('/public/images/bg.png')",
      },
      minHeight: {
        '1px': '1px',
      },
    },
    colors: {
      transparent: 'transparent',
      primary: {
        DEFAULT: '#EB6932',
        'light': '#A491fE',
        'lightest': '#F9F6FF',
        'dark': '#9B4521'
      },
      grey:{
        DEFAULT:  '#A3A8AD',
        'light': '#F0F2F5',
        'dark': '#393939'
      },
      green:{
        DEFAULT: '#00a854',
        'light': '#cfefdf',
        'dark': '#cfefdf'
      },
      red:{
        DEFAULT: '#f04134',
        'light': '#fcdbd9',
        'dark': '#fcdbd9'
      },
      yellow:{
        DEFAULT: '#EFBF00'
      },
      white: '#FFFFFF',
      black: '#000000',
      dark: '#231E22',
      lightblue: '#e1f1fd',
      grayCustom: '#e9e9e9',
      lightYellow: 'rgba(195,173,18,1)',
      lightBlue: 'rgba(74,144,226,1)',
      lightRed: 'rgba(208,2,17,1)',
      lightGreen: 'rgba(65,117,5,1)',
      lightPurple: 'rgba(144,19,254,1)',
      heavyYellow: 'rgba(245,166,35,1)',
      customPurple: 'rgba(239,149,242,1)',
      tableHoverColor: '#4D465E',
      blue: '#4C90DD'
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@tailwindcss/forms'),
  ],
}
