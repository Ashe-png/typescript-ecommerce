/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        text: '#001628',
        back: '#ebf5ff',
        primlow: '#780227',
        prim: '#a50034',
        primhigh: '#e3094e',
        secon: '#c8e5fe',
        seconlow: '#a7bfd4',
        seconhigh: '#afd7fa',
        accenlow: '#488501',
        accen: '#5cab02',
        accenhigh: '#87fa02',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
    },
  },
  plugins: [],
};
