// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff2f0',
          100: '#ffe3e0',
          200: '#ffbcb8',
          300: '#fc918d',
          400: '#f06060',
          500: '#e2373e',
          600: '#bd242e',
          700: '#961522',
          800: '#700a18',
          900: '#4a0611'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
  // corePlugins: {
  //   preflight: false // <== disable this!
  // }
}
