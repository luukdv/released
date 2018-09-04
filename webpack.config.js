const path = require('path');

module.exports = {
  devServer: {
    compress: true,
    contentBase: 'dist',
    open: true,
  },
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
