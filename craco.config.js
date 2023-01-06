const resolveUrlLoader = require('craco-resolve-url-loader')

module.exports = {
  babel: {
    plugins: ['babel-plugin-styled-components', 'emotion']
  },
  plugins: [{
    plugin: resolveUrlLoader
  }],
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')
      ]
    }
  }
}
