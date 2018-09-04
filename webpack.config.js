const path = require('path');

module.exports = {
  devServer: {
    compress: true,
    contentBase: 'dist',
    open: true,
  },
  entry: './src/index.js',
  output: {
    filename: 'dist/bundle.js',
    path: __dirname,
  }
};
