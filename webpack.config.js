const fs = require('fs');
const path = require('path');
const Uglify = require('uglifyjs-webpack-plugin');

const config = {
  optimization: {
    minimizer: [
      new Uglify({
        uglifyOptions: {
          output: { comments: false },
        },
      }),
    ],
  },
};
const rule = {
  include: path.resolve(__dirname, 'src'),
  test: /\.js/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        '@babel/preset-env',
      ],
    },
  },
};

module.exports = [
  (() => {
    const bundleConfig = Object.assign({}, config);
    const bundleRule = Object.assign({}, rule);

    bundleRule.use.options.presets.push('@babel/preset-react');
    bundleConfig.devServer = {
      compress: true,
      contentBase: path.resolve(__dirname, 'public'),
      open: true,
    };
    bundleConfig.entry = './src/index.js';
    bundleConfig.module = { rules: [bundleRule] };
    bundleConfig.output = {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public'),
    };

    return bundleConfig;
  })(),
  (() => {
    const entries = {};
    const functionsConfig = Object.assign({}, config);
    const functionsRule = Object.assign({}, rule);

    fs.readdirSync(path.resolve(__dirname, 'src/functions'))
      .filter(file => file.includes('.js'))
      .forEach(file => {
        entries['../functions/' + file.replace('.js', '')] = './src/functions/' + file;
      });

    functionsConfig.entry = entries;
    functionsConfig.module = { rules: [functionsRule] };
    functionsConfig.output = {
      filename: '[name].js',
      libraryTarget: 'commonjs',
      path: path.resolve(__dirname, 'public'),
    };

    return functionsConfig;
  })(),
];
