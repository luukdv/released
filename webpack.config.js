const fs = require('fs');
const merge = require('webpack-merge');
const path = require('path');
const Uglify = require('uglifyjs-webpack-plugin');

const config = {
  output: {
    path: path.resolve(__dirname, 'public'),
  },
  optimization: {
    minimizer: [
      new Uglify({
        uglifyOptions: {
          output: { comments: false },
        },
      }),
    ],
  },
}
const entries = {};
const rule = {
  include: path.resolve(__dirname, 'src'),
  test: /\.js/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  },
};

fs.readdirSync(path.resolve(__dirname, 'src/functions'))
  .filter(file => file.includes('.js'))
  .forEach(file => {
    entries['../functions/' + file.replace('.js', '')] = './src/functions/' + file;
  });

const configs = [
  merge.smart(config, {
    devServer: {
      compress: true,
      contentBase: path.resolve(__dirname, 'public'),
      open: true,
    },
    entry: './src/index.js',
    module: {
      rules: [
        merge.smart(rule, {
          use: {
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        }),
      ],
    },
    output: { filename: 'bundle.js' },
  }),
];

if (Object.keys(entries).length) {
  configs.push(merge.smart(config, {
    entry: entries,
    module: {
      rules: [rule],
    },
    output: {
      filename: '[name].js',
      libraryTarget: 'commonjs',
    },
  }));
}

module.exports = configs
