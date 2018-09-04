const path = require('path');

module.exports = {
  devServer: {
    compress: true,
    contentBase: 'dist',
    open: true,
  },
  entry: './src/index.js',
  module: {
    rules: [
      {
        include: path.resolve(__dirname, 'src'),
        test: /\.js/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
