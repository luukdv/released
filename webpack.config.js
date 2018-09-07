const fs = require('fs');
const path = require('path');
const entry = { './bundle': './src/index.js' };

fs.readdirSync(path.resolve(__dirname, 'src/functions')).forEach(file => {
  entry['../functions/' + file.replace('.js', '')] = './src/functions/' + file;
});

module.exports = {
  devServer: {
    compress: true,
    contentBase: path.resolve(__dirname, 'public'),
    open: true,
  },
  entry,
  module: {
    rules: [
      {
        include: path.resolve(__dirname, 'src'),
        test: /\.js/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        },
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
  },
};
